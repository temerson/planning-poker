import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBoardRequest } from '../actions';
import { getBoard } from '../reducers';

class Board extends React.Component {
  static propTypes = {
    board: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(getBoardRequest(params.slug));
  }

  render() {
    return <div>my board</div>;
  }
}

export default connect((state, props) => ({
  boards: getBoard(state, props.params.slug),
}))(Board);
