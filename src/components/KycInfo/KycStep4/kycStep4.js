import React,{useState} from "react";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updatekyc } from "../../../services/redux/middleware/updatekyc";

import "react-phone-input-2/lib/style.css";
import "./kycStep4.css";
import ScreenLoader from "../../loader/ScreenLoader";
function KycStep4({ formData, handleInputChange, setSelectedStep }) {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(formData, "step3data");
  const proofOfIncorporation = localStorage.getItem("proofOfIncorporation");
  const businessLicenseCertificate = localStorage.getItem(
    "businessLicenseCertificate"
  );
  const ultimateBeneficalOwner = localStorage.getItem("ultimateBeneficalOwner");
  console.log("formDatastepkyc3", formData);
  const handleSignupClick = () => {
    if (
      !formData.fullName ||
      !formData.legalId ||
      !formData.phoneNumber ||
      !formData.email ||
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
    dispatch(updatekyc(formData))
      .then((res) => {
        setLoading(false);
        console.log(res, "updatekycresponse");
        if (res?.payload?.msg === "Developer details updated successfully.") {
          toast.success("updated successfully");
          navigate(`/kyc-info`);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("An error occurred. Please try again.");
        console.error(err);
      });
  };

  return (
    <>
     {isLoading && <ScreenLoader />}
      <div className="kyc__step4___main__container">
        <div className="kyc__step4__input__container">
          <p className="kyc__step4__input__label">Full Name</p>
          <input
            className="input__kycstep__4__placeholder"
            placeholder="Enter Full Name"
            value={formData.fullName}
            readOnly
          />
        </div>
        <div className="kyc__step4__input__container">
          <p className="kyc__step4__input__label">
            National ID/Passport/ Driving License
          </p>
          <input
            className="input__kycstep__4__placeholder"
            placeholder="Enter National ID/Passport/ Driving License"
            value={formData.legalId}
            readOnly
          />
        </div>
        <div className="kyc__step4__input__container">
          <p className="kyc__step4__input__label">Phone Number</p>
          <input
            className="input__kycstep__4__placeholder"
            value={formData.phoneNumber}
            readOnly
            placeholder="Director Phone Number"
            // country={"us"}
            // inputClass="phone-input"
            // containerClass="phone-container"
            // buttonClass="flag-button"
            // dropdownClass="phone-dropdown"
            // preferredCountries={["us", "gb", "ca", "au"]}
          />
        </div>
        <div className="kyc__step4__input__container">
          <p className="kyc__step4__input__label">Your Email</p>
          <input
            className="input__kycstep__4__placeholder"
            placeholder="Enter Your Email"
            value={formData.email}
            readOnly
          />
        </div>
        <div className="kyc__step4__input__container">
          <p className="kyc__step4__input__label">Company Name</p>
          <input
            className="input__kycstep__4__placeholder"
            placeholder="Enter Company Name"
            value={formData.companyName}
            readOnly
          />
        </div>

        <div className="kyc__step4__input__container">
          <p className="kyc__step4__input__label">Registration Number</p>
          <input
            className="input__kycstep__4__placeholder"
            placeholder="Enter Registration Number"
            value={formData.registrationNumber}
            readOnly
          />
        </div>
        <div className="kyc__step4__input__container">
          <p className="kyc__step4__input__label">Company Address</p>
          <input
            className="input__kycstep__4__placeholder"
            placeholder="Enter Company Address"
            value={formData.companyAddress}
            readOnly
          />
        </div>
        <div className="kyc__step4__input__container">
          <p className="kyc__step4__input__label">URL</p>
          <input
            className="input__kycstep__4__placeholder"
            placeholder="Enter URL"
            value={formData.URL}
            readOnly
          />
        </div>
        <div className="kyc__step4__input__container">
          <p className="kyc__step4__input__label">Proof of Incorporation</p>
          <input
            className="input__kycstep__4__placeholder"
            placeholder="Enter Proof of Incorporation"
            value={
              formData?.proofOfIncorporation
                ? formData.proofOfIncorporation
                    .split("/")
                    .pop()
                    .replace(/^\d+-/, "")
                : ""
            }
            readOnly
          />
        </div>
        <div className="kyc__step4__input__container">
          <p className="kyc__step4__input__label">Tax Identification Number</p>
          <input
            className="input__kycstep__4__placeholder"
            placeholder="Enter Tax Identification Number"
            value={formData.taxIdentificationNumber}
            readOnly
          />
        </div>
        <div className="kyc__step4__input__container">
          <p className="kyc__step4__input__label">Company Director Name</p>
          <input
            className="input__kycstep__4__placeholder"
            placeholder="Enter Company Director Name"
            value={formData.companyDirectorName}
            readOnly
          />
        </div>
        <div className="kyc__step4__input__container">
          <p className="kyc__step4__input__label">Director ID</p>
          <input
            className="input__kycstep__4__placeholder"
            placeholder="Enter Director ID"
            type="number"
            value={formData.directorId}
            readOnly
          />
        </div>
        <div className="kyc__step4__input__container">
          <p className="kyc__step4__input__label">Dir Phone Number</p>
          <input
            className="input__kycstep__4__placeholder"
            value={formData.dirPhone}
            readOnly
            placeholder="Director Phone Number"
          />
        </div>
        {/* <div className="kyc__step4__input__container">
        <p className="kyc__step4__input__label">Phone Number</p>
        <PhoneInput
          className="phone-input-field"
          country={"us"}
          inputClass="phone-input"
          containerClass="phone-container"
          buttonClass="flag-button"
          dropdownClass="phone-dropdown"
          preferredCountries={["us", "gb", "ca", "au"]}
        />
      </div> */}
        <div className="kyc__step4__input__container">
          <p className="kyc__step4__input__label">
            Business License/Certificate
          </p>
          <input
            className="input__kycstep__4__placeholder"
            placeholder="Enter Business License/Certificate"
            readOnly
            value={
              formData?.businessLicenseCertificate
                ? formData.businessLicenseCertificate
                    .split("/")
                    .pop()
                    .replace(/^\d+-/, "")
                : ""
            }
          />
        </div>
        <div className="kyc__step4__input__container">
          <p className="kyc__step4__input__label">Ultimate Beneficial Owners</p>
          <input
            className="input__kycstep__4__placeholder"
            placeholder="Enter Ultimate Beneficial Owners"
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
        </div>
        <div onClick={handleSignupClick} style={{ cursor: "pointer" }}>
          <button className="kyc__step4__submit__button"> Submit</button>
        </div>
      </div>
    </>
  );
}

export default KycStep4;
