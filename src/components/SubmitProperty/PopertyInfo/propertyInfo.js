import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { uploadPropertyImage } from "../../../services/redux/middleware/devAddProperty";
import { AiOutlineDelete } from "react-icons/ai";
import "./propertyInfo.css";
function PropertyInfo({
  setSelectedStep,
  formData,
  handleInputChange,
  addField,
  amenetiesFieldChange,
  RemoveAmenetiFIELD,
}) {
  const dispatch = useDispatch();
  const [dotloading, setdotloading] = useState(false);
  const [dotloading1, setdotloading1] = useState(false);
  const [errors, setErrors] = useState({}); // State to manage errors
  const fileInputRefs = {
    mainImage: useRef(null),
  };
  const handleIconClick = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };
  //  Main Image Uploading
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setdotloading(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadPropertyImage(data)).then((res) => {
        // console.log(res, "Property Images Data  ==> ");
        if (res?.payload?.message === "Property Image uploaded successfully.") {
          // setSelectedFile(file?.name);
          localStorage.setItem("PropertyMainImage", res?.payload?.imageUrl);
          handleInputWithError({
            target: { name: "mainImage", value: file?.name },
          });
          handleInputChange({
            target: {name: "mainImage", value: res?.payload?.imageUrl}
          })
          setdotloading(false);
        }
        setdotloading(false);
      });
    }
  };
  // Banner image Uploading
  const handleFileUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setdotloading1(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadPropertyImage(data)).then((res) => {
        // console.log(res, "Property Images Data  ==> ");
        if (res?.payload?.message === "Property Image uploaded successfully.") {
          localStorage.setItem("PropertyBannerImage", res?.payload?.imageUrl);
          setdotloading1(false);
          console.log("PropertyBannerImage",res?.payload?.imageUrl)
          // /////// ////////////////////////////////////////
          const imageUrl = URL.createObjectURL(file);
          console.log("bannner",imageUrl)
          handleInputWithError({
            target: { name: "bannerImage", value: imageUrl },
          });
          handleInputChange(
            {
              target: { name: "bannerImage", value: res?.payload?.imageUrl },
            }
          )
          // console.log("Image uploaded:", file.name);
        }
        setdotloading1(false);
      });
    }
  };
  const handleReplace = () => {
    if (fileInputRefs.mainImage.current) {
      fileInputRefs.mainImage.current.click();
    }
  };
  const handleDelete = () => {
    localStorage.removeItem("PropertyMainImage");
    handleInputWithError({
      target: { name: "mainImage", value: "" },
    });
    console.log("Image deleted successfully.");
  };
  const triggerFileInput = () => {
    document.getElementById("imageUploadInput").click();
  };
  const handleSubmit = () => {
    if (validateForm()) {
     console.log(formData);
      setSelectedStep(2);
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.mainImage) newErrors.mainImage = "Main image is required.";
    if (!formData.bannerImage)
      newErrors.bannerImage = "Banner image is required.";
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.location) newErrors.location = "Location is required.";
    newErrors.ameneties = formData.ameneties.map((field, index) =>
      field.trim() ? null : "Amenity is required."
    );
    // Remove `ameneties` from errors if all are valid
    if (newErrors.ameneties.every((err) => !err)) {
      delete newErrors.ameneties;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  //  Remove errors for all fields
  const handleInputWithError = (e) => {
    const name = e.target.name;
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
  // remove errors for Ameneteis only
  const handleInputWithErrorAmenities = (e, index) => {
    // Clear error for the specific field in errors.ameneties
    setErrors((prevErrors) => {
      if (prevErrors.ameneties && prevErrors.ameneties[index]) {
        const updatedAmenitiesErrors = [...prevErrors.ameneties];
        updatedAmenitiesErrors[index] = null; // Clear the error for this specific index
        return {
          ...prevErrors,
          ameneties: updatedAmenitiesErrors,
        };
      }
      return prevErrors;
    });
    //Call the parent method
    amenetiesFieldChange(e, index);
  };
  // Remove Amenetie field
  const removeField = (index) => {
    // Remove the corresponding error from errors.ameneties
    setErrors((prevErrors) => {
      if (prevErrors.ameneties) {
        const updatedAmenitiesErrors = [...prevErrors.ameneties];
        updatedAmenitiesErrors.splice(index, 1); // Remove the error for the deleted field
        return { ...prevErrors, ameneties: updatedAmenitiesErrors };
      }
      return prevErrors;
    });
    // remve from parent
    RemoveAmenetiFIELD(index);
  };
  const handleReplaceBannerImage = () => {
    const fileInput = document.getElementById("imageUploadInput");
    if (fileInput) {
      fileInput.click();
    }
  };
  const handleDeleteBannerImage = () => {
    localStorage.removeItem("PropertyBannerImage");
    handleInputWithError({
      target: { name: "bannerImage", value: "" },
    });
    const fileInput = document.getElementById("imageUploadInput");
    if (fileInput) {
      fileInput.value = null;
    }
    console.log("Banner Image deleted successfully.");
  };
  return (
    <div className="property__info__maoin__container__1">
      {/* Main Image */}
      <div className="main__image__main__container">
        <p className="main__image__label_1">Main Image</p>
        <div className="main__input__container__main">
          <div
            className={`step3__placeholder__container ${
              errors.mainImage ? "errorINPUT" : ""
            }`}
          >
            <p
              className="upload__document__placeholder"
              style={{ color: formData.mainImage != "" ? "black" : "" }}
            >
              {dotloading ? (
                <div className="loader">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <>
                  {formData.mainImage != ""
                    ? formData.mainImage.split("/").pop().replace(/^\d+-/, "") 
                    : "Upload Image"}
                </>
              )}
            </p>
            <img
              src="/Images/Investor/uploadicon.svg"
              alt="Upload Icon"
              onClick={() => handleIconClick(fileInputRefs.mainImage)}
              style={{ cursor: "pointer" }}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRefs.mainImage}
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </div>
          <div className="main__input__container__main__2">
            <button
              onClick={handleReplace}
              className="replace__button__container"
            >
              <img
                src="/Images/SubmitProperty/refreshIcon.svg"
                alt="refesh Icon"
              />
              Replace
            </button>
            <button
              onClick={handleDelete}
              className="delete__submit__propertyButton"
            >
              <img
                src="/Images/SubmitProperty/deleteIcon.svg"
                alt="refesh Icon"
              />
              Delete
            </button>
          </div>
        </div>
        {errors.mainImage && (
          <p className="error-message">{errors.mainImage}</p>
        )}
      </div>
      {/* Banner Image */}
      <div className="banner__upload__image__container">
        <p className="banner__image__label_1">Banner Image</p>
        <div
          className={`banner__image__input__container ${
            errors.bannerImage ? "errorINPUT" : ""
          }`}
        >
          {formData.bannerImage !== "" ? (
            <>
              <div
                style={{ position: "absolute", zIndex: "1" }}
                className="main__input__container__main__2"
              >
                <button
                  onClick={handleReplaceBannerImage}
                  className="replace__button__container"
                >
                  <img
                    src="/Images/SubmitProperty/refreshIcon.svg"
                    alt="Refresh Icon"
                  />
                  Replace
                </button>
                <button
                  onClick={handleDeleteBannerImage}
                  className="delete__submit__propertyButton"
                >
                  <img
                    src="/Images/SubmitProperty/deleteIcon.svg"
                    alt="Delete Icon"
                  />
                  Delete
                </button>
              </div>
              <img
                className="uploaded__image"
                src={formData.bannerImage}
                alt="Uploaded"
                style={{
                  width: "100%",
                  height: "178px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </>
          ) : (
            <div
              className="banner__image__input__container__1"
              onClick={triggerFileInput}
              style={{ cursor: "pointer" }}
            >
              <img
                style={{ height: "61px" }}
                src="/Images/SubmitProperty/uploadIcon.svg"
                alt="Upload Icon"
              />
              <p className="upload__document__placeholder">
                {dotloading1 ? (
                  <div className="loader">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <>
                    <p className="upload__image__text_submit">
                      Upload Your Image Here
                    </p>
                  </>
                )}
              </p>
            </div>
          )}
          <input
            id="imageUploadInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileUploadImage}
          />
        </div>
        {errors.bannerImage && (
          <p className="error-message">{errors.bannerImage}</p>
        )}
      </div>
      {/* Name */}
      <div className="submit__input__container">
        <p className="input__submit__label">Name</p>
        <input
          className={`input__submit__placeholder ${
            errors.name ? "errorINPUT" : ""
          }`} // highlight error
          name="name"
          value={formData.name}
          placeholder="Enter Name"
          onChange={handleInputWithError}
          maxLength={24}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>
      {/* Description */}
      <div className="submit__input__container">
        <p className="input__submit__label">Description</p>
        <textarea
          className={`input__submit__placeholder__description ${
            errors.description ? "errorINPUT" : ""
          }`} // highlight error
          name="description"
          value={formData.description}
          placeholder="Enter Description"
          onChange={handleInputWithError}
        />
        {errors.description && (
          <p className="error-message">{errors.description}</p>
        )}
      </div>
      {/* Location */}
      <div className="submit__input__container">
        <p className="input__submit__label">Location</p>
        <input
          className={`input__submit__placeholder ${
            errors.location ? "errorINPUT" : ""
          }`} // highlight error
          name="location"
          value={formData.location}
          placeholder="Enter Location"
          maxLength={30}
          onChange={handleInputWithError}
        />
        {errors.location && <p className="error-message">{errors.location}</p>}
      </div>
      {/* Amenities (turn to dropdown)*/}
      <div className="anemilities__main__container">
        <p className="input__submit__label">Amenities</p>
        {formData.ameneties.map((field, index) => (
          <div
            className="submit__input__container deleteAmentieContainer"
            key={index}
          >
            <input
              className={`input__submit__placeholder ${
                errors.ameneties?.[index] ? "errorINPUT" : ""
              }`}
              placeholder="Enter Amenity"
              name="ameneties"
              value={field}
              maxLength={20}
              onChange={(e) => handleInputWithErrorAmenities(e, index)}
            />
            {formData?.ameneties?.length > 1 ? (
              <AiOutlineDelete
                color="red"
                className="AamenetiIcon"
                onClick={() => removeField(index)}
              />
            ) : (
              <></>
            )}
            {errors.ameneties?.[index] && (
              <p className="error-message">{errors.ameneties[index]}</p>
            )}
          </div>
        ))}
        <button className="add__more__anemities__button" onClick={addField}>
          Add More Amenities
        </button>
      </div>
      <button onClick={handleSubmit} className="next__step__submit__button">
        Next Step
      </button>
    </div>
  );
}
export default PropertyInfo;