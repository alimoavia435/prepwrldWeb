import React, { useState } from "react";
import "./history.css";
import HistoryTable from "../../../HistoryTable/HistoryTable";

function History({ propertyid, account }) {

  return (
    <>
      <div className="CllaimMain">
        <p className="ClaimHeading">
          History
        </p>
        <HistoryTable propertyid={propertyid} account={account}/>
      </div>
    </>
  );
}

export default History;