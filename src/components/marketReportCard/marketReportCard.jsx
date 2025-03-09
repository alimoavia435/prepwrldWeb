import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./marketReport.css";

const MarketReportCard = ({ id, imageSrc, title, time, date }) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleNavigation = () => {
    navigate(`/market-detail/${id}`); // Navigate to the page with the ID
  };

  return (
    <div className="MarketReportCard">
      <img className="ImageCard" src={imageSrc} alt="ProfileImage" />
      <div className="CardDetails">
        <p className="CardNameReport">{title}</p>
        <div className="CardRowDetailss">
          <div className="TimeDate">
            <div className="TimeDiv">
              <img src="/Images/marketReport/ClockHour.svg" alt="Clock" />
              <p className="Timeee">{time}</p>
            </div>
            <div className="TimeDiv">
              <img src="/Images/marketReport/calendar.svg" alt="Clock" />
              <p className="Timeee">{date}</p>
            </div>
          </div>
        
          <img
            src="/Images/marketReport/export.svg"
            alt="Export"
            style={{ cursor: "pointer" }}
            onClick={handleNavigation} 
          />
        </div>
      </div>
    </div>
  );
};

export default MarketReportCard;
