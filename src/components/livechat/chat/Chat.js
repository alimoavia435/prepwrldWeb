import React, { useState } from "react";
import "./Chat.css";
import Message from "../../reuseable/Message";
import { useNavigate } from "react-router-dom";
import Inbox from "../inbox/Inbox";

export default function Chat({onBackClick}) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey brother, how are you doing today?", sender: "sender" },
    {
      id: 2,
      text: "I’m doing good, man! Thanks, what about you?",
      sender: "user",
    },
    {
      id: 3,
      text: "I'm good man. Check out this video",
      sender: "sender",
    },
    {
      id: 4,
      text: "",
      sender: "sender",
      media: "video.mp4",
    },
    { id: 5, text: "BROOOOO", sender: "user" },
    { id: 6, text: "THIS IS MADDD!!!", sender: "user" },
  ]);

  const navigate = useNavigate()
  return (
    <div className="main-chat" >
      <div className="chat-outer-div">
        <div onClick={onBackClick}>
          <img src="./Images/livechat/arrow-left.svg" alt="Back"  onClick={() => navigate(<Inbox/>)}/>
        </div>
        <div className="main-side-box-chat">
          <div>
            <img
              src="./Images/livechat/profile.svg"
              className="profile"
              alt="Profile"
            />
          </div>
          <div className="text">
            <div className="text-spacing-chat">
              <p className="user-name">Lorem Ipsum</p>
              <p className="user-msg">lorem.ipsum</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Box */}
      <div className="chat-box">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={
              msg.sender === "user" ? "chat-box-from-user" : "sender-chat-box"
            }
          >
            {msg.sender === "sender" && (
              <img
                src="./Images/livechat/profile.svg"
                alt="Sender"
                className="sender-profile"
              />
            )}
            <div
              className={
                msg.media
                  ? msg.sender === "sender"
                    ? "sender-chat-video"
                    : "my-chat"
                  : msg.sender === "user"
                  ? "my-chat"
                  : "sender-chat"
              }
            >
              <p className={msg.sender === "user" ? "my-chat-p" : "msg"}>
                {msg.text}
              </p>

              {/* Video Handling */}
              {msg.media && (
                <div className="media-container">
                  <video
                    controls
                    className={
                      msg.sender === "sender" ? "sender-chat-video" : ""
                    }
                  >
                    <source src={msg.media} type="video/mp4" />
                  </video>
                </div>
              )}

              <p className="date-time">3:40</p>
            </div>
          </div>
        ))}
      </div>
      <Message/>
    </div>
  );
}
