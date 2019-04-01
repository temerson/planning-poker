import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const UserWithoutVote = styled.div`
`;

const UserWithVote = styled(UserWithoutVote)`
  font-weight: bold;
`;

const BoardMembers = ({ members, task, showVotes }) => (
  <div>
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
  </div>
);

BoardMembers.propTypes = {
  members: PropTypes.array.isRequired,
  task: PropTypes.object.isRequired,
  showVotes: PropTypes.bool.isRequired,
};

export default BoardMembers;
