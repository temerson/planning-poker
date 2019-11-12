import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Divider, LinkButton, Title, Wrapper } from '../../../components';
import { getBoards } from '../reducers';

const BoardList = ({ boards }) => {
  const hasBoards = boards.length > 0;
  const title = hasBoards ? 'Pick a Board' : 'No public boards available';

  return (
    <Wrapper>
      <Title>{title}</Title>
      {hasBoards && (
        <>
          {boards.map((board, index) => (
            <LinkButton key={index} to={`/boards/${board.slug}`}>{board.title}</LinkButton>
          ))}
          <Divider>OR</Divider>
        </>
      )}
      <LinkButton to="/boards/new-board">Start a new board</LinkButton>
    </Wrapper>

  );
};

BoardList.propTypes = {
  boards: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({
  boards: getBoards(state),
}))(BoardList);
