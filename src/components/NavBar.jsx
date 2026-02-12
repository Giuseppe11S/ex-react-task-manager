// navigation bar
import { NavLink} from "react-router-dom";

export default function NavBar(){
  return (
    <>
    <ul>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/form">Add Task</NavLink></li>
    </ul>
    </>
  )
}