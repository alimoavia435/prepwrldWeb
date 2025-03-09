import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./kycStep1.css";
function KycStep1({ formData, handleInputChange, setSelectedStep }) {



  const handleSubmit = () => {
    setSelectedStep(2);
  };
  return (
    <div className="kyc__step__1_main__container">
      <div className="kyc__step__1__input_container">
        <p className="kyc__step__1__input">Full Name</p>
        <input
          className="input__kyc__placeholder"
          placeholder="Enter Full Name"
          name="fullName"

          value={formData.fullName}
          onChange={handleInputChange}
        />
      </div>
      <div className="kyc__step__1__input_container">
        <p className="kyc__step__1__input">Email</p>
        <input className="input__kyc__placeholder" placeholder="Enter Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="kyc__step__1__input_container">
        <p className="kyc__step__1__input">
          National ID/Passport/ Driving License
        </p>
        <input
          className="input__kyc__placeholder"
          name="legalId"
          placeholder="Enter National ID/Passport/ Driving License"
          value={formData.legalId}
          onChange={handleInputChange}
        />
      </div>
      <div className="kyc__step__1__input_container">
        <p className="kyc__step__1__input">
          Phone Number
        </p>
        <PhoneInput
          className="phone-input-field"
          country={"us"}
          value={formData.phoneNumber}
          onChange={(phone) =>
            handleInputChange({
              target: { name: "phoneNumber", value: phone }, // Manually trigger change event
            })
          }
          inputClass="phone-input"
          containerClass="phone-container"
          buttonClass="flag-button"
          dropdownClass="phone-dropdown"
          preferredCountries={["us", "gb", "ca", "au"]}
        />
      </div>
      <button onClick={handleSubmit} className="kyc__step_1_next_step1_button">
        Next Step
      </button>
    </div>
  );
}

export default KycStep1;
