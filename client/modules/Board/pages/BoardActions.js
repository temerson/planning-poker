import React from 'react';
import { Button } from '../../../components';

const BoardActions = () => (
  <div style={{ gridArea: 'actions' }}>
    <Button>Reveal</Button>
    <Button>Reset Votes</Button>
    <Button>Next Task</Button>
  </div>
);

export default BoardActions;
