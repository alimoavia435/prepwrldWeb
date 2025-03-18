import { useState, useEffect } from 'react';
import './Submittion.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentquestions } from '../../../services/redux/middleware/getStudentquestions';
import { resultpost } from '../../../services/redux/middleware/resultpost';

const Timer = ({ status, onComplete }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const savedStartTime = localStorage.getItem('examStartTime');
        const startTime = savedStartTime ? parseInt(savedStartTime) : Date.now();

        if (!savedStartTime) {
            localStorage.setItem('examStartTime', startTime.toString());
        }

        const interval = setInterval(() => {
            if (status !== 'ended' && !onComplete) {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                setTime(elapsed);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [status, onComplete]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return <div className="timer">Time Taken: {formatTime(time)}</div>;
};

const Submission = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const questionsData = useSelector(state => state?.getStudentquestions?.profile?.data);
    const [loading, setLoading] = useState(false);
    const [examCompleted, setExamCompleted] = useState(false);
    const [examEndTime, setExamEndTime] = useState(null);
    // Load persisted state from localStorage
    const loadPersistedState = () => ({
        currentIndex: parseInt(localStorage.getItem('currentQuestionIndex')) || 0,
        answers: JSON.parse(localStorage.getItem('studentAnswers')) || {},
        subAnswers: JSON.parse(localStorage.getItem('studentSubAnswers')) || {},
        submitted: JSON.parse(localStorage.getItem('submittedStatus')) || false,
        results: JSON.parse(localStorage.getItem('examResults')) || {
            total: 0,
            correct: 0,
            incorrect: 0,
            attempted: 0
        }
    });

    // State initialization with persisted data
    const persistedState = loadPersistedState();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(persistedState.currentIndex);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [selectedSubAnswers, setSelectedSubAnswers] = useState(persistedState.subAnswers);
    const [submitted, setSubmitted] = useState(persistedState.submitted);
    const [questions, setQuestions] = useState([]);
    const [results, setResults] = useState(persistedState.results);
    const [totttal, settotttal] = useState();
    const [timetaken, settimetaken] = useState();
    // Save state to localStorage
    const persistState = () => {
        localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
        localStorage.setItem('studentAnswers', JSON.stringify({ [currentQuestionIndex]: selectedAnswer }));
        localStorage.setItem('studentSubAnswers', JSON.stringify(selectedSubAnswers));
        localStorage.setItem('submittedStatus', submitted);
        localStorage.setItem('examResults', JSON.stringify(results));
    };

    useEffect(() => {
        setLoading(true);
        dispatch(getStudentquestions(id)).then(() => setLoading(false));
    }, [id, dispatch]);

    useEffect(() => {
        if (questionsData?.questions) {
            setQuestions(questionsData.questions);
            setResults(prev => ({
                ...prev,
                total: questionsData.questions.length,
            }));
        }
    }, [questionsData]);

    useEffect(() => {
        persistState();
    }, [currentQuestionIndex, selectedAnswer, selectedSubAnswers, submitted, results]);

    const handleSubmit = () => {
        const currentQuestion = questions[currentQuestionIndex];
        let correctCount = 0;

        if (currentQuestion.type === 'traditional') {
            const isCorrect = currentQuestion.correctAnswers.includes(selectedAnswer);
            updateResults(isCorrect);
        } else {
            const subQuestions = currentQuestion.Questions;
            Object.entries(selectedSubAnswers).forEach(([index, answer]) => {
                if (subQuestions[index].correctAnswers.includes(answer)) correctCount++;
            });
            updateResults(correctCount, subQuestions.length);
        }

        setSubmitted(true);
    };

    const updateResults = (correct, totalSubQuestions = 1) => {
        setResults(prev => ({
            ...prev,
            attempted: prev.attempted + 1,
            correct: prev.correct + correct,
            incorrect: prev.incorrect + (totalSubQuestions - correct)
        }));
    };

    useEffect(() => {
        const trad = questions?.filter(question => question.type === 'traditional').length;
        const nextgen = questions?.filter(question => question.type === 'nextgen');

        const nexttotal = nextgen.reduce((total, item) => {
            return total + (item.Questions?.length || 0); // Add length of Questions array in each object
        }, 0);
        settotttal(trad + nexttotal)
    }, [questions])

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer('');
            setSelectedSubAnswers({});
            setSubmitted(false);
        } else {
            setExamCompleted(true)
            const savedStartTime = localStorage.getItem('examStartTime');
            const elapsed = Math.floor((Date.now() - savedStartTime) / 1000);
            console.log("settimetaken", elapsed)
            const hours = Math.floor(elapsed / 3600); // 1 hour = 3600 seconds
            const minutes = Math.floor((elapsed % 3600) / 60); // 1 minute = 60 seconds
            const seconds = elapsed % 60; // Remaining seconds

            console.log(`${hours} hour(s), ${minutes} minute(s), ${seconds} second(s)`);
            settimetaken(` ${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`)
            const data = {
                examId: id,
                totalCorrectAnswers: parseInt(results?.correct),
                totalIncorrectAnswers: parseInt(results.incorrect),
                percentage: parseInt(percentage),
                totalTimeTaken: parseInt(elapsed)
            }
            dispatch(resultpost(data)).then((res) => {
                console.log("resultpost", res);
            })
            // Handle exam completion
            localStorage.removeItem('examStartTime');
            localStorage.removeItem('currentQuestionIndex');
            localStorage.removeItem('studentAnswers');
            localStorage.removeItem('studentSubAnswers');
            localStorage.removeItem('submittedStatus');
        }
    };
    const percentage = Math.round((results.correct / totttal) * 100);
    if (examCompleted) {
        return (
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
                                style={{ strokeDashoffset: 565.48 - (565.48 * percentage) / 100 }}
                            ></circle>
                        </svg>
                        <div className="percentage">{percentage}%</div>
                    </div>

                    <div style={{padding:"10x",width:"100%",background:"#000000",color:"whte"}}>
                        <p style={{textAlign:"center"}}>{timetaken}</p>
                    </div>

                    <div className="result-stats">
                        <div className="stat-item correct">
                            <span>{results.correct}</span>
                            <p>Correct</p>
                        </div>
                        <div className="stat-item incorrect">
                            <span>{results.incorrect}</span>
                            <p>Incorrect</p>
                        </div>
                        <div className="stat-item total">
                            <span>{totttal}</span>
                            <p>Total</p>
                        </div>
                    </div>

                    <button
                        className="close-btn"
                        onClick={() => {
                            localStorage.removeItem('examResults');
                            // Add navigation logic here if needed
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }
    const currentQuestion = questions[currentQuestionIndex];
    const isNextGen = currentQuestion?.type === 'nextgen';
    const allSubQuestionsAnswered = isNextGen &&
        currentQuestion.Questions?.every((_, i) => selectedSubAnswers[i] !== undefined);

    if (loading || !currentQuestion) return <div>Loading questions...</div>;

    return (
        <div className="question-container">
            <Timer status={questionsData?.status} />

            <div className="results" style={{ color: "#000000" }}>
                <h3>Progress:</h3>
                <p>Total Questions: {totttal}</p>
                <p>Correct: {results?.correct}</p>
                <p>Incorrect: {results?.incorrect}</p>
                <p>Attempted: {results?.incorrect + results?.correct}</p>
            </div>

            <div className="progress" style={{ color: "#000000", padding: "10px", height: "unset" }}>
                Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            {isNextGen ? (
                // NextGen Case Study Layout
                <div className="case-study-container">
                    <div className="case-study">
                        <h3>Case Study:</h3>
                        <pre>{currentQuestion.caseStudy}</pre>
                    </div>

                    <div className="sub-questions">
                        {currentQuestion.Questions?.map((subQ, subIndex) => (
                            <div key={subIndex} className="sub-question">
                                <h4>{subQ.question}</h4>
                                <div className="options">
                                    {subQ.options?.map((option, optIndex) => (
                                        <button
                                            key={optIndex}
                                            onClick={() => !submitted && setSelectedSubAnswers(prev => ({
                                                ...prev,
                                                [subIndex]: option
                                            }))}
                                            disabled={submitted}
                                            style={{
                                                backgroundColor: submitted
                                                    ? subQ.correctAnswers?.includes(option)
                                                        ? '#90EE90' // Green if the option is correct
                                                        : selectedSubAnswers[subIndex] === option
                                                            ? '#FFCCCB' // Red if the option is incorrect
                                                            : 'white'   // White for other options
                                                    : selectedSubAnswers[subIndex] === option
                                                        ? '#FFCCCB'   // Red for the selected answer if not submitted
                                                        : 'white',    // Default white background
                                                cursor: submitted ? 'not-allowed' : 'pointer' // Disable pointer if submitted
                                            }}

                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>

                                {submitted && (
                                    <div className="explanation">
                                        <p><strong>Explanation:</strong> {subQ.explanation}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                // Traditional Question Layout
                <div className="traditional-question" style={{ color: "#000000" }}>
                    {currentQuestion.caseStudy && (
                        <div className="case-study">
                            <h3>Case Study:</h3>
                            <p>{currentQuestion.caseStudy}</p>
                        </div>
                    )}

                    <h3>{currentQuestion.question}</h3>
                    <div className="options">
                        {currentQuestion.options?.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => !submitted && setSelectedAnswer(option)}
                                disabled={submitted}
                                style={{
                                    backgroundColor: submitted
                                        ? currentQuestion.correctAnswers?.includes(option)
                                            ? '#90EE90' // Green if the option is correct
                                            : selectedAnswer === option
                                                ? '#FFCCCB' // Red if the selected answer is incorrect
                                                : 'white'   // White for other options
                                        : selectedAnswer === option
                                            ? '#FFCCCB'   // Red for the selected answer if not submitted
                                            : 'white',    // Default white background
                                    cursor: submitted ? 'not-allowed' : 'pointer' // Disable pointer if submitted
                                }}

                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    {submitted && (
                        <div className="explanation">
                            <h4>Explanation:</h4>
                            <p dangerouslySetInnerHTML={{ __html: currentQuestion.explanation }} />
                        </div>
                    )}
                </div>
            )}

            <div className="controls">
                {!submitted ? (
                    <button
                        onClick={handleSubmit}
                        disabled={isNextGen ? !allSubQuestionsAnswered : !selectedAnswer}
                    >
                        Submit
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                    // disabled={currentQuestionIndex === questions.length - 1}
                    >
                        {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Submission;