import callApi from '../../util/apiCaller';

export const ADD_BOARD = 'ADD_BOARD';

export function addBoard(board) {
  return {
    type: ADD_BOARD,
    board,
  };
}

export function addBoardRequest(title, username, router) {
  return () => {
    return callApi('boards', 'post', {
      board: {
        title,
        owner: { username },
      },
    }).then(res => res.board && router.push(`/boards/${res.board.slug}`));
  };
}

export function getBoardRequest(slug) {
  return (dispatch) => {
    return callApi(`boards/${slug}`, 'get')
      .then(res => dispatch(addBoard(res)));
  };
}
