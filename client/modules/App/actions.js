export const SET_USER = 'SET_USER';
import callApi from '../../util/apiCaller';

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function getUserRequest(userId) {
  return dispatch => callApi(`users/${userId}`, 'get')
    .then(res => dispatch(setUser(res)));
}
