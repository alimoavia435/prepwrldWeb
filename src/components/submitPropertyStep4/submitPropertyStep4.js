import React, { useRef, useState } from "react";
import "./submitPropertyStep4.css";
import { useDispatch } from "react-redux";
import { uploadfile } from "../../services/redux/middleware/signin";
import { SubmitPropertyModal } from "../Modals/SubmitPropertyModal";
import { addProperty } from "../../services/redux/middleware/addProperty";
import { toast } from "react-toastify";
import ScreenLoader from "../loader/ScreenLoader";
import Dropdown from "react-bootstrap/Dropdown";

function SubmitPropertyStep4({ setSelectedStep, formData, handleInputChange }) {
  console.log(formData, "akhristep");
  const [dotloading, setdotloading] = useState(false);
  const [dotloading1, setdotloading1] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const [selectedROIPeriod, setselectedROIPeriod] =
    useState("Select ROI Period");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const proofOfOwnershipref = useRef(null);
  const projectRefNumberRef = useRef(null);
  const [proofOfOwnershipimg, setproofOfOwnershipimg] = useState(false);
  const [projectRefNumberimg, setprojectRefNumberimg] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleDropdown = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };

  const handleNextClick = () => {
    if (!formData.ROIPercentage || !formData.ROIPeriod ||
      !formData.numberOfFraction ||
      !formData.fractionPrice 
    ) {
      toast.error("Please fill in all required fields of step2");
      return;
    }
    setSelectedStep(3);
  };
  const handleBackClick = () => {
    setSelectedStep(3);
  };

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };
  const [propid, setpropid] = useState();
  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const fileInputRefs = {
    proofOfOwnership: useRef(null),
    projectReferenceNumber: useRef(null),
  };

  const [files, setFiles] = useState({
    proofOfOwnership: "",
    projectReferenceNumber: "",
  });

  const handleFileUpload = (event, fileType) => {
    const file = event.target.files[0];
    if (file) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [fileType]: file.name,
      }));
    }
  };

  const handleFileUploadproof = (event) => {
    const file = event.target.files[0];

    if (file) {
      setdotloading(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadfile(data)).then((res) => {
        console.log(res, "imggg");
        if (
          res?.payload?.message === "Developer Image uploaded successfully."
        ) {
          setproofOfOwnershipimg(file?.name);
          localStorage.setItem("proofOfOwnership", file.name);
          console.log(res?.payload?.imageUrl, "url");
          handleInputChange({
            target: {
              name: "proofOfOwnership",
              value: res?.payload?.imageUrl,
            },
          });

          setdotloading(false);
        }
        setdotloading(false);
      });
    }
  };
  const handleFileUploadRefernce = (event) => {
    const file = event.target.files[0];

    if (file) {
      setdotloading1(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadfile(data)).then((res) => {
        console.log(res, "imagebussiness");
        if (
          res?.payload?.message === "Developer Image uploaded successfully."
        ) {
          setprojectRefNumberimg(file?.name);
          localStorage.setItem("projectRefNumber", file.name);
          console.log(res?.payload?.imageUrl, "url");
          handleInputChange({
            target: {
              name: "projectRefNumber",
              value: res?.payload?.imageUrl,
            },
          });

          setdotloading1(false);
        }
        setdotloading1(false);
      });
    }
  };

  const handleSelect = (eventKey) => {
    setselectedROIPeriod(eventKey);
    handleInputChange({
      target: {
        name: "ROIPeriod",
        value: eventKey,
      },
    });
  };


  const handleSubmitClick = () => {
    setLoading(true); // Start loading
    dispatch(addProperty(formData))
      .then((res) => {
        console.log(res, "response add property");
        if (
          res?.payload?.message === "Property created successfully and hashed"
        ) {
          toast.success("Property created successfully");
          console.log(res?.payload?.property?._id, "us prop id");
          setpropid(res?.payload?.property?._id);
          setModalShow(true);
        } else {
          toast.error("Can't add property right now");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error adding property:", error);
        toast.error("An unexpected error occurred");
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <ScreenLoader />}
      <div className="submit__property__step4__main__container">
        {/* <div className="submit__property__step4__main__container_1">
          <div className="submit__property__step4__main__container_2">
            <div className="submit__property__step4__form__container_2">
              <div className="submit__property__step4__form__container_1">
                <p className="submit__property__step4__form__label">
                  Proof of Ownership
                </p>
                <div className="proof__text__container__kyc">
                  <input
                    type="file"
                    ref={proofOfOwnershipref}
                    style={{ display: "none" }}
                    onChange={handleFileUploadproof}
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
                          formData?.proofOfOwnership
                            ? formData.proofOfOwnership
                                .split("/")
                                .pop()
                                .replace(/^\d+-/, "")
                            : "Upload proofOfOwnership"
                        }
                        readOnly
                      />
                    </>
                  )}
                  <img
                    src="/Images/Investor/uploadicon.svg"
                    alt="Upload Icon"
                    onClick={() => proofOfOwnershipref.current.click()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
              <div className="submit__property__step4__form__container_1">
                <p className="submit__property__step4__form__label">
                  Project Reference Number
                </p>
                <div className="proof__text__container__kyc">
                  <input
                    type="file"
                    ref={projectRefNumberRef}
                    style={{ display: "none" }}
                    onChange={handleFileUploadRefernce}
                  />
                  {dotloading1 ? (
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
                          formData?.projectRefNumber
                            ? formData.projectRefNumber
                                .split("/")
                                .pop()
                                .replace(/^\d+-/, "")
                            : "Upload projectRefNumber"
                        }
                        readOnly
                      />
                    </>
                  )}
                  <img
                    src="/Images/Investor/uploadicon.svg"
                    alt="Upload Icon"
                    onClick={() => projectRefNumberRef.current.click()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
            <div className="checkbox__text__heading__step4_container">
              <div onClick={handleToggle} style={{ cursor: "pointer" }}>
                <img
                  src={
                    isChecked
                      ? "/Images/home/check.svg"
                      : "/Images/home/uncheck.svg"
                  }
                  alt={isChecked ? "Checked" : "Unchecked"}
                  style={{ width: "24px", height: "24px" }}
                />
              </div>
              <p className="checkbox__text__heading__step4">
                By submitting this information, you agree to the{" "}
                <span className="underline-text">Terms & Services</span> of the
                Evox Platform.
              </p>
            </div>
          </div>
        </div> */}
        <div className="submit__property__step__2__main__container__1">
          <div className="submit__property__step__2__form__container__1">
            <div className="submit__property__step__2__form__container__2">
              <p className="submit__property__step__2___form__label">
                Fractions
              </p>
              <input
                placeholder="Enter Price"
                type="text"
                className="submit__property__step__2___form__placeholder"
                name="numberOfFraction"
                value={formData.numberOfFraction}
                onChange={handleInputChange}
              />
            </div>
            <div className="submit__property__step__2__form__container__2">
              <p className="submit__property__step__2___form__label">
                Price per fraction
              </p>
              <input
                placeholder="Enter the Price per fraction"
                type="text"
                className="submit__property__step__2___form__placeholder"
                name="fractionPrice"
                value={formData.fractionPrice}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="submit__property__step__2__form__container__1">
            <div className="submit__property__step__2__form__container__2">
              <p className="submit__property__step__2___form__label">
                ROI Percentage
              </p>
              <input
                placeholder="Enter Price"
                type="number"
                className="submit__property__step__2___form__placeholder1"
                name="ROIPercentage"
                value={formData.ROIPercentage || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="submit__property__step__2__form__container__2">
              <p className="submit__property__step__2___form__label">
                ROI Period
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
                        selectedROIPeriod !== "Select ROI Period"
                          ? "#000"
                          : "#919191",
                    }}
                  >
                    {selectedROIPeriod}
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
                    eventKey="Monthly"
                  >
                    Monthly
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="projectcategory-dropdown-menu__text"
                    eventKey="Yearly"
                  >
                    Yearly
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <input
              placeholder="Enter Reference Number"
              type="number"
              className="submit__property__step__2___form__placeholder1"
              name="ROIPercentage"
              value={formData.ROIPercentage || ""}
              onChange={handleInputChange}
            /> */}
            </div>
          </div>
          <div className="checkbox__text__heading__step4_container">
            <div onClick={handleToggle} style={{ cursor: "pointer" }}>
              <img
                src={
                  isChecked
                    ? "/Images/home/check.svg"
                    : "/Images/home/uncheck.svg"
                }
                alt={isChecked ? "Checked" : "Unchecked"}
                style={{ width: "24px", height: "24px" }}
              />
            </div>
            <p className="checkbox__text__heading__step4">
              By submitting this information, you agree to the{" "}
              <span className="underline-text">Terms & Services</span> of the
              Evox Platform.
            </p>
          </div>
        </div>
        <div className="kyc__step_3__buttons_container">
          <button
            onClick={handleBackClick}
            className="kyc__step3__back__button"
          >
            Back
          </button>
          <button
            onClick={handleSubmitClick}
            className="kyc__info__profile__submit__button"
          >
            Submit
          </button>
        </div>
        {/* <button
          onClick={handleSubmitClick}
          className="kyc__info__profile__submit__button"
        >
          Submit
        </button> */}
        <SubmitPropertyModal
          show={modalShow}
          handleClose={handleClose}
          propid={propid}
        />
      </div>
    </>
  );
}

export default SubmitPropertyStep4;
