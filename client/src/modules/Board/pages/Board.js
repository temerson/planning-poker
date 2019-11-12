import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useWebsocket from '../../../contexts/useWebsocket';
import useUser from '../../../contexts/useUser';
import BoardActions from './BoardActions';
import BoardCards from './BoardCards';
import BoardMembers from './BoardMembers';
import BoardTask from './BoardTask';

const Wrapper = styled.div`
  padding: 0 2rem;
  display: grid;
  height: 100%;

  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto 1fr;
  grid-template-areas: "actions actions"
    "members task"
    "cards cards";

  @media screen and (max-width: 650px) {
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto;
    grid-template-areas: "actions"
      "task"
      "cards"
      "members";
  }
`;

const Board = () => {
  const websocket = useWebsocket();
  const user = useUser();
  const [ board, setBoard ] = useState();
  const [ showNotes, setShowVotes ] = useState(board && board.showVotes);

  const resetBoard = () => {};
  // toggleShowVotes = () => this.setState({ showVotes: !this.state.showVotes });

  if (!board) return null;

  const isOwner = user.getUsername() === board.owner;
  return (
    <Wrapper>
      <BoardActions
        style={{ gridArea: 'actions' }}
        isOwner={isOwner}
        onReveal={setShowVotes}
        onReset={resetBoard}
        showVotes={showNotes}
      />
      <BoardMembers
        style={{ gridArea: 'members' }}
        task={board.task}
        members={board.users}
        showVotes={showNotes}
      />
      <BoardTask
        style={{ gridArea: 'task' }}
        task={board.task}
        isOwner={isOwner}
      />
      <BoardCards
        style={{ gridArea: 'cards' }}
        task={board.task}
      />
    </Wrapper>
  );
}

export default Board;
