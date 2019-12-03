/* eslint-disable consistent-return, no-param-reassign */
const EVTS_SOCKET_DISCONNECT = ['connect_error', 'connect_timeout', 'disconnect'];
const EVTS_SOCKET_CONNECT = ['connect', 'reconnect'];

// eslint-disable-next-line no-unused-vars
function startChat({
  matchId, myUserId, mapUidToUserDate, pastMessages,
}) {
  const $chatBox = $('#chat-history');
  const $messages = $('#messages');
  const $btnSendMessage = $('#send-message');
  const $messagetToSend = $('#message-to-send');

  function renderMessage({ text, timestamp, senderUid }) {
    try {
      const senderColor = mapUidToUserDate[senderUid].fullColor;
      const senderName = mapUidToUserDate[senderUid].name;
      const messageFormatedDate = new Date(timestamp).toLocaleString();
      // eslint-disable-next-line eqeqeq
      const targetType = (senderUid == myUserId ? 'my' : 'other');

      const rawNewMessageItem = `
        <li class="${targetType}-user-msg">
          <div class="message-info">
            <span class="piece-icon piece-${senderColor}"><i class="fas fa-chess-king"></i></span>
            <span class="username">${senderName}</span>
            <span class="time">${messageFormatedDate}</span>
          </div>
          <div class="message-text text-${senderColor}">${text}</div>
        </li>
      `;

      $messages.append(rawNewMessageItem);

      $chatBox.scrollTop($messages.height());

      return true; // Confirms that the message was rendered
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  // NOTE: renderiza no client para manter a consistência da renderização da mensagem
  if (pastMessages) {
    // eslint-disable-next-line no-restricted-syntax
    for (const actionMessage of pastMessages) {
      if (!renderMessage(actionMessage)) break;
    }
  }

  function sendMessage() {
    const messageText = $messagetToSend.val().trim();
    if (!messageText) return false;

    const preActionMessage = { // `preActionMessage` payload
      text: messageText,
      timestamp: Date.now(),
    };

    socket.emit('chat:send-message', preActionMessage, () => { // ACK
      $messagetToSend.val('');
    });
  }

  $btnSendMessage.click(throttled(sendMessage));

  $messagetToSend.keypress(function onKeypress(evt) {
    if (evt.keyCode === 13) {
      $btnSendMessage.click();
      return false; // To prevent default behavior.
    }
  });


  socket.on('chat:receive-message', function receiveMessage(actionMessage) {
    // TODO: substituir essa lógica por `socket rooms`
    if (matchId !== actionMessage.matchId) return;

    renderMessage(actionMessage);
  });

  const disableSendMessage = () => {
    $btnSendMessage.addClass('disabled');
    $btnSendMessage.attr('disabled', true);
  };

  const enableSendMessage = () => {
    $btnSendMessage.removeClass('disabled');
    $btnSendMessage.attr('disabled', false);
  };


  EVTS_SOCKET_DISCONNECT.forEach((eventName) => socket.on(eventName, disableSendMessage));
  EVTS_SOCKET_CONNECT.forEach((eventName) => socket.on(eventName, enableSendMessage));
}


// eslint-disable-next-line no-unused-vars
function startBoardAndGame({
  matchId, gameOnHold, position, myUserId, myFullColor, opponentUserId, opponentFullColor,
}) {
  const game = new Chess();
  game.load(position);

  const boardElemSelector = '#board';
  const board = Chessboard(boardElemSelector, {
    position,
    orientation: myFullColor,
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
    [myFullColor[0]]: myUserId,
    [opponentFullColor[0]]: opponentUserId,
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
    return myFullColor.toLowerCase()[0] === game.turn().toLowerCase();
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
    socket.emit('game:send-move', { // `preActionMove` payload
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

  EVTS_SOCKET_DISCONNECT.forEach((eventName) => socket.on(eventName, pauseGame));
  EVTS_SOCKET_CONNECT.forEach((eventName) => socket.on(eventName, resumeGame));

  socket.on('game:receive-move', function receivePieceMove(actionMove) {
    // TODO: substituir essa lógica por `socket rooms`
    if (matchId !== actionMove.matchId) return;

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


/* eslint-disable */
function throttled(fn, delay = 1000) { // ES5 syntax
  var lastCall = 0;
  return function wrappedFn() {
    var now = Date.now();

    if (now - lastCall < delay) {
      return;
    }

    lastCall = now;
    return fn.apply(undefined, arguments);
  };
}
