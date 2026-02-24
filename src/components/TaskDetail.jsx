import { useParams } from "react-router-dom";
import { useContext, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalProvider";

import Modal from "./Modal";
import EditTaskModal from "./EditTaskModal";

export default function TaskDetail() {

  const { id } = useParams();
  const { tasks, removeTask, updateTask } = useContext(GlobalContext);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");

  function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  const handleSearchDebounced = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 300),
    []
  );

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder * -1);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  };

  const sortedTasks = useMemo(() => {
    const statusOrder = { "To do": 1, "Doing": 2, "Done": 3 };

    return tasks
      .filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        let compare = 0;

        if (sortBy === "title") {
          compare = a.title.localeCompare(b.title);
        } else if (sortBy === "status") {
          compare = statusOrder[a.status] - statusOrder[b.status];
        } else if (sortBy === "createdAt") {
          compare =
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime();
        }

        return compare * sortOrder;
      });

  }, [tasks, sortBy, sortOrder, searchQuery]);

  // Aggiorna una task
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

      {/* ✅ Input di ricerca (NON controllato) */}
      <h3 className="mt-10 text-xl">Altre Task</h3>

      <input
        type="text"
        placeholder="Cerca per titolo..."
        className="border p-2 mt-2 mb-4"
        onChange={(e) => handleSearchDebounced(e.target.value)}
      />

      <table className="border mt-2">
        <thead>
          <tr>
            <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
              Nome {sortBy === 'title' ? (sortOrder === 1 ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
              Stato {sortBy === 'status' ? (sortOrder === 1 ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer' }}>
              Data {sortBy === 'createdAt' ? (sortOrder === 1 ? '▲' : '▼') : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map(t => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.status}</td>
              <td>{new Date(t.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}