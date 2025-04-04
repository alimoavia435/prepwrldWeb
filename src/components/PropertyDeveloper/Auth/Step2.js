import React, { useState, useRef } from "react";
import "./Step2.css";
import Step3 from "./Step3";
import { useDispatch, useSelector } from "react-redux";
import { uploadfile } from "../../../services/redux/middleware/signin";

function PropertyAuthStep2({ formData, handleInputChange }) {
  const [selected, setSelected] = useState();
  const [selectedStep, setSelectedStep] = useState(1);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [dotloading, setdotloading] = useState(false);
  const [filename, setfilename] = useState();
  console.log(formData, "step1");
  const proofOfIncorporation = localStorage.getItem("proofOfIncorporation");
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setdotloading(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadfile(data)).then((res) => {
        console.log(res, "imageresponse");
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
      });
    }
  };

  return (
    <div className="property__auth__main__container">
      <div className="property__auth__main__container-2">
        <div className="step2__form__main__container">
          <div className="step2__form__main__container-1">
            <p className="step-2__form__label">Company Name</p>
            <input
              className="step-2_form_placeholder"
              type="text"
              name="companyName"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); 
              }}
              placeholder="Company Name"
              maxLength={18}
              value={formData.companyName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="step2__form__main__container-1">
            <p className="step-2__form__label">Registration Number</p>
            <input
              className="step-2_form_placeholder"
              type="text"
              name="registrationNumber"
              placeholder="Registration Number"
              value={formData.registrationNumber || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="step2__form__main__container-1">
            <p className="step-2__form__label">Company Address</p>
            <input
              className="step-2_form_placeholder"
              type="text"
              name="companyAddress"
              placeholder="Company Address"
              value={formData.companyAddress || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="step2__form__main__container-1">
            <p className="step-2__form__label">URL</p>
            <input
              className="step-2_form_placeholder"
              type="url"
              name="URL"
              placeholder="Company URL"
              value={formData.URL || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="step2__form__main__container-1">
            <p className="step-2__form__label">Proof of Incorporation</p>
            <div className="proof__text__container">
              {/* Invisible file input */}
              <input type="file" name="proofOfIncorporation" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileUpload} />
              <p className="upload__document__placeholder">
                {dotloading ? (
                  <div className="loader">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <>{filename ? filename : (proofOfIncorporation ? proofOfIncorporation : "Upload Document")}</>
                )}
              </p>
              {/* Custom upload icon */}
              <img
                src="https://nclextc.com/Images/Investor/uploadicon.svg"
                alt="Upload Icon"
                onClick={() => fileInputRef.current.click()} // Trigger the hidden input's click event
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="step2__form__main__container-1">
            <p className="step-2__form__label">Tax Identification Number</p>
            <input
              className="step-2_form_placeholder"
              type="number"
              name="taxIdentificationNumber"
              placeholder="Tax Identification Number"
              maxLength={18}
              value={formData.taxIdentificationNumber || ""}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyAuthStep2;
