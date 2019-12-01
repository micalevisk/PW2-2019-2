const SocketServer = require('socket.io');

const models = require('./app/models');

const io = SocketServer();

// eslint-disable-next-line consistent-return
io.use((/** @type {SocketIO.Socket} */ socket, next) => {
  const authData = {
    matchId: socket.handshake.headers['x-matchid'],
    userId: socket.handshake.headers['x-uid'],
    userName: socket.handshake.headers['x-uname'],
  };

  const authValues = Object.values(authData);
  const isValidClient = authValues.length && authValues.every((val) => val && !!val.trim());
  if (isValidClient) { // AKA "autenticado"
    Object.assign(socket, authData);
    return next();
  }
});

const messagesMock = [];

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
  const { text, timestamp } = preActionMessage;

  // TODO: usar o `models.messagem`
  const newMessageValues = {
    // id_partida: matchId,
    // id_user: userId,
    senderUid: Number.parseInt(userId, 10), // TODO: sequelize retorne `string` em vez de `number`
    text,
    created_at: new Date(timestamp * 1000).toLocaleString(), // valor criado pelo SGBD
  };
  messagesMock.push(newMessageValues);// TODO: salvar no BD

  /** @type {ActionMessage} */
  const actionMessage = {
    matchId,
    senderUid: Number.parseInt(userId, 10),
    text,
    created_at: newMessageValues.created_at,
  };

  // socket.broadcast.emit('chat:receive-message', actionMessage);
  io.emit('chat:receive-message', actionMessage); // TODO: substituir lógica por `socket rooms`
};


io.on('connect', (/** @type {Socket} */ socket) => {
  socket.on('game:send-move', onSendMoveEvent.bind(null, socket));
  socket.once('match:new-opponent', onNewOpponentEvent.bind(null, socket));

  // socket.on('chat:send-message', onSendMessageEvent.bind(null, socket));
  socket.on('chat:send-message', (preActionMessage, ackFn) => {
    ackFn();
    onSendMessageEvent(socket, preActionMessage);
  });
});


module.exports = io;
