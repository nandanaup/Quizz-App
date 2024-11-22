import { Link } from "react-router-dom";

function Settings() {
  const toggleDarkMode = () => {
    console.log("trying to enable dark mode");
    document.querySelector("html").classList.toggle("dark");
  };

  return (
    <div
      className={`min-h-screen ${"bg-white dark:bg-black dark:text-white text-black"}`}
    >
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

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
          <Link
            to={"/quiz"}
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-500 transition duration-300 ml-7"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Settings;
