import React from 'react';
import PropTypes from 'prop-types';

const BoardMembers = ({ members }) => (
  <div>
    <h4>Board Members</h4>
    {members.map((member, index) => (
      <div key={index}>{member.username}</div>
    ))}
  </div>
);

BoardMembers.propTypes = {
  members: PropTypes.array.isRequired,
};

export default BoardMembers;
