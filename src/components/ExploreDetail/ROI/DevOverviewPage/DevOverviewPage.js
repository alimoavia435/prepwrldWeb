import React, { useState, useEffect } from "react";
import "./DevOverviewPage.css"
import { gql, request } from "graphql-request";
import { useParams } from "react-router-dom";
import useWeb3 from "../../../../hooks/Web3Connection/useWeb3";
const DEV_OVERVIEW = gql`
  query GetDeployedProperties($propertyAddress: String!) {
    roioverviews(where: { PropertyAddress: $propertyAddress }) { 
     PropertyAddress
    PropertyID
    ROIPercentage
    ROIPeriod
    availableFractions
    totalDeposit
    totalFractions
    transactionHash
    blockNumber
    blockTimestamp
    id
    }
  }
`;
function DevOverviewPage({ ethValues, name, amanities, location, contractAddress }) {
  const [ethToUsdRate, setEthToUsdRate] = useState(null);
  console.log(" recived in component eth value isss......", ethValues);
  console.log("received in component  name is........", name);
  console.log("receoved in component  amenities is..........", amanities);
  console.log("received in component location is.........", location);
  const [overvieewData, setovervieewData] = useState();
const customWeb3 = useWeb3();

  const url =
    "https://api.studio.thegraph.com/query/98730/evoxproperty/version/latest";
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



  const fetchData = async () => {
    // setIsLoading(true);
    try {
      console.log("hash propertie", url, DEV_OVERVIEW);
      const result = await request(url, DEV_OVERVIEW, {
        propertyAddress: contractAddress,
      });
      console.log("this the hash of code", result?.roioverviews?.[0]);
      if (result?.roioverviews?.[0]) {
        setovervieewData(result?.roioverviews[0])
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [contractAddress]);





  return (
    <div className="over-view-outer-box">
      <div className="inner-div">
        <p className="p-over-view">Overview</p>
        {/* <div>
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
                  {/* <img src="/Images/ExploreImages/Icon.svg" alt={amenity} /> }
                  <p>{amenity}</p>
                </div>
              ))}
            </div>
          </div>

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
        </div> */}



        <div className="DevOverviewPage_div">
          <div className="DevOverviewPage_div_1">
            <p className="DevOverviewPage_div_1_p1">ROI Percentage</p>
            <p className="DevOverviewPage_div_1_p2">{overvieewData ? customWeb3.utils.fromWei(overvieewData.ROIPercentage, 'ether') : 0}%</p>
          </div>

          <div className="DevOverviewPage_div_1">
            <p className="DevOverviewPage_div_1_p1">ROI Period</p>
            <p className="DevOverviewPage_div_1_p2">{overvieewData?.ROIPeriod===0 ? "Monthly":"Yearly"}</p>
          </div>

          <div className="DevOverviewPage_div_1">
            <p className="DevOverviewPage_div_1_p1">Fractions</p>
            <p className="DevOverviewPage_div_1_p2">{overvieewData?.totalFractions}</p>
          </div>

          <div className="DevOverviewPage_div_1">
            <p className="DevOverviewPage_div_1_p1">Total Deposit</p>
            <p className="DevOverviewPage_div_1_p2">{overvieewData?.totalDeposit/1000000}</p>
          </div>
        </div>





      </div>
    </div>
  );
}
export default DevOverviewPage;
