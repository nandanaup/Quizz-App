import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { decode } from "html-entities";
import backgroundImage from "../assets/crop2.jpg";
import loadingBackground from "../assets/crop1.jpg";
import finalBackground from "../assets/final.jpg";
import logo from "../assets/amico.png";
import thinkingFaceLogo from "../assets/Thinking face.png";

export default function Quiz({ menuOpen }) {
  const [questionData, setQuestionData] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [options, setOptions] = useState([]);
  const [correctScore, setCorrectScore] = useState(0);
  const [askedCount, setAskedCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [page, setPage] = useState("welcome");
  const [topScore, setTopScore] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");

  const totalQuestions = 10;

  const subjects = [
    { id: 9, name: "General Knowledge" },
    { id: 10, name: "Entertainment: Books" },
    { id: 14, name: "Entertainment: Video Games" },
    { id: 15, name: "Entertainment: Board Games" },
    { id: 16, name: "Science: Nature" },
    { id: 17, name: "Science: Computers" },
    { id: 18, name: "Science: Gadgets" },
    { id: 20, name: "Mythology" },
  ];

  const difficultyLevels = [
    { name: "Easy", difficulty: "easy" },
    { name: "Medium", difficulty: "medium" },
    { name: "Hard", difficulty: "hard" },
  ];

  const loadQuestions = async (subjectId, difficulty) => {
    setLoading(true);
    try {
      const APIUrl = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${subjectId}&difficulty=${difficulty}&type=multiple`;
      const result = await fetch(APIUrl);
      const data = await result.json();
      setQuestionData(data.results);
      setLoading(false);
      setQuizStarted(true);
      resetGame();
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
    }
  };

  const resetGame = () => {
    setCorrectScore(0);
    setAskedCount(0);
    setSelectedOption("");
    setShowResult(false);
    setGameFinished(false);
    setSkippedCount(0);
  };

  const shuffleOptions = (options) => options.sort(() => Math.random() - 0.5);

  const handleOptionSelect = (option) => setSelectedOption(option);

  const moveToNextQuestion = () => {
    setSelectedOption("");
    setShowResult(false);
    setAlertMessage("");
    if (askedCount + 1 < totalQuestions) {
      const nextQuestion = questionData[askedCount + 1];
      setCorrectAnswer(nextQuestion.correct_answer);
      setOptions(
        shuffleOptions([
          nextQuestion.correct_answer,
          ...nextQuestion.incorrect_answers,
        ])
      );
      setAskedCount(askedCount + 1);
    } else {
      if (correctScore > topScore) {
        setTopScore(correctScore);
      }
      setGameFinished(true);
    }
  };

  const checkAnswer = () => {
    if (!selectedOption) {
      setAlertMessage("Please select an option!");
      return;
    }

    setShowResult(true);

    if (selectedOption === correctAnswer) {
      setCorrectScore(correctScore + 1);
    }
    setAlertMessage("");
  };

  const skipQuestion = () => {
    setSkippedCount(skippedCount + 1);
    moveToNextQuestion();
  };

  const playAgain = () => {
    setQuizStarted(false);
    setSelectedSubject(null);
    resetGame();
  };

  const startQuiz = (difficulty) => {
    loadQuestions(selectedSubject.id, difficulty);
  };

  useEffect(() => {
    if (quizStarted && questionData.length > 0) {
      const firstQuestion = questionData[0];
      setCorrectAnswer(firstQuestion.correct_answer);
      setOptions(
        shuffleOptions([
          firstQuestion.correct_answer,
          ...firstQuestion.incorrect_answers,
        ])
      );
    }
  }, [quizStarted, questionData]);

  const performanceMessage = () => {
    if (correctScore === totalQuestions) {
      return "Excellent job! You answered all questions correctly!";
    } else if (correctScore >= totalQuestions * 0.7) {
      return "Great work! You did well, but there's room for improvement.";
    } else {
      return "Keep practicing!!!";
    }
  };

  const renderSmiley = () => {
    if (correctScore === totalQuestions) {
      return "😄"; // Happy
    } else if (correctScore >= totalQuestions * 0.7) {
      return "🙂"; // Neutral
    } else {
      return "😞"; // Sad
    }
  };

  if (page === "welcome") {
    return (
      <div
        className="flex flex-col justify-center items-center min-h-screen"
        style={{
          backgroundImage: `url(${loadingBackground})`,
          backgroundSize: "auto", // Ensures original size of image is used for repeating
          backgroundPosition: "center", // Aligns background at the bottom of the screen
          backgroundRepeat: "repeat", // Repeats the image both vertically and horizontally
        }}
      >
        <h1 className="text-7xl font-bold text-black mb-20 drop-shadow-lg animate-pulse">
          Welcome to Question World
        </h1>
        <button
          onClick={() => setPage("subjectSelection")}
          className="bg-blue-500 text-white py-3 px-20 rounded hover:bg-blue-600 transition duration-300"
        >
          Start
        </button>
      </div>
    );
  }

  if (page === "subjectSelection") {
    return (
      <div
        className="flex flex-col justify-center items-center min-h-screen"
        style={{
          backgroundImage: `url(${loadingBackground})`,
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}
      >
        <h1 className="text-6xl font-bold text-black mb-12">
          What do you want to learn today?
        </h1>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="mb-4 border-2 border-black rounded text-gray-600 cursor-pointer appearance-none flex items-center justify-between"
            style={{
              width: "250px",
              padding: "8px 10px",
              fontSize: "16px",
              backgroundColor: "white",
            }}
          >
            <span className=" text-black ">
              {selectedSubject ? selectedSubject.name : "Choose a subject"}
            </span>
            <svg
              className={`ml-2 transition-transform duration-200 ${
                showDropdown ? "rotate-180" : ""
              }`}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 10l5 5 5-5z" fill="currentColor" />
            </svg>
          </button>
          {showDropdown && (
            <div
              className="absolute z-10 bg-white border border-black rounded shadow-lg ml-7 "
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                width: "200px",
              }}
            >
              {subjects.map((subj) => (
                <div
                  key={subj.id}
                  onClick={() => {
                    setSelectedSubject(subj);
                    setShowDropdown(false);
                  }}
                  className="p-2 cursor-pointer hover:bg-blue-400 "
                >
                  {subj.name}
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedSubject && (
          <div className="flex flex-col gap-4 mt-4">
            {difficultyLevels.map((level) => (
              <button
                key={level.difficulty}
                onClick={() => {
                  startQuiz(level.difficulty);
                  setPage("quiz");
                }}
                className="bg-blue-500 border-2 border-blue-500 text-white py-2 px-20 rounded hover:bg-blue- transition duration-300"
              >
                {level.name}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className="flex flex-col justify-center items-center min-h-screen"
        style={{
          backgroundImage: `url(${loadingBackground})`,
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="text-black text-2xl">Loading Questions...</div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen "
      style={{
        backgroundImage: `url(${
          gameFinished ? finalBackground : backgroundImage
        })`,
        backgroundSize: "auto",
        backgroundPosition: "center",
        opacity: 0.9,
      }}
    >
      {!gameFinished && (
        <img
          src={thinkingFaceLogo}
          alt="Thinking Face Logo"
          className="absolute top-1/4 left-0  "
          style={{
            zIndex: 10,
            width: "500px",
            height: "500px",
          }}
        />
      )}
      {gameFinished && (
        <img
          src={logo}
          alt="Amico Logo"
          className="absolute top-44 left-20 p-4 w-68 h-auto opacity-90"
        />
      )}
      <div
        className={`flex justify-end items-center min-h-screen ${
          menuOpen ? "hidden" : "flex"
        }`}
      >
        <div
          className={`bg-white absolute z-10 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-lg mt-16 md:mr-40  ${
            gameFinished ? "border-2 border-blue-400" : "border"
          }`}
        >
          <h1 className="text-2xl font-bold text-center text-black mb-1">
            {gameFinished ? "Quiz Finished!" : "Quiz Time!"}
          </h1>

          {!gameFinished && (
            <div className="text-center text-xl font-semibold text-black mb-4">
              Score: {correctScore} / {totalQuestions}
            </div>
          )}

          {!gameFinished ? (
            questionData.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold text-center text-black mb-11">
                  {askedCount + 1}: {decode(questionData[askedCount].question)}
                </h2>
                <ul className="list-disc list-inside mb-4">
                  {options.map((option) => (
                    <li
                      key={option}
                      onClick={() => handleOptionSelect(option)}
                      className={`p-2 cursor-pointer rounded border mb-2 transition-all duration-300 ${
                        showResult
                          ? option === correctAnswer
                            ? "bg-white-400 border-4 border-green-600"
                            : selectedOption === option
                            ? "bg-white-400 border-4 border-red-600"
                            : "bg-blue-300 text-blue-950 font-bold"
                          : selectedOption === option
                          ? "bg-blue-300 text-black-950 font-bold border-4 border-blue-700"
                          : "bg-blue-300 text-black-950"
                      }`}
                    >
                      {decode(option)}
                    </li>
                  ))}
                </ul>
                {showResult ? (
                  <button
                    onClick={moveToNextQuestion}
                    className="block w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
                  >
                    Next Question
                  </button>
                ) : (
                  <>
                    <button
                      onClick={checkAnswer}
                      className="block w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                      Submit Answer
                    </button>
                    <button
                      onClick={skipQuestion}
                      className="block w-full  bg-blue-700 text-white py-2 rounded mt-4 hover:bg-blue-700 transition duration-300"
                    >
                      Skip Question
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="text-center text-white">
                No questions available.
              </div>
            )
          ) : (
            <div className="text-center text-lg font-semibold text-black">
              {skippedCount === totalQuestions ? (
                <div>You didn&apos;t attempt any questions!</div>
              ) : (
                <div>
                  You answered {correctScore} out of {totalQuestions} correctly!
                  <div className="mt-2">{performanceMessage()}</div>
                  <div className="mt-2">{renderSmiley()}</div>{" "}
                </div>
              )}
              <div className="flex justify-center mt-4">
                <button
                  onClick={playAgain}
                  className="block align-center bg-blue-600 text-white py-2 px-8 rounded hover:bg-blue-700 transition duration-300"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
          {/* Show the alert message here */}
          {alertMessage && (
            <div className="bg-red-500 text-white text-center p-2 mt-4 rounded">
              {alertMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Quiz.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
};
