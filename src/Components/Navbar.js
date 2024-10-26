import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700 shadow-md">
      {/* Logo */}
      <img
        src="https://seeklogo.com/images/I/imdb-logo-1CD1CCD432-seeklogo.com.png"
        alt="IMDb Logo"
        className="w-[80px]"
      />

      {/* Menu Icon (Only visible on mobile) */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Links - visible on desktop, conditionally rendered on mobile */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-gray-900 md:flex md:space-x-8 md:static md:w-auto md:bg-transparent items-center transition-all duration-300 ease-in-out`}
      >
        <Link
          to="./"
          className="block py-2 px-4 text-yellow-400 md:inline hover:text-yellow-300 transition duration-200 font-bold text-xl"
        >
          <h3>Movies</h3>
        </Link>

        <Link
          to="./WatchList"
          className="block py-2 px-4 text-yellow-400 md:inline hover:text-yellow-300 transition duration-200 font-bold text-xl"
        >
          <h3>WatchList</h3>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;