/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/reducers';
import boards from './modules/Board/reducers';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  boards,
});
