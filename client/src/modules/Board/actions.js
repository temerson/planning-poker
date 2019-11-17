import callApi from '../../util/apiCaller';

export const ADD_BOARD = 'ADD_BOARD';
export const ADD_BOARDS = 'ADD_BOARDS';
export const SET_ACTIVE_TASK = 'SET_ACTIVE_TASK';
export const UPDATE_BOARD = 'UPDATE_BOARD';

export function addBoard(board) {
  return {
    type: ADD_BOARD,
    board,
  };
}

export function addBoards(boards) {
  return {
    type: ADD_BOARDS,
    boards,
  };
}

export function updateBoard(board) {
  return {
    type: UPDATE_BOARD,
    board,
  };
}

export function setActiveTask(task) {
  return {
    type: SET_ACTIVE_TASK,
    task,
  };
}

// Async actions -----------------------------------------------

export function addBoardRequest(title, username, callback) {
  return () => {
    const payload = { title, username };
    return callApi('boards/', 'post', payload).then(callback);
  };
}

export function getBoardsRequest() {
  return (dispatch) => {
    return callApi('boards/', 'get')
      .then(res => dispatch(addBoards(res)));
  };
}

export function addUserToBoardRequest(boardId) {
  return dispatch => callApi(`boards/${boardId}/users`, 'post')
    .then(board => dispatch(updateBoard(board)));
}

export function removeUserFromBoardRequest(boardId, userId) {
  return dispatch => callApi(`boards/${boardId}/users/${userId}`, 'delete')
    .then(board => dispatch(updateBoard(board)));
}

export function registerUserRequest(username, callback) {
  return () => callApi('users', 'post', { username }).then(callback);
}

export function taskChanged(taskId, title, description) {
  return () => callApi(`tasks/${taskId}`, 'put', { title, description });
}

export function getActiveTaskRequest(taskId) {
  return dispatch => callApi(`tasks/${taskId}`, 'get')
    .then(res => dispatch(setActiveTask(res)));
}

export function castVote(taskId, value) {
  return dispatch => callApi(`tasks/${taskId}/vote`, 'post', { value })
    .then(res => dispatch(setActiveTask(res)));
}

export function removeVote(taskId, voteId) {
  return dispatch => callApi(`tasks/${taskId}/vote/${voteId}`, 'delete')
    .then(res => dispatch(setActiveTask(res)));
}
