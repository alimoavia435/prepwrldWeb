import React, { useState } from "react";
import "./Livechat.css";
import Inbox from "./inbox/Inbox";
import Chat from "./chat/Chat";

const Livechat = () => {
  const [showChat, setShowChat] = useState(false);

  const handleUserClick = () => {
    setShowChat(true); // Show Chat and hide Inbox
  };

  const handleBackClick = () => {
    setShowChat(false); // Show Inbox and hide Chat
  };

  return (
    <div className="SocialProfile-Main">
      <div className="top-main-box">
        <div className="live-chat">
          <p className="msgs-tag">Messages</p>
          <p className="msgs-tag-view">View your inbox</p>
        </div>
      </div>

      <div className="chatbox-main-outer-div">
        {/* Inbox Section */}
        <div className={`inbox-container ${showChat ? "hidden" : ""}`}>
          <Inbox onUserClick={handleUserClick} />
        </div>

        {/* Chat Section */}
        <div className={`chat-container ${showChat ? "" : "hidden"}`}>
          {/* Back Button (Only Visible Below 768px) */}
          {/* <div className="back-btn-container" onClick={handleBackClick}>
            <img src="./Images/livechat/arrow-left.svg" alt="Back" />
          </div> */}
          <Chat  onBackClick={handleBackClick} />
        </div>
      </div>
    </div>
  );
};

export default Livechat;
