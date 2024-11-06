import { useState } from "react";
import Quiz from "./component/Quiz";
import Navbar from "./component/Navbar";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <Navbar menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <Quiz menuOpen={menuOpen} />
    </div>
  );
}

export default App;
