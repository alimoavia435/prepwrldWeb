import { Modal,Button } from "react-bootstrap";
import React from "react";
import "./BuyNowModel.css"


const BuyNowModel= ({ showWallet, onHide }) => {




  return (
    <div
      onHide={onHide}
      centered
    className="BuyNowModel"
    >
      <div>
        <div className="ModelValletconMain_DivCloseee">
          <img
            src="/Images/home/cross.svg"
            alt="close"
            variant="success"
            onClick={onHide}
          />
        </div>

        <div className="ModelValletconMainDiiv222">
         
          <p className="ModelValletconMainDiv2_Pp33">
            Kindly choose from options below:
          </p>

          <div className="ModelValletconMainDiv2_divcardtoppp" >
            <div



              className="ModelValletconMainDiv2_divcarrd"
    
           
            >
              <img src="/Images/buy/Bnb.svg" alt="Bnb" />
              <p className="ModelValletconMainDiv2_divcarrd_P">BNB</p>
            </div>

            <div
              className="ModelValletconMainDiv2_divcarrd1"
            
            >
              <img src="/Images/buy/Evox.svg" alt="Evox" />
              <p className="ModelValletconMainDiv2_divcarrd_P">EVOX</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNowModel;

