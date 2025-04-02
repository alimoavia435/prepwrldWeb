
// const AddQuestions = () => {
//   const [questionType, setQuestionType] = useState("traditional");
//   const [subject, setSubject] = useState("");
//   const [casesubject, setcaseSubject] = useState("");
//   const [system, setSystem] = useState("");
//   const [casesystem, setcaseSystem] = useState("");
//   const [difficulty, setDifficulty] = useState("easy");
//   const [questionText, setQuestionText] = useState("");
//   const [options, setOptions] = useState([""]);
//   const [correctAnswers, setCorrectAnswers] = useState([]);
//   const [explanation, setexplanation] = useState("");
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const [caseStudy, setCaseStudy] = useState("");
//   const [questionsArray, setQuestionsArray] = useState([
//     {
//       format: "mcq",
//       difficulty: "easy",
//       questionText: "",
//       options: [""],
//       correctAnswers: [],
//       clozeData: [],
//       matrixData: [],
//       matrixDataAnswer: [],
//       dragDropOptions: [],
//       explanation: "", // Added explanation field
//       bowtieData: {
//         issue: "",
//         actions: ["", ""],
//         outcomes: ["", ""],
//       },
//     },
//   ]);
//   const location = useLocation();
//   const { id } = location.state || {};
//   const QUESTION_FORMATS = [
//     { value: "mcq", label: "Multiple-Choice (MCQ)" },
//     { value: "sata", label: "Select All That Apply (SATA)" },
//     { value: "cloze", label: "Cloze (Drop-Down)" },
//     { value: "highlight", label: "Highlight (Hot Spot)" },
//     { value: "matrix", label: "Matrix/Grid" },
//     // { value: 'extended-mr', label: 'Extended Multiple-Response' },
//     { value: "drag-drop", label: "Extended Drag-and-Drop" },
//     { value: "bowtie", label: "Bow-Tie" },
//     // { value: 'trend', label: 'Trend (Case Study with Sequential)' },
//     { value: "chart", label: "Chart/Exhibit" },
//     { value: "fillblank", label: "Fill-in-the-Blank" },
//     { value: "ranking", label: "Ranking/Ordering" },
//   ];

//   const addNextGenQuestion = () => {
//     setQuestionsArray([
//       ...questionsArray,
//       {
//         format: "mcq",
//         difficulty: "easy",
//         questionText: "",
//         options: [""],
//         correctAnswers: [],
//         clozeData: [],
//         matrixData: [],
//         matrixDataAnswer: [],
//         dragDropOptions: [],
//         explanation: "", // Added explanation field
//         bowtieData: {
//           issue: "",
//           actions: ["", ""],
//           outcomes: ["", ""],
//         },
//       },
//     ]);
//   };
//   const updateQuestionFormat = (index, newFormat) => {
//     const updatedQuestions = [...questionsArray];
//     updatedQuestions[index].format = newFormat;

//     // Reset format-specific data when changing formats
//     updatedQuestions[index].correctAnswers = [];
//     updatedQuestions[index].options =
//       newFormat === "mcq" || newFormat === "sata" ? [""] : [];

//     setQuestionsArray(updatedQuestions);
//   };

//   // Drag-Drop Handlers
//   const handleDragDropChange = (qIndex, optIndex, value) => {
//     const updated = [...questionsArray];
//     updated[qIndex].dragDropOptions[optIndex] = value;
//     setQuestionsArray(updated);
//     console.log(updated);
//   };

//   const renderOptionsByFormat = (qIndex, question) => {
//     const handleMatrixChange = (rowIndex, field, value, optIndex = null) => {
//       const updatedQuestions = [...questionsArray];
//       const matrixData = [...updatedQuestions[qIndex].matrixData];

//       if (optIndex !== null) {
//         matrixData[rowIndex].options[optIndex] = value;
//       } else {
//         matrixData[rowIndex][field] = value;
//       }

//       updatedQuestions[qIndex].matrixData = matrixData;
//       setQuestionsArray(updatedQuestions);
//     };

//     const addMatrixRow = () => {
//       const updatedQuestions = [...questionsArray];
//       updatedQuestions[qIndex].matrixData.push({
//         label: "",
//         options: [""],
//       });
//       setQuestionsArray(updatedQuestions);
//     };
//     const addMatrixOption = (rowIndex) => {
//       const updatedQuestions = [...questionsArray];
//       updatedQuestions[qIndex]?.matrixData[rowIndex]?.options?.push("");
//       setQuestionsArray(updatedQuestions);
//     };

//     const handleMatrixSelection = (rowIndex, optIndex) => {
//       const updatedQuestions = [...questionsArray];
//       const question = updatedQuestions[qIndex];

//       // Initialize matrixDataAnswer if it doesn't exist
//       if (!question.matrixDataAnswer) {
//         question.matrixDataAnswer = [];
//       }

//       // Find if there's an existing answer for this row
//       const existingRowAnswer = question.matrixDataAnswer.find(
//         (ans) => ans.row === rowIndex.toString()
//       );

//       if (existingRowAnswer) {
//         // If option already exists in the row's answers, remove it
//         const optionIndex = existingRowAnswer.option.indexOf(
//           question.matrixData[rowIndex].options[optIndex]
//         );
//         if (optionIndex > -1) {
//           existingRowAnswer.option.splice(optionIndex, 1);
//           // If no options left for this row, remove the entire row entry
//           if (existingRowAnswer.option.length === 0) {
//             question.matrixDataAnswer = question.matrixDataAnswer.filter(
//               (ans) => ans.row !== rowIndex.toString()
//             );
//           }
//         } else {
//           // Add new option to existing row
//           existingRowAnswer.option.push(
//             question.matrixData[rowIndex].options[optIndex]
//           );
//         }
//       } else {
//         // Create new row entry with the selected option
//         question.matrixDataAnswer.push({
//           row: rowIndex.toString(),
//           option: [question.matrixData[rowIndex].options[optIndex]],
//         });
//       }

//       setQuestionsArray(updatedQuestions);
//     };

//     const handleAddDragDropOption = () => {
//       const updatedQuestions = [...questionsArray];
//       updatedQuestions[qIndex].dragDropOptions.push("");
//       setQuestionsArray(updatedQuestions);
//     };
//     const updateBowtieField = (field, value) => {
//       const updatedQuestions = [...questionsArray];
//       updatedQuestions[qIndex].bowtieData = {
//         ...updatedQuestions[qIndex].bowtieData,
//         [field]: value,
//       };
//       setQuestionsArray(updatedQuestions);
//     };
//     const updateBowtieAction = (index, value) => {
//       const updatedQuestions = [...questionsArray];
//       const actions = [...(updatedQuestions[qIndex].bowtieData.actions || [])];
//       actions[index] = value;
//       updatedQuestions[qIndex].bowtieData.actions = actions;
//       setQuestionsArray(updatedQuestions);
//     };
//     const updateBowtieOutcome = (index, value) => {
//       const updatedQuestions = [...questionsArray];
//       const outcomes = [
//         ...(updatedQuestions[qIndex].bowtieData.outcomes || []),
//       ];
//       outcomes[index] = value;
//       updatedQuestions[qIndex].bowtieData.outcomes = outcomes;
//       setQuestionsArray(updatedQuestions);
//     };
//     switch (question?.format) {
//       case "mcq":
//         return (
//           <div className="wretrsdy">
//             <Typography style={{ color: "#000000" }}>
//               Options (Select One Correct Answer)
//             </Typography>
//             {question.options.map((option, optIndex) => (
//               <div key={optIndex} className="wgyefdhjas">
//                 <TextField
//                   fullWidth
//                   label={`Option ${optIndex + 1}`}
//                   value={option}
//                   style={{ color: "#000000", border: "1px solid black" }}
//                   onChange={(e) =>
//                     handleNextGenOptionChange(qIndex, optIndex, e.target.value)
//                   }
//                   InputProps={{
//                     style: { color: "#000000", border: "1px solid black" },
//                   }}
//                 />
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       checked={question.correctAnswers[0] === option}
//                       onChange={() =>
//                         updateNextGenQuestion(qIndex, "correctAnswers", [
//                           option,
//                         ])
//                       }
//                       sx={{
//                         "& .MuiSwitch-thumb": {
//                           backgroundColor: "black",
//                         },
//                         "& .MuiSwitch-track": {
//                           backgroundColor: "rgba(0, 0, 0, 0.3)",
//                         },
//                       }}
//                     />
//                   }
//                   label="Correct Answer"
//                   sx={{
//                     "& .MuiFormControlLabel-label": {
//                       color: "black",
//                     },
//                   }}
//                 />
//               </div>
//             ))}
//             <button
//               className="azpmjnwixs"
//               onClick={() => handleAddOption(qIndex)}
//             >
//               Add Option
//             </button>
//           </div>
//         );

//       case "sata":
//         return (
//           <div>
//             <Typography style={{ color: "#000000" }}>
//               Options (Select Multiple Correct Answers)
//             </Typography>
//             {question.options.map((option, optIndex) => (
//               <div key={optIndex} className="wgyefdhjas">
//                 <TextField
//                   fullWidth
//                   label={`Option ${optIndex + 1}`}
//                   value={option}
//                   style={{ color: "#000000", border: "1px solid black" }}
//                   onChange={(e) =>
//                     handleNextGenOptionChange(qIndex, optIndex, e.target.value)
//                   }
//                   InputProps={{
//                     style: { color: "#000000", border: "1px solid black" },
//                   }}
//                 />
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={question.correctAnswers.includes(option)}
//                       onChange={() =>
//                         handleNextGenCorrectAnswer(qIndex, option)
//                       }
//                       sx={{
//                         color: "black",
//                         "&.Mui-checked": {
//                           color: "black",
//                         },
//                       }}
//                     />
//                   }
//                   label="Correct Answer"
//                   sx={{
//                     "& .MuiFormControlLabel-label": {
//                       color: "black",
//                     },
//                   }}
//                 />
//               </div>
//             ))}
//             <button
//               className="azpmjnwixs"
//               onClick={() => handleAddOption(qIndex)}
//             >
//               Add Option
//             </button>
//           </div>
//         );

//       case "cloze":
//         return (
//           <div>
//             <Typography style={{ color: "#000000" }}>
//               Cloze/Dropdown Questions
//             </Typography>
//             <TextField
//               fullWidth
//               multiline
//               rows={4}
//               style={{ color: "#000000", border: "1px solid black" }}
//               value={question.questionText}
//               onChange={(e) =>
//                 updateNextGenQuestion(qIndex, "questionText", e.target.value)
//               }
//               placeholder="Enter text with [dropdown] placeholder"
//               InputProps={{
//                 style: { color: "#000000", border: "1px solid black" },
//               }}
//             />
//             <Typography variant="body2" style={{ color: "#000000" }}>
//               Use [dropdown] placeholder in your text. Only one dropdown is
//               allowed per question.
//             </Typography>

