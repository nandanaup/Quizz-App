import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Navbar({ menuOpen, toggleMenu }) {
  return (
    <nav className="bg-lightblue-400 shadow-lg p-4 text-black fixed top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold ml-10">QuizSphere</h1>

        <div className="hidden md:flex space-x-6 mr-20">
          <Link to="/quiz" className="text-sm text-blue-950">
            Home
          </Link>
          <Link to="/about" className="text-sm text-blue-950">
            About
          </Link>
          <Link to="/settings" className="text-sm text-blue-950">
            Settings
          </Link>
        </div>

        <button
          onClick={toggleMenu}
          className="block md:hidden text-2xl focus:outline-none"
        >
          <FontAwesomeIcon
            icon={menuOpen ? faTimes : faBars}
            className="text-black"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2 bg-lightblue-500 p-4 rounded">
          <Link
            to="/quiz"
            className="block text-sm text-black"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-sm text-black"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="/settings"
            className="block text-sm text-black"
            onClick={toggleMenu}
          >
            Settings
          </Link>
        </div>
      )}
    </nav>
  );
}

Navbar.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};
