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

const handleMessage = (ws, wss) => messageStr => {
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

export const configurePing = ws => {
  ws.isAlive = true;
  ws.on('pong', () => ws.isAlive = true);
}

export const configurePong = ws => {
  if (!ws.isAlive) {
    return ws.terminate();
  }

  ws.isAlive = false;
  ws.ping(null, false, true);
}

export const subscribeToMessages = (ws, wss) => ws.on('message', handleMessage(ws, wss));
