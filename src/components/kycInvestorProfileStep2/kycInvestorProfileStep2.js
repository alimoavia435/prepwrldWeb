import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap styles are included
import "./kycInvestorProfileStep2.css";
import { toast } from "react-toastify";
function KycInvestorProfileStep2({ setSelectedStep, formData, handleInputChange }) {
  const [selectedGoal, setSelectedGoal] = useState(formData.investmentGoals || "Select Goals");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  console.log("first step data",formData);
  const toggleDropdown = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };
  const handleSelect = (eventKey) => {
    setSelectedGoal(eventKey);
    handleInputChange({
      target: {
        name: "investmentGoals",
        value:eventKey ,
      },
    });
  };
  const handleNextClick = () => {
    if (
      !formData.Street ||
      !formData.City ||
      !formData.State ||
      !formData.Country ||
      !formData.postalCode ||
      !formData.language ||
      !formData.investmentGoals 
    ) {
      toast.error("Please enter all fields of Step 2");
      return;
    }
    setSelectedStep(3);
  };
  const HandleBackClick = () => {
    setSelectedStep(1);
  };

  return (
    <div>
      <div className="kyc__investor__profilestep2__main__container">
        <div className="kyc__investor__profilestep2__form__container">
          <div className="kyc__investor__profilestep2__form__container1">
            <div className="kyc__investor__profilestep2__input__container1">
              <p className="kyc__investor__profilestep2__input__label">
                Street
              </p>
              <input
                className="kyc__investor__profilestep2__input__field"
                type="text"
                placeholder="Enter Street"
                name="Street"
                value={formData.Street}
                onChange={handleInputChange}
              />
            </div>
            <div className="kyc__investor__profilestep2__input__container1">
              <p className="kyc__investor__profilestep2__input__label">City</p>
              <input
                className="kyc__investor__profilestep2__input__field"
                type="text"
                placeholder="Enter City"
                value={formData.City}
                name="City"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="kyc__investor__profilestep2__form__container1">
            <div className="kyc__investor__profilestep2__input__container1">
              <p className="kyc__investor__profilestep2__input__label">State</p>
              <input
                className="kyc__investor__profilestep2__input__field"
                type="text"
                placeholder="Enter State"
                name="State"
                value={formData.State}
                onChange={handleInputChange}
              />
            </div>
            <div className="kyc__investor__profilestep2__input__container1">
              <p className="kyc__investor__profilestep2__input__label">
                Country
              </p>
              <input
                className="kyc__investor__profilestep2__input__field"
                type="text"
                placeholder="Enter Country"
                value={formData.Country}
                name="Country"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="kyc__investor__profilestep2__form__container1">
            <div className="kyc__investor__profilestep2__input__container1">
              <p className="kyc__investor__profilestep2__input__label">
                Postal Code
              </p>
              <input
                className="kyc__investor__profilestep2__input__field"
                type="text"
                placeholder="Enter Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="kyc__investor__profilestep2__input__container1">
              <p className="kyc__investor__profilestep2__input__label">
                Preferred Language
              </p>
              <input
                className="kyc__investor__profilestep2__input__field"
                type="text"
                placeholder="Enter Preferred Language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="kyc__investor__profilestep2__form__container1">
            <div className="kyc__investor__profilestep2__input__container1">
              <p className="kyc__investor__profilestep2__input__label">
                Investment Goals
              </p>
              <Dropdown
                onToggle={(isOpen) => toggleDropdown(isOpen)}
                onSelect={handleSelect}
              >
                <Dropdown.Toggle
                  style={{ background: "white", border: "1px solid #cdcdcd " }}
                  className="projectcategory-dropdown-toggle"
                >
                  <span
                    style={{
                      color:
                        selectedGoal !== "Select Goals" ? "#000" : "#919191",
                    }}
                  >
                    {selectedGoal}
                  </span>
                  <img
                    src="/Images/Investor/dropdown.svg"
                    alt="dropdownIcon"
                    className={`dropdown-custom-icon ${
                      isDropdownOpen ? "rotate-icon" : ""
                    }`}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="projectcategory-dropdown-menu">
                  <Dropdown.Item
                    className="projectcategory-dropdown-menu__text"
                    eventKey="Retirement Savings"
                  >
                    Retirement Savings
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="projectcategory-dropdown-menu__text"
                    eventKey="Wealth Growth"
                  >
                    Wealth Growth
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="projectcategory-dropdown-menu__text"
                    eventKey="Real Estate"
                  >
                    Real Estate
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <div className="kyc__info__stepsprofile__button__container_investor">
        <button
          onClick={HandleBackClick}
          className="kycinfo__step2__back__button"
        >
          Back
        </button>
        <button
          onClick={handleNextClick}
          className="kycinfo__step2__next__button"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

export default KycInvestorProfileStep2;
