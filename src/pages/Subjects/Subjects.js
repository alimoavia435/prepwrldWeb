import React, { useEffect, useState } from "react";
import { Button, Modal, Dropdown, Form } from "react-bootstrap";
import "./Subjects.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreateSubject } from "../../services/redux/middleware/CreateSubject";
import { getAllrooms } from "../../services/redux/middleware/getAllrooms";
import ScreenLoader from "../../components/loader/ScreenLoader";
import { Trash, People, Plus, Pencil } from "react-bootstrap-icons";
import { deleteroom } from "../../services/redux/middleware/deleteroom";
import { toast } from "react-toastify";
import { updateRoom } from "../../services/redux/middleware/updateRoom";
const RoomPage = () => {
  const [activeTab, setActiveTab] = useState("predefined");
  const [showModal, setShowModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [renameSubject, setRenameSubject] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [predefinedRooms, setPredefinedRooms] = useState([]);

  const roomData = useSelector(
    (state) => state?.getAllrooms?.profile?.data?.rooms
  );
  useEffect(() => {
    if (roomData) {
      setPredefinedRooms(roomData);
    }
  }, [roomData]);

  console.log("roomData", roomData);
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

  const handleCreateRoom = () => {
    if (!subject.trim()) {
      toast.error("Please enter a room name");
      return;
    }
    setLoading(true);
    if (activeTab === "predefined") {
      const data = {
        roomName: subject,
      };
      dispatch(CreateSubject(data)).then((res) => {
        console.log(res, "response of create");
        dispatch(getAllrooms());
        setLoading(false);
        handleCloseModal();
        setSubject("");
        toast.success("Room created successfully!");
      });
    }
  };

  const handleDelete = (id) => {
    setLoading(true);
    dispatch(deleteroom(id)).then((res) => {
      console.log(res, "delete response");
      dispatch(getAllrooms()).then((res) => {
        setLoading(false);
        toast.success("Room deleted successfully!");
      });
    });
  };

  const handleRenameClick = (room) => {
    setSelectedRoom(room);
    setRenameSubject(room.roomName);
    setShowRenameModal(true);
  };

  const handleRename = () => {
    if (!renameSubject.trim()) {
      toast.error("Please enter a room name");
      return;
    }
    setLoading(true);
    const datawithid = {
      id: selectedRoom?._id,
      data: {
        roomName: renameSubject,
      },
    };
    dispatch(updateRoom(datawithid)).then((res) => {
      console.log(res, "response of updateRoom");
      if (res?.payload?.status === 200) {
        dispatch(getAllrooms());
        setLoading(false);
        setShowRenameModal(false);
        setRenameSubject("");
        setSelectedRoom(null);
        toast.success("Room renamed successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getAllrooms()).then((res) => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading && <ScreenLoader />}
      <div className="main-container" >
        <div className="content-wrapper">
          <div className="fdgshasjf">
            <Button variant="success" onClick={handleOpenModal}>
              <Plus size={20} className="me-2" />
              Create Room
            </Button>
          </div>

          <div>
            {activeTab === "predefined" && (
              <>
                <p className="toptext">Classes</p>
                {predefinedRooms.length === 0 ? (
                  <div className="empty-state">
                    <img
                      src="/prepwrld/Images/Dashboard/open-folder.png"
                      alt="No classes"
                      style={{ width: "100px", marginBottom: "20px" }}
                    />
                    <p className="toptext">No Classes created yet.</p>
                    <p style={{ color: "#6c757d" }}>
                      Create your first class to get started!
                    </p>
                  </div>
                ) : (
                  <div className="predefinedtop">
                    {predefinedRooms.map((room, index) => (
                      <div key={index} className="predefinedtop_inner">
                        <Dropdown style={{ position: "relative" }}>
                          <Dropdown.Toggle
                            as="img"
                            src="/prepwrld/Images/Dashboard/dots.png"
                            style={{
                              height: "20px",
                              width: "20px",
                              position: "absolute",
                              top: "-6px",
                              right: "-74px",
                              cursor: "pointer",
                            }}
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
                              onClick={() => handleDelete(room?._id)}
                              className="delete-item"
                            >
                              <Trash size={16} className="me-2" />
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <img
                          src="/prepwrld/Images/Dashboard/open-folder.png"
                          alt=""
                          onClick={() =>
                            navigate(`/SubjectDetail/${room?._id}`)
                          }
                        />
                        <p
                          className="toptext_innner"
                          style={{ textAlign: "center" }}
                          onClick={() =>
                            navigate(`/SubjectDetail/${room?._id}`)
                          }
                        >
                          {room?.roomName}
                        </p>
                        <div className="student-count">
                          <People size={16} className="me-1" />
                          <span>{room?.students?.length || 0} Students</span>
                        </div>
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
          />
          <Modal.Body>
            <>
              <img
                src="/prepwrld/Images/Dashboard/open-folder.png"
                alt="Placeholder"
                className="mb-3"
                style={{ width: "60px", height: "60px" }}
              />

              <Form.Group controlId="customRoomName">
                <Form.Label>Room Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter room name"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </Form.Group>
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
          />
          <Modal.Body>
            <>
              <img
                src="/prepwrld/Images/Dashboard/open-folder.png"
                alt="Placeholder"
                className="mb-3"
                style={{ width: "60px", height: "60px" }}
              />

              <Form.Group controlId="renameRoomName">
                <Form.Label>New Room Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new room name"
                  value={renameSubject}
                  onChange={(e) => setRenameSubject(e.target.value)}
                />
              </Form.Group>
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
    </>
  );
};

export default RoomPage;
