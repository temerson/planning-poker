import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBoardsRequest } from '../actions';

class Boards extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(getBoardsRequest());
  }

  render() {
    return this.props.children;
  }
}

export default connect()(Boards);
