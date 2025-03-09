import React, { useRef, useState } from "react";
import "./kycInvestorProfile.css";
import { uploadfile } from "../../services/redux/middleware/signin";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
function KycInvestorProfileStep3({
  setSelectedStep,
  formData,
  handleInputChange,
}) {
  console.log("2nd step data", formData);

  const [files, setFiles] = useState({
    nationalID: "",
    proofOfIdFront: "",
    proofOfIdBack: "",
    proofOfAddress: "",
    sourceOfFunds: "",
    selfieWithId: "",
  });
  const dispatch = useDispatch();

  const [dotloading, setdotloading] = useState(false);
  const [dotloadingBack, setdotloadingBack] = useState(false);
  const [dotloadingProof, setdotloadingProof] = useState(false);
  const [dotloadingFunds, setdotloadingFunds] = useState(false);
  const [dotloadingSelfie, setdotloadingSelfie] = useState(false);
  const nationalIDRef = useRef(null);
  const proofOfIdFrontRef = useRef(null);
  const proofOfIdBackRef = useRef(null);
  const proofOfAddressRef = useRef(null);
  const sourceOfFundsRef = useRef(null);
  const selfieWithIdRef = useRef(null);
  const [proofOfIdFront, setproofOfIdFront] = useState(false);
  const [proofOfIdBack, setproofOfIdBack] = useState(false);
  const [proofOfAddress, setProofOfAdress] = useState(false);
  const [sourceOfFunds, setSourceOfFunds] = useState(false);
  const [selfieWithId, setselfieWithId] = useState(false);
  const handleFileproofOfIdFront = (event) => {
    const file = event.target.files[0];

    if (file) {
      setdotloading(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadfile(data)).then((res) => {
        console.log(res, "image front");
        if (
          res?.payload?.message === "Developer Image uploaded successfully."
        ) {
          setproofOfIdFront(file?.name);
          localStorage.setItem("proofOfIdFront", file.name);
          console.log(res?.payload?.imageUrl, "url");
          handleInputChange({
            target: {
              name: "proofOfIdFront",
              value: res?.payload?.imageUrl,
            },
          });

          setdotloading(false);
        }
        setdotloading(false);
      });
    }
  };
  const handleFileproofOfIdBack = (event) => {
    const file = event.target.files[0];

    if (file) {
      setdotloadingBack(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadfile(data)).then((res) => {
        console.log(res, "image back");
        if (
          res?.payload?.message === "Developer Image uploaded successfully."
        ) {
          setproofOfIdBack(file?.name);
          localStorage.setItem("proofOfIdBack", file.name);
          console.log(res?.payload?.imageUrl, "url");
          handleInputChange({
            target: {
              name: "proofOfIdBack",
              value: res?.payload?.imageUrl,
            },
          });

          setdotloadingBack(false);
        }
        setdotloadingBack(false);
      });
    }
  };
  const handleProofOfAddress = (event) => {
    const file = event.target.files[0];

    if (file) {
      setdotloadingProof(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadfile(data)).then((res) => {
        console.log(res, "proof of address");
        if (
          res?.payload?.message === "Developer Image uploaded successfully."
        ) {
          setProofOfAdress(file?.name);
          localStorage.setItem("POAInvestorProfile", file.name);
          console.log(res?.payload?.imageUrl, "url");
          handleInputChange({
            target: {
              name: "proofOfAddress",
              value: res?.payload?.imageUrl,
            },
          });

          setdotloadingProof(false);
        }
        setdotloadingProof(false);
      });
    }
  };
  const handleSourceOfFunds = (event) => {
    const file = event.target.files[0];

    if (file) {
      setdotloadingFunds(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadfile(data)).then((res) => {
        console.log(res, "source of funds");
        if (
          res?.payload?.message === "Developer Image uploaded successfully."
        ) {
          setSourceOfFunds(file?.name);
          localStorage.setItem("sourceOfFunds", file.name);
          console.log(res?.payload?.imageUrl, "url");
          handleInputChange({
            target: {
              name: "sourceOfFunds",
              value: res?.payload?.imageUrl,
            },
          });

          setdotloadingFunds(false);
        }
        setdotloadingFunds(false);
      });
    }
  };
  const handleselfieWithId = (event) => {
    const file = event.target.files[0];

    if (file) {
      setdotloadingSelfie(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadfile(data)).then((res) => {
        console.log(res, "selfieWithId");
        if (
          res?.payload?.message === "Developer Image uploaded successfully."
        ) {
          setselfieWithId(file?.name);
          localStorage.setItem("selfieWithId", file.name);
          console.log(res?.payload?.imageUrl, "url");
          handleInputChange({
            target: {
              name: "selfieWithId",
              value: res?.payload?.imageUrl,
            },
          });

          setdotloadingSelfie(false);
        }
        setdotloadingSelfie(false);
      });
    }
  };
  const handleFileUpload = (event, field) => {
    const file = event.target.files[0];
    if (file) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [field]: file.name,
      }));
    }
  };

  const handleNextClick = () => {
    if (
      !formData.authlegalId ||
      !formData.proofOfIdFront ||
      !formData.proofOfIdBack ||
      !formData.proofOfAddress ||
      !formData.taxIdentificationNumber ||
      !formData.sourceOfFunds ||
      !formData.selfieWithId
    ) {
      toast.error("Please enter all fields of Step 3");
      return;
    }
    setSelectedStep(4);
  };

  const handleBackClick = () => {
    setSelectedStep(2);
  };

  return (
    <div className="kyc__investor__profile__step3__main_container">
      <div className="kyc__investor__profile__step3__main_container__1">
        <div className="kyc__investor__profile__step3__form_container">
          <div className="kyc__investor__profile__step3__form_container1">
            <div className="kyc__investor__profile__step3__input_container1">
              <p className="kyc__investor__profile__step3__input-label">
                National ID/Passport/Driving License
              </p>
              <input
                className="kyc__investor__profilestep3__input__field"
                type="text"
                placeholder="Enter Legal Id"
                value={formData.authlegalId || ""}
                name="authlegalId"
                onChange={handleInputChange}
                maxLength={20}
              />
            </div>
          </div>

          <div className="kyc__investor__profile__step3__form_container__main">
            <div className="kyc__investor__profile__step3__form_container1">
              <div className="kyc__investor__profile__step3__input_container1">
                <p className="kyc__investor__profile__step3__input-label">
                  Government ID{" "}
                  <span className="kyc__investor__profile__step3__input__span">
                    (Front)
                  </span>
                </p>
                <div className="proof__text__container__kyc">
                  <input
                    type="file"
                    ref={proofOfIdFrontRef}
                    style={{ display: "none" }}
                    onChange={handleFileproofOfIdFront}
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
                        className="extrdivforinputInvestor"
                        value={proofOfIdFront ? proofOfIdFront : formData.proofOfIdFront ? formData.proofOfIdFront.split('/').pop() : "Upload Document"}
                        style={{
                          color: proofOfIdFront ? "#000" : "#919191",
                        }}
                        placeholder="Upload Document"
                        readOnly
                      />
                    </>
                  )}
                  <img
                    src="/Images/Investor/uploadicon.svg"
                    alt="Upload Icon"
                    onClick={() => proofOfIdFrontRef.current?.click()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>

            <div className="kyc__investor__profile__step3__form_container1">
              <div className="kyc__investor__profile__step3__input_container1">
                <p className="kyc__investor__profile__step3__input-label">
                  Government ID{" "}
                  <span className="kyc__investor__profile__step3__input__span">
                    (Back)
                  </span>
                </p>
                <div className="proof__text__container__kyc">
                  <input
                    type="file"
                    ref={proofOfIdBackRef}
                    style={{ display: "none" }}
                    onChange={handleFileproofOfIdBack}
                  />
                  {dotloadingBack ? (
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
                        className="extrdivforinputInvestor"
                        value={proofOfIdBack ? proofOfIdBack : formData.proofOfIdBack ? formData.proofOfIdBack.split('/').pop(): "Upload Document"}
                        style={{
                          color: proofOfIdBack ? "#000" : "#919191",
                        }}
                        placeholder="Upload Document"
                        readOnly
                      />
                    </>
                  )}
                  <img
                    src="/Images/Investor/uploadicon.svg"
                    alt="Upload Icon"
                    onClick={() => proofOfIdBackRef.current?.click()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="kyc__investor__profile__step3__form_container__main">
            <div className="kyc__investor__profile__step3__form_container1">
              <div className="kyc__investor__profile__step3__input_container1">
                <p className="kyc__investor__profile__step3__input-label">
                  Proof of Address
                </p>
                <div className="proof__text__container__kyc">
                  <input
                    type="file"
                    ref={proofOfAddressRef}
                    style={{ display: "none" }}
                    onChange={handleProofOfAddress}
                  />
                  {dotloadingProof ? (
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
                        className="extrdivforinputInvestor"
                        value={proofOfAddress ? proofOfAddress : formData?.proofOfAddress ? formData?.proofOfAddress.split('/').pop() : "Upload Document"}
                        style={{
                          color: proofOfAddress ? "#000" : "#919191",
                        }}
                        placeholder="Upload Document"
                        readOnly
                      />
                    </>
                  )}
                  <img
                    src="/Images/Investor/uploadicon.svg"
                    alt="Upload Icon"
                    onClick={() => proofOfAddressRef.current?.click()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
            <div className="kyc__investor__profile__step3__input_container1">
              <p className="kyc__investor__profile__step3__input-label">
                Tax Identification Number
              </p>
              <input
                className="kyc__investor__profilestep3__input__field"
                type="text"
                placeholder="Enter TIN"
                name="taxIdentificationNumber"
                value={formData.taxIdentificationNumber || ""}
                onChange={handleInputChange}
                maxLength={20}
              />
            </div>
          </div>

          <div className="kyc__investor__profile__step3__form_container__main">
            <div className="kyc__investor__profile__step3__form_container1">
              <div className="kyc__investor__profile__step3__input_container1">
                <p className="kyc__investor__profile__step3__input-label">
                  Source of Funds Declaration
                </p>
                <div className="proof__text__container__kyc">
                  <input
                    type="file"
                    ref={sourceOfFundsRef}
                    style={{ display: "none" }}
                    onChange={handleSourceOfFunds}
                  />
                  {dotloadingFunds ? (
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
                        className="extrdivforinputInvestor"
                        value={sourceOfFunds ? sourceOfFunds :formData?.sourceOfFunds ?  formData?.sourceOfFunds.split('/').pop() : "Upload Document"}
                        style={{
                          color: sourceOfFunds ? "#000" : "#919191",
                        }}
                        placeholder="Upload Document"
                        readOnly
                      />
                    </>
                  )}
                  <img
                    src="/Images/Investor/uploadicon.svg"
                    alt="Upload Icon"
                    onClick={() => sourceOfFundsRef.current?.click()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>

            <div className="kyc__investor__profile__step3__form_container1">
              <div className="kyc__investor__profile__step3__input_container1">
                <p className="kyc__investor__profile__step3__input-label">
                  Selfie With ID
                </p>
                <div className="proof__text__container__kyc">
                  <input
                    type="file"
                    ref={selfieWithIdRef}
                    style={{ display: "none" }}
                    onChange={handleselfieWithId}
                  />
                  {dotloadingSelfie ? (
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
                        className="extrdivforinputInvestor"
                        value={selfieWithId ? selfieWithId :formData?.selfieWithId ?  formData?.selfieWithId.split('/').pop(): "Upload Document"}
                        style={{
                          color: selfieWithId ? "#000" : "#919191",
                        }}
                        placeholder="Upload Selfie"
                        readOnly
                      />
                    </>
                  )}
                  <img
                    src="/Images/Investor/uploadicon.svg"
                    alt="Upload Icon"
                    onClick={() => selfieWithIdRef.current?.click()}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="kyc__info__stepsprofile3__button__container_investor">
        <button
          onClick={handleBackClick}
          className="kycinfo__step2__back__button"
        >
          Back
        </button>
        <button
          onClick={handleNextClick}
          className="kycinfo__step2__next__button"
        >
          Preview
        </button>
      </div>
    </div>
  );
}

export default KycInvestorProfileStep3;
