import { useState, useEffect } from "react";

export default function useTasks(){
  const [tasks, setTasks] = useState([])

   const apiUrl = import.meta.env.VITE_URL_API;
    
 // chiamata GET
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

  // chiamata POST
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

  // chiamata DELETE
  async function removeTask(taskId) {
  try {
    const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
      method: "DELETE"
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    setTasks(prev =>
      prev.filter(task => task.id !== taskId)
    );

  } catch (error) {
    throw error;
  }

}
  
 async function updateTask(updTask) {
  try {
    const response = await fetch(`${apiUrl}/tasks/${updTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updTask)
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    // aggiorna la task nello stato
    setTasks(prev =>
      prev.map(task =>
        task.id === updTask.id
          ? data.task
          : task
      )
    );

    return data.task;

  } catch (error) {
    console.error("Errore aggiornamento task:", error.message);
    throw error;
  }
}

 return { tasks, setTasks, getTasks, addTask, removeTask, updateTask };
}