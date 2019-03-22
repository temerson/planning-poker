import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { CookiesProvider } from 'react-cookie';

// Import Routes
import routes from './routes';

// Base stylesheet
require('./main.css');

export default function App(props) {
  return (
    <CookiesProvider>
      <Provider store={props.store}>
        <Router history={browserHistory}>
          {routes}
        </Router>
      </Provider>
    </CookiesProvider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};