//             {/* Display dropdown options */}
//             <div style={{ marginTop: "15px" }}>
//               <Typography style={{ color: "#000000" }}>
//                 Dropdown Options:
//               </Typography>
//               {question.options.map((option, optIndex) => (
//                 <div
//                   key={optIndex}
//                   className="wgyefdhjas"
//                   style={{ display: "flex", alignItems: "center", gap: "10px" }}
//                 >
//                   <TextField
//                     label={`Option ${optIndex + 1}`}
//                     style={{
//                       color: "#000000",
//                       border: "1px solid black",
//                       flex: 1,
//                     }}
//                     value={option}
//                     onChange={(e) => {
//                       const updatedQuestions = [...questionsArray];
//                       updatedQuestions[qIndex].options[optIndex] =
//                         e.target.value;
//                       setQuestionsArray(updatedQuestions);
//                     }}
//                     InputProps={{
//                       style: { color: "#000000", border: "1px solid black" },
//                     }}
//                   />
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={question.correctAnswers[0] === option}
//                         onChange={() => {
//                           const updatedQuestions = [...questionsArray];
//                           updatedQuestions[qIndex].correctAnswers = [option];
//                           setQuestionsArray(updatedQuestions);
//                         }}
//                         sx={{
//                           color: "black",
//                           "&.Mui-checked": {
//                             color: "black",
//                           },
//                         }}
//                       />
//                     }
//                     label="Correct"
//                     sx={{
//                       "& .MuiFormControlLabel-label": {
//                         color: "black",
//                       },
//                     }}
//                   />
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => {
//                       const updatedQuestions = [...questionsArray];
//                       updatedQuestions[qIndex].options = updatedQuestions[
//                         qIndex
//                       ].options.filter((_, i) => i !== optIndex);
//                       if (
//                         updatedQuestions[qIndex].correctAnswers[0] === option
//                       ) {
//                         updatedQuestions[qIndex].correctAnswers = [];
//                       }
//                       setQuestionsArray(updatedQuestions);
//                     }}
//                   >
//                     Remove
//                   </Button>
//                 </div>
//               ))}
//               <Button
//                 variant="contained"
//                 onClick={() => {
//                   const updatedQuestions = [...questionsArray];
//                   updatedQuestions[qIndex].options.push("");
//                   setQuestionsArray(updatedQuestions);
//                 }}
//                 style={{ marginTop: "10px" }}
//               >
//                 Add Option
//               </Button>
//             </div>
//           </div>
//         );
//       case "highlight":
//         return (
//           <div className="wgyefdhjas">
//             <Typography style={{ color: "#000000" }}>
//               Highlight Correct Phrase
//             </Typography>
//             <TextField
//               fullWidth
//               label="Correct Highlight Phrase"
//               style={{ color: "#000000", border: "1px solid black" }}
//               value={question.correctAnswers[0] || ""}
//               onChange={(e) =>
//                 updateNextGenQuestion(qIndex, "correctAnswers", [
//                   e.target.value,
//                 ])
//               }
//               InputProps={{
//                 style: { color: "#000000", border: "1px solid black" },
//               }}
//             />
//             <Typography variant="body2" style={{ color: "#000000" }}>
//               Case study text: {caseStudy.substring(0, 50)}... (full case study
//               visible elsewhere)
//             </Typography>
//           </div>
//         );

//       case "matrix":
//         return (
//           <div>
//             <Typography style={{ color: "#000000" }}>
//               Matrix/Grid Setup
//             </Typography>
//             {question.matrixData.map((row, rowIndex) => (
//               <div
//                 key={rowIndex}
//                 className="wgyefdhjas"
//                 style={{
//                   margin: "10px 0",
//                   padding: "10px",
//                   border: "1px solid #ccc",
//                 }}
//               >
//                 <TextField
//                   label={`Row ${rowIndex + 1} Label`}
//                   style={{ color: "#000000", border: "1px solid black" }}
//                   value={row.label}
//                   onChange={(e) =>
//                     handleMatrixChange(rowIndex, "label", e.target.value)
//                   }
//                   InputProps={{
//                     style: { color: "#000000", border: "1px solid black" },
//                   }}
//                 />
//                 {row.options.map((opt, optIndex) => (
//                   <div
//                     className="wgyefdhjas"
//                     key={optIndex}
//                     style={{ display: "flex", alignItems: "center" }}
//                   >
//                     <TextField
//                       label={`Option ${optIndex + 1}`}
//                       style={{ color: "#000000", border: "1px solid black" }}
//                       value={opt}
//                       onChange={(e) =>
//                         handleMatrixChange(
//                           rowIndex,
//                           "options",
//                           e.target.value,
//                           optIndex
//                         )
//                       }
//                       InputProps={{
//                         style: { color: "#000000", border: "1px solid black" },
//                       }}
//                     />
//                     <Checkbox
//                       checked={question.matrixDataAnswer?.some(
//                         (ans) =>
//                           ans.row === rowIndex.toString() &&
//                           ans.option.includes(opt)
//                       )}
//                       onChange={() => handleMatrixSelection(rowIndex, optIndex)}
//                       sx={{
//                         color: "black",
//                         "&.Mui-checked": {
//                           color: "black",
//                         },
//                       }}
//                     />
//                   </div>
//                 ))}
//                 <button
//                   className="azpmjnwixs"
//                   onClick={() => addMatrixOption(rowIndex)}
//                 >
//                   Add Column
//                 </button>
//               </div>
//             ))}
//             <button className="azpmjnwixs" onClick={addMatrixRow}>
//               Add Matrix Row
//             </button>
//           </div>
//         );

//       case "drag-drop":
//         return (
//           <div>
//             <Typography style={{ color: "#000000" }}>
//               Drag & Drop Options
//             </Typography>
//             {question.dragDropOptions.map((option, index) => (
//               <div
//                 key={index}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   margin: "5px 0",
//                 }}
//               >
//                 <TextField
//                   label={`Option ${index + 1}`}
//                   value={option}
//                   style={{ color: "#000000", border: "1px solid black" }}
//                   onChange={(e) => {
//                     const updatedQuestions = [...questionsArray];
//                     updatedQuestions[qIndex].dragDropOptions[index] =
//                       e.target.value;
//                     setQuestionsArray(updatedQuestions);
//                   }}
//                   InputProps={{
//                     style: { color: "#000000", border: "1px solid black" },
//                   }}
//                 />
//               </div>
//             ))}
//             <button className="azpmjnwixs" onClick={handleAddDragDropOption}>
//               Add Option
//             </button>
//             <div style={{ marginTop: "10px" }}>
//               <TextField
//                 label="Correct Order (comma-separated indices)"
//                 value={question.correctAnswers.join(",")}
//                 onChange={(e) =>
//                   updateNextGenQuestion(
//                     qIndex,
//                     "correctAnswers",
//                     e.target.value.split(",")
//                   )
//                 }
//                 InputProps={{
//                   style: { color: "#000000", border: "1px solid black" },
//                 }}
//               />
//             </div>
//           </div>
//         );

//       case "bowtie":
//         return (
//           <div>
//             <Typography style={{ color: "#000000" }}>
//               Bow-Tie Components
//             </Typography>
//             <TextField
//               label="Clinical Issue"
//               fullWidth
//               value={question.bowtieData?.issue || ""}
//               onChange={(e) => updateBowtieField("issue", e.target.value)}
//               InputProps={{
//                 style: { color: "#000000", border: "1px solid black" },
//               }}
//             />
//             <div style={{ margin: "10px 0" }}>
//               <Typography style={{ color: "#000000" }}>
//                 Priority Actions:
//               </Typography>
//               {[0, 1].map((index) => (
//                 <TextField
//                   key={index}
//                   label={`Action ${index + 1}`}
//                   value={question.bowtieData?.actions?.[index] || ""}
//                   onChange={(e) => updateBowtieAction(index, e.target.value)}
//                   InputProps={{
//                     style: { color: "#000000", border: "1px solid black" },
//                   }}
//                 />
//               ))}
//             </div>
//             <div style={{ margin: "10px 0" }}>
//               <Typography style={{ color: "#000000" }}>
//                 Potential Outcomes:
//               </Typography>
//               {[0, 1].map((index) => (
//                 <TextField
//                   key={index}
//                   label={`Outcome ${index + 1}`}
//                   value={question.bowtieData?.outcomes?.[index] || ""}
//                   onChange={(e) => updateBowtieOutcome(index, e.target.value)}
//                   InputProps={{
//                     style: { color: "#000000", border: "1px solid black" },
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         );

//       case "fillblank":
//         return (
//           <div>
//             <Typography style={{ color: "#000000" }}>
//               Fill-in-the-Blank
//             </Typography>
//             <TextField
//               fullWidth
//               label="Question with Blanks (use _BLANK_)"
//               value={question.questionText}
//               onChange={(e) =>
//                 updateNextGenQuestion(qIndex, "questionText", e.target.value)
//               }
//               InputProps={{
//                 style: { color: "#000000", border: "1px solid black" },
//               }}
//             />
//             <div style={{ marginTop: "10px" }}>
//               <TextField
//                 label="Correct Answer(s)"
//                 value={question.correctAnswers.join(", ")}
//                 onChange={(e) =>
//                   updateNextGenQuestion(
//                     qIndex,
//                     "correctAnswers",
//                     e.target.value.split(",")
//                   )
//                 }
//                 helperText="Separate multiple correct answers with commas"
//                 InputProps={{
//                   style: { color: "#000000", border: "1px solid black" },
//                 }}
//               />
//             </div>
//           </div>
//         );

//       case "ranking":
//         return (
//           <div>
//             <Typography style={{ color: "#000000" }}>
//               Ranking Options
//             </Typography>
//             {question.options.map((option, index) => (
//               <div
//                 key={index}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   margin: "5px 0",
//                 }}
//               >
//                 <TextField
//                   label={`Item ${index + 1}`}
//                   value={option}
//                   onChange={(e) =>
//                     handleNextGenOptionChange(qIndex, index, e.target.value)
//                   }
//                   InputProps={{
//                     style: { color: "#000000", border: "1px solid black" },
//                   }}
//                 />
//                 <Typography
//                   variant="body2"
//                   style={{ marginLeft: "10px", color: "#000000" }}
//                 >
//                   Current Position: {index + 1}
//                 </Typography>
//               </div>
//             ))}
//             <Button onClick={() => handleAddOption(qIndex)}>
//               Add Ranking Option
//             </Button>
//             <div style={{ marginTop: "10px" }}>
//               <TextField
//                 label="Correct Order (comma-separated indices)"
//                 value={question.correctAnswers.join(",")}
//                 onChange={(e) =>
//                   updateNextGenQuestion(
//                     qIndex,
//                     "correctAnswers",
//                     e.target.value.split(",")
//                   )
//                 }
//                 helperText="Enter the correct order using option indices (0-based)"
//                 InputProps={{
//                   style: { color: "#000000", border: "1px solid black" },
//                 }}
//               />
//             </div>
//           </div>
//         );

//       default:
//         return (
//           <Typography style={{ color: "#000000" }}>
//             Selected format not implemented yet
//           </Typography>
//         );
//     }
//   };

//   const updateNextGenQuestion = (index, field, value) => {
//     const updatedQuestions = [...questionsArray];
//     updatedQuestions[index][field] = value;
//     setQuestionsArray(updatedQuestions);
//   };

//   // Add new option based on format
//   const handleAddOption = (qIndex) => {
//     const updatedQuestions = [...questionsArray];
//     updatedQuestions[qIndex].options.push("");
//     setQuestionsArray(updatedQuestions);
//   };

//   const handleNextGenCorrectAnswer = (qIndex, option) => {
//     const updatedQuestions = [...questionsArray];
//     const question = updatedQuestions[qIndex];

//     if (question.correctAnswers.includes(option)) {
//       question.correctAnswers = question.correctAnswers.filter(
//         (ans) => ans !== option
//       );
//     } else {
//       question.correctAnswers = [...question.correctAnswers, option];
//     }

