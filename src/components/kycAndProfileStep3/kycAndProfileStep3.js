import React, { useState, useRef, useEffect } from "react";
import "./kycAndProfileStep3.css";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import avatarUser from "../../assets/avatarUser.svg";
import ScreenLoader from "../loader/ScreenLoader";
import { addDeveloperProfile } from "../../services/redux/middleware/addDeveloperProfile";
import KycAndProfileModal from "../../components/Modals/kycAndProfileModal";
import { propertyDeveloperProfile } from "../../services/redux/middleware/propertyDeveloperProfile";
function KycAndProfileStep3({ formData, handleInputChange, setSelectedStep }) {
  const devkycapproval = localStorage.getItem("kycapproval");
  console.log("step 2 data is......", formData);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleSignupClick = () => {
    if (
      !formData.companyName ||
      !formData.registrationNumber ||
      !formData.fullName ||
      !formData.jobTitle ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.companyWebsite ||
      !formData.companyRegion ||
      !formData.companyRegistrationNumber ||
      !formData.proofOfIncorporation ||
      !formData.proofOfAddress ||
      !formData.authlegalId ||
      !formData.taxCertificate ||
      !formData.portfolio
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    console.log(formData, "data before dispatching");

    dispatch(addDeveloperProfile(formData))
      .then((res) => {
        setLoading(false);
        console.log(res, "add profile data");

        if (
          res?.payload?.msg ===
          "Developer details updated successfully and Sent for KYC."
        ) {
          toast.success("KYC Details Updated Successfully To Admin");
          localStorage.removeItem("proofOfIncorporation");
          localStorage.removeItem("proofOfAddress");
          localStorage.removeItem("portfolio");
          localStorage.removeItem("authlegalId");
          localStorage.removeItem("taxCertificate");
          localStorage.setItem(
            "kycapproval",
            res?.payload?.developer?.developerKYC
          );
          setShowModal(true);

          setTimeout(() => {
            setShowModal(false);
            navigate("/property-developer-profile");
          }, 3000);
        } else {
          toast.error(
            "Failed to update property developer kyc details. Please try again."
          );
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Failed to add profile. Please try again.");
      });
  };
  const handleBack = () => {
    setSelectedStep(1);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const developerProfileData = useSelector(
    (state) => state?.propertyDeveloperProfile?.propertyDeveloperProfile
  );
  console.log("yooo", developerProfileData);
  useEffect(() => {
    // setIsLoading(true);
    (async () => {
      try {
        await dispatch(propertyDeveloperProfile());
      } catch (error) {
        console.error("Error fetching explore details:", error);
      }
      // setIsLoading(false);
    })();
  }, [dispatch]);
  console.log(developerProfileData);

  return (
    <>
      {isLoading && <ScreenLoader />}
      <div className="kyc__and__profile__step3__main__container">
        <div className="ProfileForm">
          <form className="FormContainer">
            <div className="UploadPhoto">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "88px",
                  height: "88px",
                  borderRadius: "50px",
                  bgcolor: " #FFFFFF",
                  filter: "blur(10%)",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={
                    // profileImageView ||
                    developerProfileData?.data?.profileImage || avatarUser
                  }
                  style={{
                    width:
                      // profileImageView ||
                      developerProfileData?.data?.profileImage
                        ? "70px"
                        : "40px",
                    height:
                      // profileImageView ||
                      developerProfileData?.data?.profileImage
                        ? "70px"
                        : "40px",
                    borderRadius: "50px",
                    border: "none",
                    objectFit: "cover",
                  }}
                  alt=""
                />
              </div>
              <div className="emailname">
                <p className="Name">{developerProfileData?.data?.fullName}</p>
                <p className="email">{developerProfileData?.data?.email}</p>
              </div>
            </div>
          </form>
        </div>
        <div className="kyc__and__profile__step3__second__container">
          <div className="kyc__and__profile__step3__form__container">
            <div className="kyc__and__profile__step3__form__container2">
              <div className="kyc__and__profile__step3__form__container3">
                <p className="kyc__and__profile__step3__form__label">
                  Company Name
                </p>
                <input
                  className="kyc__andprofile__step3__form_input"
                  type="text"
                  placeholder="Enter Company Name"
                  value={formData?.companyName}
                  readOnly
                />
              </div>
              <div className="kyc__and__profile__step3__form__container3">
                <p className="kyc__and__profile__step3__form__label">
                  Registration Address
                </p>
                <input
                  className="kyc__andprofile__step3__form_input"
                  type="text"
                  placeholder="Enter Registration Address"
                  value={formData?.registrationNumber}
                  readOnly
                />
              </div>
            </div>

            <div className="kyc__and__profile__step3__form__container2">
              <div className="kyc__and__profile__step3__form__container3">
                <p className="kyc__and__profile__step3__form__label">
                  Full Name
                </p>
                <input
                  className="kyc__andprofile__step3__form_input"
                  type="text"
                  placeholder="Enter Full Name"
                  value={formData?.fullName}
                  readOnly
                />
              </div>
              <div className="kyc__and__profile__step3__form__container3">
                <p className="kyc__and__profile__step3__form__label">
                  Job Title
                </p>
                <input
                  className="kyc__andprofile__step3__form_input"
                  type="text"
                  placeholder="Enter Job Title"
                  value={formData?.jobTitle}
                  readOnly
                />
              </div>
            </div>

            <div className="kyc__and__profile__step3__form__container2">
              <div className="kyc__and__profile__step3__form__container3">
                <p className="kyc__and__profile__step3__form__label">
                  Email Address
                </p>
                <input
                  className="kyc__andprofile__step3__form_input"
                  type="email"
                  placeholder="Enter Email Address"
                  value={formData?.email}
                  readOnly
                />
              </div>
              <div className="kyc__and__profile__step3__form__container3">
                <p className="kyc__and__profile__step3__form__label">
                  Phone Number
                </p>
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
            </div>

            <div className="kyc__and__profile__step3__form__container2">
              <div className="kyc__and__profile__step3__form__container3">
                <p className="kyc__and__profile__step3__form__label">
                  Company Website
                </p>
                <input
                  className="kyc__andprofile__step3__form_input"
                  type="text"
                  placeholder="Enter Company Website"
                  value={formData?.companyWebsite}
                  readOnly
                />
              </div>
              <div className="kyc__and__profile__step3__form__container3">
                <p className="kyc__and__profile__step3__form__label">
                  Region(s) of Operation
                </p>
                <input
                  className="kyc__andprofile__step3__form_input"
                  type="text"
                  placeholder="Enter Region(s) of Operation"
                  value={formData?.companyRegion}
                  readOnly
                />
              </div>
            </div>

            <div className="kyc__and__profile__step3__form__container2">
              <div className="kyc__and__profile__step3__form__container3">
                <p className="kyc__and__profile__step3__form__label">
                  Company Registration Number
                </p>
                <input
                  className="kyc__andprofile__step3__form_input"
                  type="text"
                  placeholder="Enter Company Registration Number"
                  value={formData?.companyRegistrationNumber}
                  readOnly
                />
              </div>
              <div className="kyc__and__profile__step3__form__container3">
                <p className="kyc__and__profile__step3__form__label">
                  Certificate of Incorporation
                </p>
                <input
                  className="kyc__andprofile__step3__form_input"
                  type="text"
                  placeholder="Enter Company Registration Number"
                  value={decodeURIComponent(
                    formData?.proofOfIncorporation
                      .split("/")
                      .pop()
                      .split("-")
                      .slice(1)
                      .join("-")
                  )}
                  readOnly
                />
              </div>
            </div>

            <div className="kyc__and__profile__step3__form__container2">
              <div className="kyc__and__profile__step3__form__container3">
                <p className="kyc__and__profile__step3__form__label">
                  Proof of Business Address
                </p>
                <input
                  className="kyc__andprofile__step3__form_input"
                  type="text"
                  placeholder="Enter Company Registration Number"
                  value={decodeURIComponent(
                    formData?.proofOfAddress
                      .split("/")
                      .pop()
                      .split("-")
                      .slice(1)
                      .join("-")
                  )}
                  readOnly
                />
              </div>
              <div className="kyc__and__profile__step3__form__container3">
                <p className="kyc__and__profile__step3__form__label">
                  Authorized Signatory ID
                </p>
                <input
                  className="kyc__andprofile__step3__form_input"
                  type="text"
                  placeholder="Enter Company Registration Number"
                  value={decodeURIComponent(
                    formData?.authlegalId
                      .split("/")
                      .pop()
                      .split("-")
                      .slice(1)
                      .join("-")
                  )}
                  readOnly
                />
              </div>
            </div>

            <div className="kyc__and__profile__step3__form__container2">
              <div className="kyc__and__profile__step3__form__container3">
                <p className="kyc__and__profile__step3__form__label">
                  Tax Registration Certificate
                </p>
                <input
                  className="kyc__andprofile__step3__form_input"
                  type="text"
                  placeholder="Enter Company Registration Number"
                  value={decodeURIComponent(
                    formData?.taxCertificate
                      .split("/")
                      .pop()
                      .split("-")
                      .slice(1)
                      .join("-")
                  )}
                  readOnly
                />
              </div>
              <div className="kyc__and__profile__step3__form__container3">
                <p className="kyc__and__profile__step3__form__label">
                  Portfolio of Completed Projects{" "}
                  {/* <span className="optional__kyc__text">(Optional)</span> */}
                </p>
                <input
                  className="kyc__andprofile__step3__form_input"
                  type="text"
                  placeholder="Enter Company Registration Number"
                  value={decodeURIComponent(
                    formData?.portfolio
                      .split("/")
                      .pop()
                      .split("-")
                      .slice(1)
                      .join("-")
                  )}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="kyc__info__stepsprofile__button__containerr"
        >
          <button onClick={handleBack} className="kycinfo__step2__back__button">
            Back
          </button>
          <button
            onClick={handleSignupClick}
            className="kycinfo__step2__next__button"
            disabled={
              devkycapproval === "pending" || devkycapproval === "accepted"
            }
            style={{
              opacity:
                devkycapproval === "pending" || devkycapproval === "accepted"
                  ? 0.4
                  : 1,
            }}
          >
            Submit
          </button>
        </div>

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

export default KycAndProfileStep3;
