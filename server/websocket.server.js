import webSocket from 'ws';
import { handleMessage, onUserLeave } from './controllers/websocket.controller';
import { removeUserFromBoard } from './db';

const configurePing = (ws, wss) => {
  ws.isAlive = true;

  ws.on('close', () => {
    console.log('closing: ' + ws.username + ' ' + ws.activeBoard);
    const { activeBoard, username } = ws;
    if (activeBoard && username) {
      onUserLeave(ws, wss, { boardSlug: ws.activeBoard, username });
    }
  })

  ws.on('pong', () => ws.isAlive = true);
}

const checkStillConnected = ws => {
  if (!ws.isAlive) {
    return ws.terminate();
  }

  ws.isAlive = false;
  ws.ping(null, false, true);
}

const subscribeToMessages = (ws, wss) => ws.on('message', handleMessage(ws, wss));

const initWebsocketServer = (server) => {
  const wss = new webSocket.Server({ server });

  wss.on('connection', ws => {
    configurePing(ws, wss);
    subscribeToMessages(ws, wss);
  });

  // check if the clients are still connected every 10 seconds
  setInterval(() => {
    wss.clients.forEach(checkStillConnected);
  }, 10000);

  return wss;
}

export default {
  init: initWebsocketServer,
};
