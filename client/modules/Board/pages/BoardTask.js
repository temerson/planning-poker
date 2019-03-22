import React from 'react';
import { Input, TextArea } from '../../../components';

const BoardTasks = () => (
  <div>
    <Input type="text" placeholder="Task Title" />
    <TextArea placeholder="Description" rows="5" cols="50" />
  </div>
);

export default BoardTasks;
