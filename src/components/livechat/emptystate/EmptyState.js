import React from "react";
import './EmptyState.css'

function EmptyState() {
  return (
    <div className="empty-main-div">
        <div className="img-bg">
        <img src="./Images/livechat/Ellipse 155.svg" />
        </div>
      <div>
        <p className="empty-msg">Your Messages</p>
        <p className="empty-msg2">Send a message to start a chat</p>
      </div>
      <div>
        <button className="empty-btn">
        Send Message
        </button>
      </div>
    </div>
  );
}

export default EmptyState;
