import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #0085da;
  box-shadow: 2px 2px 2px #3c3c3c;
  width: 4rem;
  height: 5rem;

  text-align: center;

  margin: 0.1rem;
  border-radius: 3px;

  &:hover {
    box-shadow: 4px 4px 4px #3c3c3c;
    position: relative;
    transform: translate(0, -5px);
    transition: ease 0.2s;
  }
`;
const HighCard = styled(Card)`
  background-color: #da4c00;
`;
const StringCard = styled(Card)`
  background-color: #dab900;
`;

const WhiteCardValue = styled.h1`
  color: white;
  transform: translate(0, 50%);
`;
const BlackCardValue = styled(WhiteCardValue)`
  color: black;
`;

class PokerCard extends React.Component {
  static propTypes = {
    high: PropTypes.bool.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  render() {
    const { high, value } = this.props;
    if (typeof value === 'string') {
      return <StringCard><BlackCardValue>{value}</BlackCardValue></StringCard>;
    } else if (high) {
      return <HighCard><WhiteCardValue>{value}</WhiteCardValue></HighCard>;
    } else {
      return <Card><WhiteCardValue>{value}</WhiteCardValue></Card>;
    }
  }
}

export default PokerCard;
