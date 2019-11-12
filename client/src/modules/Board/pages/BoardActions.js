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

const BoardActions = ({ isOwner, onReset, onReveal, showVotes }) => (
  <Wrapper>
    {isOwner && <Button onClick={onReveal}>{showVotes ? 'Hide' : 'Reveal'} Votes</Button>}
    {isOwner && <Button onClick={onReset}>Reset</Button>}
  </Wrapper>
);

BoardActions.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  onReset: PropTypes.func.isRequired,
  onReveal: PropTypes.func.isRequired,
  showVotes: PropTypes.bool.isRequired,
};

export default BoardActions;
