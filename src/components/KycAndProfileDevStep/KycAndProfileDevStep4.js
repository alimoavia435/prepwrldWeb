import React, { useState } from "react";
import "./kycInfoPrfileStep4.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addProfile } from "../../services/redux/middleware/addProfile";
import ScreenLoader from "../loader/ScreenLoader";
import KycAndProfileModal from "../Modals/kycAndProfileModal";
function KycAndProfileDevStep4({
  formData,
  handleInputChange,
  setSelectedStep,
}) {
  console.log("3rd step data", formData);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("Select Goals");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const investerkycapproval = localStorage.getItem("investerkycapproval");

  const toggleDropdown = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };

  const handleSelect = (eventKey) => {
    setSelectedGoal(eventKey);
  };
  const handleSignupClick = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.DateOfBirth ||
      !formData.origin ||
      !formData.Street ||
      !formData.City ||
      !formData.State ||
      !formData.Country ||
      !formData.postalCode ||
      !formData.language ||
      !formData.investmentGoals ||
      !formData.authlegalId ||
      !formData.proofOfIdFront ||
      !formData.proofOfIdBack ||
      !formData.proofOfAddress ||
      !formData.taxIdentificationNumber ||
      !formData.sourceOfFunds ||
      !formData.selfieWithId
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    console.log(formData, "data before dispatching");

    dispatch(addProfile(formData))
      .then((res) => {
        setLoading(false);
        console.log(res, "add profile data");

        if (
          res?.payload?.msg ===
          "Investor details updated successfully and sent for KYC."
        ) {
          toast.success("KYC Details Updated Successfully To Admin");
          localStorage.removeItem("proofOfIdFront");
          localStorage.removeItem("proofOfIdBack");
          localStorage.removeItem("sourceOfFunds");
          localStorage.removeItem("selfieWithId");
          localStorage.removeItem("POAInvestorProfile");
          localStorage.setItem(
            "investerkycapproval",
            res?.payload?.investor?.developerKYC
          );
          setShowModal(true);
          setTimeout(() => {
            setShowModal(false);
            navigate("/investor-profile");
          }, 3000);
        } else {
          toast.error(
            "Failed to update investor kyc details. Please try again."
          );
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("An error occurred while updating investor details.");
      });
  };

  return (
    <>
      {isLoading && <ScreenLoader />}
      <div className="kyc__info__profile__step4__main___container">
        <div className="kyc__info__profile__step4__main___container1">
          <div className="kyc__info__profile__step4__form___container1">
            <div className="kyc__info__profile__step4__form___container2">
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">Full Name</p>
                <input
                  className="kyc__investor__profilestep4__input__field"
                  type="text"
                  name="fullName"
                  placeholder="Enter Full Name"
                  value={formData.fullName}
                  readOnly
                />
              </div>
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">Email</p>
                <input
                  className="kyc__investor__profilestep4__input__field"
                  type="text"
                  placeholder="Enter Email"
                  value={formData.email}
                  readOnly
                />
              </div>
            </div>
            <div className="kyc__info__profile__step4__form___container2">
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">Phone Number</p>
                <PhoneInput
                  className="phone-input-field"
                  country={"us"}
                  inputClass="phone-input"
                  containerClass="phone-container"
                  buttonClass="flag-button"
                  value={formData?.phoneNumber}
                  dropdownClass="phone-dropdown"
                  preferredCountries={["us", "gb", "ca", "au"]}
                />
              </div>
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">
                  Date of Birth
                </p>
                <input
                  className="kyc__investor__profilestep4__input__field"
                  type="text"
                  placeholder="Enter Date of Birth"
                  value={formData.DateOfBirth}
                  readOnly
                />
              </div>
            </div>
            <div className="kyc__info__profile__step4__form___container2">
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">Nationality</p>
                <input
                  className="kyc__investor__profilestep4__input__field"
                  type="text"
                  placeholder="Enter Nationality"
                  value={formData.origin}
                  readOnly
                />
              </div>
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">Street</p>
                <input
                  className="kyc__investor__profilestep4__input__field"
                  type="text"
                  placeholder="Enter Street"
                  value={formData.Street}
                  readOnly
                />
              </div>
            </div>
            <div className="kyc__info__profile__step4__form___container2">
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">City</p>
                <input
                  className="kyc__investor__profilestep4__input__field"
                  type="text"
                  placeholder="Enter City"
                  value={formData.City}
                  readOnly
                />
              </div>
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">State</p>
                <input
                  className="kyc__investor__profilestep4__input__field"
                  type="text"
                  placeholder="Enter State"
                  value={formData.State}
                  readOnly
                />
              </div>
            </div>
            <div className="kyc__info__profile__step4__form___container2">
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">Country</p>
                <input
                  className="kyc__investor__profilestep4__input__field"
                  type="text"
                  placeholder="Enter Country"
                  value={formData.Country}
                  readOnly
                />
              </div>
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">Postal Code</p>
                <input
                  className="kyc__investor__profilestep4__input__field"
                  type="number"
                  placeholder="Enter Postal Code"
                  value={formData.postalCode}
                  readOnly
                />
              </div>
            </div>
            <div className="kyc__info__profile__step4__form___container2">
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">
                  Preferred Language
                </p>
                <input
                  className="kyc__investor__profilestep4__input__field"
                  type="text"
                  placeholder="Enter Preferred Language"
                  value={formData.language}
                  readOnly
                />
              </div>
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">
                  Investment Goals
                </p>
                {/* <Dropdown
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
                    className={`dropdown-custom-icon ${isDropdownOpen ? "rotate-icon" : ""
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
              </Dropdown> */}
                <input
                  className="kyc__investor__profilestep4__input__field"
                  type="text"
                  placeholder="Enter National ID/Passport/ Driving License"
                  value={formData.investmentGoals}
                  readOnly
                />
              </div>
            </div>
            <div className="kyc__info__profile__step4__form___container2">
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">
                  National ID/Passport/ Driving License
                </p>
                <input
                  className="kyc__investor__profilestep4__input__field"
                  type="text"
                  placeholder="Enter National ID/Passport/ Driving License"
                  value={formData.authlegalId}
                  readOnly
                />
              </div>
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">
                  Government ID{" "}
                  <span className="optional__kyc__text">(Front)</span>
                </p>
                <input
                  className="kyc__investor__profilestep4__input__field"
                  type="text"
                  placeholder="Enter Government ID"
                  value={formData.proofOfIdFront.split("/").pop()}
                  readOnly
                />
              </div>
            </div>
            <div className="kyc__info__profile__step4__form___container2">
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">
                  Government ID{" "}
                  <span className="optional__kyc__text">(Back) </span>
                </p>
                <input
                  className="kyc__investor__profilestep4__input__field"
                  type="text"
                  placeholder="Enter Government ID"
                  value={formData.proofOfIdBack.split("/").pop()}
                  readOnly
                />
              </div>
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">
                  Proof of Address
                </p>
                <input
                  className="kyc__investor__profilestep4__input__field"
                  type="text"
                  placeholder="Enter Proof of Address"
                  value={formData.proofOfAddress.split("/").pop()}
                  readOnly
                />
              </div>
            </div>
            <div className="kyc__info__profile__step4__form___container2">
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">
                  Tax Identification Number
                </p>
                <input
                  className="kyc__investor__profilestep4__input__field"
                  type="text"
                  placeholder="Enter TIN"
                  value={formData.taxIdentificationNumber}
                  readOnly
                />
              </div>
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">
                  Source of Funds Declaration
                </p>
                <input
                  className="kyc__investor__profilestep4__input__field"
                  type="text"
                  placeholder="Enter Source of Funds Declaration"
                  value={formData.sourceOfFunds.split("/").pop()}
                  readOnly
                />
              </div>
            </div>
            <div className="kyc__info__profile__step4__form___container2">
              <div className="kyc__info__profile__step4__input___container">
                <p className="kyc__info__profile__step4__input">
                  Selfie With ID
                </p>
                <input
                  className="kyc__investor__profilestep4__input__field"
                  type="text"
                  placeholder="Enter Selfie With ID"
                  value={formData.selfieWithId.split("/").pop()}
                  readOnly
                />
              </div>
              <div className="kyc__info__profile__step4__input___container"></div>
            </div>
          </div>
        </div>
        <button
          onClick={handleSignupClick}
          className="kyc__info__profile__submit__button"
          disabled={
            investerkycapproval === "pending" ||
            investerkycapproval === "accepted"
          }
          style={{
            opacity:
              investerkycapproval === "pending" ||
              investerkycapproval === "accepted"
                ? "0.6"
                : "1",
          }}
        >
          {investerkycapproval === "pending"
            ? "Request Pending"
            : investerkycapproval === "accepted"
            ? "Kyc Accepted"
            : "Submit"}
        </button>

        <KycAndProfileModal
          show={showModal}
          handleClose={() => {
            setShowModal(false);
          }}
        />
      </div>
    </>
  );
}

export default KycAndProfileDevStep4;
