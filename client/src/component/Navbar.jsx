import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ menuOpen, toggleMenu }) {
  return (
    <nav className="bg-lightblue-400 shadow-lg p-4 text-black fixed top-0 left-0 right-0 z-10">
      {" "}
      {/* Set navbar background to light blue and add shadow */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Quiz Game</h1>{" "}
        {/* Text color defaults to black */}
        {/* Toggle button for mobile menu */}
        <button
          onClick={toggleMenu}
          className="block md:hidden text-2xl focus:outline-none"
        >
          <FontAwesomeIcon
            icon={menuOpen ? faTimes : faBars}
            className="text-black" // Icon color set to black
          />
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2 bg-lightblue-500 p-4 rounded">
          {" "}
          {/* Set mobile menu background to light blue */}
          <a
            href="#!"
            className="block text-sm text-black" // Text color set to black
            onClick={toggleMenu}
          >
            Home
          </a>
          <a
            href="#!"
            className="block text-sm text-black" // Text color set to black
            onClick={toggleMenu}
          >
            Settings
          </a>
          <a
            href="#!"
            className="block text-sm text-black" // Text color set to black
            onClick={toggleMenu}
          >
            About
          </a>
        </div>
      )}
      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <a href="#!" className="text-sm text-black">
          {" "}
          {/* Text color set to black */}
          Home
        </a>
        <a href="#!" className="text-sm text-black">
          {" "}
          {/* Text color set to black */}
          Settings
        </a>
        <a href="#!" className="text-sm text-black">
          {" "}
          {/* Text color set to black */}
          About
        </a>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};
