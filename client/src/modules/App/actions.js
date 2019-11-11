import callApi from '../../util/apiCaller';

export const SET_USER = 'SET_USER';
export const SET_COOKIES = 'SET_COOKIES';

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function setCookies(cookies) {
  return {
    type: SET_COOKIES,
    cookies,
  };
}

export function getUserRequest(userId) {
  return dispatch => callApi(`users/${userId}`, 'get')
    .then(res => dispatch(setUser(res)));
}
