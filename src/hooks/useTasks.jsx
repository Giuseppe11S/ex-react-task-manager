import { useState, useEffect } from "react";

export default function useTasks(){
  const [tasks, setTasks] = useState([])

   const apiUrl = import.meta.env.VITE_URL_API;
    
    
  const getTasks = async() => {
     try{
          const res = await fetch(`${apiUrl}/tasks`)
          const data = await res.json();
          setTasks(data)
          console.log(data) ;
        } 
        catch(error){
          console.error('Dati non ricevuti')
        }
      }
    
      useEffect(() => {
        getTasks();
      }, [apiUrl])

  const addTask = async (newTask) => {
    try {
      const res = await fetch(`${apiUrl}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
      });

      const data = await res.json();

      if (data.success) {
        setTasks(prev => [...prev, data.task]);
        return data.task; 
      } else {

        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Errore nell'aggiunta del task:", error.message);
      throw error; 
    }
  };


        return { tasks, setTasks, getTasks, addTask };
}