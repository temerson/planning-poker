import express from 'express';
import http from 'http';
import config from './config';
import routes from './routes';
import websocketServer from './websocket.server.js';

const app = express();
const server = http.createServer(app);
server.listen(config.port, () => console.log(`Listening on port ${config.port}`));
websocketServer.init(server);

app.use(express.json());
app.use('/api', routes);
