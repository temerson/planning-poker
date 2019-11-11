import React from 'react';
import PropTypes from 'prop-types';

const BoardStatus = ({ task }) => (
  <div>
    <h3>Board Status</h3>
    <ul>
      {task && task.votes.map((vote, index) => (
        <li key={index}>{vote.user.username} - Voted</li>
      ))}
    </ul>
  </div>
);

BoardStatus.propTypes = {
  task: PropTypes.object,
};

export default BoardStatus;
