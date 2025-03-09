import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./PublishPropertyModal.css";
import close from "../../assets/close.svg";

const PublishModal = ({
  showWallet,
  onHide,
  metaData,
  MakeThisProkectLive,
}) => {


  console.log(metaData ,"metaData");
  return (
    <Modal
      show={showWallet}
      onHide={onHide}
      centered
      className="customfourth-modals"
    >
      <div className="pUBLISHmODALdIV">
        <div className="ModelValletconMain_DivClose">
          <img
            src="/Images/home/cross.svg"
            alt="close"
            variant="success"
            onClick={onHide}
          />
        </div>

        <div className="PublisModalMain-Content">
          <div className="Property-Modal-Detail-S">
            <img
              className="Image-Publish-modal-Image"
              src={metaData?.photos[0]}
              alt="PropertyPicture"
            />
            <div className="Publish-Modal-Main-Conetn-Div">
              <p className="Serenity-Name-Publish-Modal">
                {metaData?.name}
              </p>
              <p className="Price-Publish-Modal-Property">${metaData?.fractionPrice * metaData?.TotalFraction}</p>
            </div>
            <div className="Publish-Property-Details-Lines-Desc">
              <div className="Publish-Modal-Main-Conetn-Div">
                <p className="Property-DEtail-Modal-Side-Title">Fractions</p>
                <p className="Property-Detail-Modal-Valuess">{metaData?.TotalFraction}</p>
              </div>
              <div className="Publish-Modal-Main-Conetn-Div">
                <p className="Property-DEtail-Modal-Side-Title">
                  Price Per Fraction
                </p>
                <p className="Property-Detail-Modal-Valuess">${metaData?.fractionPrice}</p>
              </div>
              <div className="Publish-Modal-Main-Conetn-Div">
                <p className="Property-DEtail-Modal-Side-Title">Annual ROI</p>
                <p className="Property-Detail-Modal-Valuess">{metaData?.ROIPercentage}%</p>
              </div>
              <div className="Publish-Modal-Main-Conetn-Div">
                <p className="Property-DEtail-Modal-Side-Title">Location</p>
                <p className="Property-Detail-Modal-Valuess">{metaData?.City}</p>
              </div>
            </div>
          </div>
          <p className="Publish-property-ParaMain">
            Are you sure you want to publish this property and make it available
            for purchase?
          </p>

          <div className="Publish-ModaL-Buttons-Divs">
            <button
              className="Publish-Modal-Cancel-ModalBlackWhite"
              onClick={onHide}
            >
              Cancel
            </button>
            <button className="Publish-Modal-Publish-BlueButton" onClick={MakeThisProkectLive}  >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PublishModal;
