import React from 'react';
import styled from 'styled-components';

// Import Images
import bg from '../header-bk.png';

const Wrapper = styled.div`
  text-align: center;
  padding: 16px 0;
  background: #FFF url(${bg});
  background-size: cover;

  > p {
    margin: 0 0 8px 0;
    font-size: 14px;
    color: #FFF;
  }

  > a {
    color: #FFF;
    text-decoration: none;
    font-weight: 700;
  }
`;

export function Footer() {
  return (
    <Wrapper>
      <p>&copy; {new Date().getFullYear()} &middot; Tristan Emerson</p>
    </Wrapper>
  );
}

export default Footer;
