const SocketServer = require('socket.io');

const models = require('./app/models');

const io = SocketServer();

// eslint-disable-next-line consistent-return
io.use((/** @type {SocketIO.Socket} */ socket, next) => {
  Object.assign(socket, {
    matchId: socket.handshake.headers['x-matchid'],
    userId: socket.handshake.headers['x-uid'],
    userName: socket.handshake.headers['x-uname'],
  });

  if (socket.handshake.headers['x-matchid']) { // AKA "autenticado"
    return next();
  }
});

/* eslint-disable spaced-comment */
const messagesMock = [
  // query: SELECT id_user as senderUid, message as text, created_at FROM message;
  { /*id_partida: 5,*/ senderUid: 2, text: 'apenas mais um lorem ipsum da vida e eu sei lá o que', created_at: '2019-11-01 05:29:05' },
  { /*id_partida: 5,*/ senderUid: 3, text: 'joga aí meu parceiro', created_at: '2019-11-02 05:29:05' },
  { /*id_partida: 5,*/ senderUid: 2, text: 'eu n sei fala qualquer coisa ai meu parteiro', created_at: '2019-11-03 05:29:05' },
  { /*id_partida: 5,*/ senderUid: 2, text: 'tua vez mano', created_at: '2019-11-04 05:29:05' },
  { /*id_partida: 5,*/ senderUid: 3, text: 'pronto, dixxtroi', created_at: '2019-11-04 05:29:05' },
  { /*id_partida: 5,*/ senderUid: 2, text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', created_at: '2019-11-05 05:29:05' },
];

/**
 *
 * @param {Socket} socket
 * @param {PActionMove} preActionMove
 */
const onSendMoveEvent = (socket, preActionMove) => {
  const { matchId } = socket;
  const {
    position,
    userIdTurn,
    matchInDraw,
    matchIsOver,
  } = preActionMove;

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

  /** @type {ActionMove} */
  const actionMove = {
    matchId,
    source: preActionMove.source,
    target: preActionMove.target,
    position: preActionMove.position,
    promotion: preActionMove.promotion,
  };

  socket.broadcast.emit('game:receive-move', actionMove);
};

/**
 *
 * @param {Socket} socket
 */
const onNewOpponentEvent = (socket) => {
  const actionOpponent = {
    matchId: socket.matchId,
  };

  socket.broadcast.emit('match:set-opponent', actionOpponent);
};


/**
 *
 * @param {Socket} socket
 * @param {PActionMessage} preActionMessage
 */
const onSendMessageEvent = (socket, preActionMessage) => {
  const { matchId, userId } = socket;
  const { text, date } = preActionMessage;

  // TODO: usar o `models.messagem`
  messagesMock.push({
    // id_partida: matchId,
    // id_user: userId,
    senderUid: Number.parseInt(userId, 10), // TODO: sequelize retorne `string` em vez de `number`
    text,
    created_at: date,
  });

  /** @type {ActionMessage} */
  const actionMessage = {
    matchId,
    senderUid: Number.parseInt(userId, 10),
    text,
    created_at: date,
  };

  socket.broadcast.emit('chat:receive-message', actionMessage);
};


io.on('connect', (/** @type {Socket} */ socket) => {
  socket.on('game:send-move', onSendMoveEvent.bind(null, socket));
  socket.on('chat:send-message', onSendMessageEvent.bind(null, socket));
  socket.once('match:new-opponent', onNewOpponentEvent.bind(null, socket));

  // TODO: usar o `models.messagem`
  /** @type {ActionMessages} */
  const actionMessages = {
    matchId: socket.matchId,
    messages: messagesMock,
  };

  socket.emit('chat:bulk-messages', actionMessages);
});


module.exports = io;
