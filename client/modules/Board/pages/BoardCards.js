import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PokerCard from './PokerCard';
import styled from 'styled-components';
import { castVote, removeVote } from '../actions';
import { getUserVote } from '../reducers';

const cardValues = ['0', '½', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?'];
const high = 13;

const Wrapper = styled.div`
  grid-area: cards;
  position: relative;
  padding-top: 1rem;
  height: 10rem;
  margin: 0 auto;
`;

class BoardCards extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
    userVote: PropTypes.object,
  }

  handleCardClick = (value) => {
    const { dispatch, task, userVote } = this.props;
    if (userVote && userVote.value === value) {
      dispatch(removeVote(task._id, userVote._id));
    } else {
      dispatch(castVote(task._id, value));
    }
  }

  render() {
    const { userVote } = this.props;

    return (
      <Wrapper>
        {cardValues.map((value, index) => (
          <PokerCard
            key={index}
            active={!!(userVote && userVote.value === value)}
            numCards={cardValues.length}
            index={index}
            onClick={this.handleCardClick}
            value={value}
            high={value >= high}
          />
        ))}
      </Wrapper>
    );
  }
}

export default withRouter(connect(state => ({
  userVote: getUserVote(state),
}))(BoardCards));
