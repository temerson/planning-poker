import React from 'react';
import styled from 'styled-components';
import { Button } from '../../../components';

const Wrapper = styled.div`
  >* {
    margin: .5rem;
  }
`;

const BoardActions = () => (
  <Wrapper style={{ gridArea: 'actions' }}>
    <Button>Reveal</Button>
    <Button>Reset Votes</Button>
    <Button>Next Task</Button>
    <Button>Delete Board</Button>
  </Wrapper>
);

export default BoardActions;
