import { ADD_BOARD } from './actions';

const boardReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_BOARD:
      return [...state, action.board];
    default:
      return state;
  }
};

export const getBoard = (state, slug) => state.boards.find(board => board.slug === slug);

export default boardReducer;
