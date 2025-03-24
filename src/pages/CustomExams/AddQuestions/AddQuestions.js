import React, { useState } from "react";
import ReactQuill from "react-quill";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
} from "@mui/material";
import { Dropdown } from "react-bootstrap";
import "./AddQuestions.css";
import { useSelector, useDispatch } from "react-redux";
// import { addQuestion } from "../../../services/redux/middleware/addQuestion";
import ScreenLoader from "../../../components/loader/ScreenLoader";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

import { addQuestion } from "../../../services/redux/middleware/addQuestion";
const AddQuestions = () => {
  const [questionType, setQuestionType] = useState("traditional");
  const [subject, setSubject] = useState("");
  const [casesubject, setcaseSubject] = useState("");
  const [system, setSystem] = useState("");
  const [casesystem, setcaseSystem] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([""]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [explanation, setexplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [caseStudy, setCaseStudy] = useState("");
  const [questionsArray, setQuestionsArray] = useState([
    {
      format: "mcq",
      difficulty: "easy",
      questionText: "",
      options: [""],
      correctAnswers: [],
      clozeData: [],
      matrixData: [],
      matrixDataAnswer: [],
      dragDropOptions: [],
      explanation: "", // Added explanation field
      bowtieData: {
        issue: "",
        actions: ["", ""],
        outcomes: ["", ""],
      },
    },
  ]);
  const location = useLocation();
  const { id } = location.state || {};
  const QUESTION_FORMATS = [
    { value: "mcq", label: "Multiple-Choice (MCQ)" },
    { value: "sata", label: "Select All That Apply (SATA)" },
    { value: "cloze", label: "Cloze (Drop-Down)" },
    { value: "highlight", label: "Highlight (Hot Spot)" },
    { value: "matrix", label: "Matrix/Grid" },
    // { value: 'extended-mr', label: 'Extended Multiple-Response' },
    { value: "drag-drop", label: "Extended Drag-and-Drop" },
    { value: "bowtie", label: "Bow-Tie" },
    // { value: 'trend', label: 'Trend (Case Study with Sequential)' },
    { value: "chart", label: "Chart/Exhibit" },
    { value: "fillblank", label: "Fill-in-the-Blank" },
    { value: "ranking", label: "Ranking/Ordering" },
  ];

  const addNextGenQuestion = () => {
    setQuestionsArray([
      ...questionsArray,
      {
        format: "mcq",
        difficulty: "easy",
        questionText: "",
        options: [""],
        correctAnswers: [],
        clozeData: [],
        matrixData: [],
        matrixDataAnswer: [],
        dragDropOptions: [],
        explanation: "", // Added explanation field
        bowtieData: {
          issue: "",
          actions: ["", ""],
          outcomes: ["", ""],
        },
      },
    ]);
  };
  const updateQuestionFormat = (index, newFormat) => {
    const updatedQuestions = [...questionsArray];
    updatedQuestions[index].format = newFormat;

    // Reset format-specific data when changing formats
    updatedQuestions[index].correctAnswers = [];
    updatedQuestions[index].options =
      newFormat === "mcq" || newFormat === "sata" ? [""] : [];

    setQuestionsArray(updatedQuestions);
  };

  // Drag-Drop Handlers
  const handleDragDropChange = (qIndex, optIndex, value) => {
    const updated = [...questionsArray];
    updated[qIndex].dragDropOptions[optIndex] = value;
    setQuestionsArray(updated);
    console.log(updated);
  };

  const renderOptionsByFormat = (qIndex, question) => {
    const handleMatrixChange = (rowIndex, field, value, optIndex = null) => {
      const updatedQuestions = [...questionsArray];
      const matrixData = [...updatedQuestions[qIndex].matrixData];

      if (optIndex !== null) {
        matrixData[rowIndex].options[optIndex] = value;
      } else {
        matrixData[rowIndex][field] = value;
      }

      updatedQuestions[qIndex].matrixData = matrixData;
      setQuestionsArray(updatedQuestions);
    };

    const addMatrixRow = () => {
      const updatedQuestions = [...questionsArray];
      updatedQuestions[qIndex].matrixData.push({
        label: "",
        options: [""],
      });
      setQuestionsArray(updatedQuestions);
    };
    const addMatrixOption = (rowIndex) => {
      const updatedQuestions = [...questionsArray];
      updatedQuestions[qIndex]?.matrixData[rowIndex]?.options?.push("");
      setQuestionsArray(updatedQuestions);
    };

    const handleMatrixSelection = (rowIndex, optIndex) => {
      const updatedQuestions = [...questionsArray];
      const question = updatedQuestions[qIndex];

      // Initialize matrixDataAnswer if it doesn't exist
      if (!question.matrixDataAnswer) {
        question.matrixDataAnswer = [];
      }

      // Find if there's an existing answer for this row
      const existingRowAnswer = question.matrixDataAnswer.find(
        (ans) => ans.row === rowIndex.toString()
      );

      if (existingRowAnswer) {
        // If option already exists in the row's answers, remove it
        const optionIndex = existingRowAnswer.option.indexOf(
          question.matrixData[rowIndex].options[optIndex]
        );
        if (optionIndex > -1) {
          existingRowAnswer.option.splice(optionIndex, 1);
          // If no options left for this row, remove the entire row entry
          if (existingRowAnswer.option.length === 0) {
            question.matrixDataAnswer = question.matrixDataAnswer.filter(
              (ans) => ans.row !== rowIndex.toString()
            );
          }
        } else {
          // Add new option to existing row
          existingRowAnswer.option.push(
            question.matrixData[rowIndex].options[optIndex]
          );
        }
      } else {
        // Create new row entry with the selected option
        question.matrixDataAnswer.push({
          row: rowIndex.toString(),
          option: [question.matrixData[rowIndex].options[optIndex]],
        });
      }

      setQuestionsArray(updatedQuestions);
    };

    const handleAddDragDropOption = () => {
      const updatedQuestions = [...questionsArray];
      updatedQuestions[qIndex].dragDropOptions.push("");
      setQuestionsArray(updatedQuestions);
    };
    const updateBowtieField = (field, value) => {
      const updatedQuestions = [...questionsArray];
      updatedQuestions[qIndex].bowtieData = {
        ...updatedQuestions[qIndex].bowtieData,
        [field]: value,
      };
      setQuestionsArray(updatedQuestions);
    };
    const updateBowtieAction = (index, value) => {
      const updatedQuestions = [...questionsArray];
      const actions = [...(updatedQuestions[qIndex].bowtieData.actions || [])];
      actions[index] = value;
      updatedQuestions[qIndex].bowtieData.actions = actions;
      setQuestionsArray(updatedQuestions);
    };
    const updateBowtieOutcome = (index, value) => {
      const updatedQuestions = [...questionsArray];
      const outcomes = [
        ...(updatedQuestions[qIndex].bowtieData.outcomes || []),
      ];
      outcomes[index] = value;
      updatedQuestions[qIndex].bowtieData.outcomes = outcomes;
      setQuestionsArray(updatedQuestions);
    };
    switch (question?.format) {
      case "mcq":
        return (
          <div className="wretrsdy">
            <Typography style={{ color: "#000000" }}>
              Options (Select One Correct Answer)
            </Typography>
            {question.options.map((option, optIndex) => (
              <div key={optIndex} className="wgyefdhjas">
                <TextField
                  fullWidth
                  label={`Option ${optIndex + 1}`}
                  value={option}
                  style={{ color: "#000000", border: "1px solid black" }}
                  onChange={(e) =>
                    handleNextGenOptionChange(qIndex, optIndex, e.target.value)
                  }
                  InputProps={{
                    style: { color: "#000000", border: "1px solid black" },
                  }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={question.correctAnswers[0] === option}
                      onChange={() =>
                        updateNextGenQuestion(qIndex, "correctAnswers", [
                          option,
                        ])
                      }
                      sx={{
                        "& .MuiSwitch-thumb": {
                          backgroundColor: "black",
                        },
                        "& .MuiSwitch-track": {
                          backgroundColor: "rgba(0, 0, 0, 0.3)",
                        },
                      }}
                    />
                  }
                  label="Correct Answer"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      color: "black",
                    },
                  }}
                />
              </div>
            ))}
            <button
              className="azpmjnwixs"
              onClick={() => handleAddOption(qIndex)}
            >
              Add Option
            </button>
          </div>
        );

      case "sata":
        return (
          <div>
            <Typography style={{ color: "#000000" }}>
              Options (Select Multiple Correct Answers)
            </Typography>
            {question.options.map((option, optIndex) => (
              <div key={optIndex} className="wgyefdhjas">
                <TextField
                  fullWidth
                  label={`Option ${optIndex + 1}`}
                  value={option}
                  style={{ color: "#000000", border: "1px solid black" }}
                  onChange={(e) =>
                    handleNextGenOptionChange(qIndex, optIndex, e.target.value)
                  }
                  InputProps={{
                    style: { color: "#000000", border: "1px solid black" },
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={question.correctAnswers.includes(option)}
                      onChange={() =>
                        handleNextGenCorrectAnswer(qIndex, option)
                      }
                      sx={{
                        color: "black",
                        "&.Mui-checked": {
                          color: "black",
                        },
                      }}
                    />
                  }
                  label="Correct Answer"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      color: "black",
                    },
                  }}
                />
              </div>
            ))}
            <button
              className="azpmjnwixs"
              onClick={() => handleAddOption(qIndex)}
            >
              Add Option
            </button>
          </div>
        );

      case "cloze":
        return (
          <div>
            <Typography style={{ color: "#000000" }}>
              Cloze/Dropdown Questions
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              style={{ color: "#000000", border: "1px solid black" }}
              value={question.questionText}
              onChange={(e) =>
                updateNextGenQuestion(qIndex, "questionText", e.target.value)
              }
              placeholder="Enter text with [dropdown] placeholder"
              InputProps={{
                style: { color: "#000000", border: "1px solid black" },
              }}
            />
            <Typography variant="body2" style={{ color: "#000000" }}>
              Use [dropdown] placeholder in your text. Only one dropdown is
              allowed per question.
            </Typography>

            {/* Display dropdown options */}
            <div style={{ marginTop: "15px" }}>
              <Typography style={{ color: "#000000" }}>
                Dropdown Options:
              </Typography>
              {question.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className="wgyefdhjas"
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <TextField
                    label={`Option ${optIndex + 1}`}
                    style={{
                      color: "#000000",
                      border: "1px solid black",
                      flex: 1,
                    }}
                    value={option}
                    onChange={(e) => {
                      const updatedQuestions = [...questionsArray];
                      updatedQuestions[qIndex].options[optIndex] =
                        e.target.value;
                      setQuestionsArray(updatedQuestions);
                    }}
                    InputProps={{
                      style: { color: "#000000", border: "1px solid black" },
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={question.correctAnswers[0] === option}
                        onChange={() => {
                          const updatedQuestions = [...questionsArray];
                          updatedQuestions[qIndex].correctAnswers = [option];
                          setQuestionsArray(updatedQuestions);
                        }}
                        sx={{
                          color: "black",
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    }
                    label="Correct"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        color: "black",
                      },
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      const updatedQuestions = [...questionsArray];
                      updatedQuestions[qIndex].options = updatedQuestions[
                        qIndex
                      ].options.filter((_, i) => i !== optIndex);
                      if (
                        updatedQuestions[qIndex].correctAnswers[0] === option
                      ) {
                        updatedQuestions[qIndex].correctAnswers = [];
                      }
                      setQuestionsArray(updatedQuestions);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="contained"
                onClick={() => {
                  const updatedQuestions = [...questionsArray];
                  updatedQuestions[qIndex].options.push("");
                  setQuestionsArray(updatedQuestions);
                }}
                style={{ marginTop: "10px" }}
              >
                Add Option
              </Button>
            </div>
          </div>
        );
      case "highlight":
        return (
          <div className="wgyefdhjas">
            <Typography style={{ color: "#000000" }}>
              Highlight Correct Phrase
            </Typography>
            <TextField
              fullWidth
              label="Correct Highlight Phrase"
              style={{ color: "#000000", border: "1px solid black" }}
              value={question.correctAnswers[0] || ""}
              onChange={(e) =>
                updateNextGenQuestion(qIndex, "correctAnswers", [
                  e.target.value,
                ])
              }
              InputProps={{
                style: { color: "#000000", border: "1px solid black" },
              }}
            />
            <Typography variant="body2" style={{ color: "#000000" }}>
              Case study text: {caseStudy.substring(0, 50)}... (full case study
              visible elsewhere)
            </Typography>
          </div>
        );

      case "matrix":
        return (
          <div>
            <Typography style={{ color: "#000000" }}>
              Matrix/Grid Setup
            </Typography>
            {question.matrixData.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="wgyefdhjas"
                style={{
                  margin: "10px 0",
                  padding: "10px",
                  border: "1px solid #ccc",
                }}
              >
                <TextField
                  label={`Row ${rowIndex + 1} Label`}
                  style={{ color: "#000000", border: "1px solid black" }}
                  value={row.label}
                  onChange={(e) =>
                    handleMatrixChange(rowIndex, "label", e.target.value)
                  }
                  InputProps={{
                    style: { color: "#000000", border: "1px solid black" },
                  }}
                />
                {row.options.map((opt, optIndex) => (
                  <div
                    className="wgyefdhjas"
                    key={optIndex}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <TextField
                      label={`Option ${optIndex + 1}`}
                      style={{ color: "#000000", border: "1px solid black" }}
                      value={opt}
                      onChange={(e) =>
                        handleMatrixChange(
                          rowIndex,
                          "options",
                          e.target.value,
                          optIndex
                        )
                      }
                      InputProps={{
                        style: { color: "#000000", border: "1px solid black" },
                      }}
                    />
                    <Checkbox
                      checked={question.matrixDataAnswer?.some(
                        (ans) =>
                          ans.row === rowIndex.toString() &&
                          ans.option.includes(opt)
                      )}
                      onChange={() => handleMatrixSelection(rowIndex, optIndex)}
                      sx={{
                        color: "black",
                        "&.Mui-checked": {
                          color: "black",
                        },
                      }}
                    />
                  </div>
                ))}
                <button
                  className="azpmjnwixs"
                  onClick={() => addMatrixOption(rowIndex)}
                >
                  Add Column
                </button>
              </div>
            ))}
            <button className="azpmjnwixs" onClick={addMatrixRow}>
              Add Matrix Row
            </button>
          </div>
        );

      case "drag-drop":
        return (
          <div>
            <Typography style={{ color: "#000000" }}>
              Drag & Drop Options
            </Typography>
            {question.dragDropOptions.map((option, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "5px 0",
                }}
              >
                <TextField
                  label={`Option ${index + 1}`}
                  value={option}
                  style={{ color: "#000000", border: "1px solid black" }}
                  onChange={(e) => {
                    const updatedQuestions = [...questionsArray];
                    updatedQuestions[qIndex].dragDropOptions[index] =
                      e.target.value;
                    setQuestionsArray(updatedQuestions);
                  }}
                  InputProps={{
                    style: { color: "#000000", border: "1px solid black" },
                  }}
                />
              </div>
            ))}
            <button className="azpmjnwixs" onClick={handleAddDragDropOption}>
              Add Option
            </button>
            <div style={{ marginTop: "10px" }}>
              <TextField
                label="Correct Order (comma-separated indices)"
                value={question.correctAnswers.join(",")}
                onChange={(e) =>
                  updateNextGenQuestion(
                    qIndex,
                    "correctAnswers",
                    e.target.value.split(",")
                  )
                }
                InputProps={{
                  style: { color: "#000000", border: "1px solid black" },
                }}
              />
            </div>
          </div>
        );

      case "bowtie":
        return (
          <div>
            <Typography style={{ color: "#000000" }}>
              Bow-Tie Components
            </Typography>
            <TextField
              label="Clinical Issue"
              fullWidth
              value={question.bowtieData?.issue || ""}
              onChange={(e) => updateBowtieField("issue", e.target.value)}
              InputProps={{
                style: { color: "#000000", border: "1px solid black" },
              }}
            />
            <div style={{ margin: "10px 0" }}>
              <Typography style={{ color: "#000000" }}>
                Priority Actions:
              </Typography>
              {[0, 1].map((index) => (
                <TextField
                  key={index}
                  label={`Action ${index + 1}`}
                  value={question.bowtieData?.actions?.[index] || ""}
                  onChange={(e) => updateBowtieAction(index, e.target.value)}
                  InputProps={{
                    style: { color: "#000000", border: "1px solid black" },
                  }}
                />
              ))}
            </div>
            <div style={{ margin: "10px 0" }}>
              <Typography style={{ color: "#000000" }}>
                Potential Outcomes:
              </Typography>
              {[0, 1].map((index) => (
                <TextField
                  key={index}
                  label={`Outcome ${index + 1}`}
                  value={question.bowtieData?.outcomes?.[index] || ""}
                  onChange={(e) => updateBowtieOutcome(index, e.target.value)}
                  InputProps={{
                    style: { color: "#000000", border: "1px solid black" },
                  }}
                />
              ))}
            </div>
          </div>
        );

      case "fillblank":
        return (
          <div>
            <Typography style={{ color: "#000000" }}>
              Fill-in-the-Blank
            </Typography>
            <TextField
              fullWidth
              label="Question with Blanks (use _BLANK_)"
              value={question.questionText}
              onChange={(e) =>
                updateNextGenQuestion(qIndex, "questionText", e.target.value)
              }
              InputProps={{
                style: { color: "#000000", border: "1px solid black" },
              }}
            />
            <div style={{ marginTop: "10px" }}>
              <TextField
                label="Correct Answer(s)"
                value={question.correctAnswers.join(", ")}
                onChange={(e) =>
                  updateNextGenQuestion(
                    qIndex,
                    "correctAnswers",
                    e.target.value.split(",")
                  )
                }
                helperText="Separate multiple correct answers with commas"
                InputProps={{
                  style: { color: "#000000", border: "1px solid black" },
                }}
              />
            </div>
          </div>
        );

      case "ranking":
        return (
          <div>
            <Typography style={{ color: "#000000" }}>
              Ranking Options
            </Typography>
            {question.options.map((option, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "5px 0",
                }}
              >
                <TextField
                  label={`Item ${index + 1}`}
                  value={option}
                  onChange={(e) =>
                    handleNextGenOptionChange(qIndex, index, e.target.value)
                  }
                  InputProps={{
                    style: { color: "#000000", border: "1px solid black" },
                  }}
                />
                <Typography
                  variant="body2"
                  style={{ marginLeft: "10px", color: "#000000" }}
                >
                  Current Position: {index + 1}
                </Typography>
              </div>
            ))}
            <Button onClick={() => handleAddOption(qIndex)}>
              Add Ranking Option
            </Button>
            <div style={{ marginTop: "10px" }}>
              <TextField
                label="Correct Order (comma-separated indices)"
                value={question.correctAnswers.join(",")}
                onChange={(e) =>
                  updateNextGenQuestion(
                    qIndex,
                    "correctAnswers",
                    e.target.value.split(",")
                  )
                }
                helperText="Enter the correct order using option indices (0-based)"
                InputProps={{
                  style: { color: "#000000", border: "1px solid black" },
                }}
              />
            </div>
          </div>
        );

      default:
        return (
          <Typography style={{ color: "#000000" }}>
            Selected format not implemented yet
          </Typography>
        );
    }
  };

  const updateNextGenQuestion = (index, field, value) => {
    const updatedQuestions = [...questionsArray];
    updatedQuestions[index][field] = value;
    setQuestionsArray(updatedQuestions);
  };

  // Add new option based on format
  const handleAddOption = (qIndex) => {
    const updatedQuestions = [...questionsArray];
    updatedQuestions[qIndex].options.push("");
    setQuestionsArray(updatedQuestions);
  };

  const handleNextGenCorrectAnswer = (qIndex, option) => {
    const updatedQuestions = [...questionsArray];
    const question = updatedQuestions[qIndex];

    if (question.correctAnswers.includes(option)) {
      question.correctAnswers = question.correctAnswers.filter(
        (ans) => ans !== option
      );
    } else {
      question.correctAnswers = [...question.correctAnswers, option];
    }

    setQuestionsArray(updatedQuestions);
  };
  const handleNextGenOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questionsArray];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestionsArray(updatedQuestions);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const subjects = [
    "Adult Health",
    "Child Health",
    "Critical Care",
    "Fundamentals",
    "Leadership & Management",
    "Maternal & Newborn Health",
    "Mental Health",
    "Pharmacology",
    " Cardiovascular",
  ];
  const casesubjects = [
    "Adult Health",
    "Child Health",
    "Critical Care",
    "Fundamentals",
    "Leadership & Management",
    "Maternal & Newborn Health",
    "Mental Health",
    "Pharmacology",
    " Cardiovascular",
  ];
  const handleSelect = (selectedSubject) => {
    setSubject(selectedSubject);
  };
  const handleCaseSelect = (selectedSubject) => {
    setcaseSubject(selectedSubject);
  };
  const systems = [
    "Analgesics",
    "Antepartum",
    "Assignment/Delegation",
    "Basic Care & Comfort",
    "Cardiovascular",
    "Communication",
    "Critical Care Concepts",
    "Development Throughout the Life Span",
    "Emergency Care",
    "Endocrine",
    "Ethical/Legal",
    "Fluid, Electrolyte, Acid-Base Balance",
    "Gastrointestinal/Nutrition",
    "Growth & Development",
    "Hematological/Oncological",
    "Immune",
    "Infectious Disease",
    "Integumentary",
    "Labor/Delivery",
    "Management Concepts",
    "Medication Administration",
    "Mental Health Concepts",
    "Musculoskeletal",
    "Neurologic",
    "Newborn",
    "Postpartum",
    "Prioritization",
    "Psychiatric Medications",
    "Reproductive",
    "Reproductive/Maternity/Newborn",
    "Respiratory",
    "Safety/Infection Control",
    "Skills/Procedures",
    "Urinary/Renal",
    "Visual/Auditory",
  ];
  const Casesystems = [
    "Analgesics",
    "Antepartum",
    "Assignment/Delegation",
    "Basic Care & Comfort",
    "Cardiovascular",
    "Communication",
    "Critical Care Concepts",
    "Development Throughout the Life Span",
    "Emergency Care",
    "Endocrine",
    "Ethical/Legal",
    "Fluid, Electrolyte, Acid-Base Balance",
    "Gastrointestinal/Nutrition",
    "Growth & Development",
    "Hematological/Oncological",
    "Immune",
    "Infectious Disease",
    "Integumentary",
    "Labor/Delivery",
    "Management Concepts",
    "Medication Administration",
    "Mental Health Concepts",
    "Musculoskeletal",
    "Neurologic",
    "Newborn",
    "Postpartum",
    "Prioritization",
    "Psychiatric Medications",
    "Reproductive",
    "Reproductive/Maternity/Newborn",
    "Respiratory",
    "Safety/Infection Control",
    "Skills/Procedures",
    "Urinary/Renal",
    "Visual/Auditory",
  ];
  const handleSelectSystem = (selectedSubject) => {
    setSystem(selectedSubject);
  };
  const handleSelectcaseSystem = (selectedSubject) => {
    setcaseSystem(selectedSubject);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };
  const navigate = useNavigate();
  const handleCorrectAnswerChange = (option) => {
    if (correctAnswers.includes(option)) {
      setCorrectAnswers(correctAnswers.filter((ans) => ans !== option));
    } else {
      setCorrectAnswers([...correctAnswers, option]);
    }
  };

  const handleSubmit = () => {
    // const isValid = questionsArray.every(question => {
    //     switch (question.format) {
    //         case 'mcq':
    //             return question.options.length >= 2 && question.correctAnswers.length === 1;
    //         case 'sata':
    //             return question.options.length >= 2 && question.correctAnswers.length >= 2;
    //         case 'cloze':
    //             return question.questionText.includes('[') && question.options.length >= 2;
    //         case 'matrix':
    //             return question.matrixData.length > 0 && question.correctAnswers.length > 0;
    //         case 'bowtie':
    //             return question.bowtieData.issue &&
    //                 question.bowtieData.actions.every(a => a) &&
    //                 question.bowtieData.outcomes.every(o => o);
    //         // Add validations for other formats
    //         default:
    //             return true;
    //     }
    // });

    // if (!isValid) {
    //     toast.error('Please complete all required fields for each question');
    //     return;
    // }
    if (questionType === "traditional") {
      // Existing traditional validation
      if (
        !subject ||
        !difficulty ||
        !questionText ||
        !options.length ||
        !correctAnswers.length ||
        !explanation
      ) {
        toast.warning("Please fill in all the fields.");
        return;
      }
    }
    //  else {
    //     // Next-Gen validation
    //     if (!caseStudy || questionsArray.some(q =>
    //         !q.difficulty || !q.questionText ||
    //         !q.options.length || !q.correctAnswers.length
    //     )) {
    //         toast.warning("Please fill in all fields for case study and all questions.");
    //         return;
    //     }
    // }

    setLoading(true);
    const questionData =
      questionType === "traditional"
        ? {
            type: questionType,
            subject,
            difficulty,
            system,
            question: questionText,
            options,
            correctAnswers,
            explanation,
          }
        : {
            type: "nextgen",
            caseStudy,
            subject: casesubject,
            system: casesystem,
            Questions: questionsArray.map((q) => ({
              format: q.format,
              difficulty: q.difficulty,
              question: q.questionText,
              options: q.options,
              correctAnswers: q.correctAnswers,
              matrixData: q.matrixData,
              matrixDataAnswer: q.matrixDataAnswer,
              bowtieData: q.bowtieData,
              dragDropOptions: q.dragDropOptions,
              explanation: q.explanation,
            })),
          };

    console.log("Question Data:", questionData);
    const datawithid = {
      id: id,
      data: questionData,
    };
    dispatch(addQuestion(datawithid)).then((res) => {
      console.log("AddQuestion", res);
      if (res?.payload?.data?.message === "Questions added successfully") {
        toast.success("Question added successfully");
        navigate(-1);
      } else if (res?.payload?.status === 201) {
        toast.success("Question added successfully");
        navigate(-1);
      } else if (res?.payload?.status === 400) {
        toast.error(res?.payload?.message?.message);
      } else {
        toast.error("Cannot Add at the moment");
      }
      setLoading(false);
    });
  };
  return (
    <div style={{ overflowY: "scroll", overflowX: "hidden", height: "100%" }}>
      {" "}
      {loading && <ScreenLoader />}
      <Grid container spacing={3} style={{ padding: "35px" }}>
        <p className="Headline800">Add Question</p>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <p className="labeltextt">Question Type</p>
            <Select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <MenuItem
                value="traditional"
                sx={{
                  color:
                    questionType === "traditional"
                      ? "black !important"
                      : "#00000099",
                }}
              >
                Traditional
              </MenuItem>
              <MenuItem
                value="nextgen"
                sx={{
                  color:
                    questionType === "nextgen"
                      ? "black !important"
                      : "#00000099",
                }}
              >
                Next-Gen
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {questionType === "nextgen" ? (
          <>
            <Grid item xs={12}>
              <p className="labeltextt">Subject</p>
              <Dropdown onSelect={handleCaseSelect}>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid rgba(0, 0, 0, 0.3)",
                    color: "black",
                    height: "56px",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  {casesubject ? casesubject : "Choose Subject"}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ width: "100%" }}>
                  {casesubjects.map((subjectOption, index) => (
                    <Dropdown.Item
                      key={index}
                      eventKey={subjectOption}
                      style={{ color: "black" }}
                    >
                      {subjectOption}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
            <Grid item xs={12}>
              <p className="labeltextt">System</p>
              <Dropdown onSelect={handleSelectcaseSystem}>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid rgba(0, 0, 0, 0.3)",
                    color: "black",
                    height: "56px",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  {casesystem ? casesystem : "Choose System"}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ width: "100%" }}>
                  {Casesystems?.map((systemopt, index) => (
                    <Dropdown.Item
                      key={index}
                      eventKey={systemopt}
                      style={{ color: "black" }}
                    >
                      {systemopt}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
            <Grid item xs={12}>
              <p className="labeltextt">Case Study</p>
              <TextField
                fullWidth
                placeholder="Case Study"
                multiline
                rows={4}
                value={caseStudy}
                onChange={(e) => setCaseStudy(e.target.value)}
              />
            </Grid>

            <div style={{ padding: "24px" }}>
              {questionsArray.map((question, qIndex) => (
                <Grid
                  container
                  spacing={3}
                  key={qIndex}
                  style={{
                    padding: "24px",
                    border: "1px solid #000000",
                    borderRadius: "10px",
                  }}
                >
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Question Format</InputLabel>
                      <Select
                        value={question.format}
                        onChange={(e) =>
                          updateQuestionFormat(qIndex, e.target.value)
                        }
                      >
                        {QUESTION_FORMATS.map((format) => (
                          <MenuItem key={format.value} value={format.value}>
                            {format.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Difficulty</InputLabel>
                      <Select
                        value={question.difficulty}
                        onChange={(e) =>
                          updateNextGenQuestion(
                            qIndex,
                            "difficulty",
                            e.target.value
                          )
                        }
                      >
                        <MenuItem value="easy">Easy</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="hard">Hard</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Question Text"
                      value={question.questionText}
                      onChange={(e) =>
                        updateNextGenQuestion(
                          qIndex,
                          "questionText",
                          e.target.value
                        )
                      }
                      multiline
                      rows={2}
                    />
                  </Grid>
                  {/* Render format-specific inputs */}
                  {renderOptionsByFormat(qIndex, question)}

                  <Grid item xs={12} style={{ marginTop: "15px" }}>
                    <TextField
                      fullWidth
                      label="Explanation"
                      value={question.explanation || ""}
                      onChange={(e) =>
                        updateNextGenQuestion(
                          qIndex,
                          "explanation",
                          e.target.value
                        )
                      }
                      multiline
                      rows={3}
                      placeholder="Provide an explanation for this question"
                    />
                  </Grid>
                </Grid>
              ))}

              <Grid item xs={12}>
                <button
                  class="addqbttn"
                  style={{ background: "seagreen" }}
                  onClick={addNextGenQuestion}
                >
                  Add Another Question
                </button>
              </Grid>
            </div>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <p className="labeltextt">Subject</p>
              <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid rgba(0, 0, 0, 0.3)",
                    color: "black",
                    height: "56px",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  {subject ? subject : "Choose Subject"}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ width: "100%" }}>
                  {subjects.map((subjectOption, index) => (
                    <Dropdown.Item
                      key={index}
                      eventKey={subjectOption}
                      style={{ color: "black" }}
                    >
                      {subjectOption}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
            <Grid item xs={12}>
              <p className="labeltextt">System</p>
              <Dropdown onSelect={handleSelectSystem}>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid rgba(0, 0, 0, 0.3)",
                    color: "black",
                    height: "56px",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  {system ? system : "Choose System"}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ width: "100%" }}>
                  {systems?.map((systemopt, index) => (
                    <Dropdown.Item
                      key={index}
                      eventKey={systemopt}
                      style={{ color: "black" }}
                    >
                      {systemopt}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <p className="labeltextt">Difficulty</p>
                <Select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <MenuItem value="easy">Easy</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="hard">Hard</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <p className="labeltextt">Question Text</p>
              <TextField
                fullWidth
                placeholder="Question Text"
                multiline
                rows={4}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <p className="labeltextt">Options</p>
              {options.map((option, index) => (
                <Grid item xs={12} key={index}>
                  <TextField
                    fullWidth
                    label={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={correctAnswers.includes(option)}
                        onChange={() => handleCorrectAnswerChange(option)}
                        sx={{
                          color: "black", // Color of the unchecked checkbox
                          "&.Mui-checked": {
                            color: "black", // Color of the checked checkbox
                          },
                        }}
                      />
                    }
                    label="Correct Answer"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        color: "black", // Styling the label color to black
                      },
                    }}
                  />
                </Grid>
              ))}
              <Button variant="contained" onClick={addOption}>
                Add Option
              </Button>
            </Grid>
            <div style={{ width: "100%", padding: "24px 0px 0px 24px" }}>
              <p className="labeltextt">Explanation</p>
              <ReactQuill
                theme="snow"
                value={explanation}
                onChange={(value) => setexplanation(value)}
                placeholder="Write your explanation here..."
                className="custom-quill"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ color: [] }, { background: [] }],
                    ["link", "blockquote", "code-block"],
                    ["clean"],
                  ],
                  clipboard: {
                    matchVisual: false,
                  },
                }}
                formats={[
                  "header",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "list",
                  "bullet",
                  "color",
                  "background",
                  "link",
                  "blockquote",
                  "code-block",
                ]}
                style={{
                  height: "auto",
                  minHeight: "200px",
                  marginBottom: "50px",
                }}
              />
            </div>
          </>
        )}
        <div
          style={{
            display: "flex",
            paddingTop: "30px",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <button class="addqbttn" onClick={() => handleSubmit()}>
            Submit Question
          </button>
        </div>
      </Grid>
    </div>
  );
};

export default AddQuestions;
