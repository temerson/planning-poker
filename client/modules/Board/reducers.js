import { ADD_BOARD, ADD_BOARDS } from './actions';

const boardReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_BOARD:
      return [...state, action.board];
    case ADD_BOARDS:
      return action.boards || [];
    default:
      return state;
  }
};

export const getBoard = (state, slug) => state.boards.find(board => board.slug === slug);
export const getBoards = state => state.boards;

export default boardReducer;
