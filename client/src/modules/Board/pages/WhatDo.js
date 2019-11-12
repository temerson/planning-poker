import React from 'react';
import BoardList from './BoardList';
import { Divider, LinkButton, Title, Wrapper } from '../../../components';

const WhatDo = () => (
  <Wrapper>
    <LinkButton to="/new-board">Start a new board</LinkButton>

    <Divider>OR</Divider>

    <Title>Join An Existing Board</Title>
    <BoardList />
  </Wrapper>
);

export default WhatDo;
