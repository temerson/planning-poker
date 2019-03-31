import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { Input, TextArea } from '../../../components';
import { taskChanged } from '../actions';

class BoardTasks extends React.Component {
  static propTypes = {
    task: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { ...props.task };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.task !== this.props.task) {
      this.setState({ ...nextProps.task });
    }
  }

  handleChange = (e, field) => {
    this.setState(
      { [field]: e.target.value },
      this.handleSubmit, // TODO: debounce may not be working...
    );
  }

  handleSubmit = debounce(() => {
    const { task, dispatch } = this.props;
    dispatch(taskChanged(task._id, this.state.title, this.state.description));
  }, 500);

  render() {
    return (
      <div>
        <Input
          type="text"
          placeholder="Task Title"
          value={this.state.title || ''}
          onChange={e => this.handleChange(e, 'title')}
        />
        <TextArea
          placeholder="Description"
          rows="5"
          cols="50"
          value={this.state.description || ''}
          onChange={e => this.handleChange(e, 'description')}
        />
      </div>
    );
  }
}

export default connect()(BoardTasks);
