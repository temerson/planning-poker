import React from 'react';
import PropTypes from 'prop-types';
import useWebsocket from '../../../contexts/useWebsocket';
import PokerCard from './PokerCard';
import styled from 'styled-components';

const cardValues = ['0', '½', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?'];
const high = 13;

const Wrapper = styled.div`
  grid-area: cards;
  position: relative;
  padding-top: 1rem;
  height: 10rem;
  margin: 0 auto;

  @media only screen and (max-width: 550px) {
    margin: 0 12rem;
  }

  @media only screen and (max-width: 400px) {
    margin: 0 9rem;
  }
`;

const BoardCards = ({ vote }) => {
  const websocket = useWebsocket();

  const handleCardClick = (value) => {
    const newVote = value === vote ? null : value;
    websocket.send('set_vote', { vote: newVote });
  }

  return (
    <Wrapper>
      {cardValues.map((value, index) => (
        <PokerCard
          key={index}
          active={!!(vote && vote === value)}
          numCards={cardValues.length}
          index={index}
          onClick={handleCardClick}
          value={value}
          high={value >= high}
        />
      ))}
    </Wrapper>
  );
}

BoardCards.propTypes = {
  vote: PropTypes.string,
}

export default BoardCards;
