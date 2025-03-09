import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import useAuth from "../../hooks/Web3Connection/useAuth";
import "./Modal.css";
import close from "../../assets/close.svg";
import { toast } from "react-toastify";
import useWeb3 from "../../hooks/Web3Connection/useWeb3";
import { useWeb3React } from "@web3-react/core";
import { linkwallet } from "../../services/redux/middleware/linkwallet";
import { useDispatch, useSelector } from "react-redux";
const ConnectWallet = ({ showWallet, onHide, type }) => {
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const { login } = useAuth();
  const { account, chainId } = useWeb3React();
  const [check, setcheck] = useState(false);
  const customWeb3 = useWeb3();
  const dispatch = useDispatch();


  const reconnectMetaMask = async () => {
    const connectorId = localStorage.getItem("connectorId");
    const flag = localStorage.getItem("flag");
  
    if (connectorId === "injected" && flag === "true") {
      try {
        // Reconnect wallet if previously connected
        const result = await login("injected", 97);
        if (result) {
          toast.success("Wallet reconnected");
        }
      } catch (err) {
        console.log("err", err);
      }
    }
  };
  
  // Call reconnectMetaMask on page load
  useEffect(() => {
    reconnectMetaMask();
  }, []);
  



  const connectMetaMask1 = async () => {
    try {
      setcheck(true);
      onHide();
    const result =   await login("injected", 97);
    if (result) {  // Ensure login was successful before proceeding
      localStorage.setItem("connectorId", "injected");
      localStorage.setItem("flag", "true");
      toast.success("Wallet connected");
    }
      // localStorage.setItem("connectorId", "injected");
      // localStorage.setItem("flag", "true");
      // toast.success("Wallet connected");

    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    // if(account && check){
    //   console.log("account",account);
    //   console.log("check",check);
    // }
    const handlelinkwallet = () => {
      if (account && check) {
        
        const data = {
          walletAddress: account,
        }
        const datwithtype={
          data,
          type
        }
        console.log("databeforedispatching link", datwithtype);
        dispatch(linkwallet(datwithtype)).then((res) => {
          console.log(res, "wallet response")
          setcheck(false);
        });

      }
    }
    handlelinkwallet();
  }, [account])


  const trustWallet = async () => {
    try {

      onHide();
      await login("walletconnect",11155111 );
      localStorage.setItem("connectorId", "walletconnect");
      localStorage.setItem("flag", "true");
      // setLog(true);
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <Modal
      show={showWallet}
      onHide={onHide}
      centered
      className="customfourth-modal"
    >
      <div>
        <div className="ModelValletconMain_DivClose">
          <img
            src="/Images/home/cross.svg"
            alt="close"
            variant="success"
            onClick={onHide}
          />
        </div>

        <div className="ModelValletconMainDiv2">
          <p className="ModelValletconMainDiv2_P1">Connect your wallet</p>
          <p className="ModelValletconMainDiv2_P2">
            Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus.
          </p>
          <p className="ModelValletconMainDiv2_P3">
            Kindly choose from options below:
          </p>

          <div className="ModelValletconMainDiv2_divcardtop">
            <div
              className="ModelValletconMainDiv2_divcard"
              style={{ cursor: "pointer" }}
              onClick={() => {
                trustWallet();
              }}
            >
              <img src="/Images/home/wallet.svg" alt="close" />
              <p className="ModelValletconMainDiv2_divcard_P">WalletConnect</p>
            </div>

            <div
              className="ModelValletconMainDiv2_divcard1"
              style={{ cursor: "pointer" }}
              onClick={() => {
                connectMetaMask1();
              }}
            >
              <img src="/Images/home/meta.svg" alt="close" />
              <p className="ModelValletconMainDiv2_divcard_P">MetaMask</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConnectWallet;
