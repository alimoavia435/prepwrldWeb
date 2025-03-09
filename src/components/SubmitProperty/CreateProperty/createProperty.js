import React, { useState } from "react";
import "./createProperty.css";
import PropertyInfo from "../PopertyInfo/propertyInfo";
import TokenizationInfo from "../TokenizationInfo/tokenizationInfo";
import RoiInfo from "../../RoiInfo/roiInfo";
import { SubmitPropertyModal } from "../../Modals/SubmitPropertyModal";
function CreateProperty() {
  const [selectedStep, setSelectedStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [propertyID, setPropertyID] = useState(null);
  const [formData, setFormData] = useState({
    mainImage: "",
    bannerImage: "",
    name: "",
    description: "",
    ameneties: [""],
    location: "",
    numberOfFraction: 0,
    fractionPrice: 0,
    ROIPercentage: "",

  });
  const getPropertyID = (pId) => {
    setPropertyID(pId);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const addField = () => {
    setFormData((prevData) => ({
      ...prevData,
      ameneties: [...prevData.ameneties, ""],
    }));
  };
  const amenetiesFieldChange = (e, index) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      ameneties: prevData.ameneties.map((amt, iDx) => {
        return iDx == index ? value : amt;
      }),
    }));
  };
  const RemoveAmenetiFIELD = (index) => {
    // Remove the field from formData.ameneties
    setFormData((prev) => {
      const updatedAmenities = [...prev.ameneties];
      updatedAmenities.splice(index, 1); // Remove the selected amenity
      return { ...prev, ameneties: updatedAmenities };
    });
  };
  const steps = [
    { id: 1, text: "Step 1" },
    { id: 2, text: "Step 2" },
    { id: 3, text: "Step 3" },
  ];
  const getIcon = (stepId) => {
    if (stepId < selectedStep) return "/Images/Investor/icontick.svg";
    if (stepId === selectedStep) return "/Images/Investor/tickicon2.svg";
    return "/Images/Investor/emptyicon.svg";
  };
  const getTextColor = (stepId) => {
    return stepId <= selectedStep ? "#139ED5" : "#000000";
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <div className="create__property__main__container">
      <div className="property___info__container">
        <p className="property__info__heading">
          {selectedStep === 1 && "Property Info"}
          {selectedStep === 2 && "Tokenization Info"}
          {selectedStep === 3 && "ROI Info"}
        </p>
        <p className="steps__complete__text">
          Steps to Complete Property Details
        </p>
      </div>
      <div className="steps__main__container__submitProperty">
        <div className="property__developer_step1_submit_container">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div
                className="property__developer_step1_container-1" /*onClick={() => setSelectedStep(step.id)} style={{ cursor: "pointer" }} */
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
      {selectedStep === 1 && (
        <PropertyInfo
          setSelectedStep={setSelectedStep}
          formData={formData}
          handleInputChange={handleInputChange}
          addField={addField}
          amenetiesFieldChange={amenetiesFieldChange}
          RemoveAmenetiFIELD={RemoveAmenetiFIELD}
        />
      )}
      {selectedStep === 2 && (
        <TokenizationInfo
          setSelectedStep={setSelectedStep}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
      {selectedStep === 3 && (
        <RoiInfo
          setShowModal={setShowModal}
          getPropertyID={getPropertyID}
          formData={formData}
          handleInputChange={handleInputChange}
        />
      )}
      <SubmitPropertyModal
        show={showModal}
        handleClose={handleModalClose}
        propertyId={propertyID}
      />
    </div>
  );
}
export default CreateProperty;