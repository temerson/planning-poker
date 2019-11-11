import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import Routes from './Routes';
import './main.css';

function requireUsername(nextState, replace) {
  const username = window.sessionStorage.getItem('username');
  if (!username) {
    replace({
      pathname: '/who-dis',
      state: { nextPathname: nextState.location.pathname },
    })
  }
}

export default function App(props) {
  return (
    <Provider store={props.store}>
      <Routes
        history={browserHistory}
        onChange={(prev, next, replace) => requireUsername(next, replace)}
        onEnter={requireUsername}
      />
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};
