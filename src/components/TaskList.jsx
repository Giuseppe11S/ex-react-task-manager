import { useContext } from "react";
import { GlobalContext } from "../context/GlobalProvider.jsx";

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);

  return (
    <ul>
      {tasks.map((t) => (
        <li key={t.id}>{t.title}</li>
      ))}
    </ul>
  );
}
