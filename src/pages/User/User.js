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
import "./User.css";

import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import getAllUsers from "../../services/redux/middleware/getAllUsers";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";

import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
// import search from "../../../public/Images/Dashboard/Icon.svg"

import { Tabs, Tab, Box, Typography } from "@mui/material";
import { use } from "react";
// import { getteachers } from "../../services/redux/middleware/getteachers";
// import { deleteUserById } from "../../services/redux/middleware/deleteUserById";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ScreenLoader from "../../components/loader/ScreenLoader";
// import DeleteModal from "../../components/DeleteModal/index";

const User = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("investor");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [Teacherinfo, setTeacherinfo] = useState([]);
  const navigate = useNavigate();

  const data = useSelector(
    (state) => state?.getAllUsers?.getAllUsers?.data?.allUsers
  );
  const TeacherData = useSelector(
    (state) => state?.getteachers?.Teacher?.data
  );
  console.log("TeacherData", TeacherData);

  useEffect(() => {
    if (TeacherData) {
      setTeacherinfo(TeacherData);
    }
    else {
      setTeacherinfo([]);
    }
  }, [TeacherData])

  const dispatch = useDispatch();

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 470);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 470);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [search, setSearch] = useState("");
  const [dataToDisplay, setDataToDisplay] = useState([]);

  const filteredData = useMemo(() => {
    return data?.paginatedItems?.filter((user) => {
      const matchesFilter = filter ? user?.userType === filter : data;

      return matchesFilter
    });
  }, [data, filter, search]);

  const getData = () => {
    setDataToDisplay(data?.paginatedItems);
  };

  useEffect(() => {
    getData();
  }, [search, filter, data]);

  // Handle page navigation
  const goToPage = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setLoading(true)
    setTabIndex(newValue);
    console.log("tabs clicked", newValue)
    if (newValue === 0) {
      // dispatch(getteachers("teacher")).then(() => {
      //   setLoading(false)
      // });
    }
    else if (newValue === 1) {
      // dispatch(getteachers("student")).then(() => {
      //   setLoading(false)
      // });;
    }
    else {
      setLoading(false)
    }
    switch (newValue) {
      case 0:
        setFilter("Teacher");
        break;
      case 1:
        setFilter("Students");
        break;
      default:
        setFilter("Teacher");
    }
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true)
    // dispatch(getteachers("teacher")).then(() => {
    //   setLoading(false)
    // });
    setLoading(false)
  }, [])

  const handleOpenModal = (id) => {
    console.log("hhh", id)
    setSelectedItemId(id);
    setOpenDeleteModal(true);      // Open the modal
  };

  const deleteCurrentItem = async (id) => {
    setLoading(true)
    console.log("goda", id);
    // dispatch(deleteUserById(id)).then((res) => {
    //   console.log("delete response", res);
    //   if (res?.payload?.status === 200) {
    //     toast.success("User Deleted Successfully")
    //   }
    //   if (filter === "Students") {
    //     dispatch(getteachers("student")).then(() => {
    //       setLoading(false)
    //     });
    //   }
    //   else {
    //     dispatch(getteachers("teacher")).then(() => {
    //       setLoading(false)
    //     });
    //   }
    // })
  }
  return (
    <>
      {loading && <ScreenLoader />}

      <div className="main-div">
        <div className="Main-Search-Filter" >

          {/* <button class="addqbttn" onClick={() => navigate('/AddStudent')} >Add New Student</button> */}
        </div>
        <TableContainer
          className="SubmitPropertyTablemaiiiiin"
          sx={{
            boxShadow: "none",
          }}
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} aria-label="table">
            <TableHead >
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
                  Name
                </TableCell>
                <TableCell
                  sx={{ border: "none" }}
                  className="SubmitPropertytableHeadRowCell"
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{ border: "none" }}
                  className="SubmitPropertytableHeadRowCell"
                >
                  Date of registration
                </TableCell>
                <TableCell
                  sx={{ border: "none" }}
                  className="SubmitPropertytableHeadRowCell"
                >
                  Contact number
                </TableCell>
                <TableCell
                  sx={{ border: "none" }}
                  className="SubmitPropertytableHeadRowCell"
                >
                  Password
                </TableCell>
                <TableCell
                  sx={{ borderRadius: "0px 7.66px 7.66px 0px", border: "none" }}
                  className="SubmitPropertytableHeadRowCell"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableRow
              sx={{
                marginTop: "17px",
                height: "17px",
              }}
            ></TableRow>
            <TableBody >
              {Teacherinfo?.map((row, index) => (
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
                    {row?.fullName}
                  </TableCell>
                  <TableCell
                    align="left"
                    className="SubmitPropertytableBodyRowCell2"
                  >
                    {row?.email}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="SubmitPropertytableBodyRowCell2"
                  >
                    {new Date(row?.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="SubmitPropertytableBodyRowCell2"
                  >
                    {row?.phone}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="SubmitPropertytableBodyRowCell2"
                  >
                    *********
                  </TableCell>
                  <TableCell
                    align="center"
                    className="SubmitPropertytableBodyRowCell2"
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <img src="https://nclextc.com/Images/Admin/delete.png" alt="" style={{ height: "40px", width: "40px", cursor: "pointer" }}
                        onClick={() => handleOpenModal(row._id)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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
      {/* <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        deleteCurrentItem={deleteCurrentItem}
        itemId={selectedItemId} 
      /> */}
    </>
  );
};

export default User;
