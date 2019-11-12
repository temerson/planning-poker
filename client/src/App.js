import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { UserProvider } from './contexts/UserContext';
import { WebsocketProvider } from './contexts/WebsocketContext';
import Routes from './Routes';
import './main.css';

const requireUsername = (nextState, replace) => isRegistered => {
  if (!isRegistered) {
    replace({
      pathname: '/who-dis',
      state: { nextPathname: nextState.location.pathname },
    })
  }
}

export default function App(props) {
  return (
    <Provider store={props.store}>
      <UserProvider>
        <WebsocketProvider>
          <Routes
            history={browserHistory}
            onChange={(prev, next, replace) => requireUsername(next, replace)}
            onEnter={requireUsername}
          />
        </WebsocketProvider>
      </UserProvider>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};
