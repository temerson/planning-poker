import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Input, TextArea } from '../../../components';
import { taskChanged } from '../actions';

class BoardTasks extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }

  handleChange = (e, field) => {
    const { dispatch, params } = this.props;
    this.setState(
      { [field]: e.target.value },
      state => dispatch(taskChanged(params.boardSlug, state.title, state.description)),
    );
  }

  render() {
    return (
      <div>
        <Input
          type="text"
          placeholder="Task Title"
          value={this.state.title}
          onKeyUp={e => this.handleChange(e, 'title')}
        />
        <TextArea
          placeholder="Description"
          rows="5"
          cols="50"
          value={this.state.description}
          onKeyUp={e => this.handleChange(e, 'description')}
        />
      </div>
    );
  }
}

export default connect()(withRouter(BoardTasks));
