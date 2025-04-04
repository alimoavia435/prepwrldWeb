import React, { useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "./Step3.css";
import { useDispatch, useSelector } from "react-redux";
import { uploadfile } from "../../../services/redux/middleware/signin";

function PropertyAuthStep3({ formData, handleInputChange }) {
  const dispatch = useDispatch();
  const [bussinesimg, setbussinesimg] = useState(false);
  const [ultiamteimg, setultiamteimg] = useState(false);
  const [dotloading, setdotloading] = useState(false);
  const [dotloading1, setdotloading1] = useState(false);
  console.log(formData, "step2data");
  const businessLicenseRef = useRef(null);
  const ultimateBeneficalOwnerRef = useRef(null);
  const businessLicenseCertificate = localStorage.getItem("businessLicenseCertificate");
  const ultimateBeneficalOwner = localStorage.getItem("ultimateBeneficalOwner");
  const handleFileUploadbussiness = (event) => {
    const file = event.target.files[0];

    if (file) {
      setdotloading(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadfile(data)).then((res) => {
        console.log(res, "imagebussiness");
        if (res?.payload?.message === "Developer Image uploaded successfully.") {
          setbussinesimg(file?.name);
          localStorage.setItem("businessLicenseCertificate", file.name);
          console.log(res?.payload?.imageUrl, "url");
          handleInputChange({
            target: { name: "businessLicenseCertificate", value: res?.payload?.imageUrl },
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
        if (res?.payload?.message === "Developer Image uploaded successfully.") {
          setultiamteimg(file?.name);
          localStorage.setItem("ultimateBeneficalOwner", file.name);
          console.log(res?.payload?.imageUrl, "url");
          handleInputChange({
            target: { name: "ultimateBeneficalOwner", value: res?.payload?.imageUrl },
          });
          setdotloading1(false);
        }
        setdotloading1(false);
      });
    }
  };
  const handleIconClick = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  return (
    <div className="property__step3__main__container">
      <div className="property__step3__main__container1">
        <div className="step3__form__main__container">
          {/* Company Director Name */}
          <div className="step3__form__main__container1">
            <p className="step__3__form__label">Company Director Name</p>
            <input
              className="step-1_placeholder_1"
              name="companyDirectorName" // Ensure name matches the key in formData
              value={formData.companyDirectorName || ""}
              onChange={handleInputChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); 
              }}
              maxLength={18}
              placeholder="Enter Director Name"
            />
          </div>

          {/* Director ID */}
          <div className="step3__form__main__container1">
            <p className="step__3__form__label">Director ID</p>
            <input
              className="step-1_placeholder_1"
              name="directorId" // Ensure name matches the key in formData
              value={formData.directorId || ""}
              onChange={handleInputChange}
              placeholder="Enter Director ID"
            />
          </div>

          {/* Phone Number */}
          <div className="step3__form__main__container1">
            <p className="step__3__form__label">Phone Number</p>
            <PhoneInput
              className="phone-input-field"
              value={formData.dirPhone} // Bind value to formData.dirPhone
              onChange={(phone) =>
                handleInputChange({
                  target: { name: "dirPhone", value: phone }, // Manually trigger change event
                })
              }
              country={"us"}
              inputClass="phone-input"
              containerClass="phone-container"
              buttonClass="flag-button"
              dropdownClass="phone-dropdown"
              preferredCountries={["us", "gb", "ca", "au"]}
            />
          </div>

          {/* Business License/Certificate */}
          <div className="step3__form__main__container1">
            <p className="step__3__form__label">Business License/Certificate</p>
            <div className="step3__placeholder__container">
              <p className="upload__document__placeholder">
                {dotloading ? (
                  <div className="loader">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <>{bussinesimg ? bussinesimg :(businessLicenseCertificate ? businessLicenseCertificate: "Upload Business License")}</>
                )}
              </p>
              <img
                src="https://nclextc.com/Images/Investor/uploadicongray.svg"
                alt="Upload Icon"
                onClick={() => handleIconClick(businessLicenseRef)}
                style={{ cursor: "pointer" }}
              />
              <input type="file" ref={businessLicenseRef} style={{ display: "none" }} onChange={handleFileUploadbussiness} />
            </div>
          </div>

          {/* Ultimate Beneficial Owners */}
          <div className="step3__form__main__container1">
            <p className="step__3__form__label">Ultimate Beneficial Owners</p>
            <div className="step3__placeholder__container">
              <p className="upload__document__placeholder">
                {dotloading1 ? (
                  <div className="loader">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <>{ultiamteimg ? ultiamteimg :(ultimateBeneficalOwner ? ultimateBeneficalOwner : "Upload Document")}</>
                )}
              </p>
              <img
                src="https://nclextc.com/Images/Investor/uploadicongray.svg"
                alt="Upload Icon"
                onClick={() => handleIconClick(ultimateBeneficalOwnerRef)}
                style={{ cursor: "pointer" }}
              />
              <input type="file" ref={ultimateBeneficalOwnerRef} style={{ display: "none" }} onChange={handleFileUploadultimate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyAuthStep3;
