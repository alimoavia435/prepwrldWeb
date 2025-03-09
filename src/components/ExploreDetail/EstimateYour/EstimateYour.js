import React, { useState } from "react";
import "./EstimateYour.css";

function EstimateYour({
  amenitiesLength,
  ethValues,
  TotalFraction,
  buyQuantity,
  fractionAmount,
  roi,
}) {
  const [activeButton, setActiveButton] = useState("Daily"); // State to track the active button

  // Function to handle the button click and set the active button
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const [fraction, setFraction] = useState(0);
  const [ethValue, setEthValue] = useState(0);
  const [amenities, setAmenities] = useState(0);
  const [fractionValue, setFractionValue] = useState("");
  const calculateQuote = () => {
    const result = (fraction * fractionAmount) / roi;
    if (activeButton == "Daily") setFractionValue(result / 30);
    if (activeButton == "Weekly") setFractionValue((result / 30) * 7);
    if (activeButton == "Monthly") setFractionValue(result);
    if (activeButton == "Quarterly") setFractionValue(result * 4);
    if (activeButton == "Yearly") setFractionValue(result * 12);
  };
  const handleFractionChange = (e) => {
    setFraction(e.target.value);
  };

  const handleEthValueChange = (e) => {
    setEthValue(e.target.value);
  };

  const handleAmenitiesChange = (e) => {
    setAmenities(e.target.value);
  };

  // const getSliderBackground = () => {
  //   const percentage = (fraction / 10) * 100;
  //   return `linear-gradient(90deg, #139ed5 ${percentage}%, #d3d3d3 ${percentage}%)`;
  // }
  // ;
  // Function to calculate slider background
  const getSliderBackground = (value, max) => {
    const percentage = (value / max) * 100;
    return `linear-gradient(90deg, #139ed5 ${percentage}%, #d3d3d3 ${percentage}%)`;
  };

  console.log("received anemities length is.......", amenitiesLength);
  console.log("received eth value is.....", ethValues);
  console.log("received quantity buy  is.....", buyQuantity);
  console.log("received fraction amount is.......", fractionAmount);
  console.log("recieved roi is......", roi);

  return (
    <>
      <div className="EstimateYourContainer">
        <div className="EstimateAnd_ButtonsContainer">
          <div>
            <h2 className="Esitmate__Text">Estimate your ROI</h2>
          </div>

          <div className="Buttons__ContainerEStimate">
            <button
              className={`EstimatesYour__Buttons ${
                activeButton === "Daily" ? "active" : ""
              }`}
              onClick={() => {
                handleButtonClick("Daily");
                calculateQuote();
              }}
            >
              Daily
            </button>
            <button
              className={`EstimatesYour__Buttons_weekly ${
                activeButton === "Weekly" ? "active" : ""
              }`}
              onClick={() => {
                handleButtonClick("Weekly");
                calculateQuote();
              }}
            >
              Weekly
            </button>
            <button
              className={`EstimatesYour__Buttons ${
                activeButton === "Monthly" ? "active" : ""
              }`}
              onClick={() => {
                handleButtonClick("Monthly");
                calculateQuote();
              }}
            >
              Monthly
            </button>
            <button
              className={`EstimatesYour__Buttons ${
                activeButton === "Quarterly" ? "active" : ""
              }`}
              onClick={() => {
                handleButtonClick("Quarterly");
                calculateQuote();
              }}
            >
              Quarterly
            </button>
            <button
              className={`EstimatesYour__Buttons ${
                activeButton === "Yearly" ? "active" : ""
              }`}
              onClick={() => {
                handleButtonClick("Yearly");
                calculateQuote();
              }}
            >
              Yearly
            </button>
          </div>
        </div>
        <div className="EstimatRight__LeftContainer">
          <div className="EstimatRight__LeftContainer1">
            <div>
              <h2 className="DailyEstimat_TextAlign">No of Fractions</h2>

              <div className="fraction_display">
                <input
                  type="range"
                  min="0"
                  max={TotalFraction}
                  value={fraction}
                  step="1"
                  onChange={(e) => {
                    handleFractionChange(e);
                    calculateQuote(); 
                  }}
                  style={{
                    background: getSliderBackground(fraction, TotalFraction),
                  }}
                />
                <span className="fraction_value">
                  {fraction} / {TotalFraction} Fractions
                </span>
              </div>
            </div>

            <div>
              <h2 className="DailyEstimat_TextAlign">Value</h2>
              <div className="fraction_display">
                <input
                  type="range"
                  min="0"
                  max={ethValues}
                  value={ethValue}
                  step="0.00001"
                  onChange={handleEthValueChange}
                  style={{
                    background: getSliderBackground(
                      ethValue,
                      ethValues
                    ),
                  }}
                />
                <span className="fraction_value">
                  ${parseFloat(ethValue).toFixed(2)}/${ethValues}
                </span>
              </div>
            </div>

            <div>
              <h2 className="DailyEstimat_TextAlign">Amenities</h2>
              <div className="fraction_display">
                <input
                  type="range"
                  min="0"
                  max={amenitiesLength}
                  value={amenities}
                  step="1"
                  onChange={handleAmenitiesChange}
                  style={{
                    background: getSliderBackground(amenities, amenitiesLength),
                  }}
                />
                <span className="fraction_value">
                  {amenities}/{amenitiesLength} Amenities
                </span>
              </div>
            </div>
          </div>

          <div className="Estimat__rightCard">
            <h3 className="DailyEstimat_TextAlign">{activeButton} Estimate</h3>

            <div className="Estimate__DailyFraction">
              <p className="Total_Daily_fraction">
                Total {activeButton} Fractions{" "}
                <span className="SpanNUmber">({fraction})</span>
              </p>
              <h4 className="Eth__estimate_Text">
                ${(fractionValue ? fractionValue : 0)?.toFixed(2)}
              </h4>
            </div>
            <button onClick={calculateQuote} className="Estimate__CardBtn">
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EstimateYour;
