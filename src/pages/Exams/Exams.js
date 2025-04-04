import React, { useEffect, useState } from "react";
import { Button, Modal, Dropdown, Form } from "react-bootstrap";
import './Exams.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreateSubject } from "../../services/redux/middleware/CreateSubject";
import { getAllrooms } from "../../services/redux/middleware/getAllrooms";
import ScreenLoader from "../../components/loader/ScreenLoader";
import { Trash, PlayFill, StopFill, Pencil } from 'react-bootstrap-icons';
import { deleteroom } from "../../services/redux/middleware/deleteroom";
import { creareexamfolder } from "../../services/redux/middleware/creareexamfolder";
import { getexams } from "../../services/redux/middleware/getexams";
import { deleteExam } from "../../services/redux/middleware/deleteExam";
import { changeStatus } from "../../services/redux/middleware/changeStatus";
import { toast } from "react-toastify";
import { updateExam } from "../../services/redux/middleware/updateExam";
const Exams = () => {
  const [activeTab, setActiveTab] = useState("predefined");
  const [showModal, setShowModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [renameSubject, setRenameSubject] = useState("");
  const [selectedExam, setSelectedExam] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [predefinedRooms, setPredefinedRooms] = useState([]);

  const getexaDatams = useSelector(
    (state) => state?.getexams?.profile?.data?.exams
  )
  useEffect(() => {
    if (getexaDatams) {
      setPredefinedRooms(getexaDatams)
    }
  }, [getexaDatams])

  console.log("getexams", getexaDatams);
  const subjects = [
    'Adult Health',
    'Child Health',
    'Critical Care',
    'Fundamentals',
    'Leadership & Management',
    'Maternal & Newborn Health',
    'Mental Health',
    'Pharmacology',
    ' Cardiovascular',
  ];

  const [customRoomName, setCustomRoomName] = useState("");
  const dispatch = useDispatch();
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCreateRoom = () => {
    setLoading(true)
    if (activeTab === "predefined") {
      const data = {
        examName: subject
      }
      dispatch(creareexamfolder(data)).then((res) => {
        console.log(res, "resopnse of create")
        dispatch(getexams()).then((res) => {
          setLoading(false)
        })
        setLoading(false)
        handleCloseModal();
        setSubject('')
      })
    }
  };
  const handleDelete = (id) => {
    setLoading(true)
    dispatch(deleteExam(id)).then((res) => {
      console.log(res, "delete response");
      dispatch(getexams()).then((res) => {
        setLoading(false)
      })
    })
  };

  useEffect(() => {
    setLoading(true)
    dispatch(getexams()).then((res) => {
      setLoading(false)
    })
  }, [])
  const handleStart = (id, status) => {
    const data = {
      status: status === "pending" ? "active" : status === "active" ? "ended" : ""
    }
    const datawithid = {
      id,
      data
    }
    setLoading(true)
    dispatch(changeStatus(datawithid)).then((res) => {
      console.log(res, "status response")
      dispatch(getexams()).then((res) => {
        setLoading(false)
      })
      if (res?.payload?.status === 200) {
        toast?.success("Exam status changed")
      }
      setLoading(false)
    })
  }

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
    setRenameSubject(exam.examName);
    setShowRenameModal(true);
  };

  const handleRename = () => {
    if (!renameSubject.trim()) {
      toast.error("Please enter an exam name");
      return;
    }
    setLoading(true);
    const datawithid = {
      id: selectedExam?._id,
      data: {
        examName: renameSubject
      }
    };
    dispatch(updateExam(datawithid)).then((res) => {
      if (res?.payload?.status === 200) {
        dispatch(getexams());
        setLoading(false);
        setShowRenameModal(false);
        setRenameSubject('');
        setSelectedExam(null);
        toast.success("Exam renamed successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    });
  };

  return (
    <div className="main-container" style={{ overflowY: "hidden" }}>
      {loading && <ScreenLoader />}
      <div className="content-wrapper" >
        <div className="fdgshasjf">
          <Button variant="success" onClick={handleOpenModal}>
            Create Exam folder
          </Button>
        </div>

        <div>
          {activeTab === "predefined" && (
            <>
              <p className="toptext">Exams</p>
              {predefinedRooms?.length === 0 ? (
                <p className="toptext">No Exams created yet.</p>
              ) : (
                <div className="predefinedtop">
                  {predefinedRooms?.map((room, index) => (
                    <div key={index} className="predefinedtop_inner">
                      <Dropdown style={{ position: 'relative' }}>
                        <Dropdown.Toggle
                          as="img"
                          src="https://nclextc.com/Images/Dashboard/dots.png"
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
                        src="https://nclextc.com/Images/exam1.png" 
                        alt=""
                        onClick={() => navigate(`/GenerateTest/${room?._id}`, {
                          state: {
                            status: room?.status
                          }
                        })}
                      />
                      <p className="toptext_innner" style={{ textAlign: "center" }}
                        onClick={() => navigate(`/GenerateTest/${room?._id}`, {
                          state: {
                            status: room?.status
                          }
                        })}
                      >{room?.examName}</p>
                      <button 
                        className={`status-button ${getStatusButtonClass(room?.status)}`}
                        onClick={() => navigate(`/GenerateTest/${room?._id}`, {
                          state: {
                            status: room?.status
                          }
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
          <Modal.Header style={{
            position: "absolute",
            top: "-12px",
            right: "-12px", cursor: "pointer"
          }} closeButton onHide={handleCloseModal}>
          </Modal.Header>
          <Modal.Body>
            <>
              <img
                src="https://nclextc.com/Images/Dashboard/open-folder.png"
                alt="Placeholder"
                className="mb-3"
              />

              <Form.Group controlId="customRoomName">
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </Form.Group>
            </>
          </Modal.Body>
          <Modal.Footer className="sdhjDSHK">
            <Button variant="secondary" style={{ height: "44px", borderRadius: "10px", width: "100%", maxWidth: "120px" }} onClick={handleCloseModal}>
              Cancel
            </Button>
            <button style={{ background: "#135bab", height: "44px", color: "#ffffff", borderRadius: "10px", border: "none", width: "100%", maxWidth: "120px" }} onClick={handleCreateRoom}>
              Create
            </button>
          </Modal.Footer>
        </Modal>

      {/* Rename Modal */}
      <Modal show={showRenameModal} onHide={() => setShowRenameModal(false)}>
        <Modal.Header 
          style={{
            position: "absolute",
            top: "-12px",
            right: "-12px",
            cursor: "pointer"
          }} 
          closeButton 
          onHide={() => setShowRenameModal(false)}
        />
        <Modal.Body>
          <>
            <img
              src="https://nclextc.com/Images/Dashboard/open-folder.png"
              alt="Placeholder"
              className="mb-3"
              style={{ width: "60px", height: "60px" }}
            />

            <Form.Group controlId="renameExamName">
              <Form.Label>New Exam Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new exam name"
                value={renameSubject}
                onChange={(e) => setRenameSubject(e.target.value)}
              />
            </Form.Group>
          </>
        </Modal.Body>
        <Modal.Footer className="sdhjDSHK">
          <Button 
            variant="secondary" 
            style={{ height: "44px", borderRadius: "10px", width: "100%", maxWidth: "120px" }} 
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
              maxWidth: "120px" 
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

export default Exams;
