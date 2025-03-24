import React, { useEffect, useState } from "react";
import { Button, Modal, Dropdown, Form, Badge } from "react-bootstrap";
import "./Exams.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreateSubject } from "../../services/redux/middleware/CreateSubject";
import { getAllrooms } from "../../services/redux/middleware/getAllrooms";
import ScreenLoader from "../../components/loader/ScreenLoader";
import { Trash, PlayFill, StopFill, House, Book, Calendar, People, Gear, Pencil } from 'react-bootstrap-icons';
import { deleteCustomrooms } from "../../services/redux/middleware/deleteCustomrooms";
import { changeStatus } from "../../services/redux/middleware/changeStatus";
import { toast } from "react-toastify";
import { createCustomExam } from "../../services/redux/middleware/createCustomExam";
import { getcustomexams } from "../../services/redux/middleware/getcustomexams";
import { updateCustom } from "../../services/redux/middleware/updateCustom";

const CustomExams = () => {
  const [activeTab, setActiveTab] = useState("predefined");

  const [showModal, setShowModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [text, settext] = useState("");
  const [renameSubject, setRenameSubject] = useState("");
  const [renameDescription, setRenameDescription] = useState("");
  const [selectedExam, setSelectedExam] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [predefinedRooms, setPredefinedRooms] = useState([]);
  const [rooms, setrooms] = useState();
  const [description, setdescription] = useState("");
  const getexaDatams = useSelector(
    (state) => state?.getcustomexams?.profile?.data?.customExams
  );
  useEffect(() => {
    if (getexaDatams) {
      setPredefinedRooms(getexaDatams);
    }
  }, [getexaDatams]);

  const roomData = useSelector(
    (state) => state?.getAllrooms?.profile?.data?.rooms
  );
  useEffect(() => {
    if (roomData) {
      setrooms(roomData);
    }
  }, [roomData]);

  console.log("getexams", getexaDatams);

  const handleRemove = (room) => {
    setselectedClassRooms(
      selectedClassRooms.filter((s) => s.roomId !== room.roomId)
    );
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

  const [customRoomName, setCustomRoomName] = useState("");
  const dispatch = useDispatch();
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [selectedClassRooms, setselectedClassRooms] = useState([]);

  const handleCreateRoom = () => {
    setLoading(true);
    if (activeTab === "predefined") {
      const data = {
        examName: text,
        description,
        selectedClassRooms,
      };
      console.log(data, "data of create");
      dispatch(createCustomExam(data)).then((res) => {
        console.log(res, "resopnse of create");
        dispatch(getcustomexams()).then((res) => {
          setLoading(false);
        });
        setLoading(false);
        handleCloseModal();
        setSubject("");
      });
    }
  };
  const handleDelete = (id) => {
    setLoading(true);
    dispatch(deleteCustomrooms(id)).then((res) => {
      console.log(res, "delete response");
      dispatch(getcustomexams()).then((res) => {
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getcustomexams()).then((res) => {
      setLoading(false);
    });
  }, []);
  const handleStart = (id, status) => {
    const data = {
      status:
        status === "pending" ? "active" : status === "active" ? "ended" : "",
    };
    const datawithid = {
      id,
      data,
    };
    setLoading(true);
    dispatch(changeStatus(datawithid)).then((res) => {
      console.log(res, "status response");
      dispatch(getcustomexams()).then((res) => {
        setLoading(false);
      });
      if (res?.payload?.status === 200) {
        toast?.success("Exam status changed");
      }
      setLoading(false);
    });
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
    setLoading(true);
    dispatch(getAllrooms()).then((res) => {
      setLoading(false);
    });
  }, []);

  const getStatusButtonClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'pending';
      case 'active':
        return 'active';
      case 'ended':
        return 'ended';
      default:
        return 'pending';
    }
  };

  const handleRenameClick = (exam) => {
    setSelectedExam(exam);
    setRenameSubject(exam.customExamName);
    setRenameDescription(exam.description);
    setShowRenameModal(true);
  };

  const handleRename = () => {
    if (!renameSubject.trim()) {
      toast.error("Please enter an exam name");
      return;
    }
    setLoading(true);
    const data = {
      customExamName: renameSubject,
    };
    const datawithid = {
      id: selectedExam?._id,
      data: data
    };
    dispatch(updateCustom(datawithid)).then((res) => {
      if (res?.payload?.status === 200) {
        dispatch(getcustomexams());
        setLoading(false);
        setShowRenameModal(false);
        setRenameSubject('');
        setRenameDescription('');
        setSelectedExam(null);
        toast.success("Exam renamed successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    });
  };

  return (
    <div className="main-container">
      {loading && <ScreenLoader />}
      <div className="content-wrapper" style={{ overflowY: "hidden" }}>
        <div className="fdgshasjf">
          <Button variant="success" onClick={handleOpenModal}>
            Create Exam folder
          </Button>
        </div>

        <div>
          {activeTab === "predefined" && (
            <>
              <p className="toptext">Custom Exams</p>
              {predefinedRooms?.length === 0 ? (
                <p className="toptext">No Exams created yet.</p>
              ) : (
                <div className="predefinedtop">
                  {predefinedRooms?.map((room, index) => (
                    <div key={index} className="predefinedtop_inner">
                      <Dropdown style={{ position: 'relative' }}>
                        <Dropdown.Toggle
                          as="img"
                          src="/Images/Dashboard/dots.png"
                          style={{ height: "20px", width: "20px", position: "absolute", top: "-6px", right: "-74px", cursor: 'pointer' }}
                          alt="..."
                        />

                        <Dropdown.Menu align="end">
                          <Dropdown.Item 
                            onClick={() => handleRenameClick(room)}
                            className="rename-item"
                          >
                            <Pencil size={16} className="me-2" />
                            Rename
                          </Dropdown.Item>
                          <Dropdown.Item 
                            className="delete"
                            onClick={() => handleDelete(room?._id)}
                          >
                            <Trash size={16} className="me-2" />
                            Delete
                          </Dropdown.Item>
                          {room?.status !== "primary" && room?.status !== "ended" && (
                            <Dropdown.Item 
                              className="start"
                              onClick={() => handleStart(room?._id, room?.status)}
                            >
                              {room?.status === "active" ? (
                                <>
                                  <StopFill size={16} className="me-2" />
                                  End Exam
                                </>
                              ) : (
                                <>
                                  <PlayFill size={16} className="me-2" />
                                  Start Exam
                                </>
                              )}
                            </Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                      <img 
                        src="/Images/exam1.png" 
                        alt=""
                        onClick={() => navigate(`/Questions/${room?._id}`, {
                          state: {
                            status: room?.status,
                          },
                        })}
                      />
                      <p className="toptext_innner" style={{ textAlign: "center" }}
                        onClick={() => navigate(`/Questions/${room?._id}`, {
                          state: {
                            status: room?.status,
                          },
                        })}
                      >{room?.customExamName}</p>
                      <p className="toptext_innner" style={{ textAlign: "center" }}
                        onClick={() => navigate(`/Questions/${room?._id}`, {
                          state: {
                            status: room?.status,
                          },
                        })}
                      >{room?.description}</p>
                      <button 
                        className={`status-button ${getStatusButtonClass(room?.status)}`}
                        onClick={() => navigate(`/Questions/${room?._id}`, {
                          state: {
                            status: room?.status,
                          },
                        })}
                      >
                        {room?.status}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header
          style={{
            position: "absolute",
            top: "-12px",
            right: "-12px",
            cursor: "pointer",
          }}
          closeButton
          onHide={handleCloseModal}
        ></Modal.Header>
        <Modal.Body>
          <>
            <img
              src="/Images/Dashboard/open-folder.png"
              alt="Placeholder"
              className="mb-3"
            />

            <Form.Group controlId="customRoomName">
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={text}
                onChange={(e) => settext(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="customRoomName">
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </Form.Group>
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
          </>
        </Modal.Body>
        <Modal.Footer className="sdhjDSHK">
          <Button
            variant="secondary"
            style={{
              height: "44px",
              borderRadius: "10px",
              width: "100%",
              maxWidth: "120px",
            }}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <button
            style={{
              background: "#135bab",
              height: "44px",
              color: "#ffffff",
              borderRadius: "10px",
              border: "none",
              width: "100%",
              maxWidth: "120px",
            }}
            onClick={handleCreateRoom}
          >
            Create
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRenameModal} onHide={() => setShowRenameModal(false)}>
        <Modal.Header
          style={{
            position: "absolute",
            top: "-12px",
            right: "-12px",
            cursor: "pointer",
          }}
          closeButton
          onHide={() => setShowRenameModal(false)}
        ></Modal.Header>
        <Modal.Body>
          <>
            <img
              src="/Images/Dashboard/open-folder.png"
              alt="Placeholder"
              className="mb-3"
            />

            <Form.Group controlId="renameSubject">
              <Form.Control
                type="text"
                placeholder="Enter new exam name"
                value={renameSubject}
                onChange={(e) => setRenameSubject(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group controlId="renameDescription">
              <Form.Control
                type="text"
                placeholder="Enter new description"
                value={renameDescription}
                onChange={(e) => setRenameDescription(e.target.value)}
              />
            </Form.Group> */}
          </>
        </Modal.Body>
        <Modal.Footer className="sdhjDSHK">
          <Button
            variant="secondary"
            style={{
              height: "44px",
              borderRadius: "10px",
              width: "100%",
              maxWidth: "120px",
            }}
            onClick={() => setShowRenameModal(false)}
          >
            Cancel
          </Button>
          <button
            style={{
              background: "#135bab",
              height: "44px",
              color: "#ffffff",
              borderRadius: "10px",
              border: "none",
              width: "100%",
              maxWidth: "120px",
            }}
            onClick={handleRename}
          >
            Rename
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomExams;
