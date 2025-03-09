import React, { useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import { uploadfile } from "../../../services/redux/middleware/signin";
import "react-phone-input-2/lib/style.css";
import "./kycStep3.css";
import { useDispatch } from "react-redux";
function KycStep3({ setSelectedStep, formData, handleInputChange }) {
  const businessLicenceRef = useRef(null);
  const ultimateBeneficialOwnersRef = useRef(null);
  const dispatch = useDispatch();
  const [bussinesimg, setbussinesimg] = useState(false);
  const [ultiamteimg, setultiamteimg] = useState(false);
  const [dotloading, setdotloading] = useState(false);
  const [dotloading1, setdotloading1] = useState(false);
  console.log("formDatastepkyc2", formData);

  const handleFileUploadbussiness = (event) => {
    const file = event.target.files[0];

    if (file) {
      setdotloading(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadfile(data)).then((res) => {
        console.log(res, "imagebussiness");
        if (
          res?.payload?.message === "Developer Image uploaded successfully."
        ) {
          setbussinesimg(file?.name);
          localStorage.setItem("businessLicenseCertificate", file.name);
          console.log(res?.payload?.imageUrl, "url");
          handleInputChange({
            target: {
              name: "businessLicenseCertificate",
              value: res?.payload?.imageUrl,
            },
          });

          setdotloading(false);
        }
        setdotloading(false);
      });
    }
  };

  const handleFileUploadultimate = (event) => {
    const file = event.target.files[0];

    if (file) {
      setdotloading1(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadfile(data)).then((res) => {
        console.log(res, "imageultimate");
        if (
          res?.payload?.message === "Developer Image uploaded successfully."
        ) {
          setultiamteimg(file?.name);
          localStorage.setItem("ultimateBeneficalOwner", file.name);
          console.log(res?.payload?.imageUrl, "url");
          handleInputChange({
            target: {
              name: "ultimateBeneficalOwner",
              value: res?.payload?.imageUrl,
            },
          });
          setdotloading1(false);
        }
        setdotloading1(false);
      });
    }
  };

  const handleFileUpload = (event, setFileState) => {
    const file = event.target.files[0];
    if (file) {
      setFileState(file.name);
      console.log("File uploaded:", file.name);
    }
  };
  const handleNext = () => {
    setSelectedStep(4);
  };
  const handleBack = () => {
    setSelectedStep(2);
  };
  return (
    <div className="kyc__step3__main__container">
      <div className="kyc__step3__input__main__container">
        <p className="kyc__step3__input__label">Company Director Name</p>
        <input
          className="input__kycstep__3__placeholder"
          placeholder="Enter Company Director Name"
          name="companyDirectorName" // Ensure name matches the key in formData
          value={formData.companyDirectorName || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="kyc__step3__input__main__container">
        <p className="kyc__step3__input__label">Director ID</p>
        <input
          className="input__kycstep__3__placeholder"
          placeholder="Enter Director ID"
          name="directorId"
          value={formData.directorId || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="kyc__step3__input__main__container">
        <p className="kyc__step3__input__label">Phone Number</p>
        <PhoneInput
          className="phone-input-field"
          country={"us"}
          inputClass="phone-input"
          containerClass="phone-container"
          buttonClass="flag-button"
          value={formData.dirPhone}
          onChange={(phone) =>
            handleInputChange({
              target: { name: "dirPhone", value: phone },
            })
          }
          dropdownClass="phone-dropdown"
          preferredCountries={["us", "gb", "ca", "au"]}
        />
      </div>
      <div className="kyc__step3__input__main__container">
        <p className="kyc__step3__input__label">Business License/Certificate</p>
        <div className="proof__text__container">
          <input
            type="file"
            name="businessLicence"
            ref={businessLicenceRef}
            style={{ display: "none" }}
            onChange={handleFileUploadbussiness}
          />

          {dotloading ? (
            <p className="upload__document__placeholder">
              <div className="loader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </p>
          ) : (
            <>
              <input
                className="extrdivforinput"
                value={
                  formData?.businessLicenseCertificate
                    ? formData.businessLicenseCertificate
                        .split("/")
                        .pop()
                        .replace(/^\d+-/, "")
                    : ""
                }
                readOnly
              />
            </>
          )}

          <img
            src="/Images/Investor/uploadicon.svg"
            alt="Upload Icon"
            onClick={() => businessLicenceRef.current.click()}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <div className="kyc__step3__input__main__container">
        <p className="kyc__step3__input__label">Ultimate Beneficial Owners</p>
        <div className="proof__text__container">
          <input
            type="file"
            name="ultimateBeneficialOwners"
            ref={ultimateBeneficialOwnersRef}
            style={{ display: "none" }}
            onChange={handleFileUploadultimate}
          />
          {/* <p className="upload__document__placeholder">
            {dotloading1 ? (
              <div className="loader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <>

                {formData?.ultimateBeneficalOwner}
              </>
            )}
          </p> */}

          {dotloading ? (
            <p className="upload__document__placeholder">
              <div className="loader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </p>
          ) : (
            <>
              <input
                className="extrdivforinput"
                value={
                  formData?.ultimateBeneficalOwner
                    ? formData.ultimateBeneficalOwner
                        .split("/")
                        .pop()
                        .replace(/^\d+-/, "")
                    : ""
                }
                readOnly
              />
            </>
          )}

          <img
            src="/Images/Investor/uploadicon.svg"
            alt="Upload Icon"
            onClick={() => ultimateBeneficialOwnersRef.current.click()}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <div className="kyc__step_3__buttons_container">
        <button onClick={handleBack} className="kyc__step3__back__button">
          Back
        </button>
        <button onClick={handleNext} className="kyc__step3__next__button">
          Next Step
        </button>
      </div>
    </div>
  );
}

export default KycStep3;
