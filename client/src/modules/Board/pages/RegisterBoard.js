import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import { Button, Error, Input, Title, Wrapper } from '../../../components';
import useUser from '../../../contexts/useUser';
import { addBoard, addBoardRequest } from '../actions';

const RegisterBoard = ({ router }) => {
  const user = useUser();
  const [error, setError] = useState(null);
  const [boardName, setBoardName] = useState('');
  const dispatch = useDispatch();

  const createBoard = () => {
    if (!boardName) {
      setError({ error: 'A board name is required' });
      return;
    }

    dispatch(addBoardRequest(boardName, user.getUsername(), res => {
      dispatch(addBoard(res));
      // todo: only push on success
      router.push(`/boards/${res.slug}`);
    }));
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      createBoard();
    }
  }

  return (
    <Wrapper>
      <Title>Let's make a board!</Title>

      <Input
        required
        autoFocus
        placeholder="Board Name"
        value={boardName}
        onChange={e => setBoardName(e.target.value)}
        onKeyPress={handleKeyPress}
        autoComplete="off"
      />

      {error && <Error>{error}</Error>}

      <Button onClick={createBoard}>I'm so ready</Button>
    </Wrapper>
  );
}

export default withRouter(RegisterBoard);
