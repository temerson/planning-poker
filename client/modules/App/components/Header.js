import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router';
import { Cookies, withCookies } from 'react-cookie';
import { getUsername } from '../reducers';
import backgroundImage from '../header-bk.png';
import { getUserRequest } from '../actions';

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
  font-weight: 500;
  font-size: 42px;
  float: left;

  > a {
    text-decoration: none;
    color: #FFF;
  }
`;

const Welcome = styled.div``;

class Header extends React.Component {
  static propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired,
    dispatch: PropTypes.func.isRequired,
    username: PropTypes.string,
  };

  componentDidMount() {
    const { cookies, dispatch, username } = this.props;
    const userId = cookies.get('userId');

    if (userId && !username) {
      dispatch(getUserRequest(userId));
    }
  }

  render() {
    const { username } = this.props;
    return (
      <Wrapper>
        <Content>
          <Title>
            <Link to="/"><span id="siteTitle">Planning Poker</span></Link>
          </Title>

          {username && <Welcome>Hi there {username}</Welcome>}
        </Content>
      </Wrapper>
    );
  }
}

export default connect((state) => ({
  username: getUsername(state),
}))(withCookies(Header));
