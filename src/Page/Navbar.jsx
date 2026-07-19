import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-400 shadow-md h-screen p-4">

      <h1 className="text-2xl font-bold text-green-600  mb-4">
        📝 TO-DO
      </h1>

      <ul className="space-y-2">
        <li>
          <NavLink to="/" className="btn  w-full">Task</NavLink>
        </li>

        <li>
          <NavLink to="/important" className="btn w-full">Important</NavLink>
        </li>

        <li>
          <NavLink to="/completed" className="btn w-full">Completed</NavLink>
        </li>
      </ul>

    </nav>
  );
}

export default Navbar;
