import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  grid-area: members;
  margin-right: 2rem;

  @media screen and (max-width: 650px) {
    display: none;
  }
`;

const UserWithoutVote = styled.div``;

const UserWithVote = styled(UserWithoutVote)`
  font-weight: bold;
`;

const BoardMembers = ({ members, task, showVotes }) => (
  <Wrapper>
    <h3>Board Members</h3>
    {members
      .sort((a, b) => a.username.localeCompare(b.username))
      .map((member, index) => {
        const userVote = task.votes && task.votes.find(vote => vote.user._id === member._id);
        return userVote
          ? <UserWithVote key={index}>{member.username}{showVotes && ` (${userVote.value})`}</UserWithVote>
          : <UserWithoutVote key={index}>{member.username}</UserWithoutVote>;
      })
    }
  </Wrapper>
);

BoardMembers.propTypes = {
  members: PropTypes.array.isRequired,
  task: PropTypes.object.isRequired,
  showVotes: PropTypes.bool.isRequired,
};

export default BoardMembers;
