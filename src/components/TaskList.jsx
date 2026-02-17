import { useContext } from "react";
import { GlobalContext } from "../context/GlobalProvider.jsx";

import TaskRow from "./TaskRow.jsx";

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);

  return (
    <div className="flex justify-center mt-[50px]">
      <table className="">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Stato</th>
            <th>Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
