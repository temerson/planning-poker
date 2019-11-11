import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router';
import { getCookies, getUsername } from '../reducers';
import backgroundImage from '../header-bk.png';
import { getUserRequest } from '../actions';

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

  > a {
    text-decoration: none;
    color: #FFF;
  }
`;

const Welcome = styled.div`
  font-weight: 500;
  font-size: 22px;
  color: #FFF;
`;

class Header extends React.Component {
  static propTypes = {
    cookies: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    username: PropTypes.string,
  };

  componentDidMount() {
    const { cookies, dispatch, username } = this.props;
    const userId = cookies.userId;

    if (userId && !username) {
      dispatch(getUserRequest(userId));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { cookies, dispatch, username } = nextProps;
    const { userId } = cookies;

    if (userId && !username) {
      dispatch(getUserRequest(userId));
    }
  }

  render() {
    const { username } = this.props;
    return (
      <Wrapper>
        <Title>
          <Link to="/"><span id="siteTitle">Planning Poker</span></Link>
        </Title>

        {username && <Welcome>Welcome {username}!</Welcome>}
      </Wrapper>
    );
  }
}

export default connect((state) => ({
  username: getUsername(state),
  cookies: getCookies(state),
}))(Header);
