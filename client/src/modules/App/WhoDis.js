import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { getUsername, saveUsername } from '../../util/userState';
import { Button, Input, Title, Wrapper } from '../../components';

const WhoDis = ({ router }) => {
  const [username, setUsername] = useState(getUsername() || '');

  const register = () => {
    saveUsername(username);
    router.push('/boards');
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
      />
      <Button
        onClick={register}
        hidden={!username}
      >
        Let's Go!
      </Button>
    </Wrapper>
  );
};

export default withRouter(WhoDis);
