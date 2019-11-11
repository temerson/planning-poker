import React, { useState } from 'react';
import { Button, Input, Title } from '../../components';

const WhoDis = () => {
  const [username, setUsername] = useState();
  return (
    <>
      <Title>Who dis?</Title>
      <Input
        value={username}
        name="username"
        onChange={e => setUsername(e.target.value)}
      />
      <Button
        onClick={() => {}}
        hidden={!username}
      >
        I'm ${username}
      </Button>
    </>
  );
};

export default WhoDis;
