import React from "react";
import "./tokenizationInfo.css";
import { useState } from "react";
function TokenizationInfo({ setSelectedStep, formData, handleInputChange }) {
  const [errors, setErrors] = useState({}); // State to manage errors
  const handleBack = () => {
    setSelectedStep(1);
  };
  const handleNext = () => {
    if (validateForm()) {
      // console.log(formData);
      setSelectedStep(3);
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (formData.numberOfFraction === 0)
      newErrors.numberOfFraction = "Number of fractions  is required.";
    if (formData.fractionPrice === 0)
      newErrors.fractionPrice = "Fraction amount is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  const handleInputWithError = (e) => {
    const name = e.target;
    // Clear error for the specific field
    if (errors[name]) {
      setErrors((prevErrors) => {
        const { [name]: removedError, ...remainingErrors } = prevErrors;
        return remainingErrors;
      });
    }
    // Call the parent's handleInputChange function
    handleInputChange(e);
  };
  return (
    <div className="tokenization__info__maoin__container__1">
      <div className="submit__input__container">
        <p className="input__tokenization__label">No. of Fractions</p>
        <input
          className={`input__tokenization__placeholder ${
            errors.numberOfFraction ? "errorINPUT" : ""
          }`} // Highlight if error exists
          type="number"
          name="numberOfFraction"
          value={formData.numberOfFraction || ""}
          placeholder="Enter Value"
          onChange={handleInputWithError}
        />
        {errors.ETHValue && (
          <p className="error-message">{errors.numberOfFraction}</p>
        )}
      </div>
      <div className="submit__input__container">
        <p className="input__tokenization__label">Fraction Price</p>
        <input
          className={`input__tokenization__placeholder ${
            errors.fractionPrice ? "errorINPUT" : ""
          }`} // Highlight if error exists
          type="number"
          name="fractionPrice"
          value={formData.fractionPrice || ""}
          placeholder="Enter Limit"
          onChange={handleInputWithError}
        />
        {errors.walletLimit && (
          <p className="error-message">{errors.fractionPrice}</p>
        )}
      </div>
      <div className="next__step__token__main__container">
        <button className="back__step__token__button" onClick={handleBack}>
          Back
        </button>
        <button className="next__step__token__button" onClick={handleNext}>
          Next Step
        </button>
      </div>
    </div>
  );
}
export default TokenizationInfo;