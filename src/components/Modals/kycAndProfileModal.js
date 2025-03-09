import React from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./SumbitPropertyModal.css";

const KycAndProfileModal = ({ show, handleClose }) => {
  const navigate = useNavigate();

  return (
    <Modal
      className="modal__success__container"
      show={show}
      onHide={handleClose}
      centered
      backdrop="static" // Prevents closing on outside click
    >
      <div style={{height:'300px'}} className="close__image_container-1">
        <div className="close__image_container" onClick={handleClose}>
          <img className="image-close-success" src="/Images/SubmitProperty/closeIcon.svg" alt="Close" />
        </div>

        <ModalBody className="modal__body__container">
          <div className="ModalContentContainer">
            <img src="./Images/SubmitProperty/submitIcon.svg" alt="Success" className="ModalSuccessImage" />
            <p className="ModalText">KYC Submitted Successfully</p>
        
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};
;

export default KycAndProfileModal;
