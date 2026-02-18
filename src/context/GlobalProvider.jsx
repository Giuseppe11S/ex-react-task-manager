import { createContext } from "react";

import useTasks from "../hooks/useTasks";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {

  const tasksData = useTasks(); 

  return (
    <GlobalContext.Provider value={tasksData}>
      {children}
    </GlobalContext.Provider>
  );
}
