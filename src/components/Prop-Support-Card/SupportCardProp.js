import React from "react";
import "./supportCard.css";
import { useNavigate } from "react-router-dom";
const SupportCard = ({ 
  imageSrc, 
  name, 
  price, 
  fractions, 
  pricePerFraction, 
  annualROI, 
  location,  
}) => {
    const navigate = useNavigate();
    const handleChatClick = () => {
        navigate("/Support-Chat", {
          state: { imageSrc, name, price, location }, // Sending data as state
        });
      };;
  return (
    <div className="Main-Support-Card">
      <img className="Support-Card-Image" src={imageSrc} alt="Support-Card" />

      <div className="Support-Card-Div1">
        <p className="SupportName">{name}</p>
        <p className="SupportPricee">${price}</p>
      </div>

      <div className="Card-Main-Support-Content">
        <div className="Support-Card-Div1">
          <p className="SupportCard-Contnt-Titlee">Fractions</p>
          <p className="SupportCard-Contnt-Valuee">{fractions}</p>
        </div>
        <div className="Support-Card-Div1">
          <p className="SupportCard-Contnt-Titlee">Price Per Fraction</p>
          <p className="SupportCard-Contnt-Valuee">${pricePerFraction}</p>
        </div>
        <div className="Support-Card-Div1">
          <p className="SupportCard-Contnt-Titlee">Annual ROI</p>
          <p className="SupportCard-Contnt-Valuee">{annualROI}%</p>
        </div>
        <div className="Support-Card-Div1">
          <p className="SupportCard-Contnt-Titlee">Location</p>
          <p className="SupportCard-Contnt-Valuee">{location}</p>
        </div>
      </div>

      <button className="OpenChat"  onClick={handleChatClick}>
        Open Chat
      </button>
    </div>
  );
};

export default SupportCard;
