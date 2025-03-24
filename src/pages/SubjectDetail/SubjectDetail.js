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
import "./SubjectDetail.css";

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
import { useNavigate, useParams } from "react-router-dom";
import ScreenLoader from "../../components/loader/ScreenLoader";
import { getroomByid } from "../../services/redux/middleware/getroomByid";
// import DeleteModal from "../../components/DeleteModal/index";

const SubjectDetail = () => {
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("investor");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [Teacherinfo, setTeacherinfo] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    console.log("idcoming", id);
    const data = useSelector(
        (state) => state?.getAllUsers?.getAllUsers?.data?.allUsers
    );
    const roominfo = useSelector(
        (state) => state?.getroomByid?.profile?.data?.room
    );

    useEffect(() => {
        if (roominfo) {
            setTeacherinfo(roominfo?.students);
        }
        else {
            setTeacherinfo([]);
        }
    }, [roominfo])
    console.log("roominfo data", roominfo);

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
    useEffect(() => {
        setLoading(true)
        dispatch(getroomByid(id)).then(() => {
            setLoading(false)
        });
    }, [id])

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
                    <div className="fghgjhk">
                        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start",flexDirection:"column" }}>
                            <p className="toptext" style={{ padding: "10px", borderRadius: "12px", background: "lightgrey" }}>Name: <span style={{ fontWeight: "400" }}> {roominfo?.roomName}</span></p>
                            <p className="toptext" style={{ background: "lightgrey", padding: "10px", borderRadius: "12px" }}>No of Students: <span style={{ fontWeight: "400" }}> {roominfo?.students?.length}</span></p>
                        </div>
                        
                    </div>
                    <button class="addqbttn" onClick={() => navigate(`/AddStudent/${roominfo?._id}`)} >Add Student</button>
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
                                            <img src="/Images/SubmitProperty/deleteIcon.svg" alt="" style={{ height: "20px", width: "20px", cursor: "pointer" }}
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

export default SubjectDetail;
