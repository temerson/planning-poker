import React, { useState } from 'react';
import { withRouter } from 'react-router';
import useUser from '../../contexts/useUser';
import { LinkButton, Input, Title, Wrapper } from '../../components';

const WhoDis = ({ router }) => {
  const user = useUser();
  const [username, setUsername] = useState(user.getUsername() || '');

  const register = () => {
    if (username && username.length) {
      user.setUsername(username);
      router.push('/boards');
    }
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      register();
    }
  }

  return (
    <Wrapper>
      <Title>Who dis?</Title>
      <Input
        required
        autoFocus
        placeholder="Hi, I'm..."
        value={username}
        onChange={e => setUsername(e.target.value)}
        onKeyPress={handleKeyPress}
        autoComplete="off"
      />
      <LinkButton
        onClick={register}
        hidden={!username}
      >
        Let's Go!
      </LinkButton>
    </Wrapper>
  );
};

export default withRouter(WhoDis);
