import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
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

const Board = ({ params }) => {
  const websocket = useWebsocket();
  const user = useUser();
  const [ board, setBoard ] = useState({});
  const [ showVotes, setShowVotes ] = useState(board.showVotes || false);

  useEffect(() => {
    if (websocket.isReady) {
      websocket.send('user_join', {
        username: user.getUsername(),
        boardSlug: params.boardSlug,
      });
      websocket.subscribe('board_change', data => setBoard(data.board));
    }

    return () => {
      websocket.send('user_leave', {
        username: user.getUsername(),
        boardSlug: params.boardSlug,
      });
      websocket.subscribe('board_change', () => {});
    };
  }, [user, websocket, websocket.isReady, params ]);

  useEffect(() => {
    if (websocket.isReady) {
      websocket.send('set_show_votes', { showVotes });
    }
  }, [showVotes, websocket]);

  const resetBoard = () => websocket.send('reset_board');

  const toggleShowVotes = () => setShowVotes(!showVotes);

  if (!board.owner) return null;

  const vote = board.users.find(boardUser => boardUser.username === user.getUsername()).vote;
  const isOwner = user.getUsername() === board.owner;

  return (
    <Wrapper>
      <BoardActions
        style={{ gridArea: 'actions' }}
        isOwner={isOwner}
        onReset={resetBoard}
        toggleShowVotes={toggleShowVotes}
        showVotes={board.showVotes}
      />
      <BoardMembers
        style={{ gridArea: 'members' }}
        task={board.task}
        members={board.users}
        showVotes={board.showVotes}
      />
      <BoardTask
        style={{ gridArea: 'task' }}
        task={board.task}
        isOwner={isOwner}
      />
      <BoardCards
        style={{ gridArea: 'cards' }}
        vote={vote}
      />
    </Wrapper>
  );
}

export default withRouter(Board);
