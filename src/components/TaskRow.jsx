import React from 'react';
import { Link } from 'react-router-dom';

const statusColors = {
  "To do": "red",
  "Doing": "yellow",
  "Done": "green",
};

function TaskRow({ task }) {
  return (
    <tr>
      <td><Link to={`/task/${task.id}`}>{task.title}</Link></td>
      <td style={{ backgroundColor: statusColors[task.status] }}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  );
}

export default React.memo(TaskRow);