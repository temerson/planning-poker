import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../../../components';

const Wrapper = styled.div`
  grid-area: actions;
  >* {
    margin: .5rem;
  }
`;

const BoardActions = ({ isOwner, onReveal, showVotes }) => (
  <Wrapper>
    {isOwner && <Button onClick={onReveal}>{showVotes ? 'Hide' : 'Reveal'} Votes</Button>}
    {isOwner && <Button>Delete Board</Button>}
  </Wrapper>
);

BoardActions.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  onReveal: PropTypes.func.isRequired,
  showVotes: PropTypes.bool.isRequired,
};

export default BoardActions;
