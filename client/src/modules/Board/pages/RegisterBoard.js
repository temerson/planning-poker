import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button, Error, Input, Title, Wrapper } from '../../../components';
import { addBoardRequest } from '../actions';

class RegisterBoard extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleButtonClick = () => {
    const { dispatch, router } = this.props;

    const usernameField = document.querySelector('#username');
    const username = usernameField && usernameField.value;
    const boardName = document.querySelector('#name').value;

    if (!boardName) {
      this.setState({ error: 'A board name is required' });
      return;
    }

    dispatch(addBoardRequest(boardName, username, res => {
      router.push(`boards/${res.slug}`);
    }));
  }

  render() {
    const { error } = this.state;

    return (
      <Wrapper>
        <Title>Let's make a board!</Title>

        <Input required id="name" placeholder="Board Name" />

        {error && <Error>{error}</Error>}

        <Button onClick={this.handleButtonClick}>I'm so ready</Button>
      </Wrapper>
    );
  }
}

export default connect()(withRouter(RegisterBoard));
