import React, { useState, useEffect } from "react";
import "./OverviewPage.css";

function OverviewPage({ ethValues, name, amanities, location }) {
  const [ethToUsdRate, setEthToUsdRate] = useState(null);
  console.log(" recived in component eth value isss......", ethValues);
  console.log("received in component  name is........", name);
  console.log("receoved in component  amenities is..........", amanities);
  console.log("received in component location is.........", location);
  useEffect(() => {

    const fetchEthRate = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        const data = await response.json();
        setEthToUsdRate(data.ethereum.usd);
      } catch (error) {
        console.error("Error fetching ETH to USD rate:", error);
      }
    };

    fetchEthRate();
  }, []);

  const usdValue = (ethValues * ethToUsdRate).toFixed(2);
  console.log("shakeel", usdValue)
  return (
    <div className="over-view-outer-box">
      <div className="inner-div">
        <p className="p-over-view">Overview</p>
        <div>
          <div className="sea__side__main__container">
            <p className="sea-side-text">{name}</p>
            <p className="eth-num">{ethValues} ETH</p>
            <p className="eth-price">${usdValue}</p>
            <p className="Fraction">Fractions (2)</p>
          </div>
          <div className="hr-styling">
            <p className="sea-side-text">Amenities</p>
            <div className="amenities-outer-box">
              {amanities?.map((amenity, index) => (
                <div className="Amenities" key={index}>
                  {/* <img src="/Images/ExploreImages/Icon.svg" alt={amenity} /> */}
                  <p>{amenity}</p>
                </div>
              ))}
            </div>
          </div>
          {/* <hr className="hr-stlying" /> */}
          <div className="hr-stlying">
            <p className="sea-side-text">Location</p>
            <div className="Amenities">
              <img src="/Images/Explore/locationicon__1.svg" />
              <p>  {location
                ? location.length > 16
                  ? `${location.substring(
                    0,
                    16
                  )}...`
                  : location
                : "----"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OverviewPage;
