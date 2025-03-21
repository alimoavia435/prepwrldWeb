import React, { useEffect, useState } from "react";
import { Button, Modal, Dropdown, Form } from "react-bootstrap";
import './Subjects.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreateSubject } from "../../services/redux/middleware/CreateSubject";
import { getAllrooms } from "../../services/redux/middleware/getAllrooms";
import ScreenLoader from "../../components/loader/ScreenLoader";
import { Trash } from 'react-bootstrap-icons';
import { deleteroom } from "../../services/redux/middleware/deleteroom";
const RoomPage = () => {
  const [activeTab, setActiveTab] = useState("predefined");

  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [predefinedRooms, setPredefinedRooms] = useState([]);


  const roomData = useSelector(
    (state) => state?.getAllrooms?.profile?.data?.rooms
  )
  useEffect(() => {
    if (roomData) {
      setPredefinedRooms(roomData)
    }
  }, [roomData])




  console.log("roomData", roomData);
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
        roomName: subject
      }
      dispatch(CreateSubject(data)).then((res) => {
        console.log(res, "resopnse of create")
        dispatch(getAllrooms())
        setLoading(false)
        handleCloseModal();
        setSubject('')
      })
    }


  };
  const handleDelete = (id) => {
    setLoading(true)
    dispatch(deleteroom(id)).then((res) => {
      console.log(res, "delete response");
      dispatch(getAllrooms()).then((res) => {
        setLoading(false)
      })
    })
  };

  useEffect(() => {
    setLoading(true)
    dispatch(getAllrooms()).then((res) => {
      setLoading(false)
    })
  }, [])


  return (
    <>
      {loading && <ScreenLoader />}
      <div >
        {/* Tab buttons */}
        {/* <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Button
          style={{
            background: activeTab === "predefined" ? "#395bab" : "lightgrey",
            color: activeTab === "predefined" ? "#ffffff" : "#000000"

          }}
          onClick={() => setActiveTab("predefined")}

        >
          Predefined
        </Button>
        <Button
          style={{
            background: activeTab === "custom" ? "#395bab" : "lightgrey",
            color: activeTab === "custom" ? "#ffffff" : "#000000"
          }}
          onClick={() => setActiveTab("custom")}
        >
          Custom
        </Button>
      </div> */}

        {/* Create Room button */}
        <div className="fdgshasjf">
          <Button variant="success" onClick={handleOpenModal}>
            Create Room
          </Button>
        </div>

        {/* Room list */}
        <div >
          {activeTab === "predefined" && (
            <>
              <p className="toptext">Classes</p>
              {predefinedRooms.length === 0 ? (
                <p className="toptext">No Classes  created yet.</p>
              ) : (
                <div className="predefinedtop">
                  {predefinedRooms.map((room, index) => (
                    <div key={index} className="predefinedtop_inner" >
                      <Dropdown style={{ position: 'relative' }}>
                        <Dropdown.Toggle
                          as="img"
                          src="/Images/Dashboard/dots.png"
                          style={{ height: "20px", width: "20px", position: "absolute", top: "-6px", right: "-74px", cursor: 'pointer' }}
                          alt="..."
                        />

                        <Dropdown.Menu align="end" style={{ top: '35px', right: '0px', position: 'absolute' }}>
                          <Dropdown.Item onClick={() => handleDelete(room?._id)}>
                            <Trash className="mr-2" /> Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <img src="/Images/Dashboard/open-folder.png" alt="" onClick={() => navigate(`/SubjectDetail/${room?._id}`)} />
                      <p className="toptext_innner" style={{ textAlign: "center" }} onClick={() => navigate(`/SubjectDetail/${room?._id}`)}>{room?.roomName}</p>
                      <p className="toptext_innner" style={{ textAlign: "center" }} onClick={() => navigate(`/SubjectDetail/${room?._id}`)}>{room?.students?.length}</p>

                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* {activeTab === "custom" && (
          <>
            <p className="toptext">Custom Subjects</p>
            {customRooms.length === 0 ? (
              <p className="toptext">No rooms created yet.</p>
            ) : (
              <div className="predefinedtop">
                {customRooms.map((room, index) => (
                  <div key={index} className="predefinedtop_inner" onClick={() => navigate(`/SubjectDetail/${1}`)}>
                    <img src="/Images/home/profile.svg" alt="" />
                    <p className="toptext_innner">{room.name}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )} */}
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
                src="/Images/Dashboard/open-folder.png"
                alt="Placeholder"
                className="mb-3"
              />


              <Form.Group controlId="customRoomName">
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
            <Button variant="secondary" style={{ height: "44px", borderRadius: "10px", width: "100%", maxWidth: "120px" }} onClick={handleCloseModal}>
              Cancel
            </Button>
            <button style={{ background: "#135bab", height: "44px", color: "#ffffff", borderRadius: "10px", border: "none", width: "100%", maxWidth: "120px" }} onClick={handleCreateRoom}>
              Create
            </button>
          </Modal.Footer>
        </Modal>
      </div >
    </>
  );
};

export default RoomPage;
