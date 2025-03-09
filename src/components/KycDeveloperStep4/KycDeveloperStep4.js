import React, { useEffect, useState } from "react";
import "./KycDeveloperStep4.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "../kycAndProfileStep3/kycAndProfileStep3.css";
import { useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";

// import { investorProfile } from "../../services/redux/middleware/investorProfile";
import ScreenLoader from "../loader/ScreenLoader";
import KycAndProfileModal from "../Modals/kycAndProfileModal";
import { kycDataDev } from "../../services/redux/middleware/kycDataDev";

import avatarUser from "../../assets/avatarUser.svg";
import { addDeveloperProfile } from "../../services/redux/middleware/addDeveloperProfile";
import { investorImageUpload } from "../../services/redux/middleware/investorImageUpload";
import { uploadfile } from "../../services/redux/middleware/signin";
import { investorProfile } from "../../services/redux/middleware/investorProfile";

function KycDeveloperStep4({ formData, handleInputChange, setSelectedStep }) {
  const devkycapproval = localStorage.getItem("kycapproval");
  console.log("step 2 data is......", formData);
  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const investorProfileData = useSelector(
    (state) => state?.investorProfile?.investorProfile
  );
  console.log("step1 api", investorProfileData);
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        await dispatch(investorProfile());
      } catch (error) {
        console.error("Error fetching explore details:", error);
      }
      setLoading(false);
    })();
  }, [dispatch]);
  console.log(investorProfileData);
  const [showModal, setShowModal] = useState(false);

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
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/property-developer-profile");
    }, 500); // Adjust delay as needed
  };

  const [profileImage, setProfileImage] = useState();
  const [profileImageView, setProfileImageView] = useState();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/svg+xml",
        "image/webp",
        "image/bmp",
        "image/tiff",
      ];

      if (validImageTypes.includes(file.type)) {
        console.log("This is the selected image file:", file);
        setProfileImage(file);
        setProfileImageView(URL.createObjectURL(file));

        const data = new FormData();
        data.append("file", file);

        dispatch(uploadfile(data)).then((res1) => {
          console.log(res1, "imageresponse");

          const uploadedImageUrl = res1?.payload?.imageUrl;
          console.log("Image Path", uploadedImageUrl);

          if (uploadedImageUrl) {
            localStorage.setItem("profileImageDeveloper", uploadedImageUrl);
          }

          const data1 = { profileImage: uploadedImageUrl };
          console.log("Data for api", data1);

          dispatch(investorImageUpload(data1)).then((res) => {
            console.log("Image Uploaded", res);
            dispatch(investorProfile());
          });
        });
      } else {
        toast.error("Please select a valid image file");
      }
    }
  };
  return (
    <>
      {isLoading && <ScreenLoader />}
      <div className="kyc__and__profile__step4__main__container">
        <button
          onClick={handleBack}
          className="kyc__info__preview__submit__button"
        >
          <img src="/Images/investorKyc/backicon.svg" /> Back
        </button>
        <div>
          <p
            className="kyc-preview-p
          "
          >
            KYC Preview
          </p>
          <p className="kyc-preview-p-subtag">Preview your Submission</p>
        </div>
        <div className="kyc__and__profile__step4__second__container">
          <div className="ProfileForm-preview ">
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
                    src="dvklmke"
                    // {
                    //   profileImageView ||
                    //   investorProfileData?.data?.profileImage ||
                    //   avatarUser
                    // }
                    // style={{
                    //   width:
                    //     profileImageView ||
                    //     investorProfileData?.data?.profileImage
                    //       ? "70px"
                    //       : "40px",
                    //   height:
                    //     profileImageView ||
                    //     investorProfileData?.data?.profileImage
                    //       ? "70px"
                    //       : "40px",
                    //   borderRadius: "50px",
                    //   border: "none",
                    //   objectFit: "cover",
                    // }}
                    alt=""
                  />
                </div>
                <div className="emailname">
                  <p className="Name">
                    Andre Samosa
                    {/* {investorProfileData?.data?.investor?.fullName ||
                      formData.fullName} */}
                  </p>
                  <p className="email">
                    {/* {formData?.email} */}
                    andresamosa@mail.com
                  </p>
                </div>
              </div>
            </form>
          </div>
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
                  <span className="optional__kyc__text">(Optional)</span>
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

export default KycDeveloperStep4;
