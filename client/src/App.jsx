import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./component/Quiz";
import Navbar from "./component/Navbar";

import About from "./component/About";
import Settings from "./component/Settings";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <Router>
      <Navbar menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <Routes>
        <Route path="/quiz" element={<Quiz menuOpen={menuOpen} />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />{" "}
        <Route path="/" element={<Quiz menuOpen={menuOpen} />} />
      </Routes>
    </Router>
  );
}

export default App;
