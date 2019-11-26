/* eslint-disable consistent-return, no-param-reassign */

// eslint-disable-next-line no-unused-vars
function startBoardAndGame({
  matchId, gameOnHold, position, myColor, opponentColor, myUserId, opponentUserId,
}) {
  const game = new Chess();
  game.load(position);

  const boardElemSelector = '#board';
  const board = Chessboard(boardElemSelector, {
    position,
    orientation: myColor,
    // width: '100px',
    draggable: !game.game_over(),
    pieceTheme: '/img/chesspieces/neo/{piece}.png',
    onDragStart,
    onDrop,
    onMouseoverSquare,
    onMouseoutSquare,
    onSnapEnd,
  });

  const mapColorPrefixToUserId = {
    [myColor[0]]: myUserId,
    [opponentColor[0]]: opponentUserId,
  };

  const $myInfo = $(`#user-${myUserId}`);
  const $opponentInfo = $(`#user-${opponentUserId}`);
  const $status = $('#status');

  const audios = window['game-audios']
    && Array.from(window['game-audios'].children)
      .reduce((acum, elAudio) => {
        const fnName = elAudio.dataset.fn;
        if (fnName) acum[fnName] = () => elAudio.play();
        return acum;
      }, {});


  function isMyTurn() {
    return myColor.toLowerCase()[0] === game.turn().toLowerCase();
  }

  function removeGreySquares() {
    $(`${boardElemSelector} .square-55d63`).css('background', '');
  }

  function highlightSquare(square) {
    const $square = $(`${boardElemSelector} .square-${square}`);

    const backgroundColor = ($square.hasClass('black-3c85d') ? '#696969' : '#a9a9a9');

    $square.css('background', backgroundColor);
  }

  function onMouseoverSquare(square/* , piece */) {
    if (gameOnHold || !isMyTurn() || game.game_over()) return false;

    // get list of possible moves for this square
    const moves = game.moves({
      square,
      verbose: true,
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    // highlight the square they moused over
    highlightSquare(square);

    // highlight the possible squares for this piece
    moves.forEach((move) => highlightSquare(move.to));
  }

  function onMouseoutSquare(/* square, piece */) {
    if (gameOnHold || !isMyTurn() || game.game_over()) return false;
    removeGreySquares();
  }


  function onDragStart(source, piece /* , position, orientation */) {
    if (gameOnHold || !isMyTurn() || game.game_over()) return false;

    // only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece[0] === 'b')
      || (game.turn() === 'b' && piece[0] === 'w')) {
      return false;
    }
  }

  function onDrop(source, target) {
    if (gameOnHold || !isMyTurn() || game.game_over()) return false;

    removeGreySquares();

    const move = {
      from: source,
      to: target,
      promotion: 'q', // NOTE: always promote to a queen
    };

    const updatedPosition = game.move(move);
    // illegal move
    if (updatedPosition === null) {
      audios.illegal();
      return 'snapback';
    }

    if (updatedPosition.promotion) { // the move is a promotion
      audios.promote();
    } else if (updatedPosition.flags === 'c') { // a standard capture
      audios.capture();
    } else {
      audios.moveSelf();
    }

    updateStatus();

    // Emit this move
    socket.emit('game:send-move', { // `actionMove` payload
      source: move.from,
      target: move.to,
      promotion: move.promotion,
      position: game.fen(),
      userIdTurn: mapColorPrefixToUserId[game.turn()],
      matchInDraw: game.in_draw(),
      matchIsOver: game.game_over(),
    });
  }

  // update the board position after the piece snap for castling, en passant, pawn promotion
  function onSnapEnd() {
    board.position(game.fen());
  }


  function updateStatus(status = '') {
    if (!status) {
      let moveColor = 'branco';
      if (game.turn() === 'b') {
        moveColor = 'preto';
      }

      if (game.in_checkmate()) {
        status = `É xeque-mate! Vitória do jogador ${moveColor}!`;
      } else if (game.in_draw()) {
        status = 'O jogo empatou!';
        $myInfo.removeClass('user-turn');
        $opponentInfo.removeClass('user-turn');
      } else {
        status = `É a vez do jogador ${moveColor}.`;

        // check?
        if (game.in_check()) {
          status += ` O jogador ${moveColor} está em xeque.`;
        }
      }
    }

    $status.html(status);

    if (game.in_draw()) return;

    if (isMyTurn()) {
      $myInfo.addClass('user-turn');
      $opponentInfo.removeClass('user-turn');
    } else {
      $opponentInfo.addClass('user-turn');
      $myInfo.removeClass('user-turn');
    }
  }


  updateStatus();

  if (game.game_over() || gameOnHold) {
    return;
  }

  const pauseGame = () => {
    console.info('the game is paused due to server connection...');
    gameOnHold = true;

    updateStatus('Game is paused due to server connection!');
    $myInfo.removeClass('user-turn');
    $opponentInfo.removeClass('user-turn');
  };

  const resumeGame = () => {
    console.info('the game is ready!');
    gameOnHold = false;
    updateStatus();
  };

  const eventsToPauseGame = ['connect_error', 'connect_timeout', 'disconnect'];
  const eventsToResumeGame = ['connect', 'reconnect'];
  eventsToPauseGame.forEach((eventName) => socket.on(eventName, pauseGame));
  eventsToResumeGame.forEach((eventName) => socket.on(eventName, resumeGame));

  socket.on('game:receive-move', function receivePieceMove(actionMove) {
    if (matchId !== actionMove.matchId) return; // TODO: substituir essa lógica por `socket rooms`

    board.position(actionMove.position);

    game.move({
      from: actionMove.source,
      to: actionMove.target,
      promotion: actionMove.promotion,
    });

    audios.moveOpponent();

    updateStatus();
  });
}
