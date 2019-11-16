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

export const handleMessage = (ws, wss) => messageStr => {
    const message = JSON.parse(messageStr);
    switch (message.type) {
      case 'user_join':
        ws.activeBoard = message.boardSlug;
        addUserToBoard(message.boardSlug, message.username);
        publishBoardChanges(wss, message.boardSlug);
        break;
      case 'user_leave':
        ws.activeBoard = undefined;
        removeUserFromBoard(message.boardSlug, message.username);
        publishBoardChanges(wss, message.boardSlug);
        break;
      case 'set_vote':
        setUserVote(message.boardSlug, message.username, message.vote);
        publishBoardChanges(wss, message.boardSlug);
        break;
      default:
        console.log(`Unknown message type ${message.type}`);
        break;
    }
}