//     setQuestionsArray(updatedQuestions);
//   };
//   const handleNextGenOptionChange = (qIndex, optIndex, value) => {
//     const updatedQuestions = [...questionsArray];
//     updatedQuestions[qIndex].options[optIndex] = value;
//     setQuestionsArray(updatedQuestions);
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const subjects = [
//     "Adult Health",
//     "Child Health",
//     "Critical Care",
//     "Fundamentals",
//     "Leadership & Management",
//     "Maternal & Newborn Health",
//     "Mental Health",
//     "Pharmacology",
//     " Cardiovascular",
//   ];
//   const casesubjects = [
//     "Adult Health",
//     "Child Health",
//     "Critical Care",
//     "Fundamentals",
//     "Leadership & Management",
//     "Maternal & Newborn Health",
//     "Mental Health",
//     "Pharmacology",
//     " Cardiovascular",
//   ];
//   const handleSelect = (selectedSubject) => {
//     setSubject(selectedSubject);
//   };
//   const handleCaseSelect = (selectedSubject) => {
//     setcaseSubject(selectedSubject);
//   };
//   const systems = [
//     "Analgesics",
//     "Antepartum",
//     "Assignment/Delegation",
//     "Basic Care & Comfort",
//     "Cardiovascular",
//     "Communication",
//     "Critical Care Concepts",
//     "Development Throughout the Life Span",
//     "Emergency Care",
//     "Endocrine",
//     "Ethical/Legal",
//     "Fluid, Electrolyte, Acid-Base Balance",
//     "Gastrointestinal/Nutrition",
//     "Growth & Development",
//     "Hematological/Oncological",
//     "Immune",
//     "Infectious Disease",
//     "Integumentary",
//     "Labor/Delivery",
//     "Management Concepts",
//     "Medication Administration",
//     "Mental Health Concepts",
//     "Musculoskeletal",
//     "Neurologic",
//     "Newborn",
//     "Postpartum",
//     "Prioritization",
//     "Psychiatric Medications",
//     "Reproductive",
//     "Reproductive/Maternity/Newborn",
//     "Respiratory",
//     "Safety/Infection Control",
//     "Skills/Procedures",
//     "Urinary/Renal",
//     "Visual/Auditory",
//   ];
//   const Casesystems = [
//     "Analgesics",
//     "Antepartum",
//     "Assignment/Delegation",
//     "Basic Care & Comfort",
//     "Cardiovascular",
//     "Communication",
//     "Critical Care Concepts",
//     "Development Throughout the Life Span",
//     "Emergency Care",
//     "Endocrine",
//     "Ethical/Legal",
//     "Fluid, Electrolyte, Acid-Base Balance",
//     "Gastrointestinal/Nutrition",
//     "Growth & Development",
//     "Hematological/Oncological",
//     "Immune",
//     "Infectious Disease",
//     "Integumentary",
//     "Labor/Delivery",
//     "Management Concepts",
//     "Medication Administration",
//     "Mental Health Concepts",
//     "Musculoskeletal",
//     "Neurologic",
//     "Newborn",
//     "Postpartum",
//     "Prioritization",
//     "Psychiatric Medications",
//     "Reproductive",
//     "Reproductive/Maternity/Newborn",
//     "Respiratory",
//     "Safety/Infection Control",
//     "Skills/Procedures",
//     "Urinary/Renal",
//     "Visual/Auditory",
//   ];
//   const handleSelectSystem = (selectedSubject) => {
//     setSystem(selectedSubject);
//   };
//   const handleSelectcaseSystem = (selectedSubject) => {
//     setcaseSystem(selectedSubject);
//   };

//   const addOption = () => {
//     setOptions([...options, ""]);
//   };
//   const navigate = useNavigate();
//   const handleCorrectAnswerChange = (option) => {
//     if (correctAnswers.includes(option)) {
//       setCorrectAnswers(correctAnswers.filter((ans) => ans !== option));
//     } else {
//       setCorrectAnswers([...correctAnswers, option]);
//     }
//   };

//   const handleSubmit = () => {
//     // const isValid = questionsArray.every(question => {
//     //     switch (question.format) {
//     //         case 'mcq':
//     //             return question.options.length >= 2 && question.correctAnswers.length === 1;
//     //         case 'sata':
//     //             return question.options.length >= 2 && question.correctAnswers.length >= 2;
//     //         case 'cloze':
//     //             return question.questionText.includes('[') && question.options.length >= 2;
//     //         case 'matrix':
//     //             return question.matrixData.length > 0 && question.correctAnswers.length > 0;
//     //         case 'bowtie':
//     //             return question.bowtieData.issue &&
//     //                 question.bowtieData.actions.every(a => a) &&
//     //                 question.bowtieData.outcomes.every(o => o);
//     //         // Add validations for other formats
//     //         default:
//     //             return true;
//     //     }
//     // });

//     // if (!isValid) {
//     //     toast.error('Please complete all required fields for each question');
//     //     return;
//     // }
//     if (questionType === "traditional") {
//       // Existing traditional validation
//       if (
//         !subject ||
//         !difficulty ||
//         !questionText ||
//         !options.length ||
//         !correctAnswers.length ||
//         !explanation
//       ) {
//         toast.warning("Please fill in all the fields.");
//         return;
//       }
//     }
//     //  else {
//     //     // Next-Gen validation
//     //     if (!caseStudy || questionsArray.some(q =>
//     //         !q.difficulty || !q.questionText ||
//     //         !q.options.length || !q.correctAnswers.length
//     //     )) {
//     //         toast.warning("Please fill in all fields for case study and all questions.");
//     //         return;
//     //     }
//     // }

//     setLoading(true);
//     const questionData =
//       questionType === "traditional"
//         ? {
//             type: questionType,
//             subject,
//             difficulty,
//             system,
//             question: questionText,
//             options,
//             correctAnswers,
//             explanation,
//           }
//         : {
//             type: "nextgen",
//             caseStudy,
//             subject: casesubject,
//             system: casesystem,
//             Questions: questionsArray.map((q) => ({
//               format: q.format,
//               difficulty: q.difficulty,
//               question: q.questionText,
//               options: q.options,
//               correctAnswers: q.correctAnswers,
//               matrixData: q.matrixData,
//               matrixDataAnswer: q.matrixDataAnswer,
//               bowtieData: q.bowtieData,
//               dragDropOptions: q.dragDropOptions,
//               explanation: q.explanation,
//             })),
//           };

//     console.log("Question Data:", questionData);
//     const datawithid = {
//       id: id,
//       data: questionData,
//     };
//     dispatch(addQuestion(datawithid)).then((res) => {
//       console.log("AddQuestion", res);
//       if (res?.payload?.data?.message === "Questions added successfully") {
//         toast.success("Question added successfully");
//         navigate(-1);
//       } else if (res?.payload?.status === 201) {
//         toast.success("Question added successfully");
//         navigate(-1);
//       } else if (res?.payload?.status === 400) {
//         toast.error(res?.payload?.message?.message);
//       } else {
//         toast.error("Cannot Add at the moment");
//       }
//       setLoading(false);
//     });
//   };
//   return (
//     <div style={{ overflowY: "scroll", overflowX: "hidden", height: "100%" }}>
//       {" "}
//       {loading && <ScreenLoader />}
//       <Grid container spacing={3} style={{ padding: "35px" }}>
//         <p className="Headline800">Add Question</p>
//         <Grid item xs={12}>
//           <FormControl fullWidth>
//             <p className="labeltextt">Question Type</p>
//             <Select
//               value={questionType}
//               onChange={(e) => setQuestionType(e.target.value)}
//             >
//               <MenuItem
//                 value="traditional"
//                 sx={{
//                   color:
//                     questionType === "traditional"
//                       ? "black !important"
//                       : "#00000099",
//                 }}
//               >
//                 Traditional
//               </MenuItem>
//               <MenuItem
//                 value="nextgen"
//                 sx={{
//                   color:
//                     questionType === "nextgen"
//                       ? "black !important"
//                       : "#00000099",
//                 }}
//               >
//                 Next-Gen
//               </MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         {questionType === "nextgen" ? (
//           <>
//             <Grid item xs={12}>
//               <p className="labeltextt">Subject</p>
//               <Dropdown onSelect={handleCaseSelect}>
//                 <Dropdown.Toggle
//                   variant="light"
//                   id="dropdown-basic"
//                   style={{
//                     backgroundColor: "transparent",
//                     border: "1px solid rgba(0, 0, 0, 0.3)",
//                     color: "black",
//                     height: "56px",
//                     width: "100%",
//                     textAlign: "left",
//                   }}
//                 >
//                   {casesubject ? casesubject : "Choose Subject"}
//                 </Dropdown.Toggle>

//                 <Dropdown.Menu style={{ width: "100%" }}>
//                   {casesubjects.map((subjectOption, index) => (
//                     <Dropdown.Item
//                       key={index}
//                       eventKey={subjectOption}
//                       style={{ color: "black" }}
//                     >
//                       {subjectOption}
//                     </Dropdown.Item>
//                   ))}
//                 </Dropdown.Menu>
//               </Dropdown>
//             </Grid>
//             <Grid item xs={12}>
//               <p className="labeltextt">System</p>
//               <Dropdown onSelect={handleSelectcaseSystem}>
//                 <Dropdown.Toggle
//                   variant="light"
//                   id="dropdown-basic"
//                   style={{
//                     backgroundColor: "transparent",
//                     border: "1px solid rgba(0, 0, 0, 0.3)",
//                     color: "black",
//                     height: "56px",
//                     width: "100%",
//                     textAlign: "left",
//                   }}
//                 >
//                   {casesystem ? casesystem : "Choose System"}
//                 </Dropdown.Toggle>

//                 <Dropdown.Menu style={{ width: "100%" }}>
//                   {Casesystems?.map((systemopt, index) => (
//                     <Dropdown.Item
//                       key={index}
//                       eventKey={systemopt}
//                       style={{ color: "black" }}
//                     >
//                       {systemopt}
//                     </Dropdown.Item>
//                   ))}
//                 </Dropdown.Menu>
//               </Dropdown>
//             </Grid>
//             <Grid item xs={12}>
//               <p className="labeltextt">Case Study</p>
//               <TextField
//                 fullWidth
//                 placeholder="Case Study"
//                 multiline
//                 rows={4}
//                 value={caseStudy}
//                 onChange={(e) => setCaseStudy(e.target.value)}
//               />
//             </Grid>

//             <div style={{ padding: "24px" }}>
//               {questionsArray.map((question, qIndex) => (
//                 <Grid
//                   container
//                   spacing={3}
//                   key={qIndex}
//                   style={{
//                     padding: "24px",
//                     border: "1px solid #000000",
//                     borderRadius: "10px",
//                   }}
//                 >
//                   <Grid item xs={12}>
//                     <FormControl fullWidth>
//                       <InputLabel>Question Format</InputLabel>
//                       <Select
//                         value={question.format}
//                         onChange={(e) =>
//                           updateQuestionFormat(qIndex, e.target.value)
//                         }
//                       >
//                         {QUESTION_FORMATS.map((format) => (
//                           <MenuItem key={format.value} value={format.value}>
//                             {format.label}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <FormControl fullWidth>
//                       <InputLabel>Difficulty</InputLabel>
//                       <Select
//                         value={question.difficulty}
//                         onChange={(e) =>
//                           updateNextGenQuestion(
//                             qIndex,
//                             "difficulty",
//                             e.target.value
//                           )
//                         }
//                       >
//                         <MenuItem value="easy">Easy</MenuItem>
//                         <MenuItem value="medium">Medium</MenuItem>
//                         <MenuItem value="hard">Hard</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Question Text"
//                       value={question.questionText}
//                       onChange={(e) =>
//                         updateNextGenQuestion(
//                           qIndex,
//                           "questionText",
//                           e.target.value
//                         )
//                       }
//                       multiline
//                       rows={2}
//                     />
//                   </Grid>
//                   {/* Render format-specific inputs */}
//                   {renderOptionsByFormat(qIndex, question)}

//                   <Grid item xs={12} style={{ marginTop: "15px" }}>
//                     <TextField
//                       fullWidth
//                       label="Explanation"
//                       value={question.explanation || ""}
//                       onChange={(e) =>
//                         updateNextGenQuestion(
//                           qIndex,
//                           "explanation",
//                           e.target.value
//                         )
//                       }
//                       multiline
//                       rows={3}
//                       placeholder="Provide an explanation for this question"
//                     />
//                   </Grid>
//                 </Grid>
//               ))}

//               <Grid item xs={12}>
//                 <button
//                   class="addqbttn"
//                   style={{ background: "seagreen" }}
//                   onClick={addNextGenQuestion}
//                 >
//                   Add Another Question
//                 </button>
//               </Grid>
//             </div>
//           </>
//         ) : (
//           <>
//             <Grid item xs={12}>
//               <p className="labeltextt">Subject</p>
//               <Dropdown onSelect={handleSelect}>
//                 <Dropdown.Toggle
//                   variant="light"
//                   id="dropdown-basic"
//                   style={{
//                     backgroundColor: "transparent",
//                     border: "1px solid rgba(0, 0, 0, 0.3)",
//                     color: "black",
//                     height: "56px",
//                     width: "100%",
//                     textAlign: "left",
//                   }}
//                 >
//                   {subject ? subject : "Choose Subject"}
//                 </Dropdown.Toggle>

//                 <Dropdown.Menu style={{ width: "100%" }}>
//                   {subjects.map((subjectOption, index) => (
//                     <Dropdown.Item
//                       key={index}
//                       eventKey={subjectOption}
//                       style={{ color: "black" }}
//                     >
//                       {subjectOption}
//                     </Dropdown.Item>
//                   ))}
//                 </Dropdown.Menu>
//               </Dropdown>
//             </Grid>
//             <Grid item xs={12}>
//               <p className="labeltextt">System</p>
//               <Dropdown onSelect={handleSelectSystem}>
//                 <Dropdown.Toggle
//                   variant="light"
//                   id="dropdown-basic"
//                   style={{
//                     backgroundColor: "transparent",
//                     border: "1px solid rgba(0, 0, 0, 0.3)",
//                     color: "black",
//                     height: "56px",
//                     width: "100%",
//                     textAlign: "left",
//                   }}
//                 >
//                   {system ? system : "Choose System"}
//                 </Dropdown.Toggle>

//                 <Dropdown.Menu style={{ width: "100%" }}>
//                   {systems?.map((systemopt, index) => (
//                     <Dropdown.Item
//                       key={index}
//                       eventKey={systemopt}
//                       style={{ color: "black" }}
//                     >
//                       {systemopt}
//                     </Dropdown.Item>
//                   ))}
//                 </Dropdown.Menu>
//               </Dropdown>
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <p className="labeltextt">Difficulty</p>
//                 <Select
//                   value={difficulty}
//                   onChange={(e) => setDifficulty(e.target.value)}
//                 >
//                   <MenuItem value="easy">Easy</MenuItem>
//                   <MenuItem value="medium">Medium</MenuItem>
//                   <MenuItem value="hard">Hard</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <p className="labeltextt">Question Text</p>
//               <TextField
//                 fullWidth
//                 placeholder="Question Text"
//                 multiline
//                 rows={4}
//                 value={questionText}
//                 onChange={(e) => setQuestionText(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <p className="labeltextt">Options</p>
//               {options.map((option, index) => (
//                 <Grid item xs={12} key={index}>
//                   <TextField
//                     fullWidth
//                     label={`Option ${index + 1}`}
//                     value={option}
//                     onChange={(e) => handleOptionChange(index, e.target.value)}
//                   />
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={correctAnswers.includes(option)}
//                         onChange={() => handleCorrectAnswerChange(option)}
//                         sx={{
//                           color: "black", // Color of the unchecked checkbox
//                           "&.Mui-checked": {
//                             color: "black", // Color of the checked checkbox
//                           },
//                         }}
//                       />
//                     }
//                     label="Correct Answer"
//                     sx={{
//                       "& .MuiFormControlLabel-label": {
//                         color: "black", // Styling the label color to black
//                       },
//                     }}
//                   />
//                 </Grid>
//               ))}
//               <Button variant="contained" onClick={addOption}>
//                 Add Option
//               </Button>
//             </Grid>
//             <div style={{ width: "100%", padding: "24px 0px 0px 24px" }}>
//               <p className="labeltextt">Explanation</p>
//               <ReactQuill
//                 theme="snow"
//                 value={explanation}
//                 onChange={(value) => setexplanation(value)}
//                 placeholder="Write your explanation here..."
//                 className="custom-quill"
//                 modules={{
//                   toolbar: [
//                     [{ header: [1, 2, 3, 4, 5, 6, false] }],
//                     ["bold", "italic", "underline", "strike"],
//                     [{ list: "ordered" }, { list: "bullet" }],
//                     [{ color: [] }, { background: [] }],
//                     ["link", "blockquote", "code-block"],
//                     ["clean"],
//                   ],
//                   clipboard: {
//                     matchVisual: false,
//                   },
//                 }}
//                 formats={[
//                   "header",
//                   "bold",
//                   "italic",
//                   "underline",
//                   "strike",
//                   "list",
//                   "bullet",
//                   "color",
//                   "background",
//                   "link",
//                   "blockquote",
//                   "code-block",
//                 ]}
//                 style={{
//                   height: "auto",
//                   minHeight: "200px",
//                   marginBottom: "50px",
//                 }}
//               />
//             </div>
//           </>
//         )}
//         <div
//           style={{
//             display: "flex",
//             paddingTop: "30px",
//             justifyContent: "center",
//             width: "100%",
//           }}
//         >
//           <button class="addqbttn" onClick={() => handleSubmit()}>
//             Submit Question
//           </button>
//         </div>
//       </Grid>
//     </div>
//   );
// };

// export default AddQuestions;

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
  const [clientWords, setClientWords] = useState("");
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
      explanation: "",
      clientWords: "",
      extraInfo: [""],
      mrdescription: "",
      chartdescription: "",
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
    { value: "extended-mr", label: "Extended Multiple-Response" },
    { value: "drag-drop", label: "Extended Drag-and-Drop" },
    { value: "bowtie", label: "Bow-Tie" },
    { value: "chart", label: "Chart/Exhibit" },
    { value: "trend", label: "Trend" },
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
        explanation: "",
        clientWords: "",
        extraInfo: [""],
        mrdescription: "",
        chartdescription: "",
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
              <div
                key={optIndex}
                className="wgyefdhjas"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
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
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteNextGenOption(qIndex, optIndex)}
                  style={{ minWidth: "40px", height: "40px", padding: "0" }}
                >
                  ×
                </Button>
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
              <div
                key={optIndex}
                className="wgyefdhjas"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
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
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteNextGenOption(qIndex, optIndex)}
                  style={{ minWidth: "40px", height: "40px", padding: "0" }}
                >
                  ×
                </Button>
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
            <Typography
              variant="body2"
              style={{ color: "#000000", marginBottom: "15px" }}
            >
              Use [dropdown] placeholders in your text. You can have multiple
              dropdowns in one question.
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              style={{
                color: "#000000",
                border: "1px solid black",
                marginBottom: "15px",
              }}
              value={question.questionText}
              onChange={(e) =>
                updateNextGenQuestion(qIndex, "questionText", e.target.value)
              }
              placeholder="Example: The nurse should assess the patient's [dropdown] before administering [dropdown] medication."
              InputProps={{
                style: { color: "#000000", border: "1px solid black" },
              }}
            />

            {/* Display dropdown options */}
            <div style={{ marginTop: "15px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Dropdown Options:
              </Typography>
              {question.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className="wgyefdhjas"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
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
                    placeholder="Enter option text"
                    InputProps={{
                      style: { color: "#000000", border: "1px solid black" },
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={question.correctAnswers.includes(option)}
                        onChange={() => {
                          const updatedQuestions = [...questionsArray];
                          if (
                            !updatedQuestions[qIndex].correctAnswers.includes(
                              option
                            )
                          ) {
                            updatedQuestions[qIndex].correctAnswers.push(
                              option
                            );
                          } else {
                            updatedQuestions[qIndex].correctAnswers =
                              updatedQuestions[qIndex].correctAnswers.filter(
                                (ans) => ans !== option
                              );
                          }
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
                      updatedQuestions[qIndex].correctAnswers =
                        updatedQuestions[qIndex].correctAnswers.filter(
                          (ans) => ans !== option
                        );
                      setQuestionsArray(updatedQuestions);
                    }}
                    style={{ minWidth: "40px", height: "40px", padding: "0" }}
                  >
                    ×
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

            <Typography
              variant="body2"
              style={{ color: "#000000", marginTop: "15px" }}
            >
              Preview: {question.questionText.replace(/\[dropdown\]/g, "[⬇️]")}
            </Typography>
          </div>
        );
      case "highlight":
        return (
          <div className="wgyefdhjas">
            <Typography style={{ color: "#000000" }}>
              Highlight (Hot Spot) Questions
            </Typography>
            <Typography
              variant="body2"
              style={{ color: "#000000", marginBottom: "15px" }}
            >
              Create a question where test-takers must highlight specific words
              or phrases in the text that answer the question.
            </Typography>

            <div style={{ marginBottom: "15px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Question Text:
              </Typography>
              <ReactQuill
                theme="snow"
                value={question.questionText}
                onChange={(value) =>
                  updateNextGenQuestion(qIndex, "questionText", value)
                }
                placeholder="Example: Highlight the abnormal finding in the nurse's note: 'Patient alert, HR 88, RR 22, BP 190/100, Temp 98.6°F'"
                className="custom-quill"
              />
            </div>

            <div style={{ marginTop: "15px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Correct Highlight Phrases:
              </Typography>
              {question.correctAnswers.map((phrase, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <TextField
                    fullWidth
                    label={`Correct Highlight Phrase ${index + 1}`}
                    style={{ color: "#000000", border: "1px solid black" }}
                    value={phrase}
                    onChange={(e) => {
                      const updatedQuestions = [...questionsArray];
                      updatedQuestions[qIndex].correctAnswers[index] =
                        e.target.value;
                      setQuestionsArray(updatedQuestions);
                    }}
                    placeholder="Enter the exact text that should be highlighted"
                    InputProps={{
                      style: { color: "#000000", border: "1px solid black" },
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      const updatedQuestions = [...questionsArray];
                      updatedQuestions[qIndex].correctAnswers =
                        updatedQuestions[qIndex].correctAnswers.filter(
                          (_, i) => i !== index
                        );
                      setQuestionsArray(updatedQuestions);
                    }}
                    style={{ minWidth: "40px", height: "40px", padding: "0" }}
                  >
                    ×
                  </Button>
                </div>
              ))}
              <Button
                variant="contained"
                onClick={() => {
                  const updatedQuestions = [...questionsArray];
                  updatedQuestions[qIndex].correctAnswers.push("");
                  setQuestionsArray(updatedQuestions);
                }}
                style={{ marginTop: "10px" }}
              >
                Add Another Phrase
              </Button>
            </div>

            <div style={{ marginTop: "15px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Preview:
              </Typography>
              <div
                className="preview-container"
                style={{
                  padding: "15px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: question.questionText }}
                />
                {question.correctAnswers.length > 0 && (
                  <div style={{ marginTop: "10px", color: "#666" }}>
                    <Typography variant="body2">
                      Correct answers will be highlighted:{" "}
                      {question.correctAnswers.join(", ")}
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "matrix":
        return (
          <div>
            <Typography style={{ color: "#000000" }}>
              Matrix/Grid Setup
            </Typography>
            <Typography
              variant="body2"
              style={{ color: "#000000", marginBottom: "15px" }}
            >
              Create a table where test-takers must select the correct priority
              level for each nursing action.
            </Typography>

            {/* Priority Levels */}
            <div style={{ marginBottom: "20px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Priority Levels:
              </Typography>
              <div
                style={{ display: "flex", gap: "20px", marginBottom: "15px" }}
              >
                {["High", "Medium", "Low"].map((level, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={question.matrixData?.priorityLevels?.includes(
                          level
                        )}
                        onChange={() => {
                          const updatedQuestions = [...questionsArray];
                          if (
                            !updatedQuestions[qIndex].matrixData.priorityLevels
                          ) {
                            updatedQuestions[qIndex].matrixData.priorityLevels =
                              [];
                          }
                          if (
                            updatedQuestions[
                              qIndex
                            ].matrixData.priorityLevels.includes(level)
                          ) {
                            updatedQuestions[qIndex].matrixData.priorityLevels =
                              updatedQuestions[
                                qIndex
                              ].matrixData.priorityLevels.filter(
                                (l) => l !== level
                              );
                          } else {
                            updatedQuestions[
                              qIndex
                            ].matrixData.priorityLevels.push(level);
                          }
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
                    label={level}
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        color: "black",
                      },
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Nursing Actions */}
            <div>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Nursing Actions:
              </Typography>
              {question.matrixData?.actions?.map((action, rowIndex) => (
                <div
                  key={rowIndex}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginBottom: "15px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                >
                  <TextField
                    label={`Nursing Action ${rowIndex + 1}`}
                    value={action.text}
                    onChange={(e) => {
                      const updatedQuestions = [...questionsArray];
                      if (!updatedQuestions[qIndex].matrixData.actions) {
                        updatedQuestions[qIndex].matrixData.actions = [];
                      }
                      if (
                        !updatedQuestions[qIndex].matrixData.actions[rowIndex]
                      ) {
                        updatedQuestions[qIndex].matrixData.actions[rowIndex] =
                          {};
                      }
                      updatedQuestions[qIndex].matrixData.actions[
                        rowIndex
                      ].text = e.target.value;
                      setQuestionsArray(updatedQuestions);
                    }}
                    style={{ flex: 1 }}
                    placeholder="Enter nursing action"
                    InputProps={{
                      style: { color: "#000000", border: "1px solid black" },
                    }}
                  />
                  <FormControl style={{ minWidth: "200px" }}>
                    <InputLabel>Correct Priority</InputLabel>
                    <Select
                      value={action.correctPriority || ""}
                      onChange={(e) => {
                        const updatedQuestions = [...questionsArray];
                        if (!updatedQuestions[qIndex].matrixData.actions) {
                          updatedQuestions[qIndex].matrixData.actions = [];
                        }
                        if (
                          !updatedQuestions[qIndex].matrixData.actions[rowIndex]
                        ) {
                          updatedQuestions[qIndex].matrixData.actions[
                            rowIndex
                          ] = {};
                        }
                        updatedQuestions[qIndex].matrixData.actions[
                          rowIndex
                        ].correctPriority = e.target.value;
                        setQuestionsArray(updatedQuestions);
                      }}
                    >
                      {question.matrixData?.priorityLevels?.map((level) => (
                        <MenuItem key={level} value={level}>
                          {level}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      const updatedQuestions = [...questionsArray];
                      updatedQuestions[qIndex].matrixData.actions =
                        updatedQuestions[qIndex].matrixData.actions.filter(
                          (_, i) => i !== rowIndex
                        );
                      setQuestionsArray(updatedQuestions);
                    }}
                    style={{ minWidth: "40px", height: "40px", padding: "0" }}
                  >
                    ×
                  </Button>
                </div>
              ))}
              <Button
                variant="contained"
                onClick={() => {
                  const updatedQuestions = [...questionsArray];
                  if (!updatedQuestions[qIndex].matrixData.actions) {
                    updatedQuestions[qIndex].matrixData.actions = [];
                  }
                  updatedQuestions[qIndex].matrixData.actions.push({
                    text: "",
                    correctPriority: "",
                  });
                  setQuestionsArray(updatedQuestions);
                }}
                style={{ marginTop: "10px" }}
              >
                Add Nursing Action
              </Button>
            </div>

            {/* Preview Section */}
            {question.matrixData?.actions?.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                  Preview:
                </Typography>
                <div
                  style={{
                    padding: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            borderBottom: "1px solid #ccc",
                          }}
                        >
                          Nursing Action
                        </th>
                        {question.matrixData?.priorityLevels?.map((level) => (
                          <th
                            key={level}
                            style={{
                              textAlign: "center",
                              padding: "8px",
                              borderBottom: "1px solid #ccc",
                            }}
                          >
                            {level}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {question.matrixData?.actions?.map((action, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              padding: "8px",
                              borderBottom: "1px solid #ccc",
                            }}
                          >
                            {action.text}
                          </td>
                          {question.matrixData?.priorityLevels?.map((level) => (
                            <td
                              key={level}
                              style={{
                                textAlign: "center",
                                padding: "8px",
                                borderBottom: "1px solid #ccc",
                              }}
                            >
                              ⬜
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {question.matrixData?.actions?.some(
                    (a) => a.correctPriority
                  ) && (
                    <div style={{ marginTop: "10px", color: "#666" }}>
                      <Typography variant="body2">
                        Correct Answers:{" "}
                        {question.matrixData.actions
                          .filter((a) => a.correctPriority)
                          .map((a) => `${a.text} = ${a.correctPriority}`)
                          .join(", ")}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case "drag-drop":
        return (
          <div>
            <Typography style={{ color: "#000000" }}>
              Extended Drag-and-Drop Questions
            </Typography>
            <Typography
              variant="body2"
              style={{ color: "#000000", marginBottom: "15px" }}
            >
              Create questions where test-takers must arrange items in the
              correct order or priority. Perfect for procedure steps, nursing
              interventions, or any sequence-based questions.
            </Typography>

            <div style={{ marginBottom: "20px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Question Text:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={question.questionText}
                onChange={(e) =>
                  updateNextGenQuestion(qIndex, "questionText", e.target.value)
                }
                placeholder="Example: Place the steps of medication administration in the correct order:"
                InputProps={{
                  style: { color: "#000000", border: "1px solid black" },
                }}
              />
            </div>

            <div>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Items to Arrange:
              </Typography>
              {question.dragDropOptions.map((option, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography style={{ minWidth: "30px", color: "#000000" }}>
                    {index + 1}.
                  </Typography>
                  <TextField
                    fullWidth
                    label={`Item ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      const updatedQuestions = [...questionsArray];
                      updatedQuestions[qIndex].dragDropOptions[index] =
                        e.target.value;
                      setQuestionsArray(updatedQuestions);
                    }}
                    placeholder="Enter item text"
                    InputProps={{
                      style: { color: "#000000", border: "1px solid black" },
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      const updatedQuestions = [...questionsArray];
                      updatedQuestions[qIndex].dragDropOptions =
                        updatedQuestions[qIndex].dragDropOptions.filter(
                          (_, i) => i !== index
                        );
                      setQuestionsArray(updatedQuestions);
                    }}
                    style={{ minWidth: "40px", height: "40px", padding: "0" }}
                  >
                    ×
                  </Button>
                </div>
              ))}
              <Button
                variant="contained"
                onClick={handleAddDragDropOption}
                style={{ marginTop: "10px" }}
              >
                Add Item
              </Button>
            </div>

            <div style={{ marginTop: "20px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Correct Order:
              </Typography>
              <Typography
                variant="body2"
                style={{ color: "#666", marginBottom: "10px" }}
              >
                Enter the correct order using item numbers (1-based). Example:
                1,2,3,4,5
              </Typography>
              <TextField
                fullWidth
                label="Correct Order"
                value={question.correctAnswers.join(",")}
                onChange={(e) =>
                  updateNextGenQuestion(
                    qIndex,
                    "correctAnswers",
                    e.target.value.split(",").map((num) => num.trim())
                  )
                }
                InputProps={{
                  style: { color: "#000000", border: "1px solid black" },
                }}
              />
            </div>

            {/* Preview Section */}
            {question.dragDropOptions.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                  Preview:
                </Typography>
                <div
                  style={{
                    padding: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography variant="body1" style={{ marginBottom: "15px" }}>
                    {question.questionText}
                  </Typography>
                  {question.dragDropOptions.map((option, index) => (
                    <div key={index} style={{ marginBottom: "8px" }}>
                      {String.fromCharCode(65 + index)}. {option}
                    </div>
                  ))}
                  {question.correctAnswers.length > 0 && (
                    <div style={{ marginTop: "15px", color: "#666" }}>
                      <Typography variant="body2">
                        Correct Order:{" "}
                        {question.correctAnswers
                          .map(
                            (num) => question.dragDropOptions[parseInt(num) - 1]
                          )
                          .join(" → ")}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case "bowtie":
        return (
          <div>
            <Typography style={{ color: "#000000" }}>
              Bow-Tie Questions
            </Typography>
            <Typography
              variant="body2"
              style={{ color: "#000000", marginBottom: "15px" }}
            >
              Create a scenario-based question where test-takers identify a
              clinical issue, select priority actions, and choose potential
              outcomes.
            </Typography>

            <div style={{ marginBottom: "20px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Scenario:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={question.questionText}
                onChange={(e) =>
                  updateNextGenQuestion(qIndex, "questionText", e.target.value)
                }
                placeholder="Example: 67-year-old with COPD shows increased respiratory rate and confusion."
                InputProps={{
                  style: { color: "#000000", border: "1px solid black" },
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Clinical Issue (Center):
              </Typography>
              <TextField
                fullWidth
                value={question.bowtieData?.issue || ""}
                onChange={(e) => updateBowtieField("issue", e.target.value)}
                placeholder="Example: Respiratory distress"
                InputProps={{
                  style: { color: "#000000", border: "1px solid black" },
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Priority Actions (Left):
              </Typography>
              {[0, 1].map((index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <TextField
                    fullWidth
                    label={`Action ${index + 1}`}
                    value={question.bowtieData?.actions?.[index] || ""}
                    onChange={(e) => updateBowtieAction(index, e.target.value)}
                    placeholder={`Example: ${
                      index === 0 ? "Administer oxygen" : "Raise head of bed"
                    }`}
                    InputProps={{
                      style: { color: "#000000", border: "1px solid black" },
                    }}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Potential Outcomes (Right):
              </Typography>
              {[0, 1].map((index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <TextField
                    fullWidth
                    label={`Outcome ${index + 1}`}
                    value={question.bowtieData?.outcomes?.[index] || ""}
                    onChange={(e) => updateBowtieOutcome(index, e.target.value)}
                    placeholder={`Example: ${
                      index === 0 ? "Improved oxygenation" : "Reduced anxiety"
                    }`}
                    InputProps={{
                      style: { color: "#000000", border: "1px solid black" },
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Preview Section */}
            {(question.questionText ||
              question.bowtieData?.issue ||
              question.bowtieData?.actions?.some((a) => a) ||
              question.bowtieData?.outcomes?.some((o) => o)) && (
              <div style={{ marginTop: "20px" }}>
                <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                  Preview:
                </Typography>
                <div
                  style={{
                    padding: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  {question.questionText && (
                    <Typography
                      variant="body1"
                      style={{ marginBottom: "15px" }}
                    >
                      Scenario: {question.questionText}
                    </Typography>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <Typography
                        variant="subtitle1"
                        style={{ marginBottom: "10px" }}
                      >
                        Actions
                      </Typography>
                      {question.bowtieData?.actions?.map((action, index) => (
                        <div key={index} style={{ marginBottom: "5px" }}>
                          🔧 {action}
                        </div>
                      ))}
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <Typography
                        variant="subtitle1"
                        style={{ marginBottom: "10px" }}
                      >
                        Clinical Issue
                      </Typography>
                      <div>🎯 {question.bowtieData?.issue}</div>
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <Typography
                        variant="subtitle1"
                        style={{ marginBottom: "10px" }}
                      >
                        Outcomes
                      </Typography>
                      {question.bowtieData?.outcomes?.map((outcome, index) => (
                        <div key={index} style={{ marginBottom: "5px" }}>
                          📈 {outcome}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "fillblank":
        return (
          <div>
            <Typography style={{ color: "#000000" }}>
              Fill-in-the-Blank Questions
            </Typography>
            <Typography
              variant="body2"
              style={{ color: "#000000", marginBottom: "15px" }}
            >
              Create questions where test-takers must type the correct answer
              into a blank field. Perfect for dosage calculations, lab values,
              and numerical answers.
            </Typography>

            <div style={{ marginBottom: "20px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Question Text:
              </Typography>
              <Typography
                variant="body2"
                style={{ color: "#666", marginBottom: "10px" }}
              >
                Use [blank] to indicate where the answer should be filled in.
                Example: "The provider orders 400 mg of a drug. Available: 100
                mg/2 mL. How many mL should be given? [blank]"
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={question.questionText}
                onChange={(e) =>
                  updateNextGenQuestion(qIndex, "questionText", e.target.value)
                }
                placeholder="Example: The provider orders 400 mg of a drug. Available: 100 mg/2 mL. How many mL should be given? [blank]"
                InputProps={{
                  style: { color: "#000000", border: "1px solid black" },
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Correct Answer(s):
              </Typography>
              <Typography
                variant="body2"
                style={{ color: "#666", marginBottom: "10px" }}
              >
                Enter the correct answer(s). For numerical answers, include
                units if applicable. Multiple correct answers can be separated
                by commas.
              </Typography>
              <TextField
                fullWidth
                label="Correct Answer(s)"
                value={question.correctAnswers.join(", ")}
                onChange={(e) =>
                  updateNextGenQuestion(
                    qIndex,
                    "correctAnswers",
                    e.target.value.split(",").map((ans) => ans.trim())
                  )
                }
                placeholder="Example: 8, 8 mL, 8 milliliters"
                helperText="Separate multiple correct answers with commas"
                InputProps={{
                  style: { color: "#000000", border: "1px solid black" },
                }}
              />
            </div>

            {/* Preview Section */}
            {(question.questionText || question.correctAnswers.length > 0) && (
              <div style={{ marginTop: "20px" }}>
                <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                  Preview:
                </Typography>
                <div
                  style={{
                    padding: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography variant="body1" style={{ marginBottom: "15px" }}>
                    {question.questionText.replace(/\[blank\]/g, "_____")}
                  </Typography>
                  {question.correctAnswers.length > 0 && (
                    <div style={{ color: "#666" }}>
                      <Typography variant="body2">
                        Correct Answer(s): {question.correctAnswers.join(", ")}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case "ranking":
        return (
          <div>
            <Typography style={{ color: "#000000" }}>
              Ranking/Ordering Questions
            </Typography>
            <Typography
              variant="body2"
              style={{ color: "#000000", marginBottom: "15px" }}
            >
              Create questions where test-takers must arrange steps, actions, or
              processes in the correct order. Perfect for procedural steps,
              clinical sequences, and priority-based scenarios.
            </Typography>

            <div style={{ marginBottom: "20px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Question Text:
              </Typography>
              <Typography
                variant="body2"
                style={{ color: "#666", marginBottom: "10px" }}
              >
                Provide clear instructions for the ranking task. Example: "You
                find a patient unresponsive. Rank the steps in order of
                priority:"
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={question.questionText}
                onChange={(e) =>
                  updateNextGenQuestion(qIndex, "questionText", e.target.value)
                }
                placeholder="Example: You find a patient unresponsive. Rank the steps in order of priority:"
                InputProps={{
                  style: { color: "#000000", border: "1px solid black" },
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Steps to Rank:
              </Typography>
              {question.options.map((option, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography style={{ minWidth: "30px", color: "#000000" }}>
                    {index + 1}.
                  </Typography>
                  <TextField
                    fullWidth
                    label={`Step ${index + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleNextGenOptionChange(qIndex, index, e.target.value)
                    }
                    placeholder={`Example: ${
                      index === 0 ? "Check responsiveness" : "Call for help"
                    }`}
                    InputProps={{
                      style: { color: "#000000", border: "1px solid black" },
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteNextGenOption(qIndex, index)}
                    style={{ minWidth: "40px", height: "40px", padding: "0" }}
                  >
                    ×
                  </Button>
                </div>
              ))}
              <Button
                variant="contained"
                onClick={() => handleAddOption(qIndex)}
                style={{ marginTop: "10px" }}
              >
                Add Step
              </Button>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Correct Order:
              </Typography>
              <Typography
                variant="body2"
                style={{ color: "#666", marginBottom: "10px" }}
              >
                Enter the correct order using step numbers (1-based). Example:
                1,2,3,4,5
              </Typography>
              <TextField
                fullWidth
                label="Correct Order"
                value={question.correctAnswers.join(",")}
                onChange={(e) =>
                  updateNextGenQuestion(
                    qIndex,
                    "correctAnswers",
                    e.target.value.split(",").map((num) => num.trim())
                  )
                }
                placeholder="Example: 1,2,3,4,5"
                helperText="Separate step numbers with commas"
                InputProps={{
                  style: { color: "#000000", border: "1px solid black" },
                }}
              />
            </div>

            {/* Preview Section */}
            {(question.questionText || question.options.length > 0) && (
              <div style={{ marginTop: "20px" }}>
                <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                  Preview:
                </Typography>
                <div
                  style={{
                    padding: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography variant="body1" style={{ marginBottom: "15px" }}>
                    {question.questionText}
                  </Typography>
                  {question.options.map((option, index) => (
                    <div key={index} style={{ marginBottom: "8px" }}>
                      {String.fromCharCode(65 + index)}. {option}
                    </div>
                  ))}
                  {question.correctAnswers.length > 0 && (
                    <div style={{ marginTop: "15px", color: "#666" }}>
                      <Typography variant="body2">
                        Correct Order:{" "}
                        {question.correctAnswers
                          .map((num) => question.options[parseInt(num) - 1])
                          .join(" → ")}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case "extended-mr":
        return (
          <div>
            <Typography style={{ color: "#000000" }}>
              Extended Multiple-Response Questions
            </Typography>
            <Typography
              variant="body2"
              style={{ color: "#000000", marginBottom: "15px" }}
            >
              Create a complex scenario-based question where test-takers must
              select multiple correct actions based on clinical reasoning.
            </Typography>

            <div style={{ marginBottom: "15px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Scenario Description:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={question.mrdescription || ""}
                onChange={(e) => {
                  const updatedQuestions = [...questionsArray];
                  if (!updatedQuestions[qIndex].mrdescription) {
                    updatedQuestions[qIndex].mrdescription = "";
                  }
                  updatedQuestions[qIndex].mrdescription = e.target.value;
                  setQuestionsArray(updatedQuestions);
                }}
                placeholder="Example: A patient with chest pain and shortness of breath arrives at the ER. Which actions should the nurse take?"
                InputProps={{
                  style: { color: "#000000", border: "1px solid black" },
                }}
              />
            </div>

            <div>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Response Options:
              </Typography>
              {question.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                >
                  <TextField
                    fullWidth
                    label={`Option ${optIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleNextGenOptionChange(
                        qIndex,
                        optIndex,
                        e.target.value
                      )
                    }
                    placeholder="Enter a possible nursing action"
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
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteNextGenOption(qIndex, optIndex)}
                    style={{ minWidth: "40px", height: "40px", padding: "0" }}
                  >
                    ×
                  </Button>
                </div>
              ))}
              <Button
                variant="contained"
                onClick={() => handleAddOption(qIndex)}
                style={{ marginTop: "10px" }}
              >
                Add Option
              </Button>
            </div>

            {/* Preview Section */}
            {question.mrdescription && question.options.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                  Preview:
                </Typography>
                <div
                  style={{
                    padding: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography variant="body1" style={{ marginBottom: "15px" }}>
                    {question.mrdescription}
                  </Typography>
                  {question.options.map((option, index) => (
                    <div key={index} style={{ marginBottom: "8px" }}>
                      {String.fromCharCode(65 + index)}. {option}
                      {question.correctAnswers.includes(option) && (
                        <span style={{ color: "green", marginLeft: "8px" }}>
                          ✅
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "chart":
        return (
          <div>
            <Typography style={{ color: "#000000" }}>
              Chart/Exhibit Questions
            </Typography>
            <Typography
              variant="body2"
              style={{ color: "#000000", marginBottom: "15px" }}
            >
              Create questions that present data in a chart, table, or exhibit
              format. Test-takers must analyze multiple pieces of data to answer
              the question.
            </Typography>

            <div style={{ marginBottom: "20px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Chart/Exhibit Data:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                value={question.chartdescription || ""}
                onChange={(e) => {
                  const updatedQuestions = [...questionsArray];
                  updatedQuestions[qIndex].chartdescription = e.target.value;
                  setQuestionsArray(updatedQuestions);
                }}
                placeholder="Example:
Medication	Dose	Time	Route
Lasix	40mg	8 AM	IV
Digoxin	0.125mg	8 AM	Oral"
                InputProps={{
                  style: { color: "#000000", border: "1px solid black" },
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Question Text:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={question.questionText}
                onChange={(e) =>
                  updateNextGenQuestion(qIndex, "questionText", e.target.value)
                }
                placeholder="Example: Which medication should be held if potassium = 2.9 mEq/L?"
                InputProps={{
                  style: { color: "#000000", border: "1px solid black" },
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Answer Options:
              </Typography>
              {question.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <TextField
                    fullWidth
                    label={`Option ${optIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleNextGenOptionChange(
                        qIndex,
                        optIndex,
                        e.target.value
                      )
                    }
                    placeholder={`Example: ${
                      optIndex === 0 ? "Digoxin" : "Lasix"
                    }`}
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
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteNextGenOption(qIndex, optIndex)}
                    style={{ minWidth: "40px", height: "40px", padding: "0" }}
                  >
                    ×
                  </Button>
                </div>
              ))}
              <Button
                variant="contained"
                onClick={() => handleAddOption(qIndex)}
                style={{ marginTop: "10px" }}
              >
                Add Option
              </Button>
            </div>

            {/* Preview Section */}
            {(question.chartdescription ||
              question.questionText ||
              question.options.length > 0) && (
              <div style={{ marginTop: "20px" }}>
                <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                  Preview:
                </Typography>
                <div
                  style={{
                    padding: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  {question.chartdescription && (
                    <div
                      style={{
                        marginBottom: "15px",
                        padding: "10px",
                        backgroundColor: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                      }}
                    >
                      <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                        {question.chartdescription}
                      </pre>
                    </div>
                  )}
                  {question.questionText && (
                    <Typography
                      variant="body1"
                      style={{ marginBottom: "15px" }}
                    >
                      Question: {question.questionText}
                    </Typography>
                  )}
                  {question.options.length > 0 && (
                    <div>
                      <Typography
                        variant="subtitle1"
                        style={{ marginBottom: "10px" }}
                      >
                        Options:
                      </Typography>
                      {question.options.map((option, index) => (
                        <div key={index} style={{ marginBottom: "5px" }}>
                          {String.fromCharCode(65 + index)}. {option}
                          {question.correctAnswers.includes(option) && (
                            <span style={{ color: "green", marginLeft: "8px" }}>
                              ✅
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case "trend":
        return (
          <div>
            <Typography style={{ color: "#000000" }}>
              Trend (Case Study with Sequential Questions)
            </Typography>
            <Typography
              variant="body2"
              style={{ color: "#000000", marginBottom: "15px" }}
            >
              Create a multi-part case study with evolving patient data and
              sequential questions.
            </Typography>

            <div style={{ marginBottom: "20px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Initial Scenario:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={question.questionText}
                onChange={(e) =>
                  updateNextGenQuestion(qIndex, "questionText", e.target.value)
                }
                placeholder="Example: A 45-year-old patient presents to the ER with chest pain..."
                InputProps={{
                  style: { color: "#000000", border: "1px solid black" },
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                Sequential Data Points:
              </Typography>
              {(question.trendData || []).map((dataPoint, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBottom: "20px",
                    padding: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <TextField
                      fullWidth
                      label={`Data Point ${index + 1}`}
                      value={dataPoint.data}
                      onChange={(e) => {
                        const updatedQuestions = [...questionsArray];
                        if (!updatedQuestions[qIndex].trendData) {
                          updatedQuestions[qIndex].trendData = [];
                        }
                        updatedQuestions[qIndex].trendData[index] = {
                          ...updatedQuestions[qIndex].trendData[index],
                          data: e.target.value,
                          sequence: index,
                        };
                        setQuestionsArray(updatedQuestions);
                      }}
                      placeholder="Example: BP 130/80, RR 18, Temp 98.6°F"
                      InputProps={{
                        style: { color: "#000000", border: "1px solid black" },
                      }}
                    />
                    <TextField
                      fullWidth
                      label={`Question for Data Point ${index + 1}`}
                      value={dataPoint.question}
                      onChange={(e) => {
                        const updatedQuestions = [...questionsArray];
                        if (!updatedQuestions[qIndex].trendData) {
                          updatedQuestions[qIndex].trendData = [];
                        }
                        updatedQuestions[qIndex].trendData[index] = {
                          ...updatedQuestions[qIndex].trendData[index],
                          question: e.target.value,
                          sequence: index,
                        };
                        setQuestionsArray(updatedQuestions);
                      }}
                      placeholder="Example: Is the patient stable?"
                      InputProps={{
                        style: { color: "#000000", border: "1px solid black" },
                      }}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        const updatedQuestions = [...questionsArray];
                        updatedQuestions[qIndex].trendData = updatedQuestions[
                          qIndex
                        ].trendData.filter((_, i) => i !== index);
                        setQuestionsArray(updatedQuestions);
                      }}
                      style={{ minWidth: "40px", height: "40px", padding: "0" }}
                    >
                      ×
                    </Button>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <Typography
                      style={{ color: "#000000", marginBottom: "10px" }}
                    >
                      Options for this Data Point:
                    </Typography>
                    {(dataPoint.options || []).map((option, optIndex) => (
                      <div
                        key={optIndex}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <TextField
                          fullWidth
                          label={`Option ${optIndex + 1}`}
                          value={option}
                          onChange={(e) => {
                            const updatedQuestions = [...questionsArray];
                            if (
                              !updatedQuestions[qIndex].trendData[index].options
                            ) {
                              updatedQuestions[qIndex].trendData[
                                index
                              ].options = [];
                            }
                            updatedQuestions[qIndex].trendData[index].options[
                              optIndex
                            ] = e.target.value;
                            setQuestionsArray(updatedQuestions);
                          }}
                          placeholder={`Example: ${
                            optIndex === 0 ? "Yes" : "No"
                          }`}
                          InputProps={{
                            style: {
                              color: "#000000",
                              border: "1px solid black",
                            },
                          }}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={dataPoint.correctAnswer === option}
                              onChange={() => {
                                const updatedQuestions = [...questionsArray];
                                updatedQuestions[qIndex].trendData[
                                  index
                                ].correctAnswer = option;
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
                          label="Correct Answer"
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
                            updatedQuestions[qIndex].trendData[index].options =
                              updatedQuestions[qIndex].trendData[
                                index
                              ].options.filter((_, i) => i !== optIndex);
                            if (
                              updatedQuestions[qIndex].trendData[index]
                                .correctAnswer === option
                            ) {
                              updatedQuestions[qIndex].trendData[
                                index
                              ].correctAnswer = "";
                            }
                            setQuestionsArray(updatedQuestions);
                          }}
                          style={{
                            minWidth: "40px",
                            height: "40px",
                            padding: "0",
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="contained"
                      onClick={() => {
                        const updatedQuestions = [...questionsArray];
                        if (
                          !updatedQuestions[qIndex].trendData[index].options
                        ) {
                          updatedQuestions[qIndex].trendData[index].options =
                            [];
                        }
                        updatedQuestions[qIndex].trendData[index].options.push(
                          ""
                        );
                        setQuestionsArray(updatedQuestions);
                      }}
                      style={{ marginTop: "10px" }}
                    >
                      Add Option
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                variant="contained"
                onClick={() => {
                  const updatedQuestions = [...questionsArray];
                  if (!updatedQuestions[qIndex].trendData) {
                    updatedQuestions[qIndex].trendData = [];
                  }
                  updatedQuestions[qIndex].trendData.push({
                    data: "",
                    question: "",
                    options: [],
                    correctAnswer: "",
                    sequence: updatedQuestions[qIndex].trendData.length,
                  });
                  setQuestionsArray(updatedQuestions);
                }}
                style={{ marginTop: "10px" }}
              >
                Add Data Point
              </Button>
            </div>

            {/* Preview Section */}
            {(question.questionText ||
              (question.trendData && question.trendData.length > 0)) && (
              <div style={{ marginTop: "20px" }}>
                <Typography style={{ color: "#000000", marginBottom: "10px" }}>
                  Preview:
                </Typography>
                <div
                  style={{
                    padding: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  {question.questionText && (
                    <Typography
                      variant="body1"
                      style={{ marginBottom: "15px" }}
                    >
                      Initial Scenario: {question.questionText}
                    </Typography>
                  )}
                  {question.trendData &&
                    question.trendData.map((dataPoint, index) => (
                      <div
                        key={index}
                        style={{
                          marginBottom: "15px",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          style={{ marginBottom: "5px" }}
                        >
                          Part {index + 1}:
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ marginBottom: "5px" }}
                        >
                          Data: {dataPoint.data}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ marginBottom: "5px" }}
                        >
                          Question: {dataPoint.question}
                        </Typography>
                        {dataPoint.options && dataPoint.options.length > 0 && (
                          <div style={{ marginBottom: "5px" }}>
                            <Typography variant="body2">Options:</Typography>
                            {dataPoint.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                style={{ marginLeft: "15px" }}
                              >
                                {String.fromCharCode(65 + optIndex)}. {option}
                                {option === dataPoint.correctAnswer && (
                                  <span
                                    style={{
                                      color: "green",
                                      marginLeft: "8px",
                                    }}
                                  >
                                    ✅
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
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
    } else {
      // Next-Gen validation
      if (!caseStudy || !casesubject || !casesystem ) {
        toast.warning("Please fill in all case study fields.");
        return;
      }

      // Validate each question based on its format
      const errorMessages = [];
      questionsArray.forEach((q, index) => {
        // Common validations for all formats
        if (!q.difficulty) {
          errorMessages.push(`Question ${index + 1}: Difficulty is required.`);
        }
        if (!q.questionText) {
          errorMessages.push(
            `Question ${index + 1}: Question text is required.`
          );
        }
        if (!q.explanation) {
          errorMessages.push(`Question ${index + 1}: Explanation is required.`);
        }
        if (!q.clientWords) {
          errorMessages.push(
            `Question ${index + 1}: Client words are required.`
          );
        }

        // Format-specific validations
        switch (q.format) {
          case "mcq":
            if (!q.options || q.options.length < 2) {
              errorMessages.push(
                `Question ${index + 1}: MCQ requires at least 2 options.`
              );
            }
            if (!q.correctAnswers || q.correctAnswers.length !== 1) {
              errorMessages.push(
                `Question ${index + 1}: MCQ requires exactly 1 correct answer.`
              );
            }
            break;
          case "sata":
            if (!q.options || q.options.length < 2) {
              errorMessages.push(
                `Question ${index + 1}: SATA requires at least 2 options.`
              );
            }
            if (!q.correctAnswers || q.correctAnswers.length < 1) {
              errorMessages.push(
                `Question ${
                  index + 1
                }: SATA requires at least 1 correct answer.`
              );
            }
            break;
          case "cloze":
            if (!q.options || q.options.length < 2) {
              errorMessages.push(
                `Question ${index + 1}: Cloze requires at least 2 options.`
              );
            }
            if (!q.correctAnswers || q.correctAnswers.length < 1) {
              errorMessages.push(
                `Question ${
                  index + 1
                }: Cloze requires at least 1 correct answer.`
              );
            }
            if (!q.questionText.includes("[")) {
              errorMessages.push(
                `Question ${
                  index + 1
                }: Cloze question must contain blanks ([]).`
              );
            }
            break;
          case "matrix":
            if (!q.matrixData?.actions?.length) {
              errorMessages.push(
                `Question ${index + 1}: Matrix requires actions.`
              );
            }
            if (!q.matrixData?.priorityLevels?.length) {
              errorMessages.push(
                `Question ${index + 1}: Matrix requires priority levels.`
              );
            }
            // if (!q.matrixDataAnswer?.length) {
            //   errorMessages.push(
            //     `Question ${index + 1}: Matrix requires correct answers.`
            //   );
            // }
            break;
          case "bowtie":
            if (!q.bowtieData?.issue) {
              errorMessages.push(
                `Question ${index + 1}: Bowtie requires an issue.`
              );
            }
            if (
              !q.bowtieData?.actions?.length ||
              q.bowtieData.actions.some((a) => !a)
            ) {
              errorMessages.push(
                `Question ${index + 1}: Bowtie requires valid actions.`
              );
            }
            if (
              !q.bowtieData?.outcomes?.length ||
              q.bowtieData.outcomes.some((o) => !o)
            ) {
              errorMessages.push(
                `Question ${index + 1}: Bowtie requires valid outcomes.`
              );
            }
            break;
          case "drag-drop":
            if (!q.dragDropOptions?.length || q.dragDropOptions.length < 2) {
              errorMessages.push(
                `Question ${index + 1}: Drag-Drop requires at least 2 options.`
              );
            }
            if (!q.correctAnswers?.length) {
              errorMessages.push(
                `Question ${index + 1}: Drag-Drop requires correct answers.`
              );
            }
            break;
          case "trend":
            if (!q.trendData?.length) {
              errorMessages.push(
                `Question ${index + 1}: Trend requires data points.`
              );
            } else {
              q.trendData.forEach((dp, dpIndex) => {
                if (!dp.data) {
                  errorMessages.push(
                    `Question ${index + 1}: Trend data ${
                      dpIndex + 1
                    } missing data.`
                  );
                }
                if (!dp.question) {
                  errorMessages.push(
                    `Question ${index + 1}: Trend data ${
                      dpIndex + 1
                    } missing question.`
                  );
                }
                if (!dp.options?.length || dp.options.length < 2) {
                  errorMessages.push(
                    `Question ${index + 1}: Trend data ${
                      dpIndex + 1
                    } requires 2 options.`
                  );
                }
                if (
                  !dp.correctAnswer ||
                  !dp.options.includes(dp.correctAnswer)
                ) {
                  errorMessages.push(
                    `Question ${index + 1}: Trend data ${
                      dpIndex + 1
                    } has invalid correct answer.`
                  );
                }
              });
            }
            break;
          case "extended-mr":
            if (!q.mrdescription) {
              errorMessages.push(
                `Question ${index + 1}: Extended MR requires a description.`
              );
            }
            if (!q.options?.length || q.options.length < 2) {
              errorMessages.push(
                `Question ${
                  index + 1
                }: Extended MR requires at least 2 options.`
              );
            }
            if (!q.correctAnswers?.length) {
              errorMessages.push(
                `Question ${index + 1}: Extended MR requires correct answers.`
              );
            }
            break;
          case "chart":
            if (!q.chartdescription) {
              errorMessages.push(
                `Question ${index + 1}: Chart requires a description.`
              );
            }
            if (!q.options?.length || q.options.length < 2) {
              errorMessages.push(
                `Question ${index + 1}: Chart requires at least 2 options.`
              );
            }
            if (!q.correctAnswers?.length) {
              errorMessages.push(
                `Question ${index + 1}: Chart requires correct answers.`
              );
            }
            break;
          case "highlight":
            if (!q.correctAnswers?.length) {
              errorMessages.push(
                `Question ${index + 1}: Highlight requires correct answers.`
              );
            }
            break;
          case "fillblank":
            if (!q.correctAnswers?.length) {
              errorMessages.push(
                `Question ${
                  index + 1
                }: Fill in the blank requires correct answers.`
              );
            }
            break;
          case "ranking":
            if (!q.options?.length || q.options.length < 2) {
              errorMessages.push(
                `Question ${index + 1}: Ranking requires at least 2 options.`
              );
            }
            if (
              !q.correctAnswers?.length ||
              q.correctAnswers.length !== q.options.length
            ) {
              errorMessages.push(
                `Question ${
                  index + 1
                }: Ranking requires correct answers for all options.`
              );
            }
            break;
          default:
            errorMessages.push(`Question ${index + 1}: Unsupported format.`);
            break;
        }
      });

      if (errorMessages.length > 0) {
        toast.warning(errorMessages[0]); // Show the first error
        return;
      }
    }

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
            clientWords,
          }
        : {
            type: "nextgen",
            caseStudy,
            subject: casesubject,
            system: casesystem,
            Questions: questionsArray.map((q) => {
              // Base question data
              const baseQuestionData = {
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
                clientWords: q.clientWords,
                extraInfo: q.extraInfo,
                mrdescription: q.mrdescription,
                chartdescription: q.chartdescription,
              };

              // Add trend-specific data if format is trend
              if (q.format === "trend") {
                return {
                  ...baseQuestionData,
                  trendData: q.trendData.map((dp) => ({
                    data: dp.data,
                    question: dp.question,
                    options: dp.options || [],
                    correctAnswer: dp.correctAnswer,
                    sequence: dp.sequence || 0,
                  })),
                };
              }

              return baseQuestionData;
            }),
          };
          const datawithid = {
                  id: id,
                  data: questionData,
                };
    console.log("Question Data:", datawithid);

    dispatch(addQuestion(datawithid)).then((res) => {
      console.log("AddQuestion", res);
      if (res?.payload?.data?.message === "Question added successfully to the exam") {
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

  // Add this function for traditional questions
  const deleteOption = (indexToDelete) => {
    const newOptions = options.filter((_, index) => index !== indexToDelete);
    setOptions(newOptions);

    // Also remove from correctAnswers if it was selected
    setCorrectAnswers(
      correctAnswers.filter((answer) => answer !== options[indexToDelete])
    );
  };

  // Add this function for next-gen questions
  const deleteNextGenOption = (qIndex, optIndex) => {
    const updatedQuestions = [...questionsArray];
    const deletedOption = updatedQuestions[qIndex].options[optIndex];

    // Remove the option
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter(
      (_, index) => index !== optIndex
    );

    // Remove from correctAnswers if it was selected
    updatedQuestions[qIndex].correctAnswers = updatedQuestions[
      qIndex
    ].correctAnswers.filter((answer) => answer !== deletedOption);

    setQuestionsArray(updatedQuestions);
  };

  // Add this new function to handle extra info changes
  const handleExtraInfoChange = (qIndex, index, field, value) => {
    const updatedQuestions = [...questionsArray];
    if (!updatedQuestions[qIndex].extraInfo) {
      updatedQuestions[qIndex].extraInfo = [{ title: "", description: "" }];
    }
    updatedQuestions[qIndex].extraInfo[index] = {
      ...updatedQuestions[qIndex].extraInfo[index],
      [field]: value
    };
    setQuestionsArray(updatedQuestions);
  };

  const addExtraInfo = (qIndex) => {
    const updatedQuestions = [...questionsArray];
    if (!updatedQuestions[qIndex].extraInfo) {
      updatedQuestions[qIndex].extraInfo = [];
    }
    updatedQuestions[qIndex].extraInfo.push({ title: "", description: "" });
    setQuestionsArray(updatedQuestions);
  };

  const deleteExtraInfo = (qIndex, index) => {
    const updatedQuestions = [...questionsArray];
    updatedQuestions[qIndex].extraInfo = updatedQuestions[qIndex].extraInfo.filter(
      (_, i) => i !== index
    );
    setQuestionsArray(updatedQuestions);
  };

  return (
    <div style={{ 
      overflowY: "scroll", 
      overflowX: "hidden", 
      height: "100%",
      backgroundColor: "#f8f9fa",
      padding: "20px"
    }}>
      {loading && <ScreenLoader />}
      <Grid container spacing={3} style={{ 
        padding: "35px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
      }}>
        <Grid item xs={12}>
          <Typography 
            variant="h4" 
            style={{ 
              color: "#2c3e50",
              fontWeight: "600",
              marginBottom: "30px",
              borderBottom: "2px solid #e9ecef",
              paddingBottom: "15px"
            }}
          >
            Add Question
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <Typography 
              style={{ 
                color: "#495057",
                marginBottom: "8px",
                fontWeight: "500"
              }}
            >
              Question Type
            </Typography>
            <Select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#139de5',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#139de5',
                  },
                },
                '& .MuiSelect-select': {
                  padding: '12px 14px',
                }
              }}
            >
              <MenuItem
                value="traditional"
                sx={{
                  color: questionType === "traditional" ? "#139de5 !important" : "#495057",
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                  }
                }}
              >
                Traditional
              </MenuItem>
              <MenuItem
                value="nextgen"
                sx={{
                  color: questionType === "nextgen" ? "#139de5 !important" : "#495057",
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                  }
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
              <Typography 
                style={{ 
                  color: "#495057",
                  marginBottom: "8px",
                  fontWeight: "500"
                }}
              >
                Subject
              </Typography>
              <Dropdown onSelect={handleCaseSelect}>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #ced4da",
                    color: "#495057",
                    height: "48px",
                    width: "100%",
                    textAlign: "left",
                    borderRadius: "4px",
                    transition: "all 0.2s ease",
                    '&:hover': {
                      borderColor: '#139de5',
                      backgroundColor: '#f8f9fa',
                    }
                  }}
                >
                  {casesubject ? casesubject : "Choose Subject"}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ 
                  width: "100%",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  border: "none",
                  borderRadius: "8px"
                }}>
                  {casesubjects.map((subjectOption, index) => (
                    <Dropdown.Item
                      key={index}
                      eventKey={subjectOption}
                      style={{ 
                        color: "#495057",
                        padding: "10px 16px",
                        '&:hover': {
                          backgroundColor: '#f8f9fa',
                          color: '#139de5',
                        }
                      }}
                    >
                      {subjectOption}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Grid>

            {/* Similar styling for other dropdowns */}
            <Grid item xs={12}>
              <Typography 
                style={{ 
                  color: "#495057",
                  marginBottom: "8px",
                  fontWeight: "500"
                }}
              >
                System
              </Typography>
              <Dropdown onSelect={handleSelectcaseSystem}>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #ced4da",
                    color: "#495057",
                    height: "48px",
                    width: "100%",
                    textAlign: "left",
                    borderRadius: "4px",
                    transition: "all 0.2s ease",
                    '&:hover': {
                      borderColor: '#139de5',
                      backgroundColor: '#f8f9fa',
                    }
                  }}
                >
                  {casesystem ? casesystem : "Choose System"}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ 
                  width: "100%",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  border: "none",
                  borderRadius: "8px"
                }}>
                  {Casesystems?.map((systemopt, index) => (
                    <Dropdown.Item
                      key={index}
                      eventKey={systemopt}
                      style={{ 
                        color: "#495057",
                        padding: "10px 16px",
                        '&:hover': {
                          backgroundColor: '#f8f9fa',
                          color: '#139de5',
                        }
                      }}
                    >
                      {systemopt}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Grid>

            <Grid item xs={12}>
              <Typography 
                style={{ 
                  color: "#495057",
                  marginBottom: "8px",
                  fontWeight: "500"
                }}
              >
                Case Study
              </Typography>
              <div style={{
                border: "1px solid #ced4da",
                borderRadius: "4px",
                overflow: "hidden"
              }}>
                <ReactQuill
                  theme="snow"
                  value={caseStudy}
                  onChange={(value) => setCaseStudy(value)}
                  placeholder="Enter case study text..."
                  className="custom-quill"
                />
              </div>
            </Grid>

            <div style={{ padding: "40px 24px" }}>
              {questionsArray.map((question, qIndex) => (
                <Grid
                  container
                  spacing={3}
                  key={qIndex}
                  style={{
                    padding: "30px",
                    paddingBottom: "70px",
                    border: "1px solid #e9ecef",
                    borderRadius: "12px",
                    position: "relative",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    marginBottom: "30px"
                  }}
                >
                  {questionsArray.length > 1 && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        const updatedQuestions = questionsArray.filter(
                          (_, index) => index !== qIndex
                        );
                        setQuestionsArray(updatedQuestions);
                      }}
                      style={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                        zIndex: 1,
                        borderRadius: "20px",
                        textTransform: "none",
                        padding: "6px 16px"
                      }}
                    >
                      Delete Question
                    </Button>
                  )}
                  
                  {/* Question Format Select */}
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Question Format</InputLabel>
                      <Select
                        value={question.format}
                        onChange={(e) =>
                          updateQuestionFormat(qIndex, e.target.value)
                        }
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: '#139de5',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#139de5',
                            },
                          }
                        }}
                      >
                        {QUESTION_FORMATS.map((format) => (
                          <MenuItem key={format.value} value={format.value}>
                            {format.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Difficulty Select */}
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
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: '#139de5',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#139de5',
                            },
                          }
                        }}
                      >
                        <MenuItem value="easy">Easy</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="hard">Hard</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Question Text */}
                  {question.format !== "highlight" && (
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
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: '#139de5',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#139de5',
                            },
                          }
                        }}
                      />
                    </Grid>
                  )}

                  {/* Client's Words */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Client's Words"
                      value={question.clientWords}
                      onChange={(e) =>
                        updateNextGenQuestion(
                          qIndex,
                          "clientWords",
                          e.target.value
                        )
                      }
                      multiline
                      rows={2}
                      placeholder="Enter client's words"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#139de5',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#139de5',
                          },
                        }
                      }}
                    />
                  </Grid>

                  {/* Extra Info */}
                  <Grid item xs={12}>
                    <Typography 
                      style={{ 
                        color: "#495057",
                        marginBottom: "8px",
                        fontWeight: "500"
                      }}
                    >
                      Additional Information
                    </Typography>
                    {question.extraInfo?.map((info, index) => (
                      <div 
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          marginBottom: "20px",
                          padding: "20px",
                          border: "1px solid #e9ecef",
                          borderRadius: "8px",
                          backgroundColor: "#f8f9fa"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography 
                            style={{ 
                              color: "#495057",
                              fontWeight: "500",
                              fontSize: "16px"
                            }}
                          >
                            Information #{index + 1}
                          </Typography>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => deleteExtraInfo(qIndex, index)}
                            style={{ 
                              minWidth: "40px", 
                              height: "40px", 
                              padding: "0",
                              borderRadius: "20px"
                            }}
                          >
                            ×
                          </Button>
                        </div>
                        
                        <TextField
                          fullWidth
                          label="Title"
                          value={info.title || ""}
                          onChange={(e) => handleExtraInfoChange(qIndex, index, "title", e.target.value)}
                          placeholder="Enter a title for this information"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': {
                                borderColor: '#139de5',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#139de5',
                              },
                            }
                          }}
                        />
                        
                        <div style={{ marginTop: "10px" }}>
                          <Typography 
                            style={{ 
                              color: "#495057",
                              marginBottom: "8px",
                              fontSize: "14px"
                            }}
                          >
                            Case Study
                          </Typography>
                          <div style={{
                            border: "1px solid #ced4da",
                            borderRadius: "4px",
                            overflow: "hidden"
                          }}>
                            <ReactQuill
                              theme="snow"
                              value={info.description || ""}
                              onChange={(value) => handleExtraInfoChange(qIndex, index, "description", value)}
                              placeholder="Enter the description..."
                              className="custom-quill"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="contained"
                      onClick={() => addExtraInfo(qIndex)}
                      style={{ 
                        marginTop: "10px",
                        background: "#139de5",
                        '&:hover': {
                          background: "#0d8bc7"
                        }
                      }}
                    >
                      Add More 
                    </Button>
                  </Grid>

                  {/* Format-specific inputs */}
                  {renderOptionsByFormat(qIndex, question)}

                  {/* Explanation */}
                  <Grid item xs={12} style={{ marginTop: "15px" }}>
                    <Typography 
                      style={{ 
                        color: "#495057",
                        marginBottom: "8px",
                        fontWeight: "500"
                      }}
                    >
                      Explanation
                    </Typography>
                    <div style={{
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      overflow: "hidden"
                    }}>
                      <ReactQuill
                        theme="snow"
                        value={question.explanation || ""}
                        onChange={(value) =>
                          updateNextGenQuestion(qIndex, "explanation", value)
                        }
                        placeholder="Provide an explanation for this question..."
                        className="custom-quill"
                      />
                    </div>
                  </Grid>
                </Grid>
              ))}

              <Grid item xs={12} style={{ textAlign: "center", marginTop: "20px" }}>
                <button
                  className="addqbttn"
                  style={{ 
                    background: "#139de5",
                    color: "#ffffff",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                    '&:hover': {
                      background: "#0d8bc7",
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                    }
                  }}
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
              <p className="labeltextt">Client's Words</p>
              <TextField
                fullWidth
                placeholder="Enter client's words"
                multiline
                rows={2}
                value={clientWords}
                onChange={(e) => setClientWords(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <p className="labeltextt">Options</p>
              {options.map((option, index) => (
                <Grid
                  item
                  xs={12}
                  key={index}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
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
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteOption(index)}
                    style={{ minWidth: "40px", height: "40px", padding: "0" }}
                  >
                    ×
                  </Button>
                </Grid>
              ))}
              <Button variant="contained" onClick={addOption}>
                Add Option
              </Button>
            </Grid>
            <div style={{ width: "100%", padding: "24px 0px 0px 24px" }}>
              <p className="labeltextt"> Explanation</p>
              <ReactQuill
                theme="snow"
                value={explanation}
                onChange={(value) => setexplanation(value)}
                placeholder="Write something..."
                className="custom-quill"
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
          <button 
            className="addqbttn" 
            onClick={() => handleSubmit()}
            style={{ 
              background: "#139de5",
              color: "#ffffff",
              border: "none",
              padding: "12px 32px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
              transition: "all 0.2s ease",
              '&:hover': {
                background: "#0d8bc7",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }
            }}
          >
            Submit Question
          </button>
        </div>
      </Grid>
    </div>
  );
};

export default AddQuestions;
