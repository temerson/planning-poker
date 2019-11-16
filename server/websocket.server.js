import webSocket from 'ws';
import { handleMessage } from './controllers/websocket.controller';

const configurePing = ws => {
  ws.isAlive = true;
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
    configurePing(ws);
    subscribeToMessages(ws, wss);
  });

  // check if the clients are still connected every 10 seconds
  setInterval(() => {
    wss.clients.forEach(checkStillConnected);
  }, 10000);

  return wss;
}

export default initWebsocketServer;
