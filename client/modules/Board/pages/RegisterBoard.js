import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button, Error, Input, Title, Wrapper } from '../../../components';
import { getUserId } from '../../App/reducers';
import { addBoardRequest } from '../actions';

class RegisterBoard extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    userId: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleButtonClick = () => {
    const { dispatch, router, userId } = this.props;

    const usernameField = document.querySelector('#username');
    const username = usernameField && usernameField.value;
    const boardName = document.querySelector('#name').value;

    if (!username && !userId) {
      this.setState({ error: 'A username is required' });
      return;
    }

    if (!boardName) {
      this.setState({ error: 'A board name is required' });
      return;
    }

    dispatch(addBoardRequest(boardName, username, userId, res => {
      if (res.ok) {
        router.push(`boards/${res.slug}`);
      } else {
        this.setState({ error: res.message });
      }
    }));
  }

  render() {
    const { error } = this.state;
    const { userId } = this.props;

    return (
      <Wrapper>
        <Title>Let's make a board!</Title>

        {!userId && <Input required id="username" autoFocus placeholder="Username" />}
        <Input required id="name" placeholder="Board Name" />

        {error && <Error>{error}</Error>}

        <Button onClick={this.handleButtonClick}>I'm so ready</Button>
      </Wrapper>
    );
  }
}

export default connect(state => ({
  userId: getUserId(state),
}))(withRouter(RegisterBoard));
