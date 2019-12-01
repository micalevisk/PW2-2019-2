type Socket = SocketIO.Socket & {
  matchId: string;
  userId: string;
  userName: string;
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
  matchId: string;
  source: string;
  target: string;
  promotion: string;
  position: string;
}

type PActionMessage = {
  text: string;
  timestamp: number;
}

type SlimActionMessage = {
  senderUid: number;
  text: string;
  created_at: string;
}

type ActionMessages = {
  matchId: string;
  messages: SlimActionMessage[];
}

type ActionMessage = SlimActionMessage & {
  matchId: string;
}
