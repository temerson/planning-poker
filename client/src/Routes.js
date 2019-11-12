import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route, Router, IndexRoute } from 'react-router';
import useUser from './contexts/useUser';
import App from './modules/App/App';
import Boards from './modules/Board/pages/Boards';
import RegisterBoard from './modules/Board/pages/RegisterBoard';
import Board from './modules/Board/pages/Board';
import BoardList from './modules/Board/pages/BoardList';
import WhoDis from './modules/App/WhoDis';

const Routes = ({ history, onEnter, onChange }, ) => {
  const user = useUser();
  const isRegistered = !!user.getUsername();

  return (
    <Router history={history}>
      <Redirect from="/" to="/boards" />
      <Route path="/" component={App}>
        <Route path="who-dis" component={WhoDis} />
        <Route
          path="boards"
          component={Boards}
          onEnter={onEnter(isRegistered)}
          onChange={onChange(isRegistered)}
        >
          <IndexRoute component={BoardList} />
          <Route path="new-board" component={RegisterBoard} />
          <Route path=":boardSlug" component={Board}/>
        </Route>
      </Route>
    </Router>
  );
}

Routes.propTypes = {
  history: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
};

export default Routes;
