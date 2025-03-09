import React, { useRef, useState } from "react";
import "./submitProperty_Step2.css";
import { toast } from "react-toastify";
import { uploadfile } from "../../services/redux/middleware/signin";
import { useDispatch } from "react-redux";
function SubmitProperty_Step2({
  setSelectedStep,
  formData,
  handleInputChange,
}) {
  const [dotLoading, setDotLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]); // Stores uploaded URLs
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUploadClick = () => {
    fileInputRef.current.click(); 
  };
  const dispatch = useDispatch();
  const uploadProofOfOwnership = async (file) => {
    if (!file) return;
  
    setUploading(true);
  
    const data = new FormData();
    data.append("file", file);
  
    try {
      const res = await dispatch(uploadfile(data)); // Upload file
  
      if (res?.payload?.message === "Developer Image uploaded successfully.") {
        const imageUrl = res?.payload?.imageUrl; // Get uploaded image URL
        
        setSelectedImage(imageUrl);
        handleInputChange({
          target: { name: "proofOfOwnership", value: imageUrl },
        });
  
        console.log("Uploaded Image URL:", imageUrl);
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
  
    setUploading(false);
  };
  

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      uploadProofOfOwnership(files[0]); 
    }
  };
  
  

  const handleNextClick = () => {
    if (!formData.name || !formData.projectRefNumber || !formData.licenseNumber) {
      toast.error("Please fill in all required fields of step2");
      return;
    }
    setSelectedStep(3);
  };
  const handleBackClick = () => {
    setSelectedStep(1);
  };

  return (
    <div className="submit__property__step__2__top__container__1">
      <div className="submit__property__step__2__main__container__1">
        <div className="submit__property__step__2__form__container__1">
          <div className="submit__property__step__2__form__container__2">
            <p className="submit__property__step__2___form__label">
              Company Name
            </p>
            <input
              placeholder="Enter Company Name"
              type="text"
              className="submit__property__step__2___form__placeholder"
              name="companyName"
              value={formData.companyName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="submit__property__step__2__form__container__2">
            <p className="submit__property__step__2___form__label">
              License Number
            </p>
            <input
              placeholder="Enter License Number"
              type="text"
              className="submit__property__step__2___form__placeholder"
              name="licenseNumber"
              value={formData.licenseNumber || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="submit__property__step__2__form__container__1">
          <div className="submit__property__step__2__form__container__2">
            <p className="submit__property__step__2___form__label">
              Project Reference Number
            </p>
            <input
              placeholder="Enter Reference Number"
              type="number"
              className="submit__property__step__2___form__placeholder1"
              name="projectRefNumber"
              value={formData.projectRefNumber || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="submit__property__step__2__form__container__2">
            <p className="submit__property__step__2___form__label"></p>
            {/* <input
              placeholder="Enter Reference Number"
              type="number"
              className="submit__property__step__2___form__placeholder1"
              name="ROIPercentage"
              value={formData.ROIPercentage || ""}
              onChange={handleInputChange}
            /> */}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "35px" }}>
        <p className="legal-compliance">Legal and Compliance</p>
        <div className="submit__property__step__2__main__container__2">
          <div className="submit__property__step__2__form__container__1">
            <div className="submit__property__step__2__form__container__2">
              <p className="submit__property__step__2___form__label">
                Proof of Ownership
              </p>
              {/* <input
                placeholder="Enter Company Name"
                type="text"
                className="submit__property__step__2___form__placeholder"
                name="companyName"
                value={formData.companyName || ""}
                onChange={handleInputChange}
              /> */}
              {/* <div className="proof__text__container__kyc">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                  accept="image/*"
                />

                {uploading ? (
                  <p className="upload__document__placeholder">
                    <div className="loader">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </p>
                ) : (
                  <input
                    className="extrdivforinput"
                    placeholder="Upload Photo"
                    value={selectedImage ? selectedImage : ""}
                    readOnly
                    onClick={handleUploadClick} // Opens file input on click
                  />
                )}
                <img
                  src="/Images/Investor/uploadicon.svg"
                  alt="Upload Icon"
                  onClick={handleUploadClick} // Opens file input on click
                  style={{ cursor: "pointer" }}
                />
              </div> */}
              <div
                className="img-doc-upload"
                onClick={handleUploadClick}
                style={{ cursor: "pointer" }}
              >
                {dotLoading ? (
                  <div className="loader">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : formData.proofOfOwnership ? (
                  <img
                    src={selectedImage}
                    alt="Uploaded Preview"
                    style={{
                      height: "130px",
                      width: "130px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      display:"flex",
                      flexDirection:"column",
                      justifyContent:"flex-start"
                    }}
                  />
                ) : (
                  <>
                    <img
                      style={{ height: "61px" }}
                      src="/Images/SubmitProperty/uploadIcon.svg"
                      alt="Upload Icon"
                    />
                    <p className="upload__image__text_submit">
                      Upload Your Document Here
                    </p>
                  </>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="kyc__step_3__buttons_container">
        <button onClick={handleBackClick} className="kyc__step3__back__button">
          Back
        </button>
        <button onClick={handleNextClick} className="kyc__step3__next__button">
          Next Step
        </button>
      </div>
    </div>
  );
}

export default SubmitProperty_Step2;
