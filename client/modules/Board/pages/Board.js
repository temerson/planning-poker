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
import { getBoardRequest } from '../actions';
import { getBoard } from '../reducers';

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "actions actions actions actions"
    "members status task history"
    "cards cards cards cards";
  height: 100%;
`;

class Board extends React.Component {
  static propTypes = {
    board: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(getBoardRequest(params.slug));
  }

  render() {
    const { board } = this.props;
    if (!board) return null;

    return (
      <Wrapper>
        <BoardActions style="grid-area: actions" />
        <BoardMembers style="grid-area: members" members={board.users} />
        <BoardStatus style="grid-area: status" />
        <BoardTask style="grid-area: task" />
        <BoardHistory style="grid-area: history" />
        <BoardCards style="grid-area: cards" />
      </Wrapper>
    );
  }
}

export default connect((state, props) => ({
  board: getBoard(state, props.params.slug),
}))(Board);
