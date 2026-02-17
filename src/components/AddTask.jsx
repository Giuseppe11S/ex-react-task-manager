
// check form and add news tasks

import { useState, useRef } from "react"

import useTasks from "../hooks/useTasks";

export default function AddTask(){

  const { addTask } = useTasks();

  // simboli vietati all' input title
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

  const [error, setError] = useState('')
  const [form, setDataForm] = useState({
    title: '',
    status: 'To do'

  })

  const descriptionRef = useRef('');

  function handleChange(e) {
    const { name , value } = e.target;

    setDataForm(prev => ({
      ...prev,
      [name]: value
    }));
  }


   async function handleSubmit (e) {
     e.preventDefault()

    try {
      await addTask({
        title: form.title,
        description: descriptionRef.current.value,
        status: form.status
      });

      alert("Task aggiunto con successo!");
      setForm({ title: '', status: 'To do' });
      descriptionRef.current.value = '';
    } catch (error) {
      alert("Errore: " + error.message);
    }
   }
  
  return (
    <>
    <div className="flex justify-center mt-[20px] border">
      <form onSubmit={handleSubmit}
      className=" mt-[30px flex-col border w-[50%]">
        <h1 className="text-[30px]">Aggiungi la tua nota</h1>
        <label htmlFor="">Titolo: </label>
        <input type="text" 
        value={form.title}
        onChange={handleChange}
        name="title"/>
        {error && <p className="text-red-500 mt-1">{error}</p>}
        <label>Descrizione: </label>
        <textarea name="description" ref={descriptionRef}
         ></textarea>
        <select name="status" 
         onChange={handleChange}>
          <option value="To do">To do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit"
        className="border">Aggiungi Task</button>
      </form>
   </div>
    </>
  )
}