import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from './components/TaskList';
import Layout from './components/Layout';
import AddTask from './components/AddTask';
import GlobalProvider from "./context/GlobalProvider.jsx";

import './index.css'


function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<TaskList />} />
            <Route path='/form' element={<AddTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
