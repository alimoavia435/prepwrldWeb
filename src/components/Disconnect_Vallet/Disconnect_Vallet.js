import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./Disconnect_Vallet.css"


const Disconnect_Vallet = (showWallet, onHide, type ) => {
  return (
      <Modal
          show={showWallet}
          onHide={onHide}
          centered
          className="customfourth-modal"
        >
          <div>
            <div className="ModelDisconMain_DivClose">
              <img
                src="/Images/home/cross.svg"
                alt="close"
                variant="success"
                onClick={onHide}
              />
            </div>
    <div>
        <img  className="dissssconnectImg"   src="/Images/AboutUsimagess/logoDis.svg" alt=""  />
        <p className="dissssconnect_P1">0x56asdfgh....Uhg5</p>
        <p className="dissssconnect_P2">0.567 BNB</p>

<div className="dissssconnect____DivBTN">
<button className="dissssconnect____DivBTN1">
<img
                src="/Images/AboutUsimagess/disCopy.svg"
                alt="copy"  className="dissscopy"/>

                <p className="Copy_AdressssP">Copy Address</p>
</button>
<button className="dissssconnect____DivBTN1">
<img
                src="/Images/AboutUsimagess/disCon.svg"
                alt="copy"  className="dissscopy"/>

                <p className="Copy_AdressssP">Disconnect</p>
</button>
</div>

    </div>




         
          </div>
        </Modal>
  )
}

export default Disconnect_Vallet
