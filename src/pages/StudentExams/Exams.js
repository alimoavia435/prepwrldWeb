import React, { useEffect, useState } from "react";
import { Button, Modal, Dropdown, Form } from "react-bootstrap";
import './Exams.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreateSubject } from "../../services/redux/middleware/CreateSubject";
import { getAllrooms } from "../../services/redux/middleware/getAllrooms";
import ScreenLoader from "../../components/loader/ScreenLoader";
import { Trash } from 'react-bootstrap-icons';
import { deleteroom } from "../../services/redux/middleware/deleteroom";
import { creareexamfolder } from "../../services/redux/middleware/creareexamfolder";
import { getexams } from "../../services/redux/middleware/getexams";
import { deleteExam } from "../../services/redux/middleware/deleteExam";
import { changeStatus } from "../../services/redux/middleware/changeStatus";
import { toast } from "react-toastify";
import { getStudentExams } from "../../services/redux/middleware/getStudentExams";

const StudentExams = () => {
  const [activeTab, setActiveTab] = useState("predefined");

  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [predefinedRooms, setPredefinedRooms] = useState([]);


  const getexaDatams = useSelector(
    (state) => state?.getStudentExams?.profile?.data?.exams
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

  useEffect(() => {
    setLoading(true)
    dispatch(getStudentExams()).then((res) => {
      setLoading(false)
    })
  }, [])


  return (
    <>
      {loading && <ScreenLoader />}
      <div >

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
        {/* <div className="fdgshasjf">
          <Button variant="success" onClick={handleOpenModal}>
            create Exam folder
          </Button>
        </div> */}

        {/* Room list */}
        <div >
          {activeTab === "predefined" && (
            <>
              <p className="toptext">Exams</p>
              {predefinedRooms?.length === 0 ? (
                <p className="toptext">No Exams Added yet.</p>
              ) : (
                <div className="predefinedtop">
                  {predefinedRooms?.map((room, index) => (
                    <div key={index} className="predefinedtop_inner" >
                      <img src="https://nclextc.com/Images/exam1.png" alt=""
                          onClick={() =>
                            navigate(`/Submission/${room?._id}`, {
                              state: { description: room?.description, examName: room?.examName }
                            })
                          }
                      />
                      <p className="toptext_innner" style={{ textAlign: "center" }}
                         onClick={() =>
                          navigate(`/Submission/${room?._id}`, {
                            state: { description: room?.description, examName: room?.examName }
                          })
                        }
                      >{room?.examName}</p>
                      <p className="toptext_innner" style={{ textAlign: "center" }}
                        onClick={() =>
                          navigate(`/Submission/${room?._id}`, {
                            state: { description: room?.description, examName: room?.examName }
                          })
                        }
                      >{room?.status}</p>

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


        {/* <Modal show={showModal} onHide={handleCloseModal}>
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
        </Modal> */}
      </div >
    </>
  );
};

export default StudentExams;
