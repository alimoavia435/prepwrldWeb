import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import { signup } from "../../../services/redux/middleware/signin";
import ScreenLoader from "../../loader/ScreenLoader";
import "react-phone-input-2/lib/style.css";
import "./Step4.css";
function PropertyAuthStep4({ formData }) {
  const navigate = useNavigate();
  const [isLoading,setLoading]=useState(false)
  const [selectedStep, setSelectedStep] = useState(1);
  const [selected, setSelected] = useState("Investor");
  const fileInputRef = useRef(null);

  console.log(formData, "step3data");

  const dispatch = useDispatch();
  const proofOfIncorporation = localStorage.getItem("proofOfIncorporation");
  const businessLicenseCertificate = localStorage.getItem("businessLicenseCertificate");
  const ultimateBeneficalOwner = localStorage.getItem("ultimateBeneficalOwner");

  console.log(proofOfIncorporation);

  const handleLoginClick = () => {
    navigate("/SignIn");
  };

  const handleSignupClick = () => {
    if (
      !formData.fullName ||
      !formData.legalId ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.companyName ||
      !formData.registrationNumber ||
      !formData.companyAddress ||
      !formData.URL ||
      !formData.proofOfIncorporation ||
      !formData.taxIdentificationNumber ||
      !formData.companyDirectorName ||
      !formData.directorId ||
      !formData.dirPhone ||
      !formData.businessLicenseCertificate ||
      !formData.ultimateBeneficalOwner
    ) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    console.log(formData, "data before dispatching");

    // const formDataToSend = new FormData();

    // Object.keys(formData).forEach((key) => {
    //   formDataToSend.append(key, formData[key]);
    // });
    // console.log("FormData to be sent:");
    // for (let pair of formDataToSend.entries()) {
    //   console.log(`${pair[0]}:`, pair[1]);
    // }
    dispatch(signup(formData)).then((res) => {
      setLoading(false);
      console.log(res, "response");
      if (res?.payload?.status === 201) {
        toast.success("Property developer registered successfully, Code Sent");
        localStorage.removeItem("proofOfIncorporation");
        localStorage.removeItem("businessLicenseCertificate");
        localStorage.removeItem("ultimateBeneficalOwner");
        navigate(`/verifyaccountdeveloper/${formData?.email}`)
      }
      else if(res?.payload?.status===400){
        toast.error("User Already Exists");
      }
      else {
        toast.error("An unexpected error occurred");
      }
    })
    .catch((err) => {
      setLoading(false); 
      console.error(err);
      toast.error("An error occurred during registration");
    });
  };



  return (
    <>
    {isLoading && <ScreenLoader />}
    <div className="property__step4__main__container">
      <div className="property__step4__main__container-1">
        <div className="step4__form__main_container">
          <div className="step4__form__main_container2">
            <p className="step4_form_label">Full Name</p>
            <input
              className="step4__placeholder"
              type="text"
              name="fullName"
              value={formData.fullName}
              readOnly
              placeholder="Full Name"

            />
          </div>
          <div className="step4__form__main_container2">
            <p className="step4_form_label">
              National ID/Passport/ Driving License
            </p>
            <input
              className="step4__placeholder"
              type="text"
              name="legalId"
              value={formData.legalId}
              readOnly
              placeholder="Legal ID"

            />
          </div>
          {/* <div className="step4__form__main_container2">
            <p className="step4_form_label">Phone Number</p>
            <PhoneInput
              className="phone-input-field"
              country={"us"}
              inputClass="phone-input"
              value={formData.phoneNumber}

              containerClass="phone-container"
              buttonClass="flag-button"
              dropdownClass="phone-dropdown"
              preferredCountries={["us", "gb", "ca", "au"]}
            />
          </div> */}
          <div className="step4__form__main_container2">
            <p className="step4_form_label">Your Email</p>
            <input
              className="step4__placeholder"
              type="email"
              name="email"
              value={formData.email}
              readOnly
              placeholder="Email"

            />
          </div>
          <div className="step4__form__main_container2">
            <p className="step4_form_label">Company Name</p>
            <input
              className="step4__placeholder"
              type="text"
              name="companyName"
              value={formData.companyName}
              readOnly
              placeholder="Company Name"

            />
          </div>
          <div className="step4__form__main_container2">
            <p className="step4_form_label">Registration Number</p>
            <input
              className="step4__placeholder"
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              readOnly
              placeholder="Registration Number"

            />
          </div>
          <div className="step4__form__main_container2">
            <p className="step4_form_label">Company Address</p>
            <input
              className="step4__placeholder"
              type="text"
              placeholder="Enter Company Address"
              value={formData.companyAddress}
              readOnly
            />
          </div>
          <div className="step4__form__main_container2">
            <p className="step4_form_label">URL</p>
            <input
              className="step4__placeholder"
              type="text"
              placeholder="Enter URL"
              value={formData.URL}
              readOnly
            />
          </div>
          <div className="step4__form__main_container2">
            <p className="step4_form_label">Director Phone</p>
            <input
              className="step4__placeholder"
              type="text"
              placeholder="Director Phone Number"
              value={formData.dirPhone}
              readOnly
            />
          </div>
          <div className="step4__form__main_container2">
            <p className="step4_form_label">Proof of Incorporation</p>
            <input
              className="step4__placeholder"
              type="text"
              placeholder="Enter Proof of Incorporation"
              value={proofOfIncorporation ? proofOfIncorporation : "loading image name.."}
              readOnly
            />
          </div>
          <div className="step4__form__main_container2">
            <p className="step4_form_label">Tax Identification Number</p>
            <input
              className="step4__placeholder"
              type="text"
              placeholder="Enter Tax Identification Number"
              value={formData.taxIdentificationNumber}
              readOnly
            />
          </div>
          <div className="step4__form__main_container2">
            <p className="step4_form_label">Company Director Name</p>
            <input
              className="step4__placeholder"
              type="text"
              name="companyDirectorName"
              placeholder="Company Director Name"
              value={formData.companyDirectorName}
              readOnly

            />
          </div>
          <div className="step4__form__main_container2">
            <p className="step4_form_label">Director ID</p>
            <input
              className="step4__placeholder"
              type="text"
              name="directorId"
              value={formData.directorId}
              readOnly
              placeholder="Director ID"

            />
          </div>
          <div className="step4__form__main_container2">
            <p className="step4_form_label">Phone Number</p>
            <input
              className="step4__placeholder"
              // country={"us"}
              inputClass="phone-input"
              value={formData.phoneNumber}
              readOnly
            // containerClass="phone-container"
            // buttonClass="flag-button"
            // dropdownClass="phone-dropdown"
            // preferredCountries={["us", "gb", "ca", "au"]}
            />
          </div>
          <div className="step4__form__main_container2">
            <p className="step4_form_label">Business License/Certificate</p>
            <input
              className="step4__placeholder"
              name="businessLicenseCertificate"
              readOnly
              value={businessLicenseCertificate ? businessLicenseCertificate : "loading businessLicense.."}
              placeholder="Business License Certificate"
            />
          </div>
          <div className="step4__form__main_container2">
            <p className="step4_form_label">Ultimate Beneficial Owners</p>
            <input
              className="step4__placeholder"
              type="text"
              name="ultimateBeneficalOwner"
              value={ultimateBeneficalOwner ? ultimateBeneficalOwner : "loading BeneficalOwner.."}
              readOnly
              placeholder="Ultimate Beneficial Owner"

            />
          </div>
        </div>
        {/* <div onClick={handleSignupClick}>
          <button className="step_4_started_button">Get Started</button>
        </div> */}
        <div onClick={handleSignupClick} style={{ cursor: "pointer" }}>
          <div className="step_4_started_button" >Get Started</div>
        </div>
        <p className="have__account__step4_text">
          I have an account?{" "}
          <span onClick={handleLoginClick} className="login__step4_text">
            Sign In
          </span>
        </p>
      </div>
    </div>
    </>
  );
}

export default PropertyAuthStep4;
