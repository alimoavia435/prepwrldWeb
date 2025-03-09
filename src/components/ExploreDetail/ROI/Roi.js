import React, { useState ,useEffect} from "react";
import Claim from "./Claim/Claim";
import History from "./History/history";
import "./Roi.css";
import OverviewPage from "./OverviewPage/OverviewPage";
import { useDispatch,useSelector } from "react-redux";
function Roi({ propertyid,ethValues, name, amanities, location,amenitiesLength,TotalFraction,account }) {
  const [activeButton, setActiveButton] = useState("Overview"); // State to track the active button
  console.log("ethValuesroi",ethValues)
  // Function to handle the button click and set the active button
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  console.log(" recived eth value isss......",ethValues);
  console.log("received name is........",name);
  console.log("receoved amenities is..........",amanities);
  console.log("received location is.........",location);
  console.log("received length is.........",amenitiesLength);
  
  
  

  return (
    <>
      <div className="RoiContainer">
        <div className="headingandbutton">
          <p className="RoiHeading"> ROI</p>
          <div className="Buttons__ContainerEStimate">
            <button
              className={`Roi__Buttons ${
                activeButton === "Overview" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("Overview")}
            >
              Overview
            </button>
            <button
              className={`Roi__Buttons_weekly ${
                activeButton === "Claim" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("Claim")}
            >
              Claim
            </button>
            <button
              className={`Roi__Buttons_weekly2 ${
                activeButton === "History" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("History")}
            >
              History
            </button>
          </div>
        </div>
        {activeButton === "Overview" ? (
        <OverviewPage ethValues={ethValues} name={name} amanities={amanities} location={location} />
      ) : (
        ""
      )}
        {
          activeButton === "Claim" ? <Claim
          propertyid={propertyid}
          ethValues={ethValues}
          amenitiesLength={amenitiesLength}
          TotalFraction={TotalFraction}
          /> :""
        }
                {
          activeButton === "History" ? <History propertyid={propertyid} account={account} /> :""
        }
      </div>
    </>
  );
}

export default Roi;
