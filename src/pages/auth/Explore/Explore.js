import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Explore.css";
import Navbar from "../../../components/Navbar/navbar";
import { Dropdown } from "react-bootstrap";
import Footer from "../../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getExploreDetail } from "../../../services/redux/middleware/getExploreInvestors";
import ScreenLoader from "../../../components/loader/ScreenLoader";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";

const query = gql`
 {
deployedProperties {
    Property
    PropertyDeveloper
    PropertyFractions
    PropertyID
    PropertyName
    PropertyUri
    _ROIPercentage
    blockNumber
    blockTimestamp
    id
    perFractionPriceInEVOX
    perFractionPriceInNative
    transactionHash
  }
 }
`;

const url =
  "https://api.studio.thegraph.com/query/98730/evoxproperty/version/latest";

function Explore() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [convertedPrices, setConvertedPrices] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenLocation, setIsDropdownOpenLocation] = useState(false);
  const [isDropdownOpenRoi, setIsDropdownOpenRoi] = useState(false);
  const [isDropdownOpenProperty, setIsDropdownOpenProperty] = useState(false);
  const [exploreData, setExploreData] = useState();
  const [metaData, setMetaData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 470);
  const [selected, setselcted] = useState("Sort by");
console.log("convertedPrices",convertedPrices);
  const fetchMetadata = async (cid) => {
    console.log("url that sen");
    const ipfsGateway = "https://gateway.pinata.cloud/ipfs/";
    const cidWithoutIpfs = cid;

    const url = `${ipfsGateway}${cidWithoutIpfs}`;
    console.log("url that send1", url);
    try {
      console.log("url that send", url);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch metadata");
      const metadata = await response.json();
      console.log("nftsData", metadata);
      return metadata;
    } catch (error) {
      console.error("Error fetching metadata:", error);
      return null;
    }
  };
  console.log("data before chain", url, query);
  const { data } = useQuery({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, query);
    },
  });
  console.log("data from bchain", data);

  console.log("Data from blockchain:", metaData);

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
                  console.log("property?.PropertyUri", property?.PropertyUri);
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

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 470);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const goToPage = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleToggle = (isOpen) => {
    setIsDropdownOpen(isOpen);
  };
  const handleToggleLocation = (isOpen) => {
    setIsDropdownOpenLocation(isOpen);
  };
  const handleToggleRoi = (isOpen) => {
    setIsDropdownOpenRoi(isOpen);
  };
  const handleTogglePropoerty = (isOpen) => {
    setIsDropdownOpenProperty(isOpen);
  };
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const ExploreDetailData = useSelector(
    (state) => state?.getExploreDetail?.getExploreDetail?.data?.liveProjects
  );

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        await dispatch(getExploreDetail(currentPage));
      } catch (error) {
        console.error("Error fetching explore details:", error);
      }
      setIsLoading(false);
    })();
  }, [dispatch, currentPage]);
  console.log("new data", ExploreDetailData);
  const newExploreDetailData = useSelector(
    (state) => state?.getExploreDetail?.getExploreDetail?.data?.liveProject
  );
  console.log("new data2", newExploreDetailData);

  const [isDropdown1Open, setIsDropdown1Open] = useState(false);
  const [isDropdown2Open, setIsDropdown2Open] = useState(false);
  const [isDropdown3Open, setIsDropdown3Open] = useState(false);
  const [isDropdown4Open, setIsDropdown4Open] = useState(false);
  const closeAllDropdowns = () => {
    setIsDropdown1Open(false);
    setIsDropdown2Open(false);
    setIsDropdown3Open(false);
    setIsDropdown4Open(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      closeAllDropdowns();
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleDropdownClick = (event, dropdownSetter) => {
    event.stopPropagation();
    dropdownSetter((prev) => !prev);
  };
  const [value, setValue] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const findProperty = () => {
    console.log(value);
    const matchingProperties = newExploreDetailData?.filter((property) =>
      property?.name?.toLowerCase().includes(value.toLowerCase())
    );

    // Update state with filtered properties
    setFilteredProperties(matchingProperties);
  };

  const location = useLocation();
  const headingRef = useRef(null);

  useEffect(() => {
    if (location.hash === "#heading") {
      headingRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  // Function to convert Wei to BNB
  const weiToBNB = (weiAmount) => weiAmount / 1e18;

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
  console.log("exploreData?.deployedProperties",exploreData?.deployedProperties);

  useEffect(() => {
    const fetchConvertedPrices = async () => {
      const newPrices = {};
      for (const card of exploreData?.deployedProperties) {
        const priceInUsdt = await convertWeiToUsdt(card?.perFractionPriceInNative);
        
        newPrices[card.id] = priceInUsdt;
        console.log("priceInUsdt",newPrices);
      }
      setConvertedPrices(newPrices);
    };

    if (exploreData?.deployedProperties.length) {
      fetchConvertedPrices();
    }
  }, [exploreData?.deployedProperties]);








  return (
    <>
      {isLoading && <ScreenLoader />}
      <div>
        <div className="explore__main__container">
          <div className="explore__navbar__container">
            <Navbar />
            <div className="explore__main__container-1">
              <div className="explore__main__heading_container">
                <h1 className="find__property__heading">
                  Find Your Dream Property
                </h1>
                <p className="find__property__paragraph">
                  Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos.
                </p>
              </div>
              <div
                className="property__search__container"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="property__search__container_1">
                  <input
                    className="search__property__text"
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search For A Property"
                  />
                  <button className="find__property__button">
                    <div className="find__property__button_text_container">
                      <img src="/Images/Explore/searchicon.svg" alt="imag" />
                      <p
                        className="find__property__button_text"
                        onClick={findProperty}
                      >
                        Find Property
                      </p>
                    </div>
                  </button>
                </div>
                <div className="property__search__container_2">
                  {/* Dropdown 1 */}
                  <div
                    className="property__search__container_3"
                    onClick={(event) =>
                      handleDropdownClick(event, setIsDropdown1Open)
                    }
                  >
                    <div className="property__search__container_4">
                      <img src="/Images/Explore/priceimg.svg" alt="imge" />
                      <img src="/Images/Explore/divider.svg" alt="imge" />
                      <p className="property__search__text__1">Pricing Range</p>
                    </div>
                    <Dropdown
                      className="custom-dropdown"
                      onToggle={handleToggle}
                    >
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        className="dropdown-toggle-custom"
                      >
                        <img
                          src="/Images/Explore/dropdown.svg"
                          alt="dropdown"
                          className={`dropdown-arrow ${isDropdown1Open ? "rotate" : ""
                            }`}
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="dropdown-menu-custom">
                        <Dropdown.Item
                          href="#/action-1"
                          className="property__search__text__1"
                        >
                          Action 1
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-2"
                          className="property__search__text__1"
                        >
                          Action 2
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-3"
                          className="property__search__text__1"
                        >
                          Action 3
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  {/* Dropdown 2 */}
                  <div
                    className="property__search__container_3"
                    onClick={(event) =>
                      handleDropdownClick(event, setIsDropdown2Open)
                    }
                  >
                    <div className="property__search__container_4">
                      <img src="/Images/Explore/locationicon.svg" alt="imag" />
                      <img src="/Images/Explore/divider.svg" alt="imag" />
                      <p className="property__search__text__1">Location</p>
                    </div>
                    <Dropdown
                      className="custom-dropdown"
                      onToggle={handleToggleLocation}
                    >
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        className="dropdown-toggle-custom"
                      >
                        <img
                          src="/Images/Explore/dropdown.svg"
                          alt="dropdown"
                          className={`dropdown-arrow ${isDropdown2Open ? "rotate" : ""
                            }`}
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="dropdown-menu-custom">
                        <Dropdown.Item
                          href="#/action-1"
                          className="property__search__text__1"
                        >
                          Action 4
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-2"
                          className="property__search__text__1"
                        >
                          Action 5
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-3"
                          className="property__search__text__1"
                        >
                          Action 6
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  {/* Dropdown 3 */}
                  <div
                    className="property__search__container_3"
                    onClick={(event) =>
                      handleDropdownClick(event, setIsDropdown3Open)
                    }
                  >
                    <div className="property__search__container_4">
                      <img src="/Images/Explore/homeicon.svg" alt="imae" />
                      <img src="/Images/Explore/divider.svg" alt="imae" />
                      <p className="property__search__text__1">ROI</p>
                    </div>
                    <Dropdown
                      className="custom-dropdown"
                      onToggle={handleToggleRoi}
                    >
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        className="dropdown-toggle-custom"
                      >
                        <img
                          src="/Images/Explore/dropdown.svg"
                          alt="dropdown"
                          className={`dropdown-arrow ${isDropdown3Open ? "rotate" : ""
                            }`}
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="dropdown-menu-custom">
                        <Dropdown.Item
                          href="#/action-1"
                          className="property__search__text__1"
                        >
                          Action 7
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-2"
                          className="property__search__text__1"
                        >
                          Action 8
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-3"
                          className="property__search__text__1"
                        >
                          Action 9
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  {/* Dropdown 4 */}
                  <div
                    className="property__search__container_3"
                    onClick={(event) =>
                      handleDropdownClick(event, setIsDropdown4Open)
                    }
                  >
                    <div className="property__search__container_4">
                      <img src="/Images/Explore/propertysize.svg" alt="iage" />
                      <img src="/Images/Explore/divider.svg" alt="imae" />
                      <p className="property__search__text__1">Property Size</p>
                    </div>
                    <Dropdown
                      className="custom-dropdown"
                      onToggle={handleTogglePropoerty}
                    >
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        className="dropdown-toggle-custom"
                      >
                        <img
                          src="/Images/Explore/dropdown.svg"
                          alt="dropdown"
                          className={`dropdown-arrow ${isDropdown4Open ? "rotate" : ""
                            }`}
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="dropdown-menu-custom">
                        <Dropdown.Item
                          href="#/action-1"
                          className="property__search__text__1"
                        >
                          Action 10
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-2"
                          className="property__search__text__1"
                        >
                          Action 11
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-3"
                          className="property__search__text__1"
                        >
                          Action 12
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="exploreworld__main__container" ref={headingRef}>
            <div className="exploreworld__main__container-1">
              <div className="exploreworld__main__header-1">
                <p className="explore__world__heading">
                  Explore a World of Possibilities
                </p>
                <p className="explore__world__subheading">
                  Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
              </div>
              <button
                style={{ background: "#139ed5" }}
                className="filter__button__main"
              >
                <div
                  className="filter__button__main1"
                  tabIndex={0}
                  onBlur={closeDropdown}
                >
                  <div
                    style={{ display: "flex", gap: "5px" }}

                  >
                    <img src="/Images/Explore/sort.svg" alt="filter icon" />
                    <p className="filter__button__text"> {selected}</p>
                  </div>
                  <div className="dropdown-container">
                    <img
                      src="/Images/Explore/dropdownfilter.svg"
                      alt="dropdown icon"
                      className={`dropdown-icon ${isOpen ? "rotate" : ""}`}
                      onClick={toggleDropdown}
                    />
                    {isOpen && (
                      <div className="dropdown-content">
                        <ul className="dropdown__content__second__main">
                          <li className="sort__dropdown__text" onClick={() => {
                            setselcted("Newly Listed")
                            setIsOpen(false);
                          }}>Newly Listed</li>
                          <li className="sort__dropdown__text" onClick={() => {
                            setselcted("Price High to Low")
                            setIsOpen(false);
                          }}>
                            Price High to Low
                          </li>
                          <li className="sort__dropdown__text" onClick={() => {
                            setselcted("Price Low to High")
                            setIsOpen(false);
                          }}>
                            Price Low to High
                          </li>
                          <li className="sort__dropdown__text" onClick={() => {
                            setselcted("Quantity Available High to Low")
                            setIsOpen(false);
                          }}>
                            Quantity Available High to Low
                          </li>
                          <li className="sort__dropdown__text" onClick={() => {
                            setselcted("Quantity Available Low to High")
                            setIsOpen(false);
                          }}>
                            Quantity Available Low to High
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </div>
            <div className="explore__card__wrapper">
              {metaData?.slice()?.reverse()?.map((card, index) => (
                <div className="explore__card__container" key={index}>
                  <img
                    className="card__main"
                    src={card?.metadata?.photos?.[0] ? card.metadata.photos[0] : ''}
                    alt=""
                  />
                  <div className="explore__card__container1">
                    <div className="explore__card__container_heading">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p className="explore__card__heading">
                          {card?.metadata?.name
                            ? card?.metadata?.name.length > 20
                              ? `${card?.metadata?.name.substring(0, 20)}...`
                              : card?.metadata?.name
                            : "----"}
                        </p>
                        <div className="explore__card__container_heading-1">
                          <img
                            className="image__card__1"
                            src="/Images/Explore/locationcard.svg"
                            alt="Location Icon"
                          />
                          <p className="card__heading__text2">
                            {card?.metadata?.propertyAddress
                              ? card?.metadata?.propertyAddress.length > 16
                                ? `${card?.metadata?.propertyAddress.substring(
                                  0,
                                  16
                                )}...`
                                : card?.metadata?.propertyAddress
                              : "----"}
                          </p>
                        </div>
                      </div>
                      <p className="explore__card__subheading">
                        {/* {card?.metadata?.description &&
                          card?.metadata?.description.length > 80
                          ? `${card?.metadata.description.substring(0, 80)}...`
                          : card?.metadata?.description || "----"} */}
                        {card?.metadata?.propertyType}
                      </p>
                    </div>
                  </div>
                  <div className="cards__button__container">
                    {card?.metadata?.ameneties?.map((amenity, index) => (
                      <div key={index} className="cards__button__container1">
                        <div className="cards__button__container2">
                          <p className="button__card__text_1">
                            {amenity
                              ? amenity.length > 15
                                ? `${amenity.substring(0, 15)}...`
                                : amenity
                              : "----"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cards__button__container_2">
                    <div className="cards__button__container_3">
                      <div className="cards__button__text__container">
                        <img
                          src="/Images/Explore/priceicon.svg"
                          alt="Price Icon"
                        />
                        <p className="price__card__text-1">Price</p>
                      </div>
                      <p className="price__card__text-2">
                        $
                        {(
                          // convertedPrices[card.id] && convertedPrices[card.id] * card?.perFractionPriceInNative
                          convertedPrices[card.id]

                        )?.toFixed(2)}
                      </p>
                    </div>
                    <button
                      className="view__property__detail_button"
                      onClick={() => {
                        console.log(
                          "ID passed through explore page is ......",
                          card?._id
                        );
                        window.scrollTo(0, 0);
                        navigate(`/explore-detail/${card?.PropertyID}`);
                      }}
                    >
                      View Property Details
                    </button>
                  </div>
                </div>
              ))}

              {/* {ExploreDetailData?.paginatedItems
                ?.slice()
                .reverse()
                ?.map((card, index) => (
                  <div className="explore__card__container" key={index}>
                    <img
                      className="card__main"
                      src={card?.mainImage}
                      alt="Card Iage"
                    />
                    <div className="explore__card__container1">
                      <div className="explore__card__container_heading">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="explore__card__heading">
                            {card?.name
                              ? card.name.length > 20
                                ? `${card.name.substring(0, 20)}...`
                                : card.name
                              : "----"}
                          </p>
                          <div className="explore__card__container_heading-1">
                            <img
                              className="image__card__1"
                              src="/Images/Explore/locationcard.svg"
                              alt="Location Icon"
                            />
                            <p className="card__heading__text2">
                              {card?.location
                                ? card.location.length > 16
                                  ? `${card.location.substring(0, 16)}...`
                                  : card.location
                                : "----"}
                            </p>
                          </div>
                        </div>
                        <p className="explore__card__subheading">
                          {card?.description && card?.description.length > 80
                            ? `${card.description.substring(0, 80)}...`
                            : card?.description || "----"}
                        </p>
                      </div>
                    </div>
                    <div className="cards__button__container">
                      {card?.ameneties?.map((amenity, index) => (
                        <div key={index} className="cards__button__container1">
                          <div className="cards__button__container2">
                            <p className="button__card__text_1">
                              {amenity
                                ? amenity.length > 15
                                  ? `${amenity.substring(0, 15)}...`
                                  : amenity
                                : "----"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="cards__button__container_2">
                      <div className="cards__button__container_3">
                        <div className="cards__button__text__container">
                          <img
                            src="/Images/Explore/priceicon.svg"
                            alt="Price Icon"
                          />
                          <p className="price__card__text-1">Price</p>
                        </div>
                        <p className="price__card__text-2">
                          $
                          {card?.fractionPrice
                            ? card?.fractionPrice * card?.numberOfFraction >=
                              1_000_000_000_000
                              ? `${(
                                (card?.fractionPrice *
                                  card?.numberOfFraction) /
                                1_000_000_000_000
                              ).toFixed(1)}T`
                              : card?.fractionPrice * card?.numberOfFraction >=
                                1_000_000_000
                                ? `${(
                                  (card?.fractionPrice *
                                    card?.numberOfFraction) /
                                  1_000_000_000
                                ).toFixed(1)}B`
                                : card?.fractionPrice * card?.numberOfFraction >=
                                  1_000_000
                                  ? `${(
                                    (card?.fractionPrice *
                                      card?.numberOfFraction) /
                                    1_000_000
                                  ).toFixed(1)}M`
                                  : card?.price * card?.numberOfFraction >= 1_000
                                    ? `${(
                                      (card?.fractionPrice *
                                        card?.numberOfFraction) /
                                      1_000
                                    ).toFixed(1)}K`
                                    : card?.fractionPrice * card?.numberOfFraction
                            : "0"}
                        </p>
                      </div>
                      <button
                        className="view__property__detail_button"
                        onClick={() => {
                          console.log(
                            "ID passed through explore page is ......",
                            card?._id
                          );
                          window.scrollTo(0, 0);
                          navigate(`/explore-detail/${card?._id}`);
                        }}
                      >
                        View Property Details
                      </button>
                    </div>
                  </div>
                )
                )
              } */}
            </div>
          </div>
        </div>
        {/* <Stack
          spacing={2}
          sx={{
            padding: "1rem",
            borderRadius: "8px",
            justifyContent: "center !important",
            alignItems: "center !important",
            marginTop: "40px !important",
          }}
        >
          <Pagination
            count={ExploreDetailData?.totalPages || 1}
            page={currentPage}
            onChange={goToPage}
            size={isSmallScreen ? "small" : "large"} // Adjust size for smaller screens
            siblingCount={isSmallScreen ? 1 : 2} // Reduce sibling count for smaller screens
            boundaryCount={isSmallScreen ? 1 : 1} // Adjust boundary count for smaller screens
            sx={{
              "& .MuiPagination-ul": {
                display: "flex",
                gap: "5px",
                justifyContent: "flex-end",
              },
            }}
            renderItem={(item) => (
              <PaginationItem
                slots={{
                  previous: KeyboardArrowLeft,
                  next: KeyboardArrowRight,
                }}
                {...item}
                sx={{
                  color: "#000",
                  borderRadius: "8px",
                  border: "1px solid #CDCDCD",
                  fontSize: "13px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#139ED5 !important",
                    color: "#fff !important",
                    borderRadius: "8px !important",
                  },
                }}
              />
            )}
          />
        </Stack> */}
        <div className="footer__explore__container">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Explore;
