import React from "react";
import "./Inbox.css";
import { useNavigate } from "react-router-dom";

const users = [
  {
    name: "Lorem Ipsum",
    message: "Borem ipsum dolor.....",
    date: "Wed",
    unread: 1,
    profileImg: "./Images/livechat/profile.svg",
  },
  {
    name: "Lorem Ipsum",
    message: "Borem ipsum dolor.....",
    date: "Wed",
    unread: 1,
    profileImg: "./Images/livechat/profile.svg",
  },
  {
    name: "Lorem Ipsum",
    message: "Borem ipsum dolor.....",
    date: "Wed",
    unread: 1,
    profileImg: "./Images/livechat/profile.svg",
  },
  {
    name: "Lorem Ipsum",
    message: "Borem ipsum dolor.....",
    date: "Wed",
    unread: 1,
    profileImg: "./Images/livechat/profile.svg",
  },
  {
    name: "Lorem Ipsum",
    message: "Borem ipsum dolor.....",
    date: "Wed",
    unread: 1,
    profileImg: "./Images/livechat/profile.svg",
  },
  {
    name: "Lorem Ipsum",
    message: "Borem ipsum dolor.....",
    date: "Wed",
    unread: 1,
    profileImg: "./Images/livechat/profile.svg",
  },
  {
    name: "Lorem Ipsum",
    message: "Borem ipsum dolor.....",
    date: "Wed",
    unread: 1,
    profileImg: "./Images/livechat/profile.svg",
  },
  {
    name: "Lorem Ipsum",
    message: "Borem ipsum dolor.....",
    date: "Wed",
    unread: 1,
    profileImg: "./Images/livechat/profile.svg",
  },
  {
    name: "Lorem Ipsum",
    message: "Borem ipsum dolor.....",
    date: "Wed",
    unread: 1,
    profileImg: "./Images/livechat/profile.svg",
  },
  {
    name: "Lorem Ipsum",
    message: "Borem ipsum dolor.....",
    date: "Wed",
    unread: 1,
    profileImg: "./Images/livechat/profile.svg",
  },
  {
    name: "Lorem Ipsum",
    message: "Borem ipsum dolor.....",
    date: "Wed",
    unread: 1,
    profileImg: "./Images/livechat/profile.svg",
  },
  {
    name: "Lorem Ipsum",
    message: "Borem ipsum dolor.....",
    date: "Wed",
    unread: 1,
    profileImg: "./Images/livechat/profile.svg",
  },
];

export default function Inbox({  onUserClick }) {
  const navigate = useNavigate();
  return (
    <div className="main-inbox">
      <div>
        <p className="inbox">Inbox</p>
      </div>
      <div className="outer-div-msg">
        {users.map((user, index) => (
          <div
            key={index}
            className="main-side-box"
            onClick={onUserClick}
          >
            <div>
              <img src={user.profileImg} alt="Profile" />
            </div>
            <div className="text">
              <div className="text-spacing">
                <p className="user-name">{user.name}</p>
                <p className="user-msg">{user.message}</p>
              </div>
              <div className="text-spacing1">
                <p className="user-msg">{user.date}</p>
                {user.unread > 0 && (
                  <p className="user-msg-num">{user.unread}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
