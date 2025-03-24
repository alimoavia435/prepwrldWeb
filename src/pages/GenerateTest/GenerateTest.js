import React, { useState, useEffect } from "react";
import "./GenerateTest.css";
import { getAllrooms } from "../../services/redux/middleware/getAllrooms";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Dropdown } from "react-bootstrap";
import { getAlldata } from "../../services/redux/middleware/getAlldata";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Gene_rate_Test } from "../../services/redux/middleware/Gene_rate_Test";
import { getexamdetail } from "../../services/redux/middleware/getexamdetail";
import ScreenLoader from "../../components/loader/ScreenLoader";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { getallresult } from "../../services/redux/middleware/getallresult";
const GenerateTest = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [systems, setSystems] = useState([]);
  const [selectedClassRooms, setselectedClassRooms] = useState([]);
  const [subject, setSubject] = useState("");
  const [loading, setloading] = useState(false);
  const [allresult, setallresult] = useState();
  const [rooms, setrooms] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const { status } = location.state || {};
  const { roomId } = useParams();
  const allData = useSelector(
    (state) => state?.getAlldata?.profile?.data?.stats
  );
  const examdetailData = useSelector(
    (state) => state?.getexamdetail?.profile?.data?.exam
  );
  const resultData = useSelector((state) => state?.getallresult.profile);
  console.log(resultData?.data?.results, "resultData");
  console.log(allData, "allData");
  console.log(examdetailData, "examdetailData");
  const [quzzzz, setquzzzz] = useState();
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (examdetailData) {
      setquzzzz(examdetailData?.questions);
    }
  }, [examdetailData]);

  useEffect(() => {
    if (allData) {
      setSubjects(allData?.Subject);
      setSystems(allData?.System);
    }
  }, [allData]);
  useEffect(() => {
    if (resultData?.data?.results?.length > 0) {
      setallresult(resultData?.data?.results);
    }
  }, [resultData]);
  const roomData = useSelector(
    (state) => state?.getAllrooms?.profile?.data?.rooms
  );
  useEffect(() => {
    if (roomData) {
      setrooms(roomData);
    }
  }, [roomData]);

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectAllSubjects, setSelectAllSubjects] = useState(false);

  const [selectedSystems, setSelectedSystems] = useState([]);
  const [selectAllSystems, setSelectAllSystems] = useState(false);
  const [totals, setTotals] = useState({ easy: 0, medium: 0, hard: 0 });
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("Static Tab");
  const handleTabClick = (tabId) => setActiveTab(tabId);

  const styles = {
    tabs: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      paddingBottom: "20px",
    },
    tab: {
      backgroundColor: "#135bab",
      color: "white",
      padding: "10px 20px",
      border: "none",
      cursor: "pointer",
    },
    activeTab: {
      backgroundColor: "#0d3b8b",
      color: "white",
      padding: "10px 20px",
      border: "none",
      cursor: "pointer",
    },
    content: {
      padding: "20px",
      border: "1px solid #ccc",
    },
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSelectAllSubjects = () => {
    if (!selectAllSubjects) {
      setSelectedSubjects(subjects.map((s) => s.subject));
    } else {
      setSelectedSubjects([]);
    }
    setSelectAllSubjects(!selectAllSubjects);
  };

  const handleSelectAllSystems = () => {
    if (!selectAllSystems) {
      console.log("inner");
      const allSystems = systems?.map((system) => ({
        system: system.system,
        easy: "",
        medium: "",
        hard: "",
        error: "",
        isOpen: true,
      }));
      console.log("inner");
      setSelectedSystems(allSystems);
      console.log("goda");
    } else {
      setSelectedSystems([]);
    }

    setSelectAllSystems(!selectAllSystems);
    console.log("god3");
  };

  const handleSystemChange = (system) => {
    setSelectedSystems((prev) => {
      const existingIndex = prev.findIndex((s) => s.system === system.system);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated.splice(existingIndex, 1);

        // Update selectAllSystems state
        const allSelected = updated?.length === systems?.length;
        setSelectAllSystems(allSelected);

        return updated;
      }

      const newSystem = {
        system: system.system,
        easy: "",
        medium: "",
        hard: "",
        error: "",
        isOpen: true,
      };

      const updated = [...prev, newSystem];

      const allSelected = updated?.length === systems?.length;
      setSelectAllSystems(allSelected);

      return updated;
    });
  };

  const handleSystemInputChange = (systemName, difficulty, value) => {
    setSelectedSystems((prev) => {
      return prev.map((system) => {
        if (system.system === systemName) {
          const currentSystem = systems?.find(
            (sys) => sys.system === systemName
          );
          const updatedValues = {
            ...system,
            [difficulty]: value,
          };
          const easy = parseInt(updatedValues?.easy || 0);
          const medium = parseInt(updatedValues?.medium || 0);
          const hard = parseInt(updatedValues?.hard || 0);
          const total = easy + medium + hard;

          // Validate against system count
          return {
            ...updatedValues,
            error:
              total > currentSystem?.traditional + currentSystem?.nextgen
                ? `This system only has ${
                    currentSystem?.traditional + currentSystem?.nextgen
                  } questions!`
                : "",
          };
        }
        return system;
      });
    });
  };

  useEffect(() => {
    let newTotals = { easy: 0, medium: 0, hard: 0 };
    selectedSystems?.forEach((system) => {
      newTotals.easy += Number(system.easy) || 0;
      newTotals.medium += Number(system.medium) || 0;
      newTotals.hard += Number(system.hard) || 0;
    });
    setTotals(newTotals);
  }, [selectedSystems]);

  const handleSubmit = () => {
    let errorMessages = [];

    // Basic validation
    if (
      selectedTypes.length < 1 ||
      selectedClassRooms.length < 1 ||
      !roomId ||
      !description
    ) {
      toast.warning("Some required fields are missing.");
      return null;
    }

    // Validate traditional data if selected
    if (selectedTypes.includes("traditional")) {
      if (selectedSubjects.length < 1 || selectedSystems.length < 1) {
        toast.warning("Traditional subjects and systems are required.");
        return null;
      }
    }

    // Validate nextgen data if selected
    if (selectedTypes.includes("nextgen")) {
      if (nextGenSubjects.length < 1 || nextGenSystems.length < 1) {
        toast.warning("Next-Gen subjects and systems are required.");
        return null;
      }
    }

    // Process traditional systems
    const traditionalSystems = selectedTypes.includes("traditional")
      ? selectedSystems?.map(({ system, easy, medium, hard, error }) => {
      if (!system || (!easy && !medium && !hard)) {
            toast.error(
              "Traditional systems or difficulty levels are missing."
            );
        return null;
          }
          if (error && error !== " ") {
            errorMessages.push(`Error: ${error}`);
            return null;
          }
          return {
            name: system,
            easy: easy || " ",
            medium: medium || " ",
            hard: hard || " ",
          };
        })
      : [];

    // Process nextgen systems
    const nextGenSystemsData = selectedTypes.includes("nextgen")
      ? nextGenSystems.map(({ system, questions, error }) => {
          if (!system || !questions) {
            toast.error("Next-Gen systems or question counts are missing.");
            return null;
          }
          if (error) {
        errorMessages.push(`Error: ${error}`);
        return null;
      }
      return {
        name: system,
            questions: questions,
          };
        })
      : [];

    if (
      traditionalSystems.includes(null) ||
      nextGenSystemsData.includes(null)
    ) {
      toast.warning("System data is incomplete.");
      return null;
    }

    if (errorMessages.length > 0) {
      toast.error("You exceed the limit of questions in some systems");
      return null;
    }

    const roomIds = selectedClassRooms?.map((room) => room.roomId);
    if (!roomIds || roomIds.length === 0) {
      toast.warning("Select Classrooms please");
      return null;
    }

    setloading(true);

    // Calculate totals
    const traditionalTotal = totals?.easy + totals?.medium + totals?.hard;
    const nextGenTotal = nextGenSystems.reduce(
      (total, system) => total + (parseInt(system.questions) || 0),
      0
    );

    // Prepare the data object with separate traditional and nextgen data
    const data = {
      subjects: selectedSubjects,
      systems: traditionalSystems,
      traditionalTotal,
      nextGenSubjects,
      nextGenSystemsData,
      nextGenTotal,
      roomIds,
      description,
      types: selectedTypes,
    };

    const datawithid = {
      data,
      roomId,
    };

    console.log("Form Data:", datawithid);
    dispatch(Gene_rate_Test(datawithid)).then((res) => {
      console.log(res, "Gene_rate_Test");
      if (res?.payload?.status === 200) {
        setloading(false);
        toast.success("Successfully Generated");
        navigate(-1);
      }
    });
  };

  const formatTime = (sec) => {
    const hours = Math.floor(sec / 3600); // 1 hour = 3600 seconds
    const minutes = Math.floor((sec % 3600) / 60); // 1 minute = 60 seconds
    const seconds = sec % 60; // Remaining seconds

    // Optionally log the result
    console.log(`${hours} hour(s), ${minutes} minute(s), ${seconds} second(s)`);

    // Return the formatted time string
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const handleSelect = (roomName, roomId) => {
    if (roomName === "") {
      return;
    }
    setSubject(roomName);
    const isRoomSelected = selectedClassRooms.some(
      (room) => room.roomId === roomId
    );

    if (!isRoomSelected) {
      setselectedClassRooms([...selectedClassRooms, { roomName, roomId }]);
      console.log("selectedClassRooms", [
        ...selectedClassRooms,
        { roomName, roomId },
      ]);
    }
  };

  useEffect(() => {
    setloading(true);
    dispatch(getAllrooms()).then((res) => {
      setloading(false);
    });
  }, [activeTab]);
  const handleRemove = (room) => {
    setselectedClassRooms(
      selectedClassRooms.filter((s) => s.roomId !== room.roomId)
    );
  };

  useEffect(() => {
    setloading(true);
    dispatch(getAlldata()).then((res) => {
      setloading(false);
    });
  }, [activeTab]);

  useEffect(() => {
    setloading(true);
    dispatch(getexamdetail(roomId)).then((res) => {
      setloading(false);
    });
  }, [activeTab]);

  useEffect(() => {
    setloading(true);
    dispatch(getallresult(roomId)).then((res) => {
      setloading(false);
    });
  }, [activeTab]);

  // Add new state for active question type tab
  const [activeQuestionTab, setActiveQuestionTab] = useState("traditional");

  // Add new states for Next-Gen
  const [nextGenSubjects, setNextGenSubjects] = useState([]);
  const [nextGenSystems, setNextGenSystems] = useState([]);
  const [nextGenTotalQuestions, setNextGenTotalQuestions] = useState(0);

  // Add handler for Next-Gen system input
  const handleNextGenSystemChange = (systemName, value) => {
    setNextGenSystems((prev) => {
      const existingIndex = prev.findIndex((s) => s.system === systemName);
      if (existingIndex > -1) {
        const updated = [...prev];
        const currentSystem = systems?.find((sys) => sys.system === systemName);
        updated[existingIndex] = {
          ...updated[existingIndex],
          questions: value,
          error:
            parseInt(value) > currentSystem?.nextgen
              ? `This system only has ${currentSystem?.nextgen} Next-Gen questions!`
              : "",
        };
        return updated;
      }
      return [
        ...prev,
        {
          system: systemName,
          questions: value,
          error: "",
        },
      ];
    });
  };

  // Update useEffect to handle checkbox selection based on active tab
  useEffect(() => {
    if (activeQuestionTab === "traditional") {
      setSelectedTypes(["traditional"]);
    } else if (activeQuestionTab === "nextgen") {
      setSelectedTypes(["nextgen"]);
    } else if (activeQuestionTab === "both") {
      setSelectedTypes(["traditional", "nextgen"]);
    }
  }, [activeQuestionTab]);

  // Add this new useEffect to handle the submit button state
  useEffect(() => {
    // If there are selections in both traditional and nextgen
    if (
      (selectedSubjects.length > 0 || selectedSystems.length > 0) &&
      (nextGenSubjects.length > 0 || nextGenSystems.length > 0)
    ) {
      // Automatically set to "both" mode
      setSelectedTypes(["traditional", "nextgen"]);
    }
  }, [selectedSubjects, selectedSystems, nextGenSubjects, nextGenSystems]);

  return (
    <>
      {loading && <ScreenLoader />}
      {status === "primary" ? (
        <div className="container">
          <h1 style={{ textAlign: "center" }}>Generate Test</h1>

          {/* Question Type Tabs */}
          <div style={styles.tabs}>
            <button
              onClick={() => setActiveQuestionTab("traditional")}
              style={
                activeQuestionTab === "traditional"
                  ? styles.activeTab
                  : styles.tab
              }
            >
              Traditional ({allData?.Type?.traditional})
            </button>
            <button
              onClick={() => setActiveQuestionTab("nextgen")}
              style={
                activeQuestionTab === "nextgen" ? styles.activeTab : styles.tab
              }
            >
              Next-Gen ({allData?.Type?.nextgen})
            </button>
            <button
              onClick={() => setActiveQuestionTab("both")}
              style={
                activeQuestionTab === "both" ? styles.activeTab : styles.tab
              }
            >
              Both Types
            </button>
          </div>

          {(activeQuestionTab === "traditional" ||
            activeQuestionTab === "both") && (
            <>
          {/* Subjects Section */}
          <div className="section">
            <p>Subjects</p>
            <label>
              <input
                type="checkbox"
                checked={selectAllSubjects}
                onChange={handleSelectAllSubjects}
              />
              <span className="checkmark"></span>
              Select All
            </label>
                <div className="tefwqsvjhdsd">
                  {subjects?.map((subject) => (
                <label key={subject?.subject}>
                  <input
                    type="checkbox"
                    checked={selectedSubjects.includes(subject?.subject)}
                    onChange={() => handleSubjectChange(subject?.subject)}
                  />
                  <span className="checkmark"></span>
                      {subject?.subject} ({subject?.traditional})
                </label>
              ))}
            </div>
          </div>
          <div className="section">
            <p>Systems</p>
            <label>
              <input
                type="checkbox"
                checked={selectAllSystems}
                onChange={handleSelectAllSystems}
              />
              <span className="checkmark"></span>
              Select All
            </label>
                <div className="tefwqsvjhdsd">
                  {systems?.map((system) => {
                    const selectedSystem = selectedSystems.find(
                      (s) => s.system === system.system
                    );
                return (
                  <div key={system.system}>
                    <label>
                      <input
                        type="checkbox"
                        checked={!!selectedSystem}
                        onChange={() => handleSystemChange(system)}
                      />
                      <span className="checkmark"></span>
                          {system.system} ({system.traditional})
                    </label>
                    {selectedSystem?.isOpen && (
                      <div className="popup">
                            {["easy", "medium", "hard"]?.map((difficulty) => (
                          <div key={difficulty}>
                            <label>
                                  {difficulty?.charAt(0)?.toUpperCase() +
                                    difficulty?.slice(1)}
                                  :
                              <input
                                type="number"
                                min="0"
                                value={selectedSystem[difficulty]}
                                onChange={(e) =>
                                      handleSystemInputChange(
                                        system?.system,
                                        difficulty,
                                        e.target.value
                                      )
                                }
                              />
                            </label>
                          </div>
                        ))}
                        {selectedSystem?.error && (
                          <div className="error-message">
                            {selectedSystem?.error}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
            </>
          )}
          {(activeQuestionTab === "nextgen" ||
            activeQuestionTab === "both") && (
            <>
              {/* Next-Gen Subjects Section */}
              <div className="section">
                <p>Next-Gen Subjects</p>
                <div className="tefwqsvjhdsd">
                  {subjects?.map(
                    (subject) =>
                      subject.nextgen > 0 && (
                        <label key={subject?.subject}>
                          <input
                            type="checkbox"
                            checked={nextGenSubjects.includes(subject?.subject)}
                            onChange={() => {
                              setNextGenSubjects((prev) =>
                                prev.includes(subject?.subject)
                                  ? prev.filter((s) => s !== subject?.subject)
                                  : [...prev, subject?.subject]
                              );
                            }}
                          />
                          <span className="checkmark"></span>
                          {subject?.subject} ({subject?.nextgen} NGN)
                        </label>
                      )
                  )}
                </div>
              </div>

              {/* Next-Gen Systems Section */}
              <div className="section">
                <p>Next-Gen Systems</p>
                <div className="tefwqsvjhdsd">
                  {systems?.map(
                    (system) =>
                      system.nextgen > 0 && (
                        <div key={system.system}>
                          <label>
                            {system.system} ({system.nextgen} NGN)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max={system.nextgen}
                            onChange={(e) =>
                              handleNextGenSystemChange(
                                system.system,
                                e.target.value
                              )
                            }
                            placeholder="Number of questions"
                          />
                          {nextGenSystems.find(
                            (s) => s.system === system.system
                          )?.error && (
                            <div className="error-message">
                              {
                                nextGenSystems.find(
                                  (s) => s.system === system.system
                                ).error
                              }
                            </div>
                          )}
                        </div>
                      )
                  )}
                </div>
              </div>
            </>
          )}
          <div className="section">
            <p>Class Rooms</p>
            <Dropdown>
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
                Choose classRooms
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                {rooms?.map((subjectOption, index) => (
                  <Dropdown.Item
                    key={index}
                    eventKey={subjectOption?.roomName}
                    style={{ color: "black" }}
                    onClick={() =>
                      handleSelect(
                        subjectOption?.roomName,
                        subjectOption?._id
                      )
                    }
                  >
                    {subjectOption?.roomName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <div style={{ paddingTop: "10px" }}>
              {selectedClassRooms?.map((subject, index) => (
                <Badge
                  key={index}
                  pill
                  className="ashdgfjh"
                  style={{
                    color: "#ffffff",
                    padding: "8px 12px",
                    display: "inline-flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRemove(subject)}
                >
                  {subject?.roomName}{" "}
                  <span
                    className="svxb"
                    style={{
                      color: "red",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  >
                    ×
                  </span>
                </Badge>
              ))}
            </div>
          </div>
          <div className="section">
            <p>Description</p>
            <textarea
              placeholder="Enter test description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                minHeight: "100px",
                padding: "10px",
                border: "1px solid rgba(0, 0, 0, 0.3)",
                borderRadius: "4px",
                marginBottom: "20px",
              }}
            />
          </div>
          <div className="section">
            <p>
              Total Next-Gen : (
              {nextGenSystems.reduce(
                (total, system) => total + (parseInt(system.questions) || 0),
                0
              )}
              )
            </p>
            <p>
              {" "}
              Total Traditional ({totals?.easy + totals?.medium + totals?.hard})
            </p>
            <p>Easy: {totals?.easy}</p>
            <p>Medium: {totals?.medium}</p>
            <p>Hard: {totals?.hard}</p>
            <p>
              Totals:{" "}
              {(totals?.easy || 0) +
                (totals?.medium || 0) +
                (totals?.hard || 0) +
                nextGenSystems.reduce(
                  (total, system) => total + (parseInt(system.questions) || 0),
                  0
                )}
            </p>
          </div>

          <button onClick={handleSubmit}>Generate Test</button>
        </div>
      ) : (
        <div>
          <div className="Main-Search-Filter">
            <div className="fghgjhk">
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <p
                  className="toptext"
                  style={{
                    padding: "10px",
                    borderRadius: "12px",
                    background: "lightgrey",
                  }}
                >
                  Name:{" "}
                  <span style={{ fontWeight: "400" }}>
                    {" "}
                    {examdetailData?.examName}
                  </span>
                </p>
                <p
                  className="toptext"
                  style={{
                    background: "lightgrey",
                    padding: "10px",
                    borderRadius: "12px",
                  }}
                >
                  Status
                  <span style={{ fontWeight: "400" }}>
                    {" "}
                    {examdetailData?.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div style={styles.tabs}>
            <button
              onClick={() => handleTabClick("Static Tab")}
              style={activeTab === "Static Tab" ? styles.activeTab : styles.tab}
            >
              Questions
            </button>

            {examdetailData?.roomIds?.map((room) => (
              <button
                key={room._id}
                onClick={() => handleTabClick(room._id)}
                style={activeTab === room._id ? styles.activeTab : styles.tab}
              >
                {room.roomName}
              </button>
            ))}
            <button
              onClick={() => handleTabClick("result")}
              style={activeTab === "result" ? styles.activeTab : styles.tab}
            >
              Result
            </button>
          </div>
          <div style={styles.content}>
            {activeTab === "Static Tab" && (
              <TableContainer
                className="SubmitPropertyTablemaiiiiin"
                sx={{
                  boxShadow: "none",
                }}
                component={Paper}
              >
                <Table sx={{ minWidth: 650 }} aria-label="table">
                  <TableHead>
                    <TableRow
                      sx={{
                        borderTopLeftRadius: "9px",
                        borderBottomLightRadius: "9px",
                        background: "rgb(241, 241, 241)",
                      }}
                      className="SubmitPropertytableHeadRow"
                    >
                      <TableCell
                        sx={{
                          borderRadius: "7.66px 0 0 7.66px",
                          border: "none",
                        }}
                        className="SubmitPropertytableHeadRowCell"
                      >
                        #
                      </TableCell>
                      <TableCell
                        sx={{ border: "none" }}
                        className="SubmitPropertytableHeadRowCell"
                      >
                        Quest/caseStudy
                      </TableCell>
                      <TableCell
                        sx={{ border: "none" }}
                        className="SubmitPropertytableHeadRowCell"
                      >
                        Type
                      </TableCell>
                      <TableCell
                        sx={{ border: "none" }}
                        className="SubmitPropertytableHeadRowCell"
                      >
                        Subject
                      </TableCell>
                      <TableCell
                        sx={{ border: "none" }}
                        className="SubmitPropertytableHeadRowCell"
                      >
                        System
                      </TableCell>
                      <TableCell
                        sx={{ border: "none" }}
                        className="SubmitPropertytableHeadRowCell"
                      >
                        Options/Questions
                      </TableCell>
                      <TableCell
                        sx={{
                          borderRadius: "0px 7.66px 7.66px 0px",
                          border: "none",
                        }}
                        className="SubmitPropertytableHeadRowCell"
                      >
                        Correct Answers
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableRow
                    sx={{
                      marginTop: "17px",
                      height: "17px",
                    }}
                  ></TableRow>
                  <TableBody>
                    {quzzzz?.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell
                          align="center"
                          className="SubmitPropertytableBodyRowCell"
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          align="left"
                          className="SubmitPropertytableBodyRowCell1"
                        >
                          {row?.explanation
                            ? row?.explanation?.slice(0, 20)
                            : row?.caseStudy?.slice(0, 25)}
                        </TableCell>
                        <TableCell
                          align="left"
                          className="SubmitPropertytableBodyRowCell2"
                        >
                          {row?.type}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="SubmitPropertytableBodyRowCell2"
                        >
                          {/* {new Date(row?.createdAt).toLocaleDateString()} */}
                          {row?.subject}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="SubmitPropertytableBodyRowCell2"
                        >
                          {row?.system ? row?.system : "...."}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="SubmitPropertytableBodyRowCell2"
                        >
                          {row?.options.length > 0
                            ? row?.options?.length
                            : row?.Questions?.length}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="SubmitPropertytableBodyRowCell2"
                        >
                          {row?.correctAnswers?.length
                            ? row?.correctAnswers?.length
                            : "..."}
                        </TableCell>
                        {/* <TableCell
                          align="center"
                          className="SubmitPropertytableBodyRowCell2"
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <img src="/Images/Admin/delete.png" alt="" style={{ height: "40px", width: "40px", cursor: "pointer" }}
                              onClick={() => handleOpenModal(row._id)} />
                          </div>
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {activeTab === "result" && (
              <>
                {resultData?.message?.message ===
                "Exam has not ended yet. Results will be available once the exam ends." ? (
                  <div style={{ color: "black", padding: "70px 0px" }}>
                    <p>
                      Exam has not ended yet. Results will be available once the
                      exam ends.{" "}
                    </p>
                  </div>
                ) : (
                  <TableContainer
                    className="SubmitPropertyTablemaiiiiin"
                    sx={{
                      boxShadow: "none",
                    }}
                    component={Paper}
                  >
                    <Table sx={{ minWidth: 650 }} aria-label="table">
                      <TableHead>
                        <TableRow
                          sx={{
                            borderTopLeftRadius: "9px",
                            borderBottomLightRadius: "9px",
                            background: "rgb(241, 241, 241)",
                          }}
                          className="SubmitPropertytableHeadRow"
                        >
                          <TableCell
                            sx={{
                              borderRadius: "7.66px 0 0 7.66px",
                              border: "none",
                            }}
                            className="SubmitPropertytableHeadRowCell"
                          >
                            #
                          </TableCell>
                          <TableCell
                            sx={{ border: "none" }}
                            className="SubmitPropertytableHeadRowCell"
                          >
                            Student Name
                          </TableCell>
                          <TableCell
                            sx={{ border: "none" }}
                            className="SubmitPropertytableHeadRowCell"
                          >
                            Student Email
                          </TableCell>
                          <TableCell
                            sx={{ border: "none" }}
                            className="SubmitPropertytableHeadRowCell"
                          >
                            ClassName
                          </TableCell>
                          <TableCell
                            sx={{ border: "none" }}
                            className="SubmitPropertytableHeadRowCell"
                          >
                            Correct
                          </TableCell>
                          <TableCell
                            sx={{ border: "none" }}
                            className="SubmitPropertytableHeadRowCell"
                          >
                            Incorrect
                          </TableCell>
                          <TableCell
                            sx={{ border: "none" }}
                            className="SubmitPropertytableHeadRowCell"
                          >
                            Time Taken
                          </TableCell>
                          <TableCell
                            sx={{
                              borderRadius: "0px 7.66px 7.66px 0px",
                              border: "none",
                            }}
                            className="SubmitPropertytableHeadRowCell"
                          >
                            Percentage
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableRow
                        sx={{
                          marginTop: "17px",
                          height: "17px",
                        }}
                      ></TableRow>
                      <TableBody>
                        {allresult?.map((row, index) => (
                          <TableRow key={row.id}>
                            <TableCell
                              align="center"
                              className="SubmitPropertytableBodyRowCell"
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell
                              align="left"
                              className="SubmitPropertytableBodyRowCell1"
                            >
                              {row?.studentName}
                            </TableCell>
                            <TableCell
                              align="left"
                              className="SubmitPropertytableBodyRowCell2"
                            >
                              {row?.studentEmail}
                            </TableCell>
                            <TableCell
                              align="left"
                              className="SubmitPropertytableBodyRowCell2"
                            >
                              {row?.roomName}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="SubmitPropertytableBodyRowCell2"
                            >
                              {/* {new Date(row?.createdAt).toLocaleDateString()} */}
                              {row?.totalCorrectAnswers}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="SubmitPropertytableBodyRowCell2"
                            >
                              {row?.totalIncorrectAnswers}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="SubmitPropertytableBodyRowCell2"
                            >
                              {formatTime(row?.totalTimeTaken)}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="SubmitPropertytableBodyRowCell2"
                            >
                              {row?.percentage}
                            </TableCell>
                            {/* <TableCell
                          align="center"
                          className="SubmitPropertytableBodyRowCell2"
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <img src="/Images/Admin/delete.png" alt="" style={{ height: "40px", width: "40px", cursor: "pointer" }}
                              onClick={() => handleOpenModal(row._id)} />
                          </div>
                        </TableCell> */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </>
            )}
            {examdetailData?.roomIds?.map((room) => {
              if (activeTab === room._id) {
                return (
                  <TableContainer
                    className="SubmitPropertyTablemaiiiiin"
                    sx={{
                      boxShadow: "none",
                    }}
                    key={room._id}
                    component={Paper}
                  >
                    <Table sx={{ minWidth: 650 }}>
                      <TableHead>
                        <TableRow sx={{ background: "rgb(241, 241, 241)" }}>
                          <TableCell
                            sx={{ border: "none" }}
                            className="SubmitPropertytableHeadRowCell"
                          >
                            #
                          </TableCell>
                          <TableCell
                            sx={{ border: "none" }}
                            className="SubmitPropertytableHeadRowCell"
                          >
                            Student Name
                          </TableCell>
                          <TableCell
                            sx={{ border: "none" }}
                            className="SubmitPropertytableHeadRowCell"
                          >
                            Email
                          </TableCell>
                          {/* <TableCell>Status</TableCell> */}
                          <TableCell
                            sx={{ border: "none" }}
                            className="SubmitPropertytableHeadRowCell"
                          >
                            phone
                          </TableCell>
                          {/* Add more columns as needed */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {room?.students?.map((student, index) => (
                          <TableRow key={student._id}>
                            <TableCell
                              align="center"
                              className="SubmitPropertytableBodyRowCell"
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="SubmitPropertytableBodyRowCell"
                            >
                              {student.fullName}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="SubmitPropertytableBodyRowCell"
                            >
                              {student.email}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="SubmitPropertytableBodyRowCell"
                            >
                              {student.phone}
                            </TableCell>
                            {/* <TableCell>{student.score || 'N/A'}</TableCell> */}
                          </TableRow>
                        ))}
                        {!room.students?.length && (
                          <TableRow>
                            <TableCell colSpan={5} align="center">
                              No students found in this room
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default GenerateTest;
