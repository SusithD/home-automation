// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";  // For navigation

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Dashboard</Link>  {/* Link to the Dashboard page */}
        </li>
        {/* Add more links here if you have additional pages */}
      </ul>
    </nav>
  );
};

export default Navbar;
