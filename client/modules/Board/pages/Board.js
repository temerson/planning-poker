import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { Cookies, withCookies } from 'react-cookie';
import BoardActions from './BoardActions';
import BoardCards from './BoardCards';
import BoardHistory from './BoardHistory';
import BoardMembers from './BoardMembers';
import BoardStatus from './BoardStatus';
import BoardTask from './BoardTask';
import RegisterUser from './RegisterUser';
import { getBoardsRequest } from '../actions';
import { getBoard } from '../reducers';
import { getUsername } from '../../App/reducers';

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
    board: PropTypes.object,
    cookies: PropTypes.instanceOf(Cookies).isRequired,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getBoardsRequest());
  }

  render() {
    const { board, cookies } = this.props;
    const user = cookies.get('user');
    if (!board) return null;

    if (!user) {
      return (
        <RegisterUser />
      );
    }

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
  board: getBoard(state, props.params.boardSlug),
  username: getUsername(state),
}))(withCookies(Board));
