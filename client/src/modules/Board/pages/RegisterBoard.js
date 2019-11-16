import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Button, Error, Input, Title, Wrapper } from '../../../components';
import { addBoard, addBoardRequest } from '../actions';

class RegisterBoard extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  _submitForm = () => {
    const { dispatch, router } = this.props;

    const boardName = document.querySelector('#name').value;

    if (!boardName) {
      this.setState({ error: 'A board name is required' });
      return;
    }

    dispatch(addBoardRequest(boardName, res => {
      dispatch(addBoard(res));
      // todo: only push on success
      router.push(`/boards/${res.slug}`);
    }));
  }

  _handleButtonClick = this._submitForm;
  _handleKeyPress = event => {
    if (event.key === 'Enter') {
      this._submitForm();
    }
  }


  render() {
    const { error } = this.state;

    return (
      <Wrapper>
        <Title>Let's make a board!</Title>

        <Input
          required
          id="name"
          placeholder="Board Name"
          autoComplete="off"
          onKeyPress={this._handleKeyPress}
        />

        {error && <Error>{error}</Error>}

        <Button onClick={this._handleButtonClick}>I'm so ready</Button>
      </Wrapper>
    );
  }
}

export default connect()(withRouter(RegisterBoard));
