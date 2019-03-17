import React from 'react';
import { Title, Wrapper } from '../../../components';
import styled from 'styled-components';

const Choice = styled.a`
  display: block;
  background-color: #0085DA;
  margin: auto;
  max-width: 400px;

  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
  padding: 1.2rem;
  border-radius: 2px;

  font-family: helvetica, sans-serif;
  font-weight: 600;
  font-variant: small-caps;
  text-decoration: none;
  text-align: center;
  color: white;

  &:hover {
    background-color: #007CCD;
  }
`;

const WhatDo = () => (
  <Wrapper>
    <Title>What would you like to do?</Title>

    <Choice href="/new-board">Start a new board</Choice>
    <Choice href="/boards">Join an existing board</Choice>
  </Wrapper>
);

export default WhatDo;
