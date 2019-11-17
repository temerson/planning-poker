import {
  addUserToBoard,
  removeUserFromBoard,
  setUserVote,
  store,
} from '../db';

const publishBoardChanges = (wss, boardSlug) => {
  wss.clients.forEach(ws => {
    // push the entire board out to everyone who has that as their active board
    if (ws.activeBoard === boardSlug) {
      const message = {
        type: 'board_change',
        board: store.boards[boardSlug],
      };
      ws.send(JSON.stringify(message));
    }
  });
};

const onUserJoin = (ws, wss, message) => {
  ws.username = message.username;
  ws.activeBoard = message.boardSlug;
  addUserToBoard(message.boardSlug, message.username);
  publishBoardChanges(wss, message.boardSlug);
};

export const onUserLeave = (ws, wss, message) => {
  ws.activeBoard = undefined;
  removeUserFromBoard(message.boardSlug, message.username);
  publishBoardChanges(wss, message.boardSlug);
};

const onUserVote = (ws, wss, message) => {
  setUserVote(message.boardSlug, message.username, message.vote);
  publishBoardChanges(wss, message.boardSlug);
}

export const handleMessage = (ws, wss) => messageStr => {
    const message = JSON.parse(messageStr);
    switch (message.type) {
      case 'user_join':
        onUserJoin(ws, wss, message);
        break;
      case 'user_leave':
        onUserLeave(ws, wss, message);
        break;
      case 'set_vote':
        onUserVote(ws, wss, message);
        break;
      default:
        console.log(`Unknown message type ${message.type}`);
        break;
    }
}
