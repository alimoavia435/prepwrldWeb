import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { uploadfile } from "../../services/redux/middleware/signin";
import "./submitProperty_Step3.css";
import { useDispatch } from "react-redux";
function SubmitPropertyStep3({ setSelectedStep, formData, handleInputChange }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]); // Stores uploaded URLs
  const [uploading, setUploading] = useState(false);
  const [selectedVideoNames, setSelectedVideoNames] = useState([]);
  const videooptRef = useRef(null);
  const multiimguploades = useRef(null);
  const [videooptRefimg, setvideooptRefimg] = useState(false);
  const [multiimages, setimgRefimg] = useState(false);
  const [dotloading, setdotloading] = useState(false);
  const [dotloading1, setdotloading1] = useState(false);
  const dispatch = useDispatch();
  const handleNextClick = () => {
    if (!formData.photos.length) {
      toast.error("Please fill at least one field of Step 3");
      return;
    }

    setSelectedStep(4);
  };
  const handleBackClick = () => {
    setSelectedStep(2);
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files.length) {
      const newImages = [...selectedImages, ...Array.from(files)];
      setSelectedImages(newImages);
      validateImages(newImages);
      uploadImages(Array.from(files));
    }
  };
  const uploadImages = async (images) => {
    setUploading(true);
    const uploadPromises = images.map((file) => {
      const data = new FormData();
      data.append("file", file);

      return dispatch(uploadfile(data)).then((res) => {
        if (
          res?.payload?.message === "Developer Image uploaded successfully."
        ) {
          return res?.payload?.imageUrl; // Return the uploaded image URL
        }
        return null;
      });
    });
    const uploadedUrls = (await Promise.all(uploadPromises)).filter(Boolean); // Remove null values
    setUploadedImageUrls((prevUrls) => [...prevUrls, ...uploadedUrls]);
    formData.photos = [...(formData.photos || []), ...uploadedUrls];
    console.log(formData.photos, "succes kay andar");
    setUploading(false);
  };

  const handleFileUploadvideoopt = (event) => {
    const file = event.target.files[0];

    if (file) {
      setdotloading(true);
      const data = new FormData();
      data.append("file", file);
      dispatch(uploadfile(data)).then((res) => {
        console.log(res, "imagebussiness");
        if (
          res?.payload?.message === "Developer Image uploaded successfully."
        ) {
          setvideooptRefimg(file?.name);
          localStorage.setItem("videoLink", file.name);
          console.log(res?.payload?.imageUrl, "url");
          handleInputChange({
            target: {
              name: "videoLink",
              value: res?.payload?.imageUrl,
            },
          });

          setdotloading(false);
        }
        setdotloading(false);
      });
    }
  };

  const removeImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    const updatedUrls = uploadedImageUrls.filter((_, i) => i !== index);
    console.log(formData.photos, "remove");
    formData.photos = updatedUrls;
    console.log(formData.photos, "after remove");
    setSelectedImages(updatedImages);
    setUploadedImageUrls(updatedUrls);
    validateImages(updatedImages);
  };

  const validateImages = (images) => {
    if (images.length < 3 && images.length > 0) {
      toast.error("Please select at least 3 images.");
    }
  };

  return (
    <div>
      <div className="submit__property__step3__main__container">
        <div className="submit__property__step3__top__container">
          <div className="submit__property__step3__main__container_1">
            <p className="submit_property__step3__photo_text">
              Photos{" "}
              <span className="submit_property__step3__photo_text_1">
                (Min 3 images required)
              </span>
            </p>

            <div className="proof__text__container__kyc"
              onClick={() => document.getElementById("image-input").click()}
            >
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="image-input"
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
                  placeholder="Upload Photos"
                  value={
                    selectedImages.length
                      ? `${selectedImages.length} image(s) selected`
                      : ""
                  }
                  readOnly
                />
              )}
              <img
                src="/Images/Investor/uploadicon.svg"
                alt="Upload Icon"
                // onClick={() => document.getElementById("image-input").click()}
                style={{ cursor: "pointer" }}
              />
            </div>

            <div className="selected-images-container">
              {uploadedImageUrls.map((imageUrl, index) => (
                <div key={index} className="selected-image">
                  <img
                    src={imageUrl}
                    alt={`Selected ${index}`}
                    className="selected-image-thumbnail"
                  />
                  <span
                    className="remove-image-icon"
                    onClick={() => removeImage(index)}
                  >
                    <img
                      src="/Images/SubmitProperty/crossIcon.svg"
                      alt="Remove"
                      className="cross-icon"
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="submit__property__step3__main__container_1">
            <p className="submit_property__step3__photo_text">
              Video{" "}
              <span className="submit_property__step3__photo_text_1">
                (Optional)
              </span>
            </p>

            <div className="proof__text__container__kyc"
              onClick={() => videooptRef.current.click()}
            >
              <input
                type="file"
                multiple
                ref={videooptRef}
                style={{ display: "none" }}
                onChange={handleFileUploadvideoopt}
                id="video-input"
                accept="video/*"
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
                    className="extrdivforinput"
                    style={{ color: formData?.videoLink ? "#000" : "#919191" }}
                    value={
                      formData?.videoLink
                        ? formData.videoLink
                            .split("/")
                            .pop()
                            .replace(/^\d+-/, "")
                        : "Upload video Link"
                    }
                    readOnly
                  />
                </>
              )}
              <img
                src="/Images/Investor/uploadicon.svg"
                alt="Upload Icon"
                // onClick={() => document.getElementById("video-input").click()}
                // onClick={() => videooptRef.current.click()}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="submit__property__step3__main__container_1">
            <p className="submit_property__step3__photo_text">
              3D Virtual Tour Link
              <span className="submit_property__step3__photo_text_1">
                (Optional)
              </span>
            </p>
            <input
              className="submit__property__step__3___form__placeholder"
              type="text"
              placeholder="Enter Link"
              name="VTourLink"
              value={formData.VTourLink || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="submitproperty__step_3__buttons_container">
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

export default SubmitPropertyStep3;
