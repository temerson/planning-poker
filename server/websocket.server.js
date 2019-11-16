import webSocket from 'ws';
import * as websocketController from './controllers/websocket.controller';

const initWebsocketServer = (server) => {
  const wss = new webSocket.Server({ server });

  wss.on('connection', ws => {
    websocketController.configurePing(ws);
    websocketController.subscribeToMessages(ws, wss);
  });

  // check if the clients are still connected every 10 seconds
  setInterval(() => {
    wss.clients.forEach(websocketController.configurePong);
  }, 10000);
}

export default initWebsocketServer;
