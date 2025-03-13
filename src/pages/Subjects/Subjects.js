import React, { useState } from "react";
import { Button, Modal, Dropdown, Form } from "react-bootstrap";
import './Subjects.css'

const RoomPage = () => {
  const [activeTab, setActiveTab] = useState("predefined");

  const [showModal, setShowModal] = useState(false);

  const [predefinedRooms, setPredefinedRooms] = useState([
    {
      name: "ali"
    },
    {
      name: "haseeb"
    },
    {
      name: "umair"
    }

  ]);
  const [customRooms, setCustomRooms] = useState([
    {
      name: "imran khan"
    },
    {
      name: "afridi"
    },
    {
      name: "yasir"
    }
  ]);

  const predefinedOptions = ["Option 1", "Option 2", "Option 3"];
  const [selectedOption, setSelectedOption] = useState(predefinedOptions[0]);

  const [customRoomName, setCustomRoomName] = useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCreateRoom = () => {
    if (activeTab === "predefined") {
      setPredefinedRooms([...predefinedRooms, selectedOption]);
    } else {
      if (customRoomName.trim() !== "") {
        setCustomRooms([...customRooms, customRoomName]);
        setCustomRoomName("");
      }
    }
    handleCloseModal();
  };

  return (
    <div className="container mt-4">
      {/* Tab buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
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
      </div>

      {/* Create Room button */}
      <div className="fdgshasjf">
        <Button variant="success" onClick={handleOpenModal}>
          Create Room
        </Button>
      </div>

      {/* Room list */}
      <div style={{ paddingTop: "20px" }}>
        {activeTab === "predefined" && (
          <>
            <p className="toptext">Predefined Subjects</p>
            {predefinedRooms.length === 0 ? (
              <p className="toptext">No rooms created yet.</p>
            ) : (
              <div className="predefinedtop">
                {predefinedRooms.map((room, index) => (
                  <div key={index} className="predefinedtop_inner">
                    <img src="/Images/home/profile.svg" alt="" />
                    <p className="toptext_innner">{room.name}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "custom" && (
          <>
            <p className="toptext">Custom Subjects</p>
            {customRooms.length === 0 ? (
              <p className="toptext">No rooms created yet.</p>
            ) : (
              <div className="predefinedtop">
                {customRooms.map((room, index) => (
                  <div key={index} className="predefinedtop_inner">
                    <img src="/Images/home/profile.svg" alt="" />
                    <p className="toptext_innner">{room.name}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>


      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header style={{
          position: "absolute",
          top: "0px",
          right: "0px"
        }} closeButton>

        </Modal.Header>
        <Modal.Body>
          {activeTab === "predefined" ? (
            <>
              <img
                src="https://via.placeholder.com/100"
                alt="Placeholder"
                className="mb-3"
              />
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {selectedOption}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {predefinedOptions.map((option, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => setSelectedOption(option)}
                    >
                      {option}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
              <img
                src="/public"
                alt="Placeholder"
                className="mb-3"
              />
              <Form.Group controlId="customRoomName">
                <Form.Control
                  type="text"
                  placeholder="Enter room name"
                  value={customRoomName}
                  onChange={(e) => setCustomRoomName(e.target.value)}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateRoom}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoomPage;
