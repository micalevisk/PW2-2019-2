const SocketServer = require('socket.io');

const models = require('./app/models');

const io = new SocketServer();

io.use((socket, next) => {
  socket.matchId = socket.handshake.headers['x-matchid'];
  socket.userId = socket.handshake.headers['x-uid'];
  socket.userName = socket.handshake.headers['x-uname'];

  return next();
});


const onSendMoveEvent = (socket, actionMove) => {
  const { matchId } = socket;
  const {
    position,
    userIdTurn,
    matchInDraw,
    matchIsOver,
  } = actionMove;

  // TODO: assegurar que o usuário solicitado tem a vez (e permissão) para realizar o movimento

  const newPartidaValues = {
    fen: position,
  };

  if (matchIsOver) {
    newPartidaValues.id_winner = (matchInDraw ? null : userIdTurn); // NOTE: `NULL` means draw
  }

  // TODO: move to a background job (vide https://youtu.be/uonKHztGhko)
  models.Partida.update(newPartidaValues, {
    where: { id: matchId },
  });

  // Attach the match id in `actionMove` payload
  actionMove.matchId = matchId;

  socket.broadcast.emit('game:receive-move', actionMove);
};

const onNewOpponentEvent = (socket) => {
  const actionOpponent = {
    matchId: socket.matchId,
  };

  socket.broadcast.emit('match:set-opponent', actionOpponent);
};


io.on('connect', (socket) => {
  const { matchId } = socket;

  if (!matchId) { // AKA "não-autenticado"
    return;
  }

  socket.on('game:send-move', onSendMoveEvent.bind(null, socket));
  socket.emit('status:ready', matchId);

  socket.once('match:new-opponent', onNewOpponentEvent.bind(null, socket));
});


module.exports = io;
