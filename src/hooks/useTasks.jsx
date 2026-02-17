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

        return { tasks, setTasks };
}