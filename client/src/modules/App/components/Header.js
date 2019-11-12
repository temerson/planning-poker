import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import backgroundImage from '../header-bk.png';

const Wrapper = styled.div`
  background: #eee url(${backgroundImage}) center;
  background-size: cover;
  border-bottom: 1px solid #ccc;

  width: 100%;
  margin: auto;
  padding: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 42px;
  width: 100%;

  .logout {
    float: right;
  }

  > a {
    text-decoration: none;
    color: #FFF;
  }
`;

const Header = () => (
  <Wrapper>
    <Title>
      <Link to="/">Planning Poker</Link>
      <Link to="/who-dis" className="logout">
        <i className="material-icons">exit_to_app</i>
      </Link>
    </Title>
  </Wrapper>
);

export default Header;
