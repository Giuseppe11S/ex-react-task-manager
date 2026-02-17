// navigation bar
import { NavLink} from "react-router-dom";

export default function NavBar(){
  return (
    <>
    <ul className="flex justify-center gap-[20px] mt-[20px]">
      <li className="text-[20px] text-red"><NavLink to="/">Home</NavLink></li>
      <li className="text-[20px]"><NavLink to="/form">Add Task</NavLink></li>
    </ul>
    </>
  )
}