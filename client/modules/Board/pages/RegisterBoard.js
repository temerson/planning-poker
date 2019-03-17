import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button, Error, Input, Title, Wrapper } from '../../../components';
import { addBoardRequest } from '../actions';
import { setUser } from '../../App/actions';


class RegisterBoard extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleButtonClick() {
    const { dispatch, router } = this.props;

    const username = document.querySelector('#username').value;
    const boardName = document.querySelector('#name').value;

    if (!username) {
      this.setState({ error: 'A username is required' });
      return;
    }

    if (!boardName) {
      this.setState({ error: 'A board name is required' });
      return;
    }

    dispatch(addBoardRequest(boardName, username, router));
    dispatch(setUser(username));
  }

  render() {
    const { error } = this.state;

    return (
      <Wrapper>
        <Title>Let's make a board!</Title>

        <Input required id="username" autoFocus placeholder="Who are you?" />
        <Input required id="name" placeholder="What's my name?" />

        {error && <Error>{error}</Error>}

        <Button onClick={e => this.handleButtonClick(e)}>Okay</Button>
      </Wrapper>
    );
  }
}

export default connect()(withRouter(RegisterBoard));
