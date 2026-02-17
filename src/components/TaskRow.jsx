import React from 'react';

const statusColors = {
  "To do": "red",
  "Doing": "yellow",
  "Done": "green",
};

function TaskRow({ task }) {
  return (
    <tr>
      <td>{task.title}</td>
      <td style={{ backgroundColor: statusColors[task.status] }}>{task.status}</td>
      <td>{new Date(task.createdAt).toLocaleDateString()}</td>
    </tr>
  );
}

export default React.memo(TaskRow);