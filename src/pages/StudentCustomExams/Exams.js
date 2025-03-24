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
const StudentCustomExams = () => {
  const [activeTab, setActiveTab] = useState("predefined");

  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [predefinedRooms, setPredefinedRooms] = useState([]);


  const getexaDatams=useSelector(
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

  return (
    <div className="main-container">
      {loading && <ScreenLoader />}
      <div className="content-wrapper">
        <div>
          {activeTab === "predefined" && (
            <>
              <p className="toptext">Exams</p>
              {predefinedRooms?.length === 0 ? (
                <p className="toptext">No Exams Added yet.</p>
              ) : (
                <div className="predefinedtop">
                  {predefinedRooms?.map((room, index) => (
                    <div key={index} className="predefinedtop_inner">
                      <img 
                        src="/Images/exam1.png" 
                        alt=""
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
                      <button 
                        className={`status-button ${getStatusButtonClass(room?.status)}`}
                        onClick={() =>
                          navigate(`/Submission/${room?._id}`, {
                            state: { description: room?.description, examName: room?.examName }
                          })
                        }
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
    </div>
  );
};

export default StudentCustomExams;
