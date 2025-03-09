import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./modal.css"; // CSS for the modal
import Group6 from "../../assets/Group6.svg";
import close from "../../assets/close.svg";

const VerificationModal = ({ isOpen, onClose, paragraph, logintype }) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (logintype === "devlogin") {
          navigate("/kyc-info");
        }
        else if (logintype === "inlogin") {
          navigate("/explore");
        }
        else {
          navigate("/Signin");
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, navigate]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div style={{ height: '336px' }} className="modal-content">
        <button className="close-button" onClick={onClose}>
          <img src={close} alt="Close" />
        </button>
        <div className="modal-icon">
          <img src={Group6} alt="Success" />
          <p className="modalpara">{paragraph}</p>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
