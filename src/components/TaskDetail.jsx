import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalProvider";

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks } = useContext(GlobalContext);

  const [isClicked, setIsClicked] = useState(false)
  function handleDelete () {
   setIsClicked(!isClicked)
   return console.log('Elimino Task')
  }

  const task = tasks.find(t => t.id === Number(id));
  if (!task) {
  return <p>Task non trovata</p>;
}

  return (
    <>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <span>{task.status}</span>
      <h4>Creata il: {new Date(task.createdAt).toLocaleString()}</h4>
      <button className="border" onClick={handleDelete}>Elimina Task</button>
    </>
  )
}