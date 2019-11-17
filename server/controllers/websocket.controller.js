import {
  addUserToBoard,
  removeUserFromBoard,
  resetBoard,
  setUserVote,
  store,
  setShowVotes,
  updateTask,
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
  removeUserFromBoard(message.boardSlug, message.username);
  publishBoardChanges(wss, ws.activeBoard);
  ws.activeBoard = undefined;
};

const onUserVote = (ws, wss, message) => {
  setUserVote(message.boardSlug, message.username, message.vote);
  publishBoardChanges(wss, ws.activeBoard);
};

const onResetBoard = (ws, wss) => {
  resetBoard(ws.activeBoard);
  publishBoardChanges(wss, ws.activeBoard);
};

const onUpdateTask = (ws, wss, message) => {
  updateTask(ws.activeBoard, {
    title: message.title,
    description: message.description,
  });
  publishBoardChanges(wss, ws.activeBoard);
}

const onSetShowVotes = (ws, wss, message) => {
  setShowVotes(ws.activeBoard, message.showVotes);
  publishBoardChanges(wss, ws.activeBoard);
}

// TODO: stop passing around wss everywhere
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
      case 'reset_board':
        onResetBoard(ws, wss);
        break;
      case 'update_task':
        onUpdateTask(ws, wss, message);
        break;
      case 'set_show_votes':
        onSetShowVotes(ws, wss, message);
        break;
      default:
        console.log(`Unknown message type ${message.type}`);
        break;
    }
}
