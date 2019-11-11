import PropTypes from 'prop-types';
import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import App from './modules/App/App';
import Boards from './modules/Board/pages/Boards';
import RegisterBoard from './modules/Board/pages/RegisterBoard';
import Board from './modules/Board/pages/Board';
import BoardList from './modules/Board/pages/BoardList';
import WhatDo from './modules/App/WhatDo';
import WhoDis from './modules/App/WhoDis';

const Routes = ({ history, onEnter, onChange }) => (
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="who-dis" component={WhoDis} />
      <Route path="boards" component={Boards} onEnter={onEnter} onChange={onChange}>
        <Route path="new" component={RegisterBoard} />
        <Route path=":boardSlug" component={Board}/>
      </Route>
    </Route>
  </Router>
);

Routes.propTypes = {
  history: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
};

export default Routes;
