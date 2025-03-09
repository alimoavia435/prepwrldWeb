import React from "react";
import "./Message.css";

function Message() {
  return (
    <div className="text-box">
      <div className="input-outer-box">
        <img src="./Images/livechat/add.svg" />
        <input placeholder="Text Message" />
      </div>
      <img src="./Images/livechat/send.svg"/>
    </div>
  );
}

export default Message;
