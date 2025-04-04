import React, { useEffect, useState, useMemo } from "react";
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
import "./Questions.css";
import { Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ScreenLoader from "../../components/loader/ScreenLoader";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import DeleteModal from "../../components/Qdelete";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
// import search from "../../../public/Images/Dashboard/Icon.svg"
import { Tabs, Tab, Box, Typography } from "@mui/material";
// import { getAllquestions } from "../../services/redux/middleware/getAllquestions";
import { toast } from "react-toastify";
// import { deletQuestbyid } from "../../services/redux/middleware/deletQuestbyid";
import { getcustomquestionbyid } from "../../services/redux/middleware/getcustomquestionbyid";
import { getallresult } from "../../services/redux/middleware/getallresult";
const TabPanel = ({ children, value, index, setFilter }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ padding: "16px" }}
    >
      {setFilter(children)}
    </div>
  );
};

const Questions = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [filter, setFilter] = useState("investor");
  const [Allquestions, setAllquestions] = useState([]);
  const [filterType, setFilterType] = useState("traditional");
  const [casestudyqs, setcasestudyqs] = useState([]);
  const [allresult, setallresult] = useState([]);
  const [activeTab, setActiveTab] = useState("questions");
  const data = useSelector(
    (state) => state?.getAllUsers?.getAllUsers?.data?.allUsers
  );
  const { id } = useParams();
  const questionData1 = useSelector(
    (state) => state?.getcustomquestionbyid?.profile?.data?.customExam
  );
  console.log("getAllquestions", questionData1);
  const questionData = [];
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (questionData1) {
      console.log("searchTerm", searchTerm);
      if (searchTerm) {
        const filteredQuestions = questionData1?.allQuestions.filter(
          (question) =>
            question?.question
              ?.toLowerCase()
              ?.includes(searchTerm?.toLowerCase()) ||
            question?.caseStudy
              ?.toLowerCase()
              ?.includes(searchTerm?.toLowerCase()) ||
            question?.type
              ?.toLowerCase()
              ?.includes(searchTerm?.toLowerCase()) ||
            question?.subject
              ?.toLowerCase()
              ?.includes(searchTerm?.toLowerCase()) ||
            question?.difficulty
              ?.toLowerCase()
              ?.includes(searchTerm?.toLowerCase())
        );
        const filteredqs = filteredQuestions?.filter(
          (questioin) => questioin.type === filterType
        );
        if (filterType === "traditional") {
          setAllquestions(filteredqs);
        } else {
          setcasestudyqs(filteredqs);
        }
      } else {
        const filteredqs = questionData1?.allQuestions?.filter(
          (questioin) => questioin.type === filterType
        );
        console.log("filteredqs", filteredqs);
        if (filterType === "traditional") {
          setAllquestions(filteredqs);
        } else {
          setcasestudyqs(filteredqs);
        }
      }
    } else {
      setAllquestions([]);
      setcasestudyqs([]);
    }
  }, [searchTerm, questionData1, filterType]);

  const dispatch = useDispatch();

  const resultData = useSelector((state) => state?.getallresult.profile);
  console.log(resultData?.data?.results, "resultData");

  useEffect(() => {
    if (resultData?.data?.results?.length > 0) {
      setallresult(resultData?.data?.results);
    }
  }, [resultData]);

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
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 470);
  useEffect(() => {
    setLoading(true);
    dispatch(getallresult(id)).then((res) => {
      setLoading(false);
    });
  }, [activeTab]);
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 470);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [dataToDisplay, setDataToDisplay] = useState([]);

  const filteredData = useMemo(() => {
    return data?.paginatedItems?.filter((user) => {
      const matchesFilter = filter ? user?.userType === filter : data;

      return matchesFilter;
    });
  }, [data, filter, search]);

  const getData = () => {
    setDataToDisplay(data?.paginatedItems);
  };

  useEffect(() => {
    getData();
  }, [search, filter, data]);

  const goToPage = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);

    const filteredNotifications = questionData?.filter(
      (questioin) => questioin.type === type
    );
    if (type === "traditional") {
      console.log("filterData", filteredNotifications);
      setAllquestions(filteredNotifications);
    } else {
      setcasestudyqs(filteredNotifications);
    }
  };

  const handleOpenModal = (id) => {
    console.log("hhh", id);
    setSelectedItemId(id);
    setOpenDeleteModal(true); // Open the modal
  };

  const deleteCurrentItem = async (id) => {
    // setLoading(true)
    // console.log("goda", id);
    // dispatch(deletQuestbyid(id)).then((res) => {
    //   console.log("delete question response", res);
    //   if (res?.payload?.status === 200) {
    //     toast.success("Question Deleted Successfully")
    //   }
    //   dispatch(getAllquestions()).then((res) => {
    //     setLoading(false)
    //   })
    // })
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getcustomquestionbyid(id)).then((res) => {
      console.log("resssssss", res);
      setLoading(false);
    });
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddQuestion = () => {
    if (
      questionData1?.status === "active" ||
      questionData1?.status === "ended"
    ) {
      toast.error("Cannot add questions to an active or ended exam");
      return;
    }
    navigate("/AddQuestions", { state: { id: id } });
  };

  return (
    <>
      {loading && <ScreenLoader />}

      <div className="main-div">
        {/* Exam Header */}
        <div className="exam-header">
          <div className="exam-header-content">
            <div className="exam-info">
              <h1 className="exam-name">{questionData1?.customExamName}</h1>
              <div className="exam-meta">
                <div className="exam-status">
                  <span
                    className={`status-dot ${
                      questionData1?.status === "active" ? "active" : ""
                    }`}
                  ></span>
                  <span
                    style={{
                      color:
                        questionData1?.status === "active" ? "#52c41a" : "red",
                    }}
                  >
                    {questionData1?.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Main-Search-Filter">
          <Box
            sx={{
              width: "100%",
              typography: "body1",
              display: "flex",
              justifyContent: "space-between",
              background: "transparent",
              borderRadius: "8px",
              "@media (max-width: 600px)": {
                flexDirection: "column",
                justifyContent: "unset",
                gap: "15px",
              },
            }}
          >
            <div className="action-buttons">
              <button
                onClick={handleAddQuestion}
                className={`action-btn add-btn ${
                  questionData1?.status === "active" ||
                  questionData1?.status === "ended"
                    ? "disabled"
                    : ""
                }`}
              >
                Add Question
              </button>
              <button
                onClick={() => handleTabChange("questions")}
                className={`action-btn questions-btn ${
                  activeTab === "questions" ? "active" : ""
                }`}
              >
                Questions
              </button>
              <button
                onClick={() => handleTabChange("results")}
                className={`action-btn results-btn ${
                  activeTab === "results" ? "active" : ""
                }`}
              >
                Results
              </button>
            </div>
            <div className="search__notification__main__container">
              <input
                placeholder="Search Questions"
                className="search__notification__input"
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img
                style={{ height: "20px", width: "20px" }}
                src="https://nclextc.com/Images/search.svg"
                alt="search"
              />
            </div>
          </Box>
          {activeTab === "questions" && (
            <div className="filter-tabs-container">
              <div className="filter-tabs">
                <button
                  className={`filter-tab ${
                    filterType === "traditional" ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("traditional")}
                >
                  Traditional
                </button>
                <button
                  className={`filter-tab ${
                    filterType === "nextgen" ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("nextgen")}
                >
                  Next Gen
                </button>
              </div>
            </div>
          )}
        </div>

        {activeTab === "questions" ? (
          filterType === "traditional" ? (
            <TableContainer
              className="SubmitPropertyTablemaiiiiin"
              sx={{ boxShadow: "none" }}
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
                      sx={{ borderRadius: "7.66px 0 0 7.66px", border: "none" }}
                      className="SubmitPropertytableHeadRowCell"
                    >
                      #
                    </TableCell>
                    <TableCell
                      sx={{ border: "none" }}
                      className="SubmitPropertytableHeadRowCell"
                    >
                      Title
                    </TableCell>
                    <TableCell
                      sx={{ border: "none" }}
                      className="SubmitPropertytableHeadRowCell"
                    >
                      Question Type
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
                      Difficulty
                    </TableCell>
                    <TableCell
                      sx={{ border: "none" }}
                      className="SubmitPropertytableHeadRowCell"
                    >
                      Options
                    </TableCell>
                    <TableCell
                      sx={{ border: "none" }}
                      className="SubmitPropertytableHeadRowCell"
                    >
                      Correct OPt.
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRadius: "0px 7.66px 7.66px 0px",
                        border: "none",
                      }}
                      className="SubmitPropertytableHeadRowCell"
                    >
                      Actions
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
                  {Allquestions?.map((row, index) => (
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
                        {row?.question?.slice(0, 10)}..?
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
                        {row?.subject}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="SubmitPropertytableBodyRowCell2"
                      >
                        {row?.system}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="SubmitPropertytableBodyRowCell2"
                      >
                        {row?.difficulty}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="SubmitPropertytableBodyRowCell2"
                      >
                        {row?.options?.length}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="SubmitPropertytableBodyRowCell2"
                      >
                        {row?.correctAnswers?.length}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="SubmitPropertytableBodyRowCell2"
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <img
                            src="https://nclextc.com/Images/Admin/delete.png"
                            alt=""
                            style={{
                              height: "40px",
                              width: "40px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleOpenModal(row._id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <TableContainer
              className="SubmitPropertyTablemaiiiiin"
              sx={{ boxShadow: "none" }}
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
                      sx={{ borderRadius: "7.66px 0 0 7.66px", border: "none" }}
                      className="SubmitPropertytableHeadRowCell"
                    >
                      #
                    </TableCell>
                    <TableCell
                      sx={{ border: "none" }}
                      className="SubmitPropertytableHeadRowCell"
                    >
                      CaseStudy
                    </TableCell>
                    <TableCell
                      sx={{ border: "none" }}
                      className="SubmitPropertytableHeadRowCell"
                    >
                      Question Type
                    </TableCell>

                    <TableCell
                      sx={{ border: "none" }}
                      className="SubmitPropertytableHeadRowCell"
                    >
                      Questions
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
                      subject
                    </TableCell>
                    {/* <TableCell
                      sx={{
                        borderRadius: "0px 7.66px 7.66px 0px",
                        border: "none",
                      }}
                      className="SubmitPropertytableHeadRowCell"
                    >
                      Actions
                    </TableCell> */}
                  </TableRow>
                </TableHead>
                <TableRow
                  sx={{
                    marginTop: "17px",
                    height: "17px",
                  }}
                ></TableRow>
                <TableBody>
                  {casestudyqs?.map((row, index) => (
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
                        {row?.caseStudy?.slice(0, 20)}
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
                        {row?.questions?.length}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="SubmitPropertytableBodyRowCell2"
                      >
                        {row?.system}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="SubmitPropertytableBodyRowCell2"
                      >
                        {row?.subject}
                      </TableCell>
                      {/* <TableCell
                        align="center"
                        className="SubmitPropertytableBodyRowCell2"
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <img
                            src="/Images/Admin/delete.png"
                            alt=""
                            style={{
                              height: "40px",
                              width: "40px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleOpenModal(row._id)}
                          />
                        </div>
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )
        ) : (
          <>
            {allresult?.length === 0 ? (
              <div style={{ color: "black", padding: "70px 0px" }}>
                <p>
                  Results will be available once the the students have attempted and exam end
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

        {data?.totalPages > 1 && (
          <>
            <Stack
              spacing={2}
              sx={{
                borderRadius: "8px",
                justifyContent: "center !important",
                alignItems: "center !important",
                marginTop: isSmallScreen
                  ? "20px !important"
                  : "40px !important",
              }}
            >
              <Pagination
                count={data?.totalPages || 1}
                page={currentPage}
                onChange={goToPage}
                size={isSmallScreen ? "small" : "large"} // Adjust size for smaller screens
                siblingCount={isSmallScreen ? 1 : 2} // Reduce sibling count for smaller screens
                boundaryCount={isSmallScreen ? 1 : 1} // Adjust boundary count for smaller screens
                sx={{
                  "& .MuiPagination-ul": {
                    display: "flex",
                    gap: "5px",
                    justifyContent: "flex-end",
                  },
                }}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{
                      previous: KeyboardArrowLeft,
                      next: KeyboardArrowRight,
                    }}
                    {...item}
                    sx={{
                      color: "#000",
                      borderRadius: "8px",
                      border: "1px solid #cdcdcd",
                      fontSize: "13px",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "#139ed5 !important",
                        color: "#fff !important",
                        borderRadius: "8px !important",
                      },
                    }}
                  />
                )}
              />
            </Stack>
          </>
        )}
      </div>
      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        deleteCurrentItem={deleteCurrentItem}
        itemId={selectedItemId}
      />
      {/* <div className="fixed-generate-button">
        <button
          className="generate-exam-btn"
          onClick={() => {
            console.log("Generate Exam clicked");
          }}
        >
          Generate Exam
        </button>
      </div>*/}
    </>
  );
};

export default Questions;
