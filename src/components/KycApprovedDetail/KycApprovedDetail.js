import React, { useEffect, useState } from "react";
import ScreenLoader from "../loader/ScreenLoader";
import "./KycApprovedDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { propertyDeveloperProfile } from "../../services/redux/middleware/propertyDeveloperProfile";
import { kycDataDev } from "../../services/redux/middleware/kycDataDev";
import PhoneInput from "react-phone-input-2";
import avatarUser from "../../assets/avatarUser.svg";
import { Navigate, useNavigate, useParams } from "react-router-dom";
const KycApprovedDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { propertyid } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const developerProfileData = useSelector(
    (state) => state?.propertyDeveloperProfile?.propertyDeveloperProfile
  );
  console.log("yooo", developerProfileData);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        await dispatch(propertyDeveloperProfile());
      } catch (error) {
        console.error("Error fetching explore details:", error);
      }
      setIsLoading(false);
    })();
  }, [dispatch]);
  console.log(developerProfileData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(kycDataDev());
        console.log("KYC Data:", result);
      } catch (error) {
        console.error("Error fetching KYC Data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const kycData = useSelector(
    (state) => state?.kycDataDev?.kycDataDev?.data?.developer
  );
  console.log("kycDataaaa", kycData);

  return (
    <>
      {isLoading && <ScreenLoader />}
      <div className="kyc__and__profile__step3__main__container">
        <div className="Back-and-KycPreview">
          <button
            className="Back-button"
            onClick={() => navigate("/property-developer-profile")}
          >
            <img src="/Images/Dashboard/back.svg" alt="" />
            Back
          </button>
          <div className="Kycpreview">
            <p className="kycpreview-text">KYC Preview</p>
            <p className="kycpreview-text2">Preview your Submission</p>
          </div>
        </div>
        <div className="kyc__and__profile__step3__second__containerr">
          <div className="kyc__and__profile__step3__form__container">
            <div>
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
                    <p className="Name">
                      {developerProfileData?.data?.fullName}
                    </p>
                    <p className="email">{developerProfileData?.data?.email}</p>
                  </div>
                </div>
              </form>
            </div>

            <div className="kyc__and__profile__step3__form__container2">
              <div className="kyc__and__profile__step3__form__container3">
                <p className="kyc__and__profile__step3__form__label">
                  Company Name
                </p>
                <input
                  className="kyc__andprofile__step3__form_input"
                  type="text"
                  placeholder="Enter Company Name"
                  value={kycData?.companyName}
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
                  value={kycData?.registrationNumber}
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
                  value={kycData?.fullName}
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
                  value={kycData?.jobTitle}
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
                  value={kycData?.email}
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
                  value={kycData?.phoneNumber}
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
                  value={kycData?.companyWebsite}
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
                  value={kycData?.companyRegion}
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
                  value={kycData?.companyRegistrationNumber}
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
                    kycData?.proofOfIncorporation
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
                    kycData?.proofOfAddress
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
                    kycData?.authlegalId
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
                    kycData?.taxCertificate
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
                    kycData?.portfolio
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
      </div>
    </>
  );
};

export default KycApprovedDetail;
