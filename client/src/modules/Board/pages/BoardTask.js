import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, TextArea } from '../../../components';
import useWebsocket from '../../../contexts/useWebsocket';
import useDebounce from '../../../hooks/useDebounce';

const Wrapper = styled.div`
  grid-area: task;

  > input,
  > textarea {
    margin-left: 0;
    margin-right: 0;
    max-width: 100%;
    width: 100%;
  }
  > textarea {
    height: 75%;
  }
`;

const Content = styled.div`
  white-space: pre-wrap;
`;

const BoardTasks = ({ isOwner, task }) => {
  const websocket = useWebsocket();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const debouncedTitle = useDebounce(title, 200);
  const debouncedDescription = useDebounce(description, 200);

  useEffect(() => setTitle(task.title || ''), [task]);
  useEffect(() => setDescription(task.description || ''), [task]);

  useEffect(() => {
    if (isOwner) {
      websocket.send('update_task', {
        title: debouncedTitle,
        description: debouncedDescription,
      });
    }
  }, [isOwner, websocket, debouncedTitle, debouncedDescription])

  return (
    <Wrapper>
      {isOwner ? (
        <>
          <Input
            placeholder="Task Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={!isOwner}
          />
          <TextArea
            placeholder="Description"
            rows="5"
            cols="50"
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={!isOwner}
          />
        </>
      ) : (
        <>
          <h2>Task: {title}</h2>
          <h4>Description:</h4>
          <Content>{description}</Content>
        </>
      )}
    </Wrapper>
  );
}

BoardTasks.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  task: PropTypes.object.isRequired,
};

export default BoardTasks;
