import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BoardActions from './BoardActions';
import BoardCards from './BoardCards';
import BoardMembers from './BoardMembers';
import BoardTask from './BoardTask';
import RegisterUser from './RegisterUser';
import {
  addUserToBoardRequest,
  getActiveTaskRequest,
  getBoardsRequest,
  setActiveTask,
  removeUserFromBoardRequest,
} from '../actions';
import { getActiveTask, getBoard } from '../reducers';

const Wrapper = styled.div`
  padding: 0 2rem;
  display: grid;
  height: 100%;

  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto 1fr;
  grid-template-areas: "actions actions"
    "members task"
    "cards cards";

  @media screen and (max-width: 650px) {
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto;
    grid-template-areas: "actions"
      "task"
      "cards"
      "members";
  }
`;

class Board extends React.Component {
  static propTypes = {
    activeTask: PropTypes.object,
    board: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    userId: PropTypes.string,
  };

  state = {
    showVotes: false,
  };

  componentDidMount() {
    const { board, dispatch, userId } = this.props;
    if (board && userId) {
      dispatch(addUserToBoardRequest(board._id));
      this.fetchTask(board.activeTask);
      this.setTimers(board);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { board, dispatch } = this.props;
    if (!board && nextProps.board) {
      dispatch(addUserToBoardRequest(nextProps.board._id));
      this.fetchTask(nextProps.board.activeTask);
      this.setTimers(nextProps.board);
    }
  }

  componentWillUnmount() {
    const { board, dispatch, userId } = this.props;
    if (board && userId) {
      dispatch(removeUserFromBoardRequest(board._id, userId));
    }

    dispatch(setActiveTask({}));
    clearInterval(this.state.boardTimer);
    clearInterval(this.state.taskTimer);
  }

  setTimers = (board) => {
    this.setState({
      taskTimer: setInterval(() => this.fetchTask(board.activeTask), 1000),
      boardTimer: setInterval(() => this.fetchBoard(board), 5000),
    });
  }

  fetchBoard = () => {
    // TODO: currently this is how we get updated member lists, but it's super inefficient
    this.props.dispatch(getBoardsRequest());
  }

  fetchTask = (task) => {
    this.props.dispatch(getActiveTaskRequest(task));
  }

  toggleShowVotes = () => this.setState({ showVotes: !this.state.showVotes });

  render() {
    const { activeTask, board, userId } = this.props;
    const { showVotes } = this.state;

    if (!board) return null;

    if (!userId) {
      return (
        <RegisterUser />
      );
    }

    const isOwner = userId === board.owner;
    return (
      <Wrapper>
        <BoardActions
          style={{ gridArea: 'actions' }}
          isOwner={isOwner}
          onReveal={this.toggleShowVotes}
          showVotes={showVotes}
        />
        <BoardMembers
          style={{ gridArea: 'members' }}
          task={activeTask}
          members={board.users}
          showVotes={showVotes}
        />
        <BoardTask
          style={{ gridArea: 'task' }}
          task={activeTask}
          isOwner={isOwner}
        />
        <BoardCards
          style={{ gridArea: 'cards' }}
          task={activeTask}
        />
      </Wrapper>
    );
  }
}

export default connect((state, props) => ({
  activeTask: getActiveTask(state),
  board: getBoard(state, props.params.boardSlug),
  userId: state.app.user._id,
}))(Board);
