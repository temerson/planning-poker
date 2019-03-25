import { SET_USER } from './actions';

const initialState = {
  user: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};


export const getUsername = (state) => state.app.user.username;
export const getUserId = (state) => state.app.user._id;

export default appReducer;
