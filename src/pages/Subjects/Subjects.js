import React, { useState } from "react";
import { Button, Modal, Dropdown, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const RoomPage = () => {
  // State to track which tab is active
  const [activeTab, setActiveTab] = useState("predefined");

  // State for modal visibility
  const [showModal, setShowModal] = useState(false);

  // State to track room names and created rooms
  const [predefinedRooms, setPredefinedRooms] = useState([]);
  const [customRooms, setCustomRooms] = useState([]);

  // Dropdown options for Predefined
  const predefinedOptions = ["Option 1", "Option 2", "Option 3"];
  const [selectedOption, setSelectedOption] = useState(predefinedOptions[0]);

  // Input for custom room name
  const [customRoomName, setCustomRoomName] = useState("");

  // Handle opening and closing modal
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Handle room creation
  const handleCreateRoom = () => {
    if (activeTab === "predefined") {
      // Add room with selected option in Predefined tab
      setPredefinedRooms([...predefinedRooms, selectedOption]);
    } else {
      // Add custom room in Custom tab
      if (customRoomName.trim() !== "") {
        setCustomRooms([...customRooms, customRoomName]);
        setCustomRoomName(""); // Reset input after creating room
      }
    }
    handleCloseModal(); // Close modal after creation
  };

  return (
    <div className="container mt-4">
      {/* Tab buttons */}
      <div className="mb-4">
        <Button
          variant={activeTab === "predefined" ? "primary" : "secondary"}
          onClick={() => setActiveTab("predefined")}
          className="me-2"
        >
          Predefined
        </Button>
        <Button
          variant={activeTab === "custom" ? "primary" : "secondary"}
          onClick={() => setActiveTab("custom")}
        >
          Custom
        </Button>
      </div>

      {/* Create Room button */}
      <div className="text-end">
        <Button variant="success" onClick={handleOpenModal}>
          Create Room
        </Button>
      </div>

      {/* Room list */}
      <div className="mt-4">
        {activeTab === "predefined" && (
          <>
            <h5>Predefined Rooms</h5>
            {predefinedRooms.length === 0 ? (
              <p>No rooms created yet.</p>
            ) : (
              <ul>
                {predefinedRooms.map((room, index) => (
                  <li key={index}>{room}</li>
                ))}
              </ul>
            )}
          </>
        )}

        {activeTab === "custom" && (
          <>
            <h5>Custom Rooms</h5>
            {customRooms.length === 0 ? (
              <p>No rooms created yet.</p>
            ) : (
              <ul>
                {customRooms.map((room, index) => (
                  <li key={index}>{room}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{activeTab === "predefined" ? "Create Predefined Room" : "Create Custom Room"}</Modal.Title>
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
                src="https://via.placeholder.com/100"
                alt="Placeholder"
                className="mb-3"
              />
              <Form.Group controlId="customRoomName">
                <Form.Label>Room Name</Form.Label>
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
