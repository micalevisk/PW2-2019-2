type Socket = SocketIO.Socket & {
  matchId: string;
  userId: string;
}

type PActionMove = {
  source: string;
  target: string;
  promotion: string;
  position: string;
  userIdTurn: string;
  matchInDraw: boolean;
  matchIsOver: boolean;
}

type ActionMove = {
  source: string;
  target: string;
  promotion: string;
  position: string;
}

type PActionMessage = {
  text: string;
  timestamp: number;
}

type ActionMessage = PActionMessage & {
  senderUid: string;
}

type ActionMessages = {
  matchId: string;
  messages: SlimActionMessage[];
}
