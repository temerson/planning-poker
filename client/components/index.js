import styled from 'styled-components';
import { Link } from 'react-router';

export const Wrapper = styled.div`
  margin: auto;
  text-align: center;
`;

export const Title = styled.h2`
  font-weight: 600;
  font-size: 1.75rem;
`;

export const Error = styled.p`
  padding: .5rem;
  color: red;
`;

export const Input = styled.input`
  display: block;
  margin: 1rem auto;
  padding: .5rem;

  font-weight: 400;
  font-size: 1.2rem;
  color: #3c3c3c;

  border: none;
`;

export const TextArea = styled.textarea`

`;

export const Button = styled.button`
  padding: .5rem;
  margin: 1rem;

  font-size: 1rem;
  font-weight: 400;
`;

export const LinkButton = styled(Link)`
  display: block;
  background-color: #0085DA;
  margin: auto;
  max-width: 400px;

  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
  padding: 1.2rem;
  border-radius: 2px;

  font-family: helvetica, sans-serif;
  font-weight: 600;
  font-variant: small-caps;
  text-decoration: none;
  text-align: center;
  color: white;

  &:hover {
    background-color: #007CCD;
  }
`;
