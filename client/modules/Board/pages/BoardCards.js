import React from 'react';
import PokerCard from './PokerCard';
import styled from 'styled-components';

const cardValues = [0, '½', 1, 2, 3, 5, 8, 13, 20, 40, 100, '?'];
const high = 13;

const Wrapper = styled.div`
  grid-area: cards;
  position: relative;
  padding-top: 1rem;
  height: 10rem;
  margin: 0 auto;
`;

class BoardCards extends React.Component {

  handleCardClick(value) {
    console.log(value);
  }

  render() {
    return (
      <Wrapper>
        {cardValues.map((value, index) => (
          <PokerCard
            key={index}
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

export default BoardCards;
