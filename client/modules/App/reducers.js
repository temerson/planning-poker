import { SET_COOKIES, SET_USER } from './actions';

const parseCookies = (cookies) => {
  if (!cookies) return {};

  // split the "key1=value1;key2=value2" string into { key1: 'value1', key2: 'value2' }
  const reducer = (obj, next) => ({ ...obj, [next.split('=')[0]]: next.split('=')[1] });
  const ret = cookies.split(';').reduce(reducer, {});
  return ret;
};

const initialState = {
  user: {},
  cookies: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COOKIES:
      return { ...state, cookies: parseCookies(action.cookies) };
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export const getCookies = (state) => state.app.cookies;
export const getUsername = (state) => state.app.user.username;
export const getUserId = (state) => state.app.user._id;

export default appReducer;
