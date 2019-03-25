import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LinkButton, Title, Wrapper } from '../../../components';
import { getBoardsRequest } from '../actions';
import { getBoards } from '../reducers';

class BoardList extends React.Component {
  static propTypes = {
    boards: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getBoardsRequest());
  }

  render() {
    const { boards } = this.props;
    const hasBoards = boards.length > 0;
    const title = hasBoards ? 'Pick a Board' : 'No public boards available';

    return (
      <Wrapper>
        <Title>{title}</Title>
        {hasBoards && boards.map((board, index) => (
          <LinkButton key={index} to={`/boards/${board.slug}`}>{board.title}</LinkButton>
        ))}
        {!hasBoards && <LinkButton to="/new-board">Start a new board</LinkButton>}
      </Wrapper>
    );
  }
}

export default connect(state => ({
  boards: getBoards(state),
}))(BoardList);
