import { SET_USER } from './actions';

const appReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, username: action.username };
    default:
      return state;
  }
};


export const getUsername = (state) => state.app.username;

export default appReducer;
