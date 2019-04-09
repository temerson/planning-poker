import app from './app';
import serverConfig from './config';

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Planning-Poker is running on port ${serverConfig.port}.`); // eslint-disable-line
  }
});
