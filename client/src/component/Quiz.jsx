import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { decode } from "html-entities";

// static asset imports
import backgroundImage from "../assets/Group.png";
import loadingBackground from "../assets/bback.jpg";
import finalBackground from "../assets/Frame.png"; // New background for Play Again

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
  const [skippedCount, setSkippedCount] = useState(0); // Track skipped questions

  const totalQuestions = 10;

  const subjects = [
    { id: 9, name: "General Knowledge" },
    { id: 10, name: "Entertainment: Books" },
    { id: 13, name: "Entertainment: Musicals & Theatres" },
    { id: 14, name: "Entertainment: Video Games" },
    { id: 15, name: "Entertainment: Board Games" },
    { id: 16, name: "Science: Nature" },
    { id: 17, name: "Science: Computers" },
    { id: 18, name: "Science: Gadgets" },
    { id: 19, name: "Science: Technology" },
    { id: 20, name: "Mythology" },
  ];

  const difficultyLevels = [
    { name: "Basics", difficulty: "easy" },
    { name: "Advanced", difficulty: "medium" },
    { name: "Fun Facts", difficulty: "hard" },
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
    setSkippedCount(0); // Reset skipped count
  };

  const shuffleOptions = (options) => options.sort(() => Math.random() - 0.5);

  const handleOptionSelect = (option) => setSelectedOption(option);

  const moveToNextQuestion = () => {
    setSelectedOption("");
    setShowResult(false);

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
        setTopScore(correctScore); // Update top score if current score is higher
      }
      setGameFinished(true);
    }
  };

  const checkAnswer = () => {
    if (!selectedOption) {
      alert("Please select an option!");
      return;
    }

    setShowResult(true);

    if (selectedOption === correctAnswer) {
      setCorrectScore(correctScore + 1);
    }
  };

  const skipQuestion = () => {
    setSkippedCount(skippedCount + 1); // Increment skipped count
    moveToNextQuestion(); // Move to the next question
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
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-7xl font-bold text-black mb-20 drop-shadow-lg animate-pulse">
          Welcome to Question World!
        </h1>
        <button
          onClick={() => setPage("subjectSelection")}
          className="bg-blue-600 text-white py-2 px-9 rounded hover:bg-blue-500 transition duration-300"
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
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-6xl font-bold text-black mb-12">
          What do you want to learn today?
        </h1>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="mb-4 border rounded text-blue-600 cursor-pointer appearance-none flex items-center justify-between"
            style={{
              width: "200px",
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
              className="absolute z-10 bg-white border rounded shadow-lg"
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
                  className="p-2 cursor-pointer hover:bg-blue-700"
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
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue- transition duration-300"
              >
                {selectedSubject.name} {level.name}
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
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-white text-2xl">Loading Questions...</div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: `url(${
          gameFinished ? finalBackground : backgroundImage
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.9,
      }}
    >
      <div
        className={`flex justify-end items-center min-h-screen ${
          menuOpen ? "hidden" : "flex"
        }`}
      >
        <div className="bg-transparent bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-lg mr-8">
          <h1 className="text-2xl font-bold text-center text-black mb-1">
            {gameFinished ? "Quiz Finished!" : "Quiz Time!"}
          </h1>

          {/* Show score only when the quiz is active */}
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
                            ? "bg-green-400 border-green-700"
                            : selectedOption === option
                            ? "bg-red-400 border-red-700"
                            : "bg-blue-300 text-blue-950 font-bold"
                          : selectedOption === option
                          ? "bg-blue-300 text-purple-950 font-bold"
                          : "bg-blue-300 text-purple-950"
                      }`}
                    >
                      {decode(option)}
                    </li>
                  ))}
                </ul>
                {showResult ? (
                  <button
                    onClick={moveToNextQuestion}
                    className="block w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
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
                      className="block w-full border-2 border-blue-800 text-black py-2 rounded mt-4 hover:bg-blue-700 transition duration-300"
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
                  {/* Smiley based on score */}
                </div>
              )}
              <div className="flex justify-center mt-4">
                <button
                  onClick={playAgain}
                  className="block align-center bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  Play Again
                </button>
              </div>
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
