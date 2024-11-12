import { useState } from "react";

function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [textSize, setTextSize] = useState("text-base"); // default text size

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const changeTextSize = (size) => setTextSize(size);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className={`text-4xl font-bold mb-8 ${textSize}`}>Settings</h1>

        <div className="mb-6 text-center">
          <label className="text-xl block mb-2">Text Size:</label>
          <div className="flex gap-4 justify-center mt-4">
            <button
              onClick={() => changeTextSize("text-sm")}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Small
            </button>
            <button
              onClick={() => changeTextSize("text-lg")}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Large
            </button>
          </div>
        </div>

        <div className="mb-6 text-center">
          <label className="text-xl block mb-2">system default</label>

          <button
            onClick={toggleDarkMode}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-5 mr-10 ml-10"
          >
            Dark Mode
          </button>
          <button
            onClick={toggleDarkMode}
            className="bg-blue-500 text-white py-2 px-10 rounded mt-4 mr-6 "
          >
            Light
          </button>
        </div>

        <div className="mt-8">
          <button
            onClick={() => (window.location.href = "/quiz")}
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-500 transition duration-300 ml-7"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
