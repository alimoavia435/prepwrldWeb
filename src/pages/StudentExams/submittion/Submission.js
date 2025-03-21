import { useState, useEffect } from "react";
import "./Submittion.css";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentquestions } from "../../../services/redux/middleware/getStudentquestions";
import { resultpost } from "../../../services/redux/middleware/resultpost";
import { getStudentResult } from "../../../services/redux/middleware/getStudentResult";
import { useNavigate } from "react-router-dom";

// Centralized local storage management
const LOCAL_STORAGE_KEYS = {
  EXAM_START_TIME: "examStartTime",
  CURRENT_QUESTION: "currentQuestionIndex",
  CURRENT_SUB_QUESTION: "currentSubQuestionIndex",
  ANSWERS: "studentAnswers",
  SUB_ANSWERS: "studentSubAnswers",
  SUBMITTED_STATUS: "submittedStatus",
  EXAM_RESULTS: "examResults",
};

// Helper functions for local storage
const storageHelpers = {
  saveState: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage: ${key}`, error);
    }
  },

  loadState: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error loading from localStorage: ${key}`, error);
      return defaultValue;
    }
  },

  clearExamState: () => {
    Object.values(LOCAL_STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  },
};

// Add this helper function at the top level, after the storageHelpers
const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}`;
};

const Timer = ({ status, onComplete }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const savedStartTime = localStorage.getItem("examStartTime");
    const startTime = savedStartTime ? parseInt(savedStartTime) : Date.now();

    if (!savedStartTime) {
      localStorage.setItem("examStartTime", startTime.toString());
    }

    const interval = setInterval(() => {
      if (status !== "ended" && !onComplete) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setTime(elapsed);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [status, onComplete]);

  return <div className="timer">Time Taken: {formatTime(time)}</div>;
};

const Submission = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const questionsData = useSelector(
    (state) => state?.getStudentquestions?.profile?.data
  );
  console.log("questionsData", questionsData);
  const [showExamModal, setShowExamModal] = useState(true);
  const navigate = useNavigate();

  // Add these two functions
  const handleExamStart = () => {
    setShowExamModal(false);
    localStorage.setItem("startcheck", "start");
  };

  useEffect(() => {
    const startcheck = localStorage.getItem("startcheck");
    if (startcheck === "start") {
      setShowExamModal(false);
    }
  }, []);

  const handleCancel = () => {
    navigate(-1);
  };

  const [loading, setLoading] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [examEndTime, setExamEndTime] = useState(null);
  // Load persisted state from localStorage
  const loadPersistedState = () => ({
    currentIndex: parseInt(localStorage.getItem("currentQuestionIndex")) || 0,
    currentSubIndex:
      parseInt(localStorage.getItem("currentSubQuestionIndex")) || 0,
    answers: JSON.parse(localStorage.getItem("studentAnswers")) || {},
    subAnswers: JSON.parse(localStorage.getItem("studentSubAnswers")) || {},
    submitted: JSON.parse(localStorage.getItem("submittedStatus")) || false,
    attemptedQuestions:
      JSON.parse(localStorage.getItem("attemptedQuestions")) || [],
    results: JSON.parse(localStorage.getItem("examResults")) || {
      total: 0,
      correct: 0,
      incorrect: 0,
      attempted: 0,
    },
  });
  const location = useLocation();
  const { description, examName } = location.state || {};
  // State initialization with persisted data
  const persistedState = loadPersistedState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    persistedState.currentIndex
  );
  const [currentSubQuestionIndex, setCurrentSubQuestionIndex] = useState(
    persistedState.currentSubIndex
  );
  const [attemptedQuestions, setAttemptedQuestions] = useState(
    persistedState.attemptedQuestions
  );
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedSubAnswers, setSelectedSubAnswers] = useState(
    persistedState.subAnswers
  );
  const [submitted, setSubmitted] = useState(persistedState.submitted);
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState(persistedState.results);
  const [totttal, settotttal] = useState();
  const [timetaken, settimetaken] = useState();
  const [studentresult, setstudentresult] = useState();
  const resultdata = useSelector(
    (state) => state?.getStudentResult?.profile?.data?.result
  );
  console.log("resultdata", resultdata);
  useEffect(() => {
    if (resultdata) {
      setstudentresult(resultdata);
      setExamCompleted(resultdata?.isComplete);
      const hours = Math.floor(resultdata?.totalTimeTaken / 3600); // 1 hour = 3600 seconds
      const minutes = Math.floor((resultdata?.totalTimeTaken % 3600) / 60); // 1 minute = 60 seconds
      const seconds = resultdata?.totalTimeTaken % 60; // Remaining seconds

      console.log(
        `${hours} hour(s), ${minutes} minute(s), ${seconds} second(s)`
      );
      settimetaken(
        ` ${hours < 10 ? "0" + hours : hours}:${
          minutes < 10 ? "0" + minutes : minutes
        }:${seconds < 10 ? "0" + seconds : seconds}`
      );
    }
  }, [resultdata]);

  // Save state to localStorage
  const persistState = () => {
    storageHelpers.saveState(
      LOCAL_STORAGE_KEYS.CURRENT_QUESTION,
      currentQuestionIndex
    );
    storageHelpers.saveState(
      LOCAL_STORAGE_KEYS.CURRENT_SUB_QUESTION,
      currentSubQuestionIndex
    );
    storageHelpers.saveState(LOCAL_STORAGE_KEYS.ANSWERS, {
      ...storageHelpers.loadState(LOCAL_STORAGE_KEYS.ANSWERS, {}),
      [currentQuestionIndex]: selectedAnswer,
    });
    storageHelpers.saveState(
      LOCAL_STORAGE_KEYS.SUB_ANSWERS,
      selectedSubAnswers
    );
    storageHelpers.saveState(LOCAL_STORAGE_KEYS.SUBMITTED_STATUS, submitted);
    storageHelpers.saveState(LOCAL_STORAGE_KEYS.EXAM_RESULTS, results);
    storageHelpers.saveState("attemptedQuestions", attemptedQuestions);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getStudentquestions(id)).then(() => setLoading(false));
  }, [id, dispatch]);

  useEffect(() => {
    if (questionsData?.questions) {
      setQuestions(questionsData?.questions);
      setResults((prev) => ({
        ...prev,
        total: questionsData.questions.length,
      }));
    }
  }, [questionsData]);

  const handlePrevious = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (isNextGen && currentSubQuestionIndex > 0) {
      setCurrentSubQuestionIndex((prev) => {
        const newIndex = prev - 1;
        storageHelpers.saveState(
          LOCAL_STORAGE_KEYS.CURRENT_SUB_QUESTION,
          newIndex
        );
        return newIndex;
      });
      setSubmitted(false);
    } else if (currentQuestionIndex > 0) {
      const prevQuestion = questions[currentQuestionIndex - 1];
      setCurrentQuestionIndex((prev) => {
        const newIndex = prev - 1;
        storageHelpers.saveState(LOCAL_STORAGE_KEYS.CURRENT_QUESTION, newIndex);
        return newIndex;
      });

      if (prevQuestion.type === "nextgen") {
        const lastSubIndex = prevQuestion.Questions.length - 1;
        setCurrentSubQuestionIndex(lastSubIndex);
        storageHelpers.saveState(
          LOCAL_STORAGE_KEYS.CURRENT_SUB_QUESTION,
          lastSubIndex
        );
      } else {
        setCurrentSubQuestionIndex(0);
        storageHelpers.saveState(LOCAL_STORAGE_KEYS.CURRENT_SUB_QUESTION, 0);
      }
      setSubmitted(false);
    }
  };

  useEffect(() => {
    persistState();
  }, [
    currentQuestionIndex,
    currentSubQuestionIndex,
    selectedAnswer,
    selectedSubAnswers,
    submitted,
    results,
    attemptedQuestions,
  ]);

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const questionKey = `${currentQuestionIndex}${
      isNextGen ? `-${currentSubQuestionIndex}` : ""
    }`;

    // Check if this question has already been attempted
    if (!attemptedQuestions.includes(questionKey)) {
      setAttemptedQuestions((prev) => [...prev, questionKey]);

      if (currentQuestion.type === "traditional") {
        const isCorrect =
          currentQuestion.correctAnswers.includes(selectedAnswer);
        updateResults(isCorrect);
      } else {
        const subQuestion = currentQuestion.Questions[currentSubQuestionIndex];
        let isCorrect = false;

        switch (subQuestion?.format || subQuestion?.questionFormat) {
          case "mcq":
            isCorrect = subQuestion.correctAnswers.includes(
              selectedSubAnswers[currentSubQuestionIndex]
            );
            break;
          case "sata":
            isCorrect = selectedSubAnswers[currentSubQuestionIndex]?.every(
              (ans) => subQuestion.correctAnswers.includes(ans)
            );
            break;
          default:
            if (!subQuestion?.format && !subQuestion?.questionFormat) {
              console.error("Missing format for sub-question:", subQuestion);
              return;
            }
            isCorrect = subQuestion.correctAnswers.includes(
              selectedSubAnswers[currentSubQuestionIndex]
            );
        }

        updateResults(isCorrect ? 1 : 0, 1);
      }
    }

    setSubmitted(true);
  };

  // Add a new function to handle navigation between sub-questions
  const handleNextSubQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentSubQuestionIndex < currentQuestion.Questions.length - 1) {
      // Move to next sub-question
      setCurrentSubQuestionIndex((prev) => prev + 1);
      setSubmitted(false);
    } else {
      // All sub-questions completed, move to next main question
      setCurrentQuestionIndex((prev) => prev + 1);
      setCurrentSubQuestionIndex(0);
      setSelectedAnswer("");
      setSelectedSubAnswers({});
      setSubmitted(false);
    }
  };

  const updateResults = (correct, totalSubQuestions = 1) => {
    setResults((prev) => ({
      ...prev,
      attempted: prev.attempted + 1,
      correct: prev.correct + correct,
      incorrect: prev.incorrect + (totalSubQuestions - correct),
    }));
  };

  useEffect(() => {
    const trad = questions?.filter(
      (question) => question.type === "traditional"
    ).length;
    const nextgen = questions?.filter(
      (question) => question.type === "nextgen"
    );

    const nexttotal = nextgen.reduce((total, item) => {
      return total + (item.Questions?.length || 0); // Add length of Questions array in each object
    }, 0);
    settotttal(trad + nexttotal);
  }, [questions]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextQuestion = questions[currentQuestionIndex + 1];
      setCurrentQuestionIndex((prev) => prev + 1);
      // Reset sub-question index only if next question is a case study
      if (nextQuestion.type === "nextgen") {
        setCurrentSubQuestionIndex(0);
      }
      setSelectedAnswer("");
      setSelectedSubAnswers({});
      setSubmitted(false);

      // Persist the state immediately
      storageHelpers.saveState(
        LOCAL_STORAGE_KEYS.CURRENT_QUESTION,
        currentQuestionIndex + 1
      );
      storageHelpers.saveState(LOCAL_STORAGE_KEYS.CURRENT_SUB_QUESTION, 0);
    } else {
      setExamCompleted(true);
      const savedStartTime = localStorage.getItem("examStartTime");
      const elapsed = Math.floor((Date.now() - savedStartTime) / 1000);
      console.log("settimetaken", elapsed);
      const hours = Math.floor(elapsed / 3600); // 1 hour = 3600 seconds
      const minutes = Math.floor((elapsed % 3600) / 60); // 1 minute = 60 seconds
      const seconds = elapsed % 60; // Remaining seconds

      console.log(
        `${hours} hour(s), ${minutes} minute(s), ${seconds} second(s)`
      );
      settimetaken(
        ` ${hours < 10 ? "0" + hours : hours}:${
          minutes < 10 ? "0" + minutes : minutes
        }:${seconds < 10 ? "0" + seconds : seconds}`
      );
      const data = {
        examId: id,
        totalCorrectAnswers: parseInt(results?.correct),
        totalIncorrectAnswers: parseInt(results.incorrect),
        percentage: parseInt(percentage),
        totalTimeTaken: parseInt(elapsed),
      };
      dispatch(resultpost(data)).then((res) => {
        console.log("resultpost", res);
      });
      localStorage.removeItem("startcheck");
      // Handle exam completion
      localStorage.removeItem("examStartTime");
      localStorage.removeItem("currentQuestionIndex");
      localStorage.removeItem("studentAnswers");
      localStorage.removeItem("studentSubAnswers");
      localStorage.removeItem("submittedStatus");
      localStorage.removeItem("examResults");
      localStorage.removeItem("attemptedQuestions");
      localStorage.removeItem("currentSubQuestionIndex");
    }
  };
  useEffect(() => {
    setLoading(true);
    dispatch(getStudentResult(id)).then((res) => {
      setLoading(false);
    });
  }, []);
  // Add this helper function for bowtie answer checking
  const checkBowtieAnswers = (correctAnswers, userAnswers) => {
    if (!correctAnswers || !userAnswers) return false;

    // Check if issue is correct
    const issueCorrect = correctAnswers.issue === userAnswers.issue;

    // Check if actions are correct (order doesn't matter)
    const actionsCorrect =
      correctAnswers?.actions?.length === userAnswers?.actions?.length &&
      correctAnswers?.actions?.every((action) =>
        userAnswers.actions.includes(action)
      );

    // Check if outcomes are correct (order doesn't matter)
    const outcomesCorrect =
      correctAnswers?.outcomes?.length === userAnswers?.outcomes?.length &&
      correctAnswers?.outcomes?.every((outcome) =>
        userAnswers.outcomes.includes(outcome)
      );

    return issueCorrect && actionsCorrect && outcomesCorrect;
  };
  const percentage = Math.round((results.correct / totttal) * 100);
  if (examCompleted) {
    return (
      <>
        <div className="result-screen">
          <div className="result-card">
            <h2>Exam Completed!</h2>
            <div className="circular-progress">
              <svg>
                <circle className="bg" cx="100" cy="100" r="90"></circle>
                <circle
                  className="progress"
                  cx="100"
                  cy="100"
                  r="90"
                  style={{
                    strokeDashoffset:
                      565.48 -
                      (565.48 *
                        (percentage ? percentage : studentresult?.percentage)) /
                        100,
                  }}
                ></circle>
              </svg>
              <div className="percentage">
                {percentage ? percentage : studentresult?.percentage}%
              </div>
            </div>

            <div
              style={{
                padding: "10x",
                width: "100%",
                background: "#000000",
                color: "whte",
              }}
            >
              <p style={{ textAlign: "center" }}>{timetaken}</p>
            </div>

            <div className="result-stats">
              <div className="stat-item correct">
                <span>
                  {results.correct
                    ? results?.correct
                    : studentresult?.totalCorrectAnswers}
                </span>
                <p>Correct</p>
              </div>
              <div className="stat-item incorrect">
                <span>
                  {results.incorrect
                    ? results.incorrect
                    : studentresult?.totalIncorrectAnswers}
                </span>
                <p>Incorrect</p>
              </div>
              <div className="stat-item total">
                <span>{totttal}</span>
                <p>Total</p>
              </div>
            </div>

            {/* <button
                            className="close-btn"
                            onClick={() => {
                                localStorage.removeItem('examResults');
                                
                            }}
                        >
                            Close
                        </button> */}
          </div>
        </div>
      </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isNextGen = currentQuestion?.type === "nextgen";
  const allSubQuestionsAnswered =
    isNextGen &&
    currentQuestion.Questions?.every(
      (_, i) => selectedSubAnswers[i] !== undefined
    );

  if (loading || !currentQuestion) return <div>Loading questions...</div>;

  // Add this modal component before the main return
  if (showExamModal) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Exam Details</h2>
          <div className="exam-info">
            <h3>{examName || "Exam"}</h3>
            <p>{description || "No description available"}</p>
            <div className="exam-meta">
              <p>Total Questions: {totttal}</p>
              <p>Would you like to start Exam?</p>
            </div>
          </div>
          <div className="modal-actions">
            <button onClick={handleExamStart} className="start-btn">
              Start Exam
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Add this helper function for matrix answer checking
  const checkMatrixAnswers = (correctAnswers, userAnswers) => {
    if (
      !correctAnswers ||
      !userAnswers ||
      correctAnswers.length !== userAnswers.length
    ) {
      return false;
    }

    // Check if all user answers match correct answers
    return correctAnswers.every((correct) => {
      const matchingUserAnswer = userAnswers.find(
        (user) => user.row === correct.row
      );
      if (!matchingUserAnswer) return false;

      // Check if options match
      return (
        correct.option.every((opt) =>
          matchingUserAnswer.option.includes(opt)
        ) &&
        matchingUserAnswer.option.every((opt) => correct.option.includes(opt))
      );
    });
  };

  const handleExamCompletion = () => {
    setExamCompleted(true);
    const savedStartTime = storageHelpers.loadState(
      LOCAL_STORAGE_KEYS.EXAM_START_TIME
    );
    const elapsed = Math.floor((Date.now() - savedStartTime) / 1000);

    const formattedTime = formatTime(elapsed);
    settimetaken(formattedTime);

    const data = {
      examId: id,
      totalCorrectAnswers: parseInt(results?.correct),
      totalIncorrectAnswers: parseInt(results.incorrect),
      percentage: parseInt(percentage),
      totalTimeTaken: parseInt(elapsed),
    };

    dispatch(resultpost(data))
      .then((res) => {
        console.log("resultpost", res);
        // Clear all exam-related data from localStorage
        storageHelpers.clearExamState();
      })
      .catch((error) => {
        console.error("Error posting results:", error);
        // Handle error appropriately
      });
  };

  return (
    <div className="exam-page-container">
      <header className="exam-header">
        <div className="header-content">
          <h2>{questionsData?.title || "Student Exam"}</h2>
          <Timer status={questionsData?.status} />
        </div>
      </header>
      <div className="question-container">
        <Timer status={questionsData?.status} />

        <div className="results" style={{ color: "#000000" }}>
          <h3>Progress:</h3>
          <p>Total Questions: {totttal}</p>
          <p>Correct: {results?.correct}</p>
          <p>Incorrect: {results?.incorrect}</p>
          <p>Attempted: {results?.incorrect + results?.correct}</p>
        </div>

        <div
          className="progress"
          style={{ color: "#000000", padding: "10px", height: "unset" }}
        >
          {isNextGen
            ? `Question ${currentQuestionIndex + 1}.${
                currentSubQuestionIndex + 1
              } of ${questions.length} (Case Study)`
            : `Question ${currentQuestionIndex + 1} of ${questions.length}`}
        </div>

        {isNextGen ? (
          // NextGen Case Study Layout - Modified to show one sub-question at a time
          <div className="case-study-container">
            <div className="case-study">
              <h3>Case Study:</h3>
              <pre>{currentQuestion.caseStudy}</pre>
            </div>

            <div className="sub-question-navigation">
              <p>
                Sub-question {currentSubQuestionIndex + 1} of{" "}
                {currentQuestion.Questions.length}
              </p>
            </div>

            {(() => {
              const subQuestion =
                currentQuestion.Questions[currentSubQuestionIndex];
              console.log("Current Question:", currentQuestion);
              console.log("Current Sub Question:", subQuestion);
              console.log("Current Sub Question Format:", subQuestion?.format);
              console.log(
                "Current Sub Question Index:",
                currentSubQuestionIndex
              );

              switch (subQuestion?.format || subQuestion?.questionFormat) {
                case "mcq":
                  return (
                    <div className="sub-question">
                      <h4>{subQuestion.question}</h4>
                      <div className="options">
                        {Array.isArray(subQuestion.options) &&
                          subQuestion.options.map((option, optIndex) => (
                            <button
                              key={optIndex}
                              onClick={() =>
                                !submitted &&
                                setSelectedSubAnswers((prev) => ({
                                  ...prev,
                                  [currentSubQuestionIndex]: option,
                                }))
                              }
                              disabled={submitted}
                              style={{
                                backgroundColor: submitted
                                  ? subQuestion.correctAnswers?.includes(option)
                                    ? "#90EE90" // Green if correct
                                    : selectedSubAnswers[
                                        currentSubQuestionIndex
                                      ] === option
                                    ? "#FFCCCB" // Red if incorrect
                                    : "white"
                                  : selectedSubAnswers[
                                      currentSubQuestionIndex
                                    ] === option
                                  ? "#e6f7ff" // Light blue for selection (not submitted)
                                  : "white",
                                cursor: submitted ? "not-allowed" : "pointer",
                                width: "100%",
                                marginBottom: "8px",
                                textAlign: "left",
                                padding: "12px",
                                borderRadius: "4px",
                                border: "1px solid #d9d9d9",
                              }}
                            >
                              {option}
                            </button>
                          ))}
                      </div>
                      {submitted && (
                        <div className="explanation">
                          <p>
                            {subQuestion.correctAnswers?.includes(
                              selectedSubAnswers[currentSubQuestionIndex]
                            )
                              ? "✓ Correct!"
                              : `✗ Incorrect. The correct answer is: ${
                                  subQuestion.correctAnswers?.[0] ||
                                  "Not available"
                                }`}
                          </p>
                        </div>
                      )}
                    </div>
                  );

                case "sata":
                  return (
                    <div className="sub-question">
                      <h4>{subQuestion.question}</h4>
                      <p className="instruction">Select all that apply:</p>
                      <div className="options sata-options">
                        {subQuestion.options?.map((option, optIndex) => {
                          // Initialize array for this sub-question if it doesn't exist
                          const currentSelections =
                            selectedSubAnswers[currentSubQuestionIndex] || [];
                          const isSelected = currentSelections.includes(option);

                          return (
                            <div key={optIndex} className="sata-option">
                              <input
                                type="checkbox"
                                id={`option-${optIndex}`}
                                checked={isSelected}
                                onChange={() => {
                                  if (submitted) return;

                                  setSelectedSubAnswers((prev) => {
                                    const current =
                                      prev[currentSubQuestionIndex] || [];
                                    const updated = isSelected
                                      ? current.filter(
                                          (item) => item !== option
                                        )
                                      : [...current, option];

                                    return {
                                      ...prev,
                                      [currentSubQuestionIndex]: updated,
                                    };
                                  });
                                }}
                                disabled={submitted}
                              />
                              <label
                                htmlFor={`option-${optIndex}`}
                                style={{
                                  backgroundColor: submitted
                                    ? subQuestion.correctAnswers?.includes(
                                        option
                                      )
                                      ? "#90EE90" // Green if correct
                                      : isSelected
                                      ? "#FFCCCB" // Red if incorrect
                                      : "white"
                                    : isSelected
                                    ? "#e6f7ff" // Light blue for selection
                                    : "white",
                                }}
                              >
                                {option}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );

                case "cloze":
                  return (
                    <div className="sub-question">
                      <h4>{subQuestion.question}</h4>
                      <p className="instruction">
                        Select the correct option from the dropdown:
                      </p>

                      <div className="cloze-container">
                        <select
                          className="cloze-dropdown"
                          value={
                            selectedSubAnswers[currentSubQuestionIndex] || ""
                          }
                          onChange={(e) => {
                            if (submitted) return;
                            setSelectedSubAnswers((prev) => ({
                              ...prev,
                              [currentSubQuestionIndex]: e.target.value,
                            }));
                          }}
                          disabled={submitted}
                          style={{
                            backgroundColor: submitted
                              ? subQuestion.correctAnswers?.includes(
                                  selectedSubAnswers[currentSubQuestionIndex]
                                )
                                ? "#90EE90" // Green if correct
                                : "#FFCCCB" // Red if incorrect
                              : "white",
                          }}
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          {subQuestion.options?.map((option, optIndex) => (
                            <option key={optIndex} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        {submitted && (
                          <div className="cloze-feedback">
                            <p>
                              {subQuestion.correctAnswers?.includes(
                                selectedSubAnswers[currentSubQuestionIndex]
                              )
                                ? "✓ Correct!"
                                : `✗ Incorrect. The correct answer is: ${subQuestion.correctAnswers[0]}`}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );

                case "drag-drop":
                  return (
                    <div className="sub-question">
                      <h4>{subQuestion.question}</h4>
                      <p className="instruction">
                        Drag and drop the correct answer:
                      </p>

                      <div className="drag-drop-container">
                        <div className="drag-options">
                          {subQuestion.dragDropOptions?.map(
                            (option, optIndex) => (
                              <div
                                key={optIndex}
                                className="drag-item"
                                draggable={!submitted}
                                onDragStart={(e) => {
                                  if (submitted) return;
                                  e.dataTransfer.setData("text/plain", option);
                                }}
                                style={{
                                  cursor: submitted ? "not-allowed" : "grab",
                                  opacity:
                                    selectedSubAnswers[
                                      currentSubQuestionIndex
                                    ] === option
                                      ? 0.5
                                      : 1,
                                }}
                              >
                                {option}
                              </div>
                            )
                          )}
                        </div>

                        <div
                          className="drop-zone"
                          onDragOver={(e) => {
                            if (submitted) return;
                            e.preventDefault();
                          }}
                          onDrop={(e) => {
                            if (submitted) return;
                            e.preventDefault();
                            const droppedItem =
                              e.dataTransfer.getData("text/plain");
                            setSelectedSubAnswers((prev) => ({
                              ...prev,
                              [currentSubQuestionIndex]: droppedItem,
                            }));
                          }}
                          style={{
                            backgroundColor: submitted
                              ? subQuestion.correctAnswers?.includes(
                                  selectedSubAnswers[currentSubQuestionIndex]
                                )
                                ? "#90EE90" // Green if correct
                                : "#FFCCCB" // Red if incorrect
                              : "#f5f5f5",
                          }}
                        >
                          {selectedSubAnswers[currentSubQuestionIndex] ||
                            "Drop your answer here"}

                          {submitted && (
                            <div className="correct-answer">
                              <p>
                                Correct answer: {subQuestion.correctAnswers[0]}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );

                case "highlight":
                  return (
                    <div className="sub-question">
                      <h4>{subQuestion.question}</h4>
                      <p className="instruction">
                        Hover over text and click to highlight your answer:
                      </p>

                      <div className="highlight-container">
                        <div
                          className="highlight-text"
                          dangerouslySetInnerHTML={{
                            __html: currentQuestion.caseStudy
                              .split(" ")
                              .map((word, index) => {
                                const isSelected =
                                  selectedSubAnswers[
                                    currentSubQuestionIndex
                                  ] === word;
                                return `<span 
                                                            class="highlight-word ${
                                                              isSelected
                                                                ? "selected"
                                                                : ""
                                                            }" 
                                                            data-word="${word}"
                                                            style="${
                                                              submitted &&
                                                              subQuestion.correctAnswers.includes(
                                                                word
                                                              )
                                                                ? "background-color: #90EE90;"
                                                                : ""
                                                            }"
                                                        >${word}</span>`;
                              })
                              .join(" "),
                          }}
                          onClick={(e) => {
                            if (submitted) return;

                            if (e.target.classList.contains("highlight-word")) {
                              const word = e.target.getAttribute("data-word");
                              setSelectedSubAnswers((prev) => ({
                                ...prev,
                                [currentSubQuestionIndex]: word,
                              }));
                            }
                          }}
                        />

                        <div className="selected-highlight">
                          {selectedSubAnswers[currentSubQuestionIndex] && (
                            <div>
                              <p>
                                Your selection:{" "}
                                <span className="highlight-selection">
                                  {selectedSubAnswers[currentSubQuestionIndex]}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>

                        {submitted && (
                          <div
                            className="highlight-feedback"
                            style={{
                              backgroundColor:
                                subQuestion.correctAnswers?.includes(
                                  selectedSubAnswers[currentSubQuestionIndex]
                                )
                                  ? "#90EE90" // Green if correct
                                  : "#FFCCCB", // Red if incorrect
                            }}
                          >
                            <p>
                              {subQuestion.correctAnswers?.includes(
                                selectedSubAnswers[currentSubQuestionIndex]
                              )
                                ? "✓ Correct!"
                                : `✗ Incorrect. The correct answer is: "${subQuestion.correctAnswers[0]}"`}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );

                case "matrix":
                  return (
                    <div className="sub-question">
                      <h4>{subQuestion.question}</h4>
                      <p className="instruction">Select one option per row:</p>

                      <div className="matrix-container">
                        <table className="matrix-table">
                          <thead>
                            <tr>
                              <th></th>
                              {subQuestion.matrixData[0]?.options.map(
                                (option, optIndex) => (
                                  <th key={optIndex}>{option}</th>
                                )
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {subQuestion.matrixData.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                <td className="row-label">{row.label}</td>
                                {row.options.map((option, optIndex) => {
                                  // Initialize matrix answers if not already set
                                  const matrixAnswers =
                                    selectedSubAnswers[
                                      currentSubQuestionIndex
                                    ] || [];
                                  const isSelected = matrixAnswers.some(
                                    (ans) =>
                                      ans.row === rowIndex.toString() &&
                                      ans.option.includes(option)
                                  );

                                  // Check if this is a correct answer
                                  const isCorrect =
                                    submitted &&
                                    subQuestion.matrixDataAnswer.some(
                                      (ans) =>
                                        ans.row === rowIndex.toString() &&
                                        ans.option.includes(option)
                                    );

                                  return (
                                    <td
                                      key={optIndex}
                                      className={`matrix-cell ${
                                        isSelected ? "selected" : ""
                                      } ${
                                        submitted && isCorrect ? "correct" : ""
                                      }`}
                                      onClick={() => {
                                        if (submitted) return;

                                        setSelectedSubAnswers((prev) => {
                                          // Get current answers or initialize empty array
                                          const current =
                                            prev[currentSubQuestionIndex] || [];

                                          // Remove any existing selection for this row
                                          const filtered = current.filter(
                                            (ans) =>
                                              ans.row !== rowIndex.toString()
                                          );

                                          // Add new selection
                                          const newSelection = {
                                            row: rowIndex.toString(),
                                            option: [option],
                                            _id: row._id,
                                          };

                                          return {
                                            ...prev,
                                            [currentSubQuestionIndex]: [
                                              ...filtered,
                                              newSelection,
                                            ],
                                          };
                                        });
                                      }}
                                      style={{
                                        backgroundColor: submitted
                                          ? isCorrect
                                            ? "#90EE90" // Green if correct
                                            : isSelected
                                            ? "#FFCCCB" // Red if incorrect selection
                                            : "white"
                                          : isSelected
                                          ? "#e6f7ff" // Light blue for selection
                                          : "white",
                                        cursor: submitted
                                          ? "default"
                                          : "pointer",
                                      }}
                                    >
                                      {isSelected && (
                                        <span className="checkmark">✓</span>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {submitted && (
                          <div className="matrix-feedback">
                            <p>
                              {checkMatrixAnswers(
                                subQuestion.matrixDataAnswer,
                                selectedSubAnswers[currentSubQuestionIndex] ||
                                  []
                              )
                                ? "✓ Correct!"
                                : "✗ Incorrect. See the correct answers highlighted in green."}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                case "ranking":
                  return (
                    <div className="sub-question">
                      <h4>{subQuestion.question}</h4>
                      <p className="instruction">
                        Drag and reorder the items in the correct sequence:
                      </p>

                      <div className="ranking-container">
                        {!selectedSubAnswers[currentSubQuestionIndex] ? (
                          // Initialize with shuffled options if not already set
                          (() => {
                            if (!submitted) {
                              // Create a shuffled copy of the options
                              const shuffled = [...subQuestion.options].sort(
                                () => Math.random() - 0.5
                              );

                              // Set as initial state
                              setTimeout(() => {
                                setSelectedSubAnswers((prev) => ({
                                  ...prev,
                                  [currentSubQuestionIndex]: shuffled,
                                }));
                              }, 0);
                            }
                            return <div>Loading ranking items...</div>;
                          })()
                        ) : (
                          <div className="ranking-list">
                            {selectedSubAnswers[currentSubQuestionIndex].map(
                              (item, index) => (
                                <div
                                  key={index}
                                  className="ranking-item"
                                  draggable={!submitted}
                                  onDragStart={(e) => {
                                    if (submitted) return;
                                    e.dataTransfer.setData("text/plain", index);
                                  }}
                                  onDragOver={(e) => {
                                    if (submitted) return;
                                    e.preventDefault();
                                  }}
                                  onDrop={(e) => {
                                    if (submitted) return;
                                    e.preventDefault();
                                    const draggedIndex = parseInt(
                                      e.dataTransfer.getData("text/plain")
                                    );
                                    const targetIndex = index;

                                    if (draggedIndex === targetIndex) return;

                                    setSelectedSubAnswers((prev) => {
                                      const items = [
                                        ...prev[currentSubQuestionIndex],
                                      ];
                                      const draggedItem = items[draggedIndex];

                                      // Remove the dragged item
                                      items.splice(draggedIndex, 1);

                                      // Insert at the new position
                                      items.splice(targetIndex, 0, draggedItem);

                                      return {
                                        ...prev,
                                        [currentSubQuestionIndex]: items,
                                      };
                                    });
                                  }}
                                  style={{
                                    backgroundColor: submitted
                                      ? subQuestion.correctAnswers[index] ===
                                        item
                                        ? "#90EE90" // Green if in correct position
                                        : "#FFCCCB" // Red if in wrong position
                                      : "#f0f0f0",
                                    cursor: submitted ? "default" : "grab",
                                  }}
                                >
                                  <div className="ranking-number">
                                    {index + 1}
                                  </div>
                                  <div className="ranking-content">{item}</div>
                                  {!submitted && (
                                    <div className="ranking-handle">
                                      <span>⋮⋮</span>
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        )}

                        {submitted && (
                          <div
                            className="ranking-feedback"
                            style={{
                              backgroundColor:
                                JSON.stringify(
                                  selectedSubAnswers[currentSubQuestionIndex]
                                ) === JSON.stringify(subQuestion.correctAnswers)
                                  ? "#f6ffed" // Light green if correct
                                  : "#fff1f0", // Light red if incorrect
                            }}
                          >
                            <p>
                              {JSON.stringify(
                                selectedSubAnswers[currentSubQuestionIndex]
                              ) === JSON.stringify(subQuestion.correctAnswers)
                                ? "✓ Correct!"
                                : "✗ Incorrect. See the correct order highlighted in green."}
                            </p>

                            {JSON.stringify(
                              selectedSubAnswers[currentSubQuestionIndex]
                            ) !==
                              JSON.stringify(subQuestion.correctAnswers) && (
                              <div className="correct-ranking">
                                <p>
                                  <strong>Correct order:</strong>
                                </p>
                                <ol>
                                  {subQuestion.correctAnswers.map(
                                    (item, index) => (
                                      <li key={index}>{item}</li>
                                    )
                                  )}
                                </ol>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );

                case "fillblank":
                  return (
                    <div className="sub-question">
                      <h4>{subQuestion.question}</h4>
                      <p className="instruction">
                        Type your answer in the blank field:
                      </p>

                      <div className="fillblank-container">
                        <input
                          type="text"
                          className="fillblank-input"
                          value={
                            selectedSubAnswers[currentSubQuestionIndex] || ""
                          }
                          onChange={(e) => {
                            if (submitted) return;
                            setSelectedSubAnswers((prev) => ({
                              ...prev,
                              [currentSubQuestionIndex]: e.target.value,
                            }));
                          }}
                          placeholder="Enter your answer here"
                          disabled={submitted}
                          style={{
                            borderColor: submitted
                              ? subQuestion.correctAnswers?.some(
                                  (answer) =>
                                    answer.toLowerCase() ===
                                    (
                                      selectedSubAnswers[
                                        currentSubQuestionIndex
                                      ] || ""
                                    ).toLowerCase()
                                )
                                ? "#52c41a" // Green border if correct
                                : "#f5222d" // Red border if incorrect
                              : "#d9d9d9",
                          }}
                        />

                        {submitted && (
                          <div
                            className="fillblank-feedback"
                            style={{
                              backgroundColor: subQuestion.correctAnswers?.some(
                                (answer) =>
                                  answer.toLowerCase() ===
                                  (
                                    selectedSubAnswers[
                                      currentSubQuestionIndex
                                    ] || ""
                                  ).toLowerCase()
                              )
                                ? "#f6ffed" // Light green background if correct
                                : "#fff1f0", // Light red background if incorrect
                            }}
                          >
                            <p>
                              {subQuestion.correctAnswers?.some(
                                (answer) =>
                                  answer.toLowerCase() ===
                                  (
                                    selectedSubAnswers[
                                      currentSubQuestionIndex
                                    ] || ""
                                  ).toLowerCase()
                              )
                                ? "✓ Correct!"
                                : `✗ Incorrect. The correct answer is: "${subQuestion.correctAnswers[0]}"`}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                // ... existing bowtie case code ...
                case "bowtie":
                  return (
                    <div className="sub-question">
                      <h4>{subQuestion.question}</h4>
                      <p className="instruction">
                        Complete the Bow-Tie diagram by selecting the clinical
                        issue, two priority actions, and two potential outcomes:
                      </p>

                      <div className="bowtie-container">
                        <div className="bowtie-diagram">
                          <div className="bowtie-actions">
                            <h5>Priority Actions</h5>
                            <ul>
                              {subQuestion.bowtieData?.actions.map(
                                (action, index) => {
                                  // Check if this action is selected
                                  const selectedAnswers = selectedSubAnswers[
                                    currentSubQuestionIndex
                                  ] || { actions: [], issue: "", outcomes: [] };
                                  const isSelected =
                                    selectedAnswers.actions?.includes(action);

                                  return (
                                    <li
                                      key={index}
                                      className={`bowtie-item ${
                                        isSelected ? "selected" : ""
                                      } ${
                                        submitted &&
                                        subQuestion.correctAnswers?.actions?.includes(
                                          action
                                        )
                                          ? "correct"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        if (submitted) return;

                                        setSelectedSubAnswers((prev) => {
                                          const current = prev[
                                            currentSubQuestionIndex
                                          ] || {
                                            actions: [],
                                            issue: "",
                                            outcomes: [],
                                          };
                                          let updatedActions = [
                                            ...current.actions,
                                          ];

                                          if (isSelected) {
                                            // Remove if already selected
                                            updatedActions =
                                              updatedActions.filter(
                                                (a) => a !== action
                                              );
                                          } else if (
                                            updatedActions.length < 2
                                          ) {
                                            // Add if less than 2 actions are selected
                                            updatedActions.push(action);
                                          }

                                          return {
                                            ...prev,
                                            [currentSubQuestionIndex]: {
                                              ...current,
                                              actions: updatedActions,
                                            },
                                          };
                                        });
                                      }}
                                      style={{
                                        cursor: submitted
                                          ? "default"
                                          : "pointer",
                                        backgroundColor: submitted
                                          ? subQuestion.correctAnswers?.actions?.includes(
                                              action
                                            )
                                            ? "#90EE90" // Green if correct
                                            : isSelected
                                            ? "#FFCCCB" // Red if incorrect selection
                                            : "#f0f0f0"
                                          : isSelected
                                          ? "#e6f7ff" // Light blue for selection
                                          : "#f0f0f0",
                                      }}
                                    >
                                      {action}
                                      {isSelected && (
                                        <span className="selection-indicator">
                                          ✓
                                        </span>
                                      )}
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                            <p className="selection-hint">
                              Select 2 priority actions
                            </p>
                          </div>

                          <div
                            className="bowtie-issue"
                            onClick={() => {
                              if (submitted) return;

                              setSelectedSubAnswers((prev) => {
                                const current = prev[
                                  currentSubQuestionIndex
                                ] || { actions: [], issue: "", outcomes: [] };

                                return {
                                  ...prev,
                                  [currentSubQuestionIndex]: {
                                    ...current,
                                    issue: subQuestion.bowtieData.issue,
                                  },
                                };
                              });
                            }}
                            style={{
                              cursor: submitted ? "default" : "pointer",
                              backgroundColor: submitted
                                ? subQuestion.correctAnswers?.issue ===
                                  subQuestion.bowtieData.issue
                                  ? "#90EE90" // Green if correct
                                  : selectedSubAnswers[currentSubQuestionIndex]
                                      ?.issue === subQuestion.bowtieData.issue
                                  ? "#FFCCCB" // Red if incorrect
                                  : "#ffeb3b"
                                : selectedSubAnswers[currentSubQuestionIndex]
                                    ?.issue === subQuestion.bowtieData.issue
                                ? "#e6f7ff" // Light blue for selection
                                : "#ffeb3b",
                            }}
                          >
                            <div className="issue-content">
                              <h5>Clinical Issue</h5>
                              <p>{subQuestion.bowtieData?.issue}</p>
                              {selectedSubAnswers[currentSubQuestionIndex]
                                ?.issue === subQuestion.bowtieData.issue && (
                                <span className="selection-indicator">✓</span>
                              )}
                            </div>
                          </div>

                          <div className="bowtie-outcomes">
                            <h5>Potential Outcomes</h5>
                            <ul>
                              {subQuestion.bowtieData?.outcomes.map(
                                (outcome, index) => {
                                  // Check if this outcome is selected
                                  const selectedAnswers = selectedSubAnswers[
                                    currentSubQuestionIndex
                                  ] || { actions: [], issue: "", outcomes: [] };
                                  const isSelected =
                                    selectedAnswers.outcomes?.includes(outcome);

                                  return (
                                    <li
                                      key={index}
                                      className={`bowtie-item ${
                                        isSelected ? "selected" : ""
                                      } ${
                                        submitted &&
                                        subQuestion.correctAnswers?.outcomes?.includes(
                                          outcome
                                        )
                                          ? "correct"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        if (submitted) return;

                                        setSelectedSubAnswers((prev) => {
                                          const current = prev[
                                            currentSubQuestionIndex
                                          ] || {
                                            actions: [],
                                            issue: "",
                                            outcomes: [],
                                          };
                                          let updatedOutcomes = [
                                            ...current.outcomes,
                                          ];

                                          if (isSelected) {
                                            // Remove if already selected
                                            updatedOutcomes =
                                              updatedOutcomes.filter(
                                                (o) => o !== outcome
                                              );
                                          } else if (
                                            updatedOutcomes.length < 2
                                          ) {
                                            // Add if less than 2 outcomes are selected
                                            updatedOutcomes.push(outcome);
                                          }

                                          return {
                                            ...prev,
                                            [currentSubQuestionIndex]: {
                                              ...current,
                                              outcomes: updatedOutcomes,
                                            },
                                          };
                                        });
                                      }}
                                      style={{
                                        cursor: submitted
                                          ? "default"
                                          : "pointer",
                                        backgroundColor: submitted
                                          ? subQuestion.correctAnswers?.outcomes?.includes(
                                              outcome
                                            )
                                            ? "#90EE90" // Green if correct
                                            : isSelected
                                            ? "#FFCCCB" // Red if incorrect selection
                                            : "#f0f0f0"
                                          : isSelected
                                          ? "#e6f7ff" // Light blue for selection
                                          : "#f0f0f0",
                                      }}
                                    >
                                      {outcome}
                                      {isSelected && (
                                        <span className="selection-indicator">
                                          ✓
                                        </span>
                                      )}
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                            <p className="selection-hint">
                              Select 2 potential outcomes
                            </p>
                          </div>
                        </div>

                        <div className="bowtie-selections-summary">
                          <h5>Your Selections:</h5>
                          <div className="selection-summary">
                            <p>
                              <strong>Clinical Issue:</strong>{" "}
                              {selectedSubAnswers[currentSubQuestionIndex]
                                ?.issue || "Not selected"}
                            </p>
                            <p>
                              <strong>Priority Actions:</strong>{" "}
                              {selectedSubAnswers[
                                currentSubQuestionIndex
                              ]?.actions?.join(", ") || "None selected"}{" "}
                              (
                              {selectedSubAnswers[currentSubQuestionIndex]
                                ?.actions?.length || 0}
                              /2)
                            </p>
                            <p>
                              <strong>Potential Outcomes:</strong>{" "}
                              {selectedSubAnswers[
                                currentSubQuestionIndex
                              ]?.outcomes?.join(", ") || "None selected"}{" "}
                              (
                              {selectedSubAnswers[currentSubQuestionIndex]
                                ?.outcomes?.length || 0}
                              /2)
                            </p>
                          </div>
                        </div>

                        {submitted && (
                          <div
                            className="bowtie-feedback"
                            style={{
                              backgroundColor: checkBowtieAnswers(
                                subQuestion.correctAnswers,
                                selectedSubAnswers[currentSubQuestionIndex] || {
                                  actions: [],
                                  issue: "",
                                  outcomes: [],
                                }
                              )
                                ? "#90EE90" // Green if correct
                                : "#FFCCCB", // Red if incorrect
                            }}
                          >
                            <p>
                              {checkBowtieAnswers(
                                subQuestion.correctAnswers,
                                selectedSubAnswers[currentSubQuestionIndex] || {
                                  actions: [],
                                  issue: "",
                                  outcomes: [],
                                }
                              )
                                ? "✓ Correct!"
                                : "✗ Incorrect. See the correct answers highlighted in green."}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );

                // Add cases for other formats as needed

                default:
                  if (!subQuestion?.format && !subQuestion?.questionFormat) {
                    console.error(
                      "Missing format for sub-question:",
                      subQuestion
                    );
                    return (
                      <div className="sub-question">
                        <h4>{subQuestion?.question}</h4>
                        <div className="options">
                          {Array.isArray(subQuestion?.options) &&
                            subQuestion?.options.map((option, optIndex) => (
                              <button
                                key={optIndex}
                                onClick={() =>
                                  !submitted &&
                                  setSelectedSubAnswers((prev) => ({
                                    ...prev,
                                    [currentSubQuestionIndex]: option,
                                  }))
                                }
                                disabled={submitted}
                                style={{
                                  backgroundColor: submitted
                                    ? subQuestion.correctAnswers?.includes(
                                        option
                                      )
                                      ? "#90EE90"
                                      : selectedSubAnswers[
                                          currentSubQuestionIndex
                                        ] === option
                                      ? "#FFCCCB"
                                      : "white"
                                    : selectedSubAnswers[
                                        currentSubQuestionIndex
                                      ] === option
                                    ? "#e6f7ff"
                                    : "white",
                                  cursor: submitted ? "not-allowed" : "pointer",
                                  width: "100%",
                                  marginBottom: "8px",
                                  textAlign: "left",
                                  padding: "12px",
                                  borderRadius: "4px",
                                  border: "1px solid #d9d9d9",
                                }}
                              >
                                {option}
                              </button>
                            ))}
                        </div>
                        {submitted && (
                          <div className="explanation">
                            <p>
                              {subQuestion.correctAnswers?.includes(
                                selectedSubAnswers[currentSubQuestionIndex]
                              )
                                ? "✓ Correct!"
                                : `✗ Incorrect. The correct answer is: ${
                                    subQuestion.correctAnswers?.[0] ||
                                    "Not available"
                                  }`}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <div className="sub-question">
                      <h4>{subQuestion?.question}</h4>
                      <p>
                        Question format "
                        {subQuestion?.format || subQuestion?.questionFormat}"
                        display not implemented yet.
                      </p>
                    </div>
                  );
              }
            })()}

            {submitted && (
              <div className="explanation">
                <p>
                  <strong>Explanation:</strong>{" "}
                  {(() => {
                    const currentSubQuestion = currentQuestion?.Questions[currentSubQuestionIndex];
                    console.log("Current Sub Question for Explanation:", currentSubQuestion);
                    return currentSubQuestion?.explanation || "No explanation available";
                  })()}
                </p>
              </div>
            )}
          </div>
        ) : (
          // Traditional Question Layout (unchanged)
          <div className="traditional-question" style={{ color: "#000000" }}>
            <div className="traditional-question">
              {currentQuestion?.caseStudy && (
                <div className="case-study">
                  <h3>Case Study:</h3>
                  <p>{currentQuestion?.caseStudy}</p>
                </div>
              )}

              <h3>{currentQuestion?.question}</h3>
              <div className="options">
                {currentQuestion?.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !submitted && setSelectedAnswer(option)}
                    disabled={submitted}
                    style={{
                      backgroundColor: submitted
                        ? currentQuestion.correctAnswers.includes(option)
                          ? "#90EE90"
                          : selectedAnswer === option
                          ? "#FFCCCB"
                          : "white"
                        : selectedAnswer === option
                        ? "#FFCCCB"
                        : "white",
                      cursor: submitted ? "not-allowed" : "pointer",
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {submitted && (
                <div className="explanation">
                  <h4>Explanation:</h4>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: currentQuestion.explanation,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {/* 
                <div className="controls">
                    {!submitted ? (
                        <button
                            onClick={handleSubmit}
                            disabled={isNextGen
                                ? !selectedSubAnswers[currentSubQuestionIndex]
                                : !selectedAnswer}
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            onClick={isNextGen && currentSubQuestionIndex < currentQuestion.Questions.length - 1
                                ? handleNextSubQuestion
                                : handleNext}
                        >
                            {isNextGen
                                ? (currentSubQuestionIndex < currentQuestion.Questions.length - 1
                                    ? 'Next Sub-Question'
                                    : currentQuestionIndex === questions.length - 1
                                        ? 'Finish'
                                        : 'Next Question')
                                : (currentQuestionIndex === questions.length - 1
                                    ? 'Finish'
                                    : 'Next')}
                        </button>
                    )}
                </div> */}
      </div>
      <footer className="exam-footer">
        <div className="footer-content">
          <button
            className="nav-btn prev-btn"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>

          {!submitted ? (
            <button
              className="nav-btn submit-btn"
              onClick={handleSubmit}
              disabled={
                isNextGen
                  ? !selectedSubAnswers[currentSubQuestionIndex]
                  : !selectedAnswer
              }
            >
              Submit
            </button>
          ) : (
            <button
              className="nav-btn next-btn"
              onClick={
                isNextGen &&
                currentSubQuestionIndex < currentQuestion.Questions.length - 1
                  ? handleNextSubQuestion
                  : handleNext
              }
            >
              {isNextGen &&
              currentSubQuestionIndex < currentQuestion.Questions.length - 1
                ? "Next Question"
                : currentQuestionIndex < questions.length - 1
                ? "Next"
                : "Finish Exam"}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Submission;
