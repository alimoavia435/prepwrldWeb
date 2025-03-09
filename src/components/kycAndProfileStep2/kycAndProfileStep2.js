import React, { useRef, useState } from "react";
import "./kycAndProfileStep2.css";
import { useDispatch } from "react-redux";
import { uploadfile } from "../../services/redux/middleware/signin";
import { toast } from "react-toastify";
function KycAndProfileStep2({ setSelectedStep, formData, handleInputChange }) {
  console.log("first step data is", formData);
  const dispatch = useDispatch();
  const businessAddressRef = useRef(null);
  const signatoryIdRef = useRef(null);
  const incorporationCertificateRef = useRef(null);
  const taxCertificateRef = useRef(null);
  const projectPortfolioRef = useRef(null);

  const [files, setFiles] = useState({
    proofOfIncorporation: "",
    proofOfAddress: "",
    authlegalId: "",
    taxCertificate: "",
    portfolio: "",
  });
  const [proofOfIncorporation, setproofOfIncorporation] = useState(null);
  const [proofOfAddress, setproofOfAddress] = useState(null);
  const [authlegalId, setauthlegalId] = useState(null);
  const [taxCertificate, settaxCertificate] = useState(null);
  const [portfolio, setportfolio] = useState(null);
  const [dotloadingBack, setdotloadingBack] = useState(false);
  const [dotloadingProof, setdotloadingProof] = useState(false);
  const [dotloadingauthlegalId, setdotloadingauthlegalId] = useState(false);
  const [dotloadingportfolio, setdotloadingportfolio] = useState(false);
  const [dotloadingtaxCertificate, setdotloadingtaxCertificate] =
    useState(false);
  // const handleFileprofOfCorporation = (event) => {
  //   const file = event.target.files[0];
  //   console.log();
  //   if (file) {
  //     setdotloadingBack(true);
  //     const data = new FormData();
  //     data.append("file", file);
  //     dispatch(uploadfile(data)).then((res) => {
  //       console.log(res, "proofOfIncorporation");
  //       if (
  //         res?.payload?.message === "Developer Image uploaded successfully."
  //       ) {
  //         setproofOfIncorporation(file?.name);
  //         localStorage.setItem("proofOfIncorporation", file.name);
  //         console.log(res?.payload?.imageUrl, "url");
  //         handleInputChange({
  //           target: {
  //             name: "proofOfIncorporation",
  //             value: res?.payload?.imageUrl,
  //           },
  //         });

  //         setdotloadingBack(false);
  //       }
  //       setdotloadingBack(false);
  //     });
  //   }
  // };

  const handleFileprofOfCorporation = (event) => {
    const file = event.target.files[0];

    if (file) {
      setdotloadingBack(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadfile(data)).then((res) => {
        console.log(res, "proofOfIncorporation");
        if (
          res?.payload?.message === "Developer Image uploaded successfully."
        ) {
          setproofOfIncorporation(file?.name);
          localStorage.setItem("proofOfIncorporation", file.name);
          console.log(res?.payload?.imageUrl, "url");
          handleInputChange({
            target: {
              name: "proofOfIncorporation",
              value: res?.payload?.imageUrl,
            },
          });

          setdotloadingBack(false);
        }
        setdotloadingBack(false);
      });
    }
  };

  const handleDeleteincorp = () => {
    setproofOfIncorporation(null);
    localStorage.removeItem("proofOfIncorporation");
    handleInputChange({
      target: {
        name: "proofOfIncorporation",
        value: "",
      },
    });
  };

  const handleProofOfAddress = (event) => {
    const file = event.target.files[0];

    if (file) {
      setdotloadingProof(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadfile(data)).then((res) => {
        console.log(res, "proofOfAddress");
        if (
          res?.payload?.message === "Developer Image uploaded successfully."
        ) {
          setproofOfAddress(file?.name);
          localStorage.setItem("proofOfAddress", file.name);
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
  const handleDeleteProofOfAddress = () => {
    setproofOfAddress(null);
    localStorage.removeItem("proofOfAddress");
    handleInputChange({
      target: {
        name: "proofOfAddress",
        value: "",
      },
    });
  };
  const handleAuthLegalId = (event) => {
    const file = event.target.files[0];

    if (file) {
      setdotloadingauthlegalId(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadfile(data)).then((res) => {
        console.log(res, "authlegalId");
        if (
          res?.payload?.message === "Developer Image uploaded successfully."
        ) {
          setauthlegalId(file?.name);
          localStorage.setItem("authlegalId", file.name);
          console.log(res?.payload?.imageUrl, "url");
          handleInputChange({
            target: {
              name: "authlegalId",
              value: res?.payload?.imageUrl,
            },
          });

          setdotloadingauthlegalId(false);
        }
        setdotloadingauthlegalId(false);
      });
    }
  };

  const handleDeleteAuthlegalid = () => {
    setauthlegalId(null);
    localStorage.removeItem("authlegalId");
    handleInputChange({
      target: {
        name: "authlegalId",
        value: "",
      },
    });
  };

  const handleTaxCertificate = (event) => {
    const file = event.target.files[0];

    if (file) {
      setdotloadingtaxCertificate(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadfile(data)).then((res) => {
        console.log(res, "authlegalId");
        if (
          res?.payload?.message === "Developer Image uploaded successfully."
        ) {
          settaxCertificate(file?.name);
          localStorage.setItem("taxCertificate", file.name);
          console.log(res?.payload?.imageUrl, "url");
          handleInputChange({
            target: {
              name: "taxCertificate",
              value: res?.payload?.imageUrl,
            },
          });

          setdotloadingtaxCertificate(false);
        }
        setdotloadingtaxCertificate(false);
      });
    }
  };

  const handleDeletecertificate = () => {
    settaxCertificate(null);
    localStorage.removeItem("taxCertificate");
    handleInputChange({
      target: {
        name: "taxCertificate",
        value: "",
      },
    });
  };
  const handlePortfolio = (event) => {
    const file = event.target.files[0];
    if (!file) {
      // If no file is uploaded, ensure portfolio remains optional
      handleInputChange({
        target: {
          name: "portfolio",
          value: "", // Set to an empty string if nothing is uploaded
        },
      });
      return;
    }
    if (file) {
      setdotloadingportfolio(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadfile(data)).then((res) => {
        console.log(res, "portfolio");
        if (
          res?.payload?.message === "Developer Image uploaded successfully."
        ) {
          setportfolio(file?.name);
          localStorage.setItem("portfolio", file.name);
          console.log(res?.payload?.imageUrl, "url");
          handleInputChange({
            target: {
              name: "portfolio",
              value: res?.payload?.imageUrl,
            },
          });

          setdotloadingportfolio(false);
        }
        setdotloadingportfolio(false);
      });
    }
  };

  const handleDeleteport = () => {
    setportfolio(null);
    localStorage.removeItem("portfolio");
    handleInputChange({
      target: {
        name: "portfolio",
        value: "",
      },
    });
  };

  const handleFileUpload = (event, key) => {
    const file = event.target.files[0];
    if (file) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [key]: file.name,
      }));
    }
  };
  const handleNext = () => {
    const requiredFields = [
      "companyRegistrationNumber",
      "proofOfIncorporation",
      "proofOfAddress",
      "authlegalId",
      "taxCertificate",
    ];

    const isFormComplete = requiredFields.every((field) => formData[field]);

    if (!isFormComplete) {
      toast.error("Please fill in all required fields before proceeding.");
      return;
    }

    setSelectedStep(3);
  };

  // const handleNext = () => {
  //   if (
  //     !formData.companyRegistrationNumber ||
  //     !formData.proofOfIncorporation ||
  //     !formData.proofOfAddress ||
  //     !formData.authlegalId ||
  //     !formData.taxCertificate
  //     // !formData.portfolio
  //   ) {
  //     toast.error("Please enter all fields of Step 2");
  //     return;
  //   }
  //   setSelectedStep(3);
  // };

  const handleBack = () => {
    setSelectedStep(1);
  };

  return (
    <div className="kyc__andprofile__step2__main__container__1">
      <div className="kyc__andprofile__step2__main__container">
        <div className="kyc__andprofile__step2__form__container">
          <div className="kyc__andprofile__step2__form__container2">
            <div className="kyc__andprofile__step2__form">
              <p className="kyc__andprofile__step2__form_label">
                Company Registration Number
              </p>
              <input
                className="kyc__andprofile__step2__form_input"
                type="text"
                placeholder="Enter Company Registration Number"
                name="companyRegistrationNumber"
                value={formData.companyRegistrationNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="kyc__andprofile__step2__form">
              <p className="kyc__andprofile__step2__form_label">
                Certificate of Incorporation
              </p>
              <div className="proof__text__container__kyc" onClick={() => incorporationCertificateRef.current.click()}>
                <input
                  type="file"
                  ref={incorporationCertificateRef}
                  style={{ display: "none" }}
                  onChange={handleFileprofOfCorporation}
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
                      className="extrdivforinput"
                      value={decodeURIComponent(
                        (proofOfIncorporation || formData?.proofOfIncorporation
                          ? formData?.proofOfIncorporation
                          : "Upload Document"
                        )
                          .split("/")
                          .pop()
                          .split("-")
                          .slice(1)
                          .join("-")
                      )}
                      style={{
                        color:
                          proofOfIncorporation || formData?.proofOfIncorporation
                            ? "#000"
                            : "#919191",
                      }}
                      placeholder="Upload Document"
                      readOnly
                    />
                  </>
                )}
                {proofOfIncorporation || formData?.proofOfIncorporation ? (
                  <img
                    src="/Images/Investor/deleteicon.svg"
                    alt="Delete Icon"
                    onClick={() => handleDeleteincorp()}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <img
                    src="/Images/Investor/uploadicon.svg"
                    alt="Upload Icon"
                    // onClick={() => incorporationCertificateRef.current.click()}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="kyc__andprofile__step2__form__container2">
            <div className="kyc__andprofile__step2__form">
              <p className="kyc__andprofile__step2__form_label">
                Proof of Business Address
              </p>
              <div className="proof__text__container__kyc" onClick={() => businessAddressRef.current.click()}>
                <input
                  type="file"
                  ref={businessAddressRef}
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
                      className="extrdivforinput"
                      value={decodeURIComponent(
                        (proofOfAddress || formData?.proofOfAddress
                          ? formData?.proofOfAddress
                          : "Upload Document"
                        )
                          .split("/")
                          .pop()
                          .split("-")
                          .slice(1)
                          .join("-")
                      )}
                      style={{
                        color:
                          proofOfAddress || formData?.proofOfAddress
                            ? "#000"
                            : "#919191",
                      }}
                      placeholder="Upload Document"
                      readOnly
                    />
                  </>
                )}
                {proofOfAddress || formData?.proofOfAddress ? (
                  <img
                    src="/Images/Investor/deleteicon.svg"
                    alt="Delete Icon"
                    onClick={() => handleDeleteProofOfAddress()}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <img
                    src="/Images/Investor/uploadicon.svg"
                    alt="Upload Icon"
                    // onClick={() => businessAddressRef.current.click()}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            </div>

            <div className="kyc__andprofile__step2__form">
              <p className="kyc__andprofile__step2__form_label">
                Authorized Signatory ID *
              </p>
              <div className="proof__text__container__kyc" onClick={() => signatoryIdRef.current.click()}>
                <input
                  type="file"
                  ref={signatoryIdRef}
                  style={{ display: "none" }}
                  onChange={handleAuthLegalId}
                />
                {dotloadingauthlegalId ? (
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
                      value={decodeURIComponent(
                        (authlegalId || formData?.authlegalId
                          ? formData?.authlegalId
                          : "Upload Document"
                        )
                          .split("/")
                          .pop()
                          .split("-")
                          .slice(1)
                          .join("-")
                      )}
                      style={{
                        color:
                          authlegalId || formData?.authlegalId
                            ? "#000"
                            : "#919191",
                      }}
                      placeholder="Upload Document"
                      readOnly
                    />
                  </>
                )}
                {authlegalId || formData?.authlegalId ? (
                  <img
                    src="/Images/Investor/deleteicon.svg"
                    alt="Delete Icon"
                    onClick={() => handleDeleteAuthlegalid()}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <img
                    src="/Images/Investor/uploadicon.svg"
                    alt="Upload Icon"
                    // onClick={() => signatoryIdRef.current.click()}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="kyc__andprofile__step2__form__container2">
            <div className="kyc__andprofile__step2__form">
              <p className="kyc__andprofile__step2__form_label">
                Tax Registration Certificate
              </p>
              <div className="proof__text__container__kyc" onClick={() => taxCertificateRef.current.click()}>
                <input
                  type="file"
                  ref={taxCertificateRef}
                  style={{ display: "none" }}
                  onChange={handleTaxCertificate}
                />
                {dotloadingtaxCertificate ? (
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
                      value={decodeURIComponent(
                        (taxCertificate || formData?.taxCertificate
                          ? formData?.taxCertificate
                          : "Upload Document"
                        )
                          .split("/")
                          .pop()
                          .split("-")
                          .slice(1)
                          .join("-")
                      )}
                      style={{
                        color:
                          taxCertificate || formData?.taxCertificate
                            ? "#000"
                            : "#919191",
                      }}
                      placeholder="Upload Document"
                      readOnly
                    />
                  </>
                )}

                {taxCertificate || formData?.taxCertificate ? (
                  <img
                    src="/Images/Investor/deleteicon.svg"
                    alt="Delete Icon"
                    onClick={() => handleDeletecertificate()}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <img
                    src="/Images/Investor/uploadicon.svg"
                    alt="Upload Icon"
                    // onClick={() => taxCertificateRef.current.click()}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            </div>

            <div className="kyc__andprofile__step2__form">
              <p className="kyc__andprofile__step2__form_label">
                Portfolio of Completed Projects{" "}
                {/* <span className="optional__kyc__text">(Optional)</span> */}
              </p>
              <div className="proof__text__container__kyc"    onClick={() => projectPortfolioRef.current.click()}>
                <input
                  type="file"
                  ref={projectPortfolioRef}
                  style={{ display: "none" }}
                  onChange={handlePortfolio}
                // value={portfolio || formData?.portfolio || ""}
                />
                {dotloadingportfolio ? (
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
                      value={decodeURIComponent(
                        (portfolio || formData?.portfolio
                          ? formData?.portfolio
                          : "Upload Document"
                        )
                          .split("/")
                          .pop()
                          .split("-")
                          .slice(1)
                          .join("-")
                      )}
                      style={{
                        color:
                          portfolio || formData?.portfolio ? "#000" : "#919191",
                      }}
                      placeholder="Upload Document"
                      readOnly
                    />
                  </>
                )}
                {portfolio || formData?.portfolio ? (
                  <img
                    src="/Images/Investor/deleteicon.svg"
                    alt="Delete Icon"
                    onClick={() => handleDeleteport()}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <img
                    src="/Images/Investor/uploadicon.svg"
                    alt="Upload Icon"
                    // onClick={() => projectPortfolioRef.current.click()}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="kyc__info__stepsprofile__button__container">
        <button onClick={handleBack} className="kycinfo__step2__back__button">
          Back
        </button>
        <button onClick={handleNext} className="kycinfo__step2__next__button">
          Preview
        </button>
      </div>
    </div>
  );
}

export default KycAndProfileStep2;
