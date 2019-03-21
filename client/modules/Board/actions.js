import callApi from '../../util/apiCaller';
import { setUser } from '../App/actions';

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

export function addBoardRequest(title, userId, router) {
  return () => {
    return callApi('boards', 'post', {
      board: {
        title,
        owner: userId,
      },
    }).then(res => {
      router.push(`boards/${res.slug}`);
    });
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
  return (dispatch) => {
    return callApi(`boards/${slug}/users`, 'post', { userId })
      .then(() => dispatch(getBoardRequest(slug)));
  };
}

export function registerUserRequest(username, boardSlug) {
  return (dispatch) => callApi('users', 'post', { username })
    .then((res) => addUserToBoardRequest(res.body._id, boardSlug)(dispatch)); // eew
}
