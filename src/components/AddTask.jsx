
// check form and add news tasks

import { useState, useRef } from "react"

export default function AddTask(){

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

   function handleSubmit (e) {
     e.preventDefault()
      console.log({
        title: form.title,
        description: descriptionRef.current.value,
        status: form.status
      });

      // validazione
      if(form.title.trim() === ''){
        setError('Il campo non può essere vuoto')
        return;
      }

      for(let char of symbols){
        if(form.title.includes(char)){
          setError('Il titolo non può contenre simboli speciali')
          return;
        }
      }

      setError('');
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