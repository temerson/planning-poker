import express from 'express';
import webSocket from 'ws';
import http from 'http';
import config from './config';

const app = express();
const server = http.createServer(app);
server.listen(config.port, () => console.log(`Listening on port ${config.port}`));

const wss = new webSocket.Server({ server });

wss.on('connection', ws => {

  ws.isAlive = true;
  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('message', messageStr => {
    const message = JSON.parse(messageStr);
    switch (message.type) {
      case 'user_join':
        wss.clients.forEach(ws => ws.send(`User ${message.username} joined`))
        break;
      case 'set_vote':
        wss.clients.forEach(ws => ws.send(`User ${message.username} voted ${message.vote}`));
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

app.get('/express_backend', (req, res) => {
  res.send({ express: 'TADA' });
});
