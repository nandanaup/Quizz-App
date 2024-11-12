import backgroundImage from "../assets/bback.jpg"; // Adjust path according to your structure

function About() {
  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-5xl font-bold text-black mb-8">About the Game</h1>
      <p className="text-lg text-black mb-4 text-center ">
        A trivia quiz game app is an interactive and fun platform where users
        can test their knowledge across various topics like Science, History,
        and Entertainment. It offers multiple features such as different
        difficulty levels, a timed mode for added challenge, and hints to help
        players along the way. Players earn points and can view their rankings
        on leaderboards, making the game competitive and engaging. Additional
        options like multiplayer mode, daily challenges, and achievements keep
        players returning for more. With vibrant visuals, sound effects, and
        potential rewards, a trivia quiz game app provides both entertainment
        and a sense of accomplishment, appealing to a wide range of audiences.
      </p>
      <button
        onClick={() => (window.location.href = "/quiz")} // Redirect to Home page
        className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-500 transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
}

export default About;
