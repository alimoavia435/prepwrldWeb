import React, { useState, useEffect } from "react";
import "./claim.css";
import { useWeb3React } from "@web3-react/core";
import useClaimRoi from "../../../../hooks/Contract/useClaimRoi"
import useWeb3 from "../../../../hooks/Web3Connection/useWeb3"
import ConnectWallet from "../../../ConnectWallet/ConnectWallet";
import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { claim } from "../../../../services/redux/middleware/claim";
import {getROI} from "../../../../services/redux/middleware/getRoi"
import { id } from 'ethers';
function Claim({ propertyid, ethValues, amenitiesLength,TotalFraction }) {
  console.log("received length of amenities is..........", amenitiesLength)
  const { account, chainId } = useWeb3React();
  const customweb3 = useWeb3();
  const [openmodal, setOpenModal] = useState(false);
  const { ClaimRoiHook } = useClaimRoi();
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const web3 = new Web3(window.ethereum);
  const [ethPrice, setEthPrice] = useState(null);
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

  const handleClaim = async () => {
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
      const userid=localStorage.getItem('Id');
      if (response?.status) {
        const data = {
          propertyId: propertyid,
          claimAmount: amount,
          userId:userid
        }
        dispatch(claim(data)).then((res) => {
          console.log(res,"res");
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
    const handlegetRoi=() => {
      try {
        const data={
          propertyId:propertyid
        
        }
        console.log("id roi is......",data)
         dispatch(getROI(data));
      } catch (error) {
        console.error("Error fetching explore details:", error);
      }
    }
    handlegetRoi();
  }, []);
  return (
    <>
      <ConnectWallet showWallet={openmodal} onHide={handleClose} />
      <div className="ClaimMain">
        <p className="ClaimHeading">
          Claim
        </p>
        <div className="ClaimFractions">
          <div className="Row1__claim">
            <p className="Row1Col1">
              No of fractions</p>
            <p className="Row1Col2">
              {TotalFraction}
            </p>
          </div>
          <div className="Row1__claim">
            <p className="Row1Col1">
              Value</p>
            <p className="Row1Col2">
              0.005 ETH
            </p>
          </div>
          <div className="Row1__claim">
            <p className="Row1Col1">
              Ameneties</p>
            <p className="Row1Col2">
              {amenitiesLength}
            </p>
          </div>
          <div className="Row4">
            <p className="Row4Col1">
              Total Claim Amount</p>
            <p className="Row1Col2">
              0.005 ETH
            </p>
          </div>
        </div>
        <button className="ClaimButton" 
        onClick={handleClaim}
        >
          Claim
        </button>
      </div>
    </>
  );
}

export default Claim;