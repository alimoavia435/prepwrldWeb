import React, { useState } from "react";
import HistoryTable from "../../../HistoryTable/HistoryTable";
import HistoryTableDev from "../../../HistoryTableDev/HistoryTableDev";

function DevHistory({ propertyid, account,contractAddress }) {

  return (
    <>
      <div className="CllaimMain">
        <p className="ClaimHeading">
        Deposit History
        </p>
        <HistoryTableDev propertyid={propertyid} account={account} contractAddress={contractAddress}/>
      </div>
    </>
  );
}

export default DevHistory;