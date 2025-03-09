
import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import useClaimRoi from "../../../../hooks/Contract/useClaimRoi"
import useWeb3 from "../../../../hooks/Web3Connection/useWeb3"
import ConnectWallet from "../../../ConnectWallet/ConnectWallet";
import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { claim } from "../../../../services/redux/middleware/claim";
import { getROI } from "../../../../services/redux/middleware/getRoi"
import { id } from 'ethers';
import { gql, request } from "graphql-request";

const DEPOSIT = gql`
  query GetDeployedProperties($propertyAddress: String!) {
    depositDatas(where: { PropertyAddress: $propertyAddress }) { 
     DepositAmount
    DueAmount
    PropertyAddress
    PropertyID
    ROIPercentage
    ROIPeriod
    availableFractions
    blockNumber
    blockTimestamp
    id
    totalFractions
    transactionHash
    }
  }
`;


function Deposit({ propertyid, ethValues, amenitiesLength, TotalFraction, contractAddress }) {
  console.log("received length of amenities is..........", amenitiesLength)
  const { account, chainId } = useWeb3React();
  const customweb3 = useWeb3();
  const [openmodal, setOpenModal] = useState(false);
  const { ClaimRoiHook } = useClaimRoi();
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const web3 = new Web3(window.ethereum);
  const [ethPrice, setEthPrice] = useState(null);
  const [DepositData, setDepositData] = useState();
  const customWeb3 = useWeb3();
  const url =
    "https://api.studio.thegraph.com/query/98730/evoxproperty/version/latest";
  useEffect(() => {
    const getEthPrice = async () => {
      try {

        const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
        setEthPrice(response.data.ethereum.usd);
      } catch (error) {
        console.error("Error fetching ETH price:", error);
      }
    };

    getEthPrice();
  }, []);

  const convertDollarToEther = (usdAmount) => {
    if (ethPrice) {
      return usdAmount / ethPrice;
    }
    return 0;
  };

  const dispatch = useDispatch();

  const handleDeposit = async () => {
    if (!account) {
      console.log("tttttttt");
      handleOpen();
      return;
    }
    try {
      if (!customweb3 || !account) {
        console.error("Web3 or account not initialized");
        return;
      }
      const amount = ethValues ? ethValues : 1;
      console.log("valueinusdt", amount);
      // const amount = convertDollarToEther(valueinusdt).toFixed(15);
      console.log(customweb3);
      console.log(propertyid);
      console.log("etherconverted", amount);
      console.log(account);
      const propertyID = parseInt(propertyid);
      console.log(propertyID);
      const response = await ClaimRoiHook(
        customweb3,
        propertyID,
        amount,
        account,
      );
      console.log("claimresponse", response);
      const userid = localStorage.getItem('Id');
      if (response?.status) {
        const data = {
          propertyId: propertyid,
          claimAmount: amount,
          userId: userid
        }
        dispatch(claim(data)).then((res) => {
          console.log(res, "res");
        });
      }
    } catch (error) {
      console.error("Error processing live project", error);
    }
  }
  const roiData = useSelector(
    (state) => state?.getROI
  );
  console.log("roi data is...", roiData);

  useEffect(() => {
    // setIsLoading(true);
    const handlegetRoi = () => {
      try {
        const data = {
          propertyId: propertyid

        }
        console.log("id roi is......", data)
        dispatch(getROI(data));
      } catch (error) {
        console.error("Error fetching explore details:", error);
      }
    }
    handlegetRoi();
  }, []);


  const fetchData = async () => {
    // setIsLoading(true);
    try {
      console.log("hash propertie", url, DEPOSIT);
      const result = await request(url, DEPOSIT, {
        propertyAddress: contractAddress,
      });
      console.log("Deposit Data", result?.depositDatas[0]);
      if (result?.depositDatas?.[0]) {
        setDepositData(result?.depositDatas[0])
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
    <>
      <ConnectWallet showWallet={openmodal} onHide={handleClose} />
      <div className="ClaimMain">
        <p className="ClaimHeading">
          Deposit
        </p>
        <div className="ClaimFractions">
          <div className="DevOverviewPage_div_1">
            <p className="DevOverviewPage_div_1_p1">
              ROI Percentages</p>
            <p className="DevOverviewPage_div_1_p2">
              {DepositData ? customWeb3.utils.fromWei(DepositData.ROIPercentage, 'ether') : 0}%
            </p>
          </div>
          <div className="DevOverviewPage_div_1">
            <p className="DevOverviewPage_div_1_p1">
              ROI Period</p>
            <p className="DevOverviewPage_div_1_p2">
              {DepositData?.ROIPeriod === 0 ? "Monthly" : "Yearly"}
            </p>
          </div>
          <div className="DevOverviewPage_div_1">
            <p className="DevOverviewPage_div_1_p1">
              Fractions</p>
            <p className="DevOverviewPage_div_1_p2">
              {DepositData?.availableFractions}
            </p>
          </div>
          <div className="DevOverviewPage_div_1">
            <p className="DevOverviewPage_div_1_p1">
              Deposit for this month</p>
            <p className="DevOverviewPage_div_1_p2">
              {DepositData?.totalDeposit / 1000000} USDT
            </p>
          </div>
          <div className="DevOverviewPage_div_11">
            <p className="DevOverviewPage_div_1_p11">
              Total Deposit Amount Due</p>
            <p className="DevOverviewPage_div_1_p21" style={{ whiteSpace: "nowrap" }}>
              {DepositData?.DueAmount / 1000000} USDT
            </p>
          </div>
        </div>
        <button className="ClaimButton"
          onClick={handleDeposit}
        >
          Deposit
        </button>
      </div>
    </>
  );
}

export default Deposit;