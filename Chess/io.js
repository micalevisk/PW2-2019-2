// @ts-check
const SocketServer = require('socket.io');

const models = require('./app/models');

const io = SocketServer();

// eslint-disable-next-line consistent-return
io.use((/** @type {SocketIO.Socket} */ socket, next) => {
  const authData = {
    matchId: socket.handshake.headers['x-matchid'],
    userId: socket.handshake.headers['x-uid'],
  };

  const authValues = Object.values(authData);
  const isValidClient = authValues.length && authValues.every((val) => val && !!val.trim());
  if (isValidClient) { // AKA "autenticado"
    Object.assign(socket, authData);
    return next();
  }
});


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
    source: preActionMove.source,
    target: preActionMove.target,
    position: preActionMove.position,
    promotion: preActionMove.promotion,
  };

  socket.to(matchId).emit('game:receive-move', actionMove);
};

/**
 *
 * @param {Socket} socket
 */
const onNewOpponentEvent = (socket) => {
  const { matchId } = socket;
  socket.to(matchId).emit('match:set-opponent');
};


/**
 *
 * @param {Socket} socket
 * @param {PActionMessage} preActionMessage
 */
const onSendMessageEvent = (socket, preActionMessage) => {
  const { matchId, userId } = socket;
  const { text, timestamp } = preActionMessage;

  const newMessageValues = {
    id_partida: matchId,
    id_user: userId,
    text,
    timestamp,
  };

  // TODO: move to a background job
  models.Mensagem.create(newMessageValues);

  /** @type {ActionMessage} */
  const actionMessage = {
    senderUid: userId,
    text,
    timestamp,
  };

  io.in(matchId).emit('chat:receive-message', actionMessage);
};

/**
 *
 * @param {Socket} socket
 */
const onJoinMatch = (socket) => {
  socket.on('game:send-move', onSendMoveEvent.bind(null, socket));
  socket.once('match:new-opponent', onNewOpponentEvent.bind(null, socket));

  socket.on('chat:send-message', (preActionMessage, ackFn) => {
    ackFn();
    onSendMessageEvent(socket, preActionMessage);
  });
};


io.on('connect', (/** @type {Socket} */ socket) => {
  socket.join(socket.matchId, onJoinMatch.bind(null, socket));
});


module.exports = io;
