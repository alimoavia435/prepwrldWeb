
import { useState, useEffect } from 'react';
import './Submittion.css'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentquestions } from '../../../services/redux/middleware/getStudentquestions';
const Submission = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedSubAnswers, setSelectedSubAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const { id } = useParams();
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const questionsData = useSelector(
        (state) => state?.getStudentquestions?.profile?.data
    )

    console.log(questionsData, "questionsData")

    useEffect(() => {
        if (questionsData?.questions) {
            setQuestions(questionsData.questions);
        }
    }, [questionsData]);

    useEffect(() => {
        if (questionsData?.questions) {
            setQuestions(questionsData.questions);
        }
    }, [questionsData]);

    const handleSubmit = () => {
        setSubmitted(true);
        // API call would go here with all answers
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer('');
            setSelectedSubAnswers({});
            setSubmitted(false);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];
    const isNextGen = currentQuestion?.type === 'nextgen';

    // Check if all sub-questions are answered for nextgen type
    const allSubQuestionsAnswered = isNextGen &&
        currentQuestion.Questions?.every((_, i) => selectedSubAnswers[i] !== undefined);
    useEffect(() => {
        setloading(true)
        dispatch(getStudentquestions(id)).then((res) => {
            setloading(false)
        })
    }, [])
    if (!currentQuestion) return <div>Loading questions...</div>;

    return (
        <div className="question-container">
            <div className="progress"style={{color:"#000000",padding:"10px",height:"unset"}}>
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
                <div className="traditional-question">
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
                        disabled={currentQuestionIndex === questions.length - 1}
                    >
                        {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Submission;