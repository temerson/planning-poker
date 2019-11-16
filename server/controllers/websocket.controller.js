import { store } from '../db';

const publishBoardChanges = (wss, boardSlug) => {
  wss.clients.forEach(ws => {
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
        publishBoardChanges(wss, message.boardSlug);
        break;
      case 'user_leave':
        ws.activeBoard = undefined;
        publishBoardChanges(wss, message.boardSlug);
        break;
      case 'user_vote':
      case 'board_change':
        publishBoardChanges(wss, message.boardSlug);
        break;
      default:
        console.log(`Unknown message type ${message.type}`);
        break;
    }
}
