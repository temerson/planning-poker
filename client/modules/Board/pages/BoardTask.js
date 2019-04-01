import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import { Input, TextArea } from '../../../components';
import { taskChanged } from '../actions';

const Wrapper = styled.div`
  grid-area: task;

  > input,
  > textarea {
    margin-left: 0;
    margin-right: 0;
    max-width: 100%;
    width: 100%;
  }
  > textarea {
    height: 75%;
  }
`;

const Content = styled.div`
  white-space: pre-wrap;
`;

class BoardTasks extends React.Component {
  static propTypes = {
    isOwner: PropTypes.bool.isRequired,
    task: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      ...props.task,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.task !== this.props.task && !this.state.editing) {
      this.setState({ ...nextProps.task });
    }
  }

  handleChange = (e, field) => {
    this.setState(
      { [field]: e.target.value, editing: true },
      this.handleSubmit,
    );
  }

  handleSubmit = debounce(() => {
    const { task, dispatch } = this.props;
    dispatch(taskChanged(task._id, this.state.title, this.state.description));
  }, 200);

  render() {
    const { isOwner } = this.props;
    return (
      <Wrapper>
        {isOwner ? (
          <React.Fragment>
            <Input
              type="text"
              placeholder="Task Title"
              value={this.state.title || ''}
              onChange={e => this.handleChange(e, 'title')}
              disabled={!isOwner}
            />
            <TextArea
              placeholder="Description"
              rows="5"
              cols="50"
              value={this.state.description || ''}
              onChange={e => this.handleChange(e, 'description')}
              disabled={!isOwner}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h2>Task: {this.state.title || ''}</h2>
            <h4>Description:</h4>
            <Content>{this.state.description || ''}</Content>
          </React.Fragment>
        )}
      </Wrapper>
    );
  }
}

export default connect()(BoardTasks);
