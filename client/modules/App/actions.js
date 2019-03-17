export const SET_USER = 'SET_USER';

export function setUser(username) {
  return {
    type: SET_USER,
    username,
  };
}

// TODO: remove
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}
