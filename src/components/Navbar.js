import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-gray-100 shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Home Automation
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-indigo-400">
              Dashboard
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
