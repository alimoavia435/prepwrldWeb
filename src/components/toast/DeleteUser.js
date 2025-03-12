import React from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import "./DeleteTask.css";

const DeleteUserModal = ({ show, handleClose }) => {
  return (
    <Modal
      className="modal__main__container"
      show={show}
      onHide={handleClose}
      centered
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ModalBody>
        
          <ModalHeader className="close__image_container-1">
            <div className="close__image_container" onClick={handleClose}>
              <img
               
                src="/Images/Modal/close.svg"
                alt="Close"
              />
            </div>
          </ModalHeader>
          <div className="delete__task__modal_container">
          <div className="delete__task__modal__container_1">
            <div className="delete__task__modal__heading_container">
            <img className="logo__modal__image"
             
              src="/Images/Modal/logo.svg"
              alt="image"
            />
            <p className="delete__task_text">
            Delete User
            </p>
            </div>
            <div className="delete__modal__button_container">
           <button onClick={handleClose} className="delete__modal_cancel_button">
           Cancel
           </button>
           <button className="delete__modal_delete_button">
           Delete
           </button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default  DeleteUserModal;
