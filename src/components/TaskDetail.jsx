import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalProvider";

import Modal from "./Modal";
import EditTaskModal from "./EditTaskModal";

export default function TaskDetail() {

  const { id } = useParams();
  const { tasks, removeTask, updateTask } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleUpdate = async (updatedTask) => {
  try {
    await updateTask(updatedTask);
    alert("Task modificata con successo!");
  } catch (error) {
    alert("Errore: " + error.message);
  }
};

  const task = tasks.find(t => t.id === Number(id));
  if (!task) {
  return <p>Task non trovata</p>;
}

  const navigate = useNavigate();

  async function handleDelete() {
    try {
      await removeTask(task.id);

      alert("Task eliminata con successo!");
      navigate("/");

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <span>{task.status}</span>
      <h4>Creata il: {new Date(task.createdAt).toLocaleString()}</h4>
      <button className="border" onClick={() => setShowModal(true)}>
      Elimina Task
     </button>

     <Modal
      title="Conferma eliminazione"
      content={
        <p>
          Sei sicuro di voler eliminare il task
          <strong> "{task.title}"</strong>?
        </p>
      }
      show={showModal}
      onClose={() => setShowModal(false)}
      onConfirm={handleDelete}
      confirmText="Elimina"
    />

    <button onClick={() => setShowEditModal(true)}>Modifica Task</button>

    <EditTaskModal
      show={showEditModal}
      onClose={() => setShowEditModal(false)}
      task={task}
      onSave={handleUpdate}
    />
    </>
  )
}