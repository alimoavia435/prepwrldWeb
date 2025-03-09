import React, { useEffect, useState } from "react";
import "./featuredproperties.css";
import box1 from "../../assets/box1.svg";
import box2 from "../../assets/box2.svg";
import box3 from "../../assets/box3.svg";
import bed from "../../assets/bed.svg";
import bathroom from "../../assets/bathroom.svg";
import villa from "../../assets/villa.svg";
import { useNavigate } from "react-router-dom";
import { getExploreDetail } from "../../services/redux/middleware/getExploreInvestors";
import { useDispatch, useSelector } from "react-redux";
import { featuredProp } from "../../services/redux/middleware/featuredProp";

import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";

const query = gql`
  {
    deployedProperties {
    Property
    PropertyDeveloper
    PropertyFractions
    PropertyID
    PropertyUri
    PropertyName
    _ROIPercentage
    perFractionPriceInEVOX
    perFractionPriceInNative
    id
  
    }
  }
`;

const url =
  "https://api.studio.thegraph.com/query/98730/evoxpropertyinbnb/version/latest";

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const navigateToDetail = () => {
    navigate("/explore-detail");
  };
  const [isLoading, setIsLoading] = useState(false);

  const [exploreData, setExploreData] = useState();
  const [metaData, setMetaData] = useState();
  const [convertedPrices, setConvertedPrices] = useState({});

  const fetchMetadata = async (cid) => {
    const ipfsGateway = "https://gateway.pinata.cloud/ipfs/";
    const cidWithoutIpfs = cid;

    const url = `${ipfsGateway}${cidWithoutIpfs}`;
    //
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch metadata");
      const metadata = await response.json();
      console.log("nftsData", metadata);
      return metadata; // Return fetched metadata
    } catch (error) {
      console.error("Error fetching metadata:", error);
      return null; // Return null if fetch fails
    }
  };

  const { data } = useQuery({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, query);
    },
  });
  console.log("Data from blockchainm:", data);

  useEffect(() => {
    setIsLoading(true);

    if (data) {
      setExploreData(data);
    }
    setIsLoading(false);
  }, [data]);

  useEffect(() => {
    const fetchAllMetadata = async () => {
      if (Array.isArray(data?.deployedProperties)) {
        try {
          // Fetch metadata for each property and combine it with the original property data
          const enrichedProperties = await Promise.all(
            data.deployedProperties.map(async (property) => {
              if (property?.PropertyUri) {
                try {
                  const metadata = await fetchMetadata(property.PropertyUri);
                  return { ...property, metadata }; // Attach metadata to the property
                } catch (error) {
                  console.error(
                    `Error fetching metadata for ${property.PropertyUri}:`,
                    error
                  );
                  return { ...property, metadata: null }; // Include null metadata on failure
                }
              } else {
                console.warn(
                  "PropertyUri is not available for a property:",
                  property
                );
                return { ...property, metadata: null }; // Include null metadata for missing URIs
              }
            })
          );

          // Update the metadata state with enriched properties
          setMetaData(enrichedProperties);

          console.log("Enriched Properties with Metadata:", enrichedProperties);
        } catch (error) {
          console.error("Error fetching metadata for all properties:", error);
        }
      } else {
        console.warn("deployedProperties is not an array or is unavailable.");
      }
    };

    if (data) {
      fetchAllMetadata();
    }
  }, [data]);
  async function convertWeiToUsdt(weiAmount) {
    try {
      // Step 1: Convert Wei to Ether (using BigInt, then convert to number)
      const etherAmount = Number(weiAmount) / 1e18; // Convert BigInt to Number and then divide
      // Step 2: Fetch live ETH to USDT exchange rate (from Binance API)
      const response = await fetch(
        "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT"
      );
      const data = await response.json();

      if (data && data.price) {
        const ethToUsdtRate = parseFloat(data.price); // Extract price from the response

        // Step 3: Convert Ether to USDT
        const usdtAmount = etherAmount * ethToUsdtRate;
        console.log(`Converted USDT Amount: ${usdtAmount}`);

        return usdtAmount;
      } else {
        throw new Error("Failed to fetch ETH to USDT exchange rate");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    const fetchConvertedPrices = async () => {
      const newPrices = {};
      for (const card of exploreData?.deployedProperties) {
        const priceInUsdt = await convertWeiToUsdt(card?.perFractionPriceInNative);
        newPrices[card.id] = priceInUsdt; // Assuming `card.id` is a unique identifier
        
      }
      console.log("converted",exploreData?.deployedProperties?.perFractionPriceInNative);
      setConvertedPrices(newPrices);
    };

    if (exploreData?.deployedProperties.length) {
      fetchConvertedPrices();
    }
  }, [exploreData?.deployedProperties]);

  const ExploreDetailData = useSelector(
    (state) => state?.featuredProp?.featuredProp?.data?.liveProjects
  );
  console.log("123...", ExploreDetailData);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        await dispatch(featuredProp());
      } catch (error) {
        console.error("Error fetching explore details:", error);
      }
      setIsLoading(false);
    })();
  }, [dispatch]);

  return (
    <div className="featuredProperties">
      <p className="Featured">Featured Properties</p>
      <div className="secondDiv">
        <p className="explorehandpicked">
          Explore our handpicked selection of featured properties. Each listing
          offers a glimpse into exceptional homes and investments available
          through Estatein. Click "View Details" for more information.
        </p>
        <button className="viewProp" onClick={() => navigate("/explore")}>
          View All Properties
        </button>
      </div>
      <div className="featuredBoxesdiv">
        {metaData?.slice(-6)?.map((card, index) => (
          <div className="card">
            <img
              src={card?.metadata?.photos[0]}
              alt="Seaside Serenity Villa"
              className="card-image"
              height={255}
              style={{ borderRadius: "10px", objectFit: "cover" }}
            />
            <div className="card-content">
              <div className="card-content-header">
                <h3 className="card-title">
                  {" "}
                  {card?.metadata?.name
                    ? card?.metadata?.name.length > 20
                      ? `${card?.metadata?.name.substring(0, 20)}...`
                      : card?.metadata?.name
                    : "----"}
                </h3>
                <p className="card-description">
                  {card?.metadata?.propertyType &&
                  card?.metadata?.propertyType.length > 80
                    ? `${card?.metadata?.propertyType.substring(0, 80)}...`
                    : card?.metadata?.propertyType || "----"}
                </p>
              </div>
              <div className="new-design">
                {card?.metadata?.features
                  ?.slice(0, 3)
                  ?.map((amenity, index) => (
                    <div className="card-features">
                      <div className="bed">
                        {/* <img src={bed} alt="bed" />{" "} */}
                        {amenity
                          ? amenity.length > 15
                            ? `${amenity.substring(0, 15)}...`
                            : amenity
                          : "----"}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="main__page__view__button__container">
                <div className="card-price">
                  <p className="price">Price</p>
                  <p className="priceamount">
                    $
                    {(
                      convertedPrices[card.id] &&
                      convertedPrices[card.id] * exploreData?.deployedProperties?.perFractionPriceInNative
                    )?.toFixed(2)}
                  </p>
                </div>
                <button
                  className="ViewPropDetails"
                  onClick={() => {
                    console.log(
                      "ID passed through explore page is ......",
                      card?.PropertyID
                    );
                    window.scrollTo(0, 0);
                    navigate(`/explore-detail/${card?.PropertyID}`);
                  }}
                >
                  View Property Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "space-between",
        }}
      ></div>
    </div>
  );
};
export default FeaturedProperties;
