import {
  ADD_BOARD,
  ADD_BOARDS,
  SET_ACTIVE_TASK,
  UPDATE_BOARD,
} from './actions';

export const boardsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_BOARD:
      return [...state, action.board];
    case ADD_BOARDS:
      return action.boards || [];
    case UPDATE_BOARD:
      return state.map(board => (board.id === action.board.id
        ? action.board
        : board));
    default:
      return state;
  }
};

export const taskReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ACTIVE_TASK:
      return action.task;
    default:
      return state;
  }
};

export const getBoard = (state, slug) => state.boards.find(board => board.slug === slug);
export const getBoards = state => state.boards;
export const getActiveTask = state => state.task;
export const getUserVote = state => {
  const userId = state.app.user._id;
  const votes = getActiveTask(state).votes;
  const userVote = votes && votes.find(vote => vote.user._id === userId);
  return userVote;
};
