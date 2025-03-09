import React, { useState, useEffect, useRef } from "react";
import "./Header.css";



export default function HeaderInvestor({ headername }) {
 
  return (
    <>
      <div className="header-main">
        <p className="header-heading">{headername}</p>
      </div>
    </>
  );
}
