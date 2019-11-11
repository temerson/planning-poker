import express from 'express';
import mongoose from 'mongoose';
import webSocket from 'ws';
import http from 'http';
import config from './config';

const app = express();
const server = http.createServer(app);
server.listen(config.port, () => console.log(`Listening on port ${config.port}`));

const wss = new webSocket.Server({ server });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`received: ${message}`);
    ws.send(`Hello, you sent: ${message}`);
  });

  ws.send('Hi there, I am a websocket server');
});

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(config.mongoURL, (error) => {
    if (error) {
      console.error('Please make sure Mongodb is installed and running!');
      throw error;
    }
  });
}


app.get('/express_backend', (req, res) => {
  res.send({ express: 'TADA' });
});
