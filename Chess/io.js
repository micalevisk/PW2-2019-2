const SocketServer = require('socket.io');

const models = require('./app/models');

const io = new SocketServer();

// eslint-disable-next-line consistent-return
io.use((socket, next) => {
  socket.matchId = socket.handshake.headers['x-matchid'];
  socket.userId = socket.handshake.headers['x-uid'];
  socket.userName = socket.handshake.headers['x-uname'];

  if (socket.matchId) { // AKA "autenticado"
    return next();
  }
});

/* eslint-disable */
const messagesMock = [
  { id_partida: 5, id_user: 2, message: 'apenas mais um lorem ipsum da vida e eu sei lá o que', created_at: '2019-11-01 05:29:05' },
  { id_partida: 5, id_user: 3, message: 'joga aí meu parceiro', created_at: '2019-11-02 05:29:05' },
  { id_partida: 5, id_user: 2, message: 'eu n sei fala qualquer coisa ai meu parteiro', created_at: '2019-11-03 05:29:05' },
  { id_partida: 5, id_user: 2, message: 'tua vez mano', created_at: '2019-11-04 05:29:05' },
  { id_partida: 5, id_user: 3, message: 'pronto, dixxtroi', created_at: '2019-11-04 05:29:05' },
  { id_partida: 5, id_user: 2, message: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', created_at: '2019-11-05 05:29:05' },
];

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

const onSendMessageEvent = (socket, actionMessage) => {
  const { matchId, userId } = socket;
  const { text, timestamp } = actionMessage;

  messagesMock.push({
    id_partida: matchId,
    id_user: userId,
    message: text,
    // created_at:
  });

  actionMessage.userId = userId,// pra recuperar o nome do usuário e sua cor (white ou black)
  actionMessage.matchId = matchId,// pra filtrar somente pela partida em que o socket está

  socket.broadcast.emit('chat:receive-message', actionMessage);
};

io.on('connect', (socket) => {
  socket.on('game:send-move', onSendMoveEvent.bind(null, socket));
  socket.on('chat:send-message', onSendMessageEvent.bind(null, socket));
  socket.once('match:new-opponent', onNewOpponentEvent.bind(null, socket));

  // TODO: usar o `models.messagem`
  socket.emit('chat:bulk-messages', { matchId: socket.matchId, messages: messagesMock });
});


module.exports = io;
