import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./kycStep2.css";
import { uploadfile } from "../../../services/redux/middleware/signin";
function KycStep2({ setSelectedStep, formData, handleInputChange }) {
  const [selected, setSelected] = useState("");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [dotloading, setdotloading] = useState(false);
  const [filename, setfilename] = useState();


  console.log("formDatastepkyc1", formData);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setdotloading(true);
      const data = new FormData();
      data.append('file', file);
      dispatch(uploadfile(data)).then((res) => {
        console.log(res, "imageresponse")
        if (res?.payload?.message === "Developer Image uploaded successfully.") {
          setfilename(file.name);
          localStorage.setItem("proofOfIncorporation", file.name);
          console.log(res?.payload?.imageUrl, "url");
          handleInputChange({
            target: { name: "proofOfIncorporation", value: res?.payload?.imageUrl },
          });
          setdotloading(false);
        }
        setdotloading(false);
      })

    }
  };

  const handleNext = () => {
    setSelectedStep(3);
  };
  const handleBack = () => {
    setSelectedStep(1);
  };
  return (
    <div className="kyc__step__2__maon__container">
      <div className="kyc__step__2__input__container">
        <p className="kyc__step__2__input__label">Company Name</p>
        <input
          className="input__kycstep__2__placeholder"
          placeholder="Enter Company Name"
          name="companyName"
          value={formData.companyName || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="kyc__step__2__input__container">
        <p className="kyc__step__2__input__label">Registration Number</p>
        <input
          className="input__kycstep__2__placeholder"
          placeholder="Enter Registration Number"
          name="registrationNumber"
          value={formData.registrationNumber || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="kyc__step__2__input__container">
        <p className="kyc__step__2__input__label">Company Address</p>
        <input
          className="input__kycstep__2__placeholder"
          placeholder="Enter Company Name"
          name="companyAddress"
          value={formData.companyAddress || ""}
          onChange={handleInputChange}
          required
        />
      </div>
    
      <div className="kyc__step__2__input__container">
        <p className="kyc__step__2__input__label">URL</p>
        <input
          className="input__kycstep__2__placeholder"
          placeholder="Enter URL"
          name="URL"
          value={formData.URL || ""}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="kyc__step__2__input__container">
        <p className="kyc__step__2__input__label">Proof of Incorporation</p>
        <div className="proof__text__container">
          <input
            type="file"
            name="proofOfIncorporation"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <input
            className="extrdivforinput"
            value={
              formData?.proofOfIncorporation
                ? formData.proofOfIncorporation.split('/').pop().replace(/^\d+-/, '')
                : ""
            }
            readOnly
          />
          {/* <p
            style={{ color: selected ? "black" : "#919191" }}
            className="upload__document__placeholder"
          >
            {formData?.proofOfIncorporation}
          </p> */}
          <img
            src="/Images/Investor/uploadicon.svg"
            alt="Upload Icon"
            onClick={() => fileInputRef.current.click()}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <div className="kyc__step__2__input__container">
        <p className="kyc__step__2__input__label">Tax Identification Number</p>
        <input
          className="input__kycstep__2__placeholder"
          placeholder="Enter TIN"
          name="taxIdentificationNumber"
          value={formData.taxIdentificationNumber || ""}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="kyc__step_2__buttons_container">
        <button onClick={handleBack} className="kyc__step2__back__button">
          Back
        </button>
        <button onClick={handleNext} className="kyc__step2__next__button">
          Next Step
        </button>
      </div>
    </div>
  );
}

export default KycStep2;
