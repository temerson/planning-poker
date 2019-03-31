import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BoardActions from './BoardActions';
import BoardCards from './BoardCards';
import BoardHistory from './BoardHistory';
import BoardMembers from './BoardMembers';
import BoardStatus from './BoardStatus';
import BoardTask from './BoardTask';
import RegisterUser from './RegisterUser';
import { addUserToBoardRequest, getActiveTaskRequest, removeUserFromBoardRequest } from '../actions';
import { getActiveTask, getBoard } from '../reducers';

const Wrapper = styled.div`
  padding: 0 2rem;
  display: grid;
  height: 100%;

  grid-template-areas: "actions actions actions actions"
    "members status task history"
    "cards cards cards cards";

  @media screen and (max-width: 850px) {
    grid-template-areas: "actions actions"
      "members status"
      "task history"
      "cards cards";
  }

  @media screen and (max-width: 650px) {
    grid-template-areas: "actions"
      "task"
      "cards";
    /* TODO: hide other components */
  }
`;

class Board extends React.Component {
  static propTypes = {
    activeTask: PropTypes.object,
    board: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    user: PropTypes.object,
  };

  componentDidMount() {
    const { board, dispatch } = this.props;
    if (board) {
      dispatch(getActiveTaskRequest(board.activeTask));
      dispatch(addUserToBoardRequest(board._id));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { board, dispatch } = this.props;
    if (!board && board !== nextProps.board) {
      dispatch(getActiveTaskRequest(nextProps.board.activeTask));
      dispatch(addUserToBoardRequest(nextProps.board._id));
    }
  }

  componentWillUnmount() {
    const { board, dispatch, user } = this.props;
    if (board && user) {
      dispatch(removeUserFromBoardRequest(board._id, user._id));
    }
  }

  render() {
    const { activeTask, board, user } = this.props;

    if (!board) return null;

    if (!user) {
      return (
        <RegisterUser />
      );
    }

    return (
      <Wrapper>
        <BoardActions style="grid-area: actions" />
        <BoardMembers style="grid-area: members" task={activeTask} members={board.users} />
        <BoardStatus style="grid-area: status" board={board} />
        <BoardTask style="grid-area: task" task={activeTask} />
        <BoardHistory style="grid-area: history" />
        <BoardCards style="grid-area: cards" task={activeTask} />
      </Wrapper>
    );
  }
}

export default connect((state, props) => ({
  activeTask: getActiveTask(state),
  board: getBoard(state, props.params.boardSlug),
  user: state.app.user,
}))(Board);
