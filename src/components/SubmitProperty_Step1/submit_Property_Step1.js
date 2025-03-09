import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import "./submit_property_Step1.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Submit_Property_Step1({
  formData,
  handleInputChange,
  setSelectedStep,
}) {
  const [selectedPropertyType, setselectedPropertyType] = useState(
    "Select Property Type"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenPrice, setIsDropdownOpenPrice] = useState(false);
  const [isDropdownOpenPayment, setIsDropdownOpenPayment] = useState(false);
  const [isDropdownOpenFurnishing, setIsDropdownOpenFurnishing] =
    useState(false);
  const [isDropdownOpenFeatures, setIsDropdownOpenFeatures] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("Select Price");
  const [selectedPaymentTerm, setSelectedPaymentTerm] = useState(
    "Select Payment Terms"
  );
  const [selectedFurnishingStatus, setSelectedFurnishingStatus] =
    useState("Select Status");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [latestSelectedFeature, setLatestSelectedFeature] = useState("");
  const [startDate, setStartDate] = useState(null);
  const startDatePickerRef = useRef(null);

  const handleSelectPaymentTerm = (eventKey) => {
    setSelectedPaymentTerm(eventKey);
  };
  // const handleSelectPrice = (eventKey) => {
  //   setSelectedPrice(eventKey);
  // };
  const toggleDropdown = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };
  const handleSelect = (eventKey) => {
    setselectedPropertyType(eventKey);
  };
  const handleSelectFeatures = (eventKey) => {
    let updatedFeatures;

    if (selectedFeatures.includes(eventKey)) {
      updatedFeatures = selectedFeatures.filter(
        (feature) => feature !== eventKey
      );
    } else {
      updatedFeatures = [...selectedFeatures, eventKey];
    }

    setSelectedFeatures(updatedFeatures);

    if (updatedFeatures.length > 0) {
      setLatestSelectedFeature(updatedFeatures[updatedFeatures.length - 1]);
    } else {
      setLatestSelectedFeature("");
    }
  };

  // const togglePriceDropdown = (isOpen) => {
  //   setIsDropdownOpenPrice(isOpen);
  // };
  const togglePaymentDropdown = (isOpen) => {
    setIsDropdownOpenPayment(isOpen);
  };
  const toggleFurnishingDropdown = (isOpen) => {
    setIsDropdownOpenFurnishing(isOpen);
  };
  const toggleFeatureDropdown = (isOpen) => {
    setIsDropdownOpenFeatures(isOpen);
  };

  useEffect(() => {
    formData.propertyType = selectedPropertyType;
    formData.paymentTerms = selectedPaymentTerm;
    formData.availableDate = startDate;
    formData.furnishingStatus = selectedFurnishingStatus;
    formData.features = selectedFeatures;
  }, [
    selectedPropertyType,
    selectedPaymentTerm,
    startDate,
    selectedFurnishingStatus,
    selectedFeatures,
  ]);
  const handleNextClick = () => {
    if (
      !formData.name ||
      !formData.propertyType ||
      !formData.propertyAddress ||
      !formData.City ||
      // !formData.numberOfFraction ||
      // !formData.fractionPrice ||
      !formData.State ||
      !formData.Country ||
      !formData.floorArea ||
      !formData.numberOfBeds ||
      !formData.numberOfBaths ||
      !formData.price ||
      !formData.paymentTerms ||
      !formData.availableDate ||
      !formData.furnishingStatus ||
      formData.features.length === 0
    ) {
      toast.error("Please fill in all required fields of step1");
      return;
    }

    setSelectedStep(2);
  };

  return (
    <div className="submit__property__step__1___top__container">
      <div className="submit__property__step__1___main__container">
        <div className="submit__property__step__1___main__container__1">
          <div className="submit__property__step__1___form__container__1">
            <p className="submit__property__step__1___form__label">
              Property Name
            </p>
            <input
              placeholder="Enter Property Name"
              type="text"
              className="submit__property__step__1___form__placeholder"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="submit__property__step__1___form__container__1">
            <p className="submit__property__step__1___form__label">
              Property Type
            </p>
            <Dropdown
              onToggle={(isOpen) => toggleDropdown(isOpen)}
              onSelect={handleSelect}
            >
              <Dropdown.Toggle
                style={{ background: "white", border: "1px solid #cdcdcd " }}
                className="projectcategory-dropdown-toggle"
              >
                <span
                  style={{
                    color:
                      selectedPropertyType !== "Select Property Type"
                        ? "#000"
                        : "#919191",
                  }}
                >
                  {selectedPropertyType}
                </span>
                <img
                  src="/Images/Investor/dropdown.svg"
                  alt="dropdownIcon"
                  className={`dropdown-custom-icon ${
                    isDropdownOpen ? "rotate-icon" : ""
                  }`}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className="projectcategory-dropdown-menu">
                <Dropdown.Item
                  className="projectcategory-dropdown-menu__text"
                  eventKey="Retirement Savings"
                >
                  Retirement Savings
                </Dropdown.Item>
                <Dropdown.Item
                  className="projectcategory-dropdown-menu__text"
                  eventKey="Wealth Growth"
                >
                  Wealth Growth
                </Dropdown.Item>
                <Dropdown.Item
                  className="projectcategory-dropdown-menu__text"
                  eventKey="Real Estate"
                >
                  Real Estate
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="submit__property__step__1___main__container__1">
          <div className="submit__property__step__1___form__container__1">
            <p className="submit__property__step__1___form__label">
              Property Address
            </p>
            <input
              placeholder="Enter Address"
              type="text"
              className="submit__property__step__1___form__placeholder"
              name="propertyAddress"
              value={formData.propertyAddress}
              onChange={handleInputChange}
            />
          </div>
          <div className="submit__property__step__1___form__container__1">
            <p className="submit__property__step__1___form__label">City</p>
            <input
              placeholder="Enter City"
              type="text"
              className="submit__property__step__1___form__placeholder"
              name="City"
              value={formData.City}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="submit__property__step__1___main__container__1">
          <div className="submit__property__step__1___form__container__1">
            <p className="submit__property__step__1___form__label">State</p>
            <input
              placeholder="Enter State"
              type="text"
              className="submit__property__step__1___form__placeholder"
              name="State"
              value={formData.State}
              onChange={handleInputChange}
            />
          </div>
          <div className="submit__property__step__1___form__container__1">
            <p className="submit__property__step__1___form__label">Country</p>
            <input
              placeholder="Enter Country"
              type="text"
              className="submit__property__step__1___form__placeholder"
              name="Country"
              value={formData.Country}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="submit__property__step__1___main__container__1">
          <div className="submit__property__step__1___form__container__1">
            <p className="submit__property__step__1___form__label">
              Floor Area{" "}
              <span className="square__meter__text"> (In Square Meters) </span>
            </p>
            <input
              placeholder="Enter Floor Area"
              type="text"
              className="submit__property__step__1___form__placeholder"
              name="floorArea"
              value={formData.floorArea}
              onChange={handleInputChange}
            />
          </div>
          <div className="submit__property__step__1___form__container__1">
            <p className="submit__property__step__1___form__label">
              Number of Bedrooms
            </p>
            <input
              placeholder="Enter Number of Bedrooms"
              type="number"
              className="submit__property__step__1___form__placeholder"
              name="numberOfBeds"
              value={formData.numberOfBeds}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="submit__property__step__1___main__container__1">
          <div className="submit__property__step__1___form__container__1">
            <p className="submit__property__step__1___form__label">
              Number of Bathrooms
            </p>
            <input
              placeholder="Enter Number of Bathrooms"
              type="number"
              className="submit__property__step__1___form__placeholder"
              name="numberOfBaths"
              value={formData.numberOfBaths}
              onChange={handleInputChange}
            />
          </div>
          <div className="submit__property__step__1___form__container__1">
            <p className="submit__property__step__1___form__label">
              Price of Property
            </p>
            <input
              placeholder="Enter Price of Property"
              type="number"
              className="submit__property__step__1___form__placeholder"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* <div className="submit__property__step__1___main__container__1">
          <div className="submit__property__step__1___form__container__1">
            <p className="submit__property__step__1___form__label">Fractions</p>
            <input
              placeholder="Enter Fractions"
              type="number"
              className="submit__property__step__1___form__placeholder"
              name="numberOfFraction"
              value={formData.numberOfFraction}
              onChange={handleInputChange}
            />
          </div>
          <div className="submit__property__step__1___form__container__1">
            <p className="submit__property__step__1___form__label">
              Price per fraction
            </p>
            <input
              placeholder="Enter Price per fraction"
              type="number"
              className="submit__property__step__1___form__placeholder"
              name="fractionPrice"
              value={formData.fractionPrice}
              onChange={handleInputChange}
            />
          </div>
        </div> */}
        <div className="submit__property__step__1___main__container__1">
          <div className="submit__property__step__1___form__container__1">
            <p className="submit__property__step__1___form__label">
              Payment Terms
            </p>
            <Dropdown
              onToggle={(isOpen) => togglePaymentDropdown(isOpen)}
              onSelect={handleSelectPaymentTerm}
            >
              <Dropdown.Toggle
                style={{ background: "white", border: "1px solid #cdcdcd" }}
                className="projectcategory-dropdown-toggle"
              >
                <span
                  style={{
                    color:
                      selectedPaymentTerm !== "Select Payment Terms"
                        ? "#000"
                        : "#919191",
                  }}
                >
                  {selectedPaymentTerm}
                </span>
                <img
                  src="/Images/Investor/dropdown.svg"
                  alt="dropdownIcon"
                  className={`dropdown-custom-icon ${
                    isDropdownOpenPayment ? "rotate-icon" : ""
                  }`}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className="projectcategory-dropdown-menu">
                <Dropdown.Item
                  className="projectcategory-dropdown-menu__text"
                  eventKey="30 Days"
                >
                  30 Days
                </Dropdown.Item>
                <Dropdown.Item
                  className="projectcategory-dropdown-menu__text"
                  eventKey="60 Days"
                >
                  60 Days
                </Dropdown.Item>
                <Dropdown.Item
                  className="projectcategory-dropdown-menu__text"
                  eventKey="90 Days"
                >
                  90 Days
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="submit__property__step__1___form__container__1">
            <p className="submit__property__step__1___form__label">
              Availability Date
            </p>
            <div className="submit__property__step__1___form__placeholder_div">
              <DatePicker
                className="DatePickerStyle"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                calendarClassName="custom-calendar"
                dayClassName={() => "custom-day"}
                popperPlacement="bottom"
                dateFormat="dd-MM-yyyy"
                placeholderText="Select Date"
                ref={startDatePickerRef}
                onFocus={(e) => e.target.blur()}
                inputProps={{
                  readOnly: true,
                  style: {
                    touchAction: "none",
                    pointerEvents: "none",
                  },
                  inputMode: "none",
                }}
              />

              <img
                src="/Images/SubmitProperty/calenderIcon.svg"
                alt="calendar icon"
                onClick={() => startDatePickerRef.current.setFocus()}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
        <div className="submit__property__step__1___main__container__1">
          <div className="submit__property__step__1___form__container__1">
            <p className="submit__property__step__1___form__label">
              Furnishing Status
            </p>
            <Dropdown onToggle={(isOpen) => toggleFurnishingDropdown(isOpen)}>
              <Dropdown.Toggle
                style={{ background: "white", border: "1px solid #cdcdcd" }}
                className="projectcategory-dropdown-toggle"
              >
                <span
                  style={{
                    color:
                      selectedFurnishingStatus !== "Select Status"
                        ? "#000"
                        : "#919191",
                  }}
                >
                  {selectedFurnishingStatus}
                </span>
                <img
                  src="/Images/Investor/dropdown.svg"
                  alt="dropdownIcon"
                  className={`dropdown-custom-icon ${
                    isDropdownOpenFurnishing ? "rotate-icon" : ""
                  }`}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className="projectcategory-dropdown-menu">
                <Dropdown.Item
                  className="projectcategory-dropdown-menu__text"
                  eventKey="Furnished"
                  onClick={() => setSelectedFurnishingStatus("Furnished")}
                >
                  Furnished
                </Dropdown.Item>
                <Dropdown.Item
                  className="projectcategory-dropdown-menu__text"
                  eventKey="Semi-Furnished"
                  onClick={() => setSelectedFurnishingStatus("Semi-Furnished")}
                >
                  Semi-Furnished
                </Dropdown.Item>
                <Dropdown.Item
                  className="projectcategory-dropdown-menu__text"
                  eventKey="Unfurnished"
                  onClick={() => setSelectedFurnishingStatus("Unfurnished")}
                >
                  Unfurnished
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="submit__property__step__1___form__container__1">
            <p className="submit__property__step__1___form__label">Features</p>
            <>
              <div className="selected-features-container">
                {selectedFeatures.map((feature) => (
                  <button
                    key={feature}
                    className="selected-feature-button"
                    onClick={() => handleSelectFeatures(feature)}
                  >
                    {feature}
                  </button>
                ))}
              </div>

              <Dropdown
                onToggle={(isOpen) => toggleFeatureDropdown(isOpen)}
                onSelect={handleSelectFeatures}
              >
                <Dropdown.Toggle
                  style={{ background: "white", border: "1px solid #cdcdcd" }}
                  className="projectcategory-dropdown-toggle"
                >
                  <span
                    style={{
                      color: selectedFeatures.length > 0 ? "#000" : "#919191",
                    }}
                  >
                    Select Features
                  </span>
                  <img
                    src="/Images/Investor/dropdown.svg"
                    alt="dropdownIcon"
                    className={`dropdown-custom-icon ${
                      isDropdownOpenFeatures ? "rotate-icon" : ""
                    }`}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="projectcategory-dropdown-menu">
                  {["Swimming Pool", "Fitness", "Parking", "Garden"].map(
                    (feature) => (
                      <div
                        key={feature}
                        className="drop__down__selected__conainer"
                        onClick={() => handleSelectFeatures(feature)}
                      >
                        <Dropdown.Item
                          className="projectcategory-dropdown-menu__text"
                          eventKey={feature}
                        >
                          {feature}
                        </Dropdown.Item>
                        {selectedFeatures.includes(feature) && (
                          <img
                            src="/Images/SubmitProperty/tickIcon.svg"
                            alt="tick icon"
                            className="dropdown__tick__icon"
                          />
                        )}
                      </div>
                    )
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={handleNextClick}
          className="next__step__submit__property__step1__button"
        >
          Next Step
        </button>
        <div></div>
      </div>
    </div>
  );
}

export default Submit_Property_Step1;
