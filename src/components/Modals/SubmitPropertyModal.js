import React from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./SumbitPropertyModal.css";

const SubmitPropertyModal = ({ show, handleClose, propid }) => {
  const navigate = useNavigate();

  return (
    <Modal
      className="modal__success__container"
      show={show}
      onHide={handleClose}
      centered
      backdrop="static" // Prevents closing on outside click
    >
      <div className="close__image_container-1">
        <div className="close__image_container" onClick={handleClose}>
          <img className="image-close-success" src="/Images/SubmitProperty/closeIcon.svg" alt="Close" />
        </div>

        <ModalBody className="modal__body__container">
          <div className="ModalContentContainer">
            <img src="./Images/SubmitProperty/submitIcon.svg" alt="Success" className="ModalSuccessImage" />
            <p className="ModalText">Property Submit Successfully</p>
            <button className="ModalButton__submit" onClick={() => navigate(`/Developer_ViewProperty/${propid}`)}>
              View My Property
            </button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};

// const WrongPropertyModel = ({ show, handleClose }) => {
//   const navigate = useNavigate();

//   return (
//     <Modal
//       className="modal__success__container"
//       show={show}
//       onHide={handleClose}
//       centered
//       backdrop="static" // Prevents closing on outside click
//     >
//       <div className="close__image_container-1">
//         <ModalBody className="modal__body__container">
//           <div className="ModalContentContainer">
//             <img src="/Images/Missing_Items.svg" alt="Success" className="ModalSuccessImage" />
//             <p className="ModalText">Property not Found</p>
//             <button className="ModalButton__submit" onClick={() => navigate("/ViewAllMyProperties")}>
//               View All properties
//             </button>
//           </div>
//         </ModalBody>
//       </div>
//     </Modal>
//   );
// };

export { SubmitPropertyModal };
