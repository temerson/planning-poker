import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const UserWithoutVote = styled.div`
`;

const UserWithVote = styled(UserWithoutVote)`
  font-weight: bold;
`;

const BoardMembers = ({ members, task }) => (
  <div>
    <h4>Board Members</h4>
    {members.map((member, index) => {
      const userVote = task.votes && task.votes.find(vote => vote.user._id === member._id);
      return userVote
        ? <UserWithVote key={index}>{member.username}</UserWithVote>
        : <UserWithoutVote key={index}>{member.username}</UserWithoutVote>;
    })}
  </div>
);

BoardMembers.propTypes = {
  members: PropTypes.array.isRequired,
  task: PropTypes.object.isRequired,
};

export default BoardMembers;
