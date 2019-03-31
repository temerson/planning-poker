import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button, Error, Input, Title, Wrapper } from '../../../components';
import { setCookies } from '../../App/actions';
import { addUserToBoardRequest, registerUserRequest } from '../actions';

class RegisterUser extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleButtonClick() {
    const { dispatch, params } = this.props;

    const username = document.querySelector('#username').value;

    if (!username) {
      this.setState({ error: 'A username is required' });
      return;
    }

    dispatch(registerUserRequest(username, (res) => {
      dispatch(setCookies(document.cookie));
      dispatch(addUserToBoardRequest(res._id, params.boardSlug));
    }));
  }

  render() {
    const { error } = this.state;

    return (
      <Wrapper>
        <Title>Hi there!</Title>

        <Input required id="username" autoFocus placeholder="What's your name?" />

        {error && <Error>{error}</Error>}

        <Button onClick={e => this.handleButtonClick(e)}>Enter</Button>
      </Wrapper>
    );
  }
}

export default connect()(withRouter(RegisterUser));
