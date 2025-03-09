import React, { useState, useEffect } from "react";
import "./kycInfoSteps.css";
import { useDispatch, useSelector } from "react-redux";
import KycStep1 from "../KycStep1/kycStep1";
import KycStep2 from "../KycStep2/kycStep2";
import KycStep3 from "../KycStep3/kycStep3";
import KycStep4 from "../KycStep4/kycStep4";
import { getkyc } from "../../../services/redux/middleware/getkyc";
import ScreenLoader from "../../../components/loader/ScreenLoader";
function KycInfoSteps() {
  const [selectedStep, setSelectedStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    legalId: "",
    phoneNumber: "",
    email: "",
    companyName: "",
    registrationNumber: "",
    companyAddress: "",
    URL: "",
    taxIdentificationNumber: "",
    companyDirectorName: "",
    directorId: "",
    dirPhone: "",
    proofOfIncorporation: "",
    businessLicenseCertificate: "",
    ultimateBeneficalOwner: "",
  });

  const backendData=useSelector((state)=>state?.getkyc?.getkyc?.data?.developer)
  console.log("kycdataaaslctore",backendData);


  useEffect(() => {
    setFormData({
      fullName: backendData?.fullName || "",
      legalId: backendData?.legalId || "",
      phoneNumber: backendData?.phoneNumber || "",
      email: backendData?.email || "",
      companyName: backendData?.companyName || "",
      registrationNumber: backendData?.registrationNumber || "",
      companyAddress: backendData?.companyAddress || "",
      URL: backendData?.URL || "",
      taxIdentificationNumber: backendData?.taxIdentificationNumber || "",
      companyDirectorName: backendData?.companyDirectorName || "",
      directorId: backendData?.directorId || "",
      dirPhone: backendData?.dirPhone || "",
      proofOfIncorporation: backendData?.proofOfIncorporation || "",
      businessLicenseCertificate: backendData?.businessLicenseCertificate || "",
      ultimateBeneficalOwner: backendData?.ultimateBeneficalOwner || "",
    });
  }, [backendData]);




  const dispatch = useDispatch();
  useEffect(() => {
    const getKYCData = async () => {
      setIsLoading(true); 
      try {
        await dispatch(getkyc()); 
      } catch (error) {
        console.error("Failed to fetch KYC data:", error);
      }
      setIsLoading(false); 
    };

    getKYCData();
  }, [dispatch]);




  const steps = [
    { id: 1, text: "Step 1" },
    { id: 2, text: "Step 2" },
    { id: 3, text: "Step 3" },
    { id: 4, text: "Step 4" },
  ];

  const getIcon = (stepId) => {
    if (stepId < selectedStep) return "/Images/Investor/icontick.svg";
    if (stepId === selectedStep) return "/Images/Investor/tickicon2.svg";
    return "/Images/Investor/emptyicon.svg";
  };

  const getTextColor = (stepId) => {
    return stepId <= selectedStep ? "#139ed5" : "#000000";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  localStorage.setItem('selectedStep', selectedStep);
  return (
    <>
    {isLoading && <ScreenLoader />}
    <div className="kyc__info__steps__main__container">
      <div className="kyc__info__text__container">
        <p className="kyc__info__text_1">KYC Info</p>
        <p className="steps__to__complete__text">Steps to complete KYC</p>
      </div>
      <div className="steps__kyc___main__container">
        <div className="property__developer_step1_kyc_container">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div
                className="property__developer_step1_container-1"
                // onClick={() => setSelectedStep(step.id)}
                style={{ cursor: "pointer" }}
              >
                <img src={getIcon(step.id)} alt={`icon for ${step.text}`} />
                <p
                  className="investor__step1__text"
                  style={{ color: getTextColor(step.id) }}
                >
                  {step.text}
                </p>
              </div>
              {index < steps.length - 1 && (
                <img
                  className="image-divider-step"
                  src="/Images/Investor/dividerStep.svg"
                  alt="divider"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {selectedStep === 1 && <KycStep1
        formData={formData}
        handleInputChange={handleInputChange}
        setSelectedStep={setSelectedStep} />}
      {selectedStep === 2 && <KycStep2
        formData={formData}
        handleInputChange={handleInputChange}
        setSelectedStep={setSelectedStep} />}
      {selectedStep === 3 && <KycStep3
        formData={formData}
        handleInputChange={handleInputChange}
        setSelectedStep={setSelectedStep} />}
      {selectedStep === 4 && <KycStep4
        formData={formData}
        handleInputChange={handleInputChange}
        setSelectedStep={setSelectedStep} />}
    </div>
    </>
  );
}

export default KycInfoSteps;
