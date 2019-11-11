import React from 'react';
import { LinkButton, Title, Wrapper } from '../../components';

const WhatDo = () => (
  <Wrapper>
    <Title>What would you like to do?</Title>

    <LinkButton to="/new-board">Start a new board</LinkButton>
    <LinkButton to="/boards">Join an existing board</LinkButton>
  </Wrapper>
);

export default WhatDo;
