import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext(); // named export

export default function GlobalProvider( {children} ){

  const [tasks, setTasks] = useState([]);

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
    console.log("API URL:", apiUrl);  // dovrebbe stampare http://localhost:3001
    getTasks();
  }, [])

  return (
    <GlobalContext.Provider value={{ tasks, setTasks, getTasks }}>
      {children}
    </GlobalContext.Provider>
  );

}