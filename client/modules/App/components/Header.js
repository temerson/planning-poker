import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router';
import { getUsername } from '../reducers';
import backgroundImage from '../header-bk.png';

const Wrapper = styled.div`
  background: #eee url(${backgroundImage}) center;
  background-size: cover;
  border-bottom: 1px solid #ccc;
`;

const Content = styled.div`
  width: 100%;
  max-width: 980px;
  margin: auto;
  padding: 16px;
  overflow: auto;
`;
const Title = styled.h1`
  font-weight: 300;
  font-size: 42px;
  float: left;

  > a {
    text-decoration: none;
    color: #FFF;
  }
`;

const Welcome = styled.div``;

const Header = ({ username }) => (
  <Wrapper>
    <Content>
      <Title>
        <Link to="/"><span id="siteTitle">Planning Poker</span></Link>
      </Title>

      {username && <Welcome>Hi there {username}</Welcome>}
    </Content>
  </Wrapper>
);


Header.contextTypes = {
  router: PropTypes.object,
};

Header.propTypes = {
  username: PropTypes.string,
};

export default connect((state) => ({
  username: getUsername(state),
}))(Header);
