import express from 'express';
import mongoose from 'mongoose';
import config from './config';
const app = express();


// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(config.mongoURL, (error) => {
    if (error) {
      console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
      throw error;
    }
  });
}

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));

app.get('/express_backend', (req, res) => {
  res.send({ express: 'TADA' });
});
