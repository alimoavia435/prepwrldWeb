import React, { useState } from "react";
import "./roiInfo.css";
import { addProperty } from "../../services/redux/middleware/devAddProperty";
import { useDispatch } from "react-redux";
import ScreenLoader from "../loader/ScreenLoader";
import { toast } from "react-toastify";
function  RoiInfo({ setShowModal, getPropertyID, formData, handleInputChange }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({}); // State to manage errors
  const [loader, setLoading] = useState(false);
  const validateForm = () => {
    const newErrors = {};
    if (!formData.ROIPercentage)
      newErrors.ROIPercentage = "ROI Percentage is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  const handleModalOpen = () => {
    if (validateForm()) {
      const mainImageBucket = localStorage.getItem("PropertyMainImage");
      const bannerImageBucket = localStorage.getItem("PropertyBannerImage");
      formData.mainImage = mainImageBucket || "";
      formData.bannerImage = bannerImageBucket || "";
      localStorage.removeItem("PropertyMainImage");
      localStorage.removeItem("PropertyBannerImage");
      if (formData) {
        setLoading(true);
        dispatch(addProperty(formData)).then((res) => {
          console.log("res is..........",res)
          console.log(res?.payload?.property?._id,"usman pala");
          if (
            res?.payload?.message ===
            "Property created successfully and hashed"
          ) {
            setLoading(false);
            toast.success(res?.payload?.message);
            setShowModal(true);
           
            getPropertyID(res?.payload?.property?._id);
            
          } else {
            toast.error("cannot add property")
    
          }
          setLoading(false);
        });
      }
    }
  };
  const handleInputWithError = (e) => {
    const { name, value } = e.target;
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
    <div className="roi__info__maoin__container__1">
      {loader && <ScreenLoader />}
      <div className="submit__input__container">
        <p className="input__roi__label">ROI Percentage</p>
        <input
          className={`input__roi__placeholder ${
            errors?.ROIPercentage ? "errorINPUT" : ""
          }`}
          type="number"
          name="ROIPercentage"
          value={formData.ROIPercentage}
          placeholder="Enter %"
          onChange={handleInputWithError}
        />
        {errors.ROIPercentage && (
          <p className="error-message">{errors?.ROIPercentage}</p>
        )}
      </div>
      
      <button onClick={handleModalOpen} className="submit__step__roi__button">
        Submit
      </button>
    
    </div>
  );
}
export default RoiInfo;