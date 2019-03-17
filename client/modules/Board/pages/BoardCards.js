import React from 'react';
import PokerCard from './PokerCard';
import styled from 'styled-components';

const cardValues = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, '?'];
const high = 13;

const Wrapper = styled.div`
  grid-area: cards;
  display: flex;
  flex-direction: row;
`;

class BoardCards extends React.Component {
  render() {
    return (
      <Wrapper>
        {cardValues.map((value, index) => <PokerCard key={index} value={value} high={value >= high} />)}
      </Wrapper>
    );
  }
}

export default BoardCards;
