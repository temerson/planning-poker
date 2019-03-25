import callApi from '../../util/apiCaller';

export const ADD_BOARD = 'ADD_BOARD';
export const ADD_BOARDS = 'ADD_BOARDS';

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

export function addBoardRequest(title, username, userId, callback) {
  return () => {
    return callApi('boards', 'post', {
      board: {
        title,
        owner: userId,
      },
      username,
    }).then(callback);
  };
}

export function getBoardsRequest() {
  return (dispatch) => {
    return callApi('boards', 'get')
      .then(res => dispatch(addBoards(res.boards)));
  };
}

export function getBoardRequest(slug) {
  return (dispatch) => {
    return callApi(`boards/${slug}`, 'get')
      .then(res => dispatch(addBoard(res)));
  };
}

export function addUserToBoardRequest(userId, slug) {
  return () => callApi(`boards/${slug}/users`, 'post', { userId });
}

export function registerUserRequest(username, callback) {
  return () => callApi('users', 'post', { username }).then(callback);
}

export function taskChanged(boardSlug, title, description) {
  return () => callApi(`boards/${boardSlug}/tasks`, 'put', { title, description });
}
