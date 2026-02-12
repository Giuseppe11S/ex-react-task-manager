import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// import pages
import TaskList from './components/TaskList';
import Layout from './components/Layout';
import AddTask from './components/AddTask';
import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
         <Route path='/'
          element={<TaskList/>}></Route>
         <Route path='/form'
          element={<AddTask/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
