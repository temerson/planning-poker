import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Error, Title, Wrapper } from '../../../components';
import { addBoardRequest } from '../actions';

const Input = styled.input`
  display: block;
  margin: 1rem auto;
  padding: .5rem;

  font-weight: 400;
  font-size: 1.2rem;
  color: #3c3c3c;

  border: none;
`;

const Button = styled.button`
  padding: .5rem;
  margin: 1rem;

  font-size: 1rem;
  font-weight: 400;
`;

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
