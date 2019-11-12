import express from 'express';
import webSocket from 'ws';
import http from 'http';
import config from './config';
import routes from './routes';
import { store } from './db';

const app = express();
const server = http.createServer(app);
server.listen(config.port, () => console.log(`Listening on port ${config.port}`));

const wss = new webSocket.Server({ server });

const updateClients = boardSlug => {
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

wss.on('connection', ws => {

  ws.isAlive = true;
  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('message', messageStr => {
    const message = JSON.parse(messageStr);
    console.log(message);
    switch (message.type) {
      case 'user_join':
        ws.activeBoard = message.boardSlug;
        updateClients(message.boardSlug);
        break;
      case 'user_leave':
        ws.activeBoard = undefined;
        updateClients(message.boardSlug);
        break;
      case 'user_vote':
      case 'board_change':
        updateClients(message.boardSlug);
        break;
      default:
        console.log(`Unknown message type ${message.type}`);
        break;
    }
  });

  ws.send('Hi there, I am a websocket server');
});

// check if the clients are still connected every 10 seconds
setInterval(() => {
  wss.clients.forEach(ws => {
    if (!ws.isAlive) {
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.ping(null, false, true);
  });
}, 10000);

app.use(express.json());
app.use('/api', routes);
