import { useState, useRef, useContext } from "react";
import { GlobalContext } from "../context/GlobalProvider";

export default function AddTask() {

  const { addTask } = useContext(GlobalContext);

  const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

  const [error, setError] = useState('');
  const [form, setDataForm] = useState({
    title: '',
    status: 'To do',
    createdAt: new Date()
  });

  const descriptionRef = useRef('');

  function handleChange(e) {
    const { name, value } = e.target;
    setDataForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.title.trim() === '') {
      setError("Il titolo non può essere vuoto");
      return;
    }

    for (let char of symbols) {
      if (form.title.includes(char)) {
        setError("Il titolo non può contenere simboli speciali");
        return;
      }
    }

    setError('');

    try {
      await addTask({
        title: form.title,
        description: descriptionRef.current.value,
        status: form.status
      });

      alert("Task aggiunto con successo!");

      // reset form
      setDataForm({ title: '', status: 'To do' });
      descriptionRef.current.value = '';

    } catch (error) {
      alert("Errore: " + error.message);
    }
  }

  return (
    <div className="flex justify-center mt-[20px] border">
      <form onSubmit={handleSubmit} className="mt-[30px] flex-col border w-[50%]">
        <h1 className="text-[30px]">Aggiungi la tua nota</h1>
        <label>Titolo: </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        {error && <p className="text-red-500 mt-1">{error}</p>}
        <label>Descrizione: </label>
        <textarea ref={descriptionRef}></textarea>

        <label>Stato: </label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="To do">To do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit" className="border">
          Aggiungi Task
        </button>
      </form>
    </div>
  );
}
