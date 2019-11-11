import styled, { css } from 'styled-components';
import { Link } from 'react-router';

export const Wrapper = styled.div`
  margin: auto;
  text-align: center;
`;

export const Title = styled.h2`
  font-weight: 600;
  font-size: 1.75rem;
  color: #3d3d3d;
`;

export const Error = styled.p`
  padding: .5rem;
  color: red;
`;

export const Input = styled.input`
  display: block;
  font-family: helvetica, sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  color: #3c3c3c;

  margin: 1rem auto;
  padding: .5rem;
  max-width: 400px;

  border: none;
  border-bottom: 1px solid #02488f;
`;

export const TextArea = styled.textarea`
  font-family: helvetica, sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  color: #3c3c3c;

  border: 1px solid #02488f;
  border-radius: 4px;
`;

export const Button = styled.button`
  background-color: #0085DA;
  border: none;

  margin: 1.2rem auto;
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

  ${props => props.hidden && css`display: none;`}
`;

export const LinkButton = styled(Link)`
  display: block;
  background-color: #0085DA;
  max-width: 400px;

  margin: 1.2rem auto;
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
