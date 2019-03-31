import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #0085da;
  border: 2px solid #02488f;
  box-shadow: 2px 2px 2px #3c3c3c;
  width: 6rem;
  height: 8rem;

  margin: 0.1rem;
  border-radius: 3px;
  cursor: pointer;
  transform: rotate(${props => props.rotate}deg);
  position: absolute;
  left: calc(${props => props.offset} * 4rem);

  @media only screen and (max-width: 850px) {
    left: calc(${props => props.offset} * 3rem);
  }

  @media only screen and (max-width: 650px) {
    left: calc(${props => props.offset} * 2rem);
  }

  &.active,
  &:hover {
    box-shadow: 4px 4px 4px #3c3c3c;
    transform: translate(0, -1rem);
    transition: ease 0.2s;
  }
`;
const HighCard = styled(Card)`
  background-color: #da4c00;
  border: 2px solid #8f3802;
`;
const UnknownCard = styled(Card)`
  background-color: #dab900;
  border: 2px solid #8f7f02;
`;

const WhiteCardValue = styled.h1`
  @media only screen and (max-width: 850px) {
    font-size: 1.4rem;
  }

  @media only screen and (max-width: 650px) {
    font-size: 1.2rem;
  }

  padding-left: 0.2rem;
  color: white;
`;
const BlackCardValue = styled(WhiteCardValue)`
  color: black;
`;

const PokerCard = ({ active, high, index, numCards, onClick, value }) => {
  const half = numCards / 2;
  const step = 1.5;
  const rotate = (half * -1) + (index * step) - step;
  const offset = (half * -1) + index - step / 2;

  if (value === '?') {
    return (
      <UnknownCard className={active && 'active'} offset={offset} rotate={rotate} onClick={() => onClick(value)}>
        <BlackCardValue>{value}</BlackCardValue>
      </UnknownCard>
    );
  } else if (high) {
    return (
      <HighCard className={active && 'active'} offset={offset} rotate={rotate} onClick={() => onClick(value)}>
        <WhiteCardValue>{value}</WhiteCardValue>
      </HighCard>
    );
  }

  return ( // TODO: linter doesn't allow else-if after return...that's annoying
    <Card className={active && 'active'} offset={offset} rotate={rotate} onClick={() => onClick(value)}>
      <WhiteCardValue>{value}</WhiteCardValue>
    </Card>
  );
};

PokerCard.propTypes = {
  active: PropTypes.bool.isRequired,
  high: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  numCards: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default PokerCard;
