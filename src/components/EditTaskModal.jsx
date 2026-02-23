import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  // ref per il form, serve per chiamare requestSubmit dal bottone "Salva"
  const editFormRef = useRef(null);

  // aggiorno i campi se cambia la task (utile se apriamo la modale con un task diverso)
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      id: task.id,
      title,
      description,
      status,
    };
    onSave(updatedTask); // passo i dati modificati a TaskDetail
    onClose(); // chiudo la modale
  };

  return (
    <Modal
      title="Modifica Task"
      show={show}
      onClose={onClose}
      confirmText="Salva"
      onConfirm={() => editFormRef.current.requestSubmit()} // submit form quando clicco "Salva"
      content={
        <form ref={editFormRef} onSubmit={handleSubmit}>
          <label>Titolo:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Descrizione:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Stato:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </form>
      }
    />
  );
}