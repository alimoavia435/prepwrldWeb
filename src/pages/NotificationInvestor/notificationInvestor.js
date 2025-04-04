import React, { useState, useEffect } from "react";
import "./notificationInvestor.css";
import { useDispatch, useSelector } from "react-redux";
import { getinvesnotification } from "../../services/redux/middleware/getinvesnotification";
import { markasread } from "../../services/redux/middleware/markasread";
import { readallNotification } from "../../services/redux/middleware/readallNotification"
function NotificationInvestorDetail() {
  const [notifications, setNotifications] = useState([]);

  const notifyData = useSelector((state) => state?.getinvesnotification?.profile?.data?.notifications)
  console.log("investor notification", notifyData)
  const hasUnreadNotifications = notifyData?.some(
    (notification) => !notification.isRead
  );
  const readallnotif = useSelector((state) => state?.readallNotification)
  console.log("read all notification", readallnotif)
  useEffect(() => {
    setNotifications(notifyData);
  }, [notifyData])

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getinvesnotification())
  }, [])


  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };


  const handleMarkAsRead = (id) => {
    console.log("notification id", id);
    dispatch(markasread(id)).then((res) => {
      console.log("read response", res);
      dispatch(getinvesnotification())
    });
  };

  const handleMarkAllAsRead = () => {
    dispatch(readallNotification()).then((res) => {
      dispatch(getinvesnotification())
    })

  };

  return (
    <div className="notification__details__main__container">
      <div className="notification__details__heading_container">
        <div className="notification__details__heading_container_1">
          <p className="notification__detail__heading__main">Notifications</p>
          <p className="notification__detail__detail__main">
            See your Notifications
          </p>
        </div>

        <div className="search__notification__main__container">
          <input
            placeholder="Search Notifications"
            className="search__notification__input"
            type="text"
          />
          <img
            style={{ height: "20px", width: "20px" }}
            src="/prepwrld/Images/notification/searchIcon.svg"
            alt="search"
          />
        </div>
      </div>
      {notifications?.length > 0 ?

        <div className="notification__detail__description__container">
          {notifications?.map((notification) => (
            <div
              key={notification.id}
              className={`notification__detail__description__container__1 ${!notification.isRead ? "unread-background" : ""
                }`}
              onClick={() => handleMarkAsRead(notification._id)}
            >
              <div className="notification__details__listing__container">
                <img
                  style={{ height: "50px", width: "50px" }}
                  src={notification.image}
                  alt="notification icon"
                />
                <div className="notification__details__listing__container__1">
                  <p className="new__property__listed__text">
                    {notification.title}
                  </p>
                  <p className="new__property__listed__description">
                    {notification.content}
                  </p>
                </div>
              </div>

              <div className="notifcation__detail__mark__read__container">
                <p
                  className="notification___detail_time__text"
                  style={{
                    color: notification.isRead ? "#919191" : "#139ed5",
                  }}
                >
                  <p>{formatTime(notification.createdAt)}</p>
                </p>

                <p
                  className="notification___detail_mark__read"
                  onClick={() => handleMarkAsRead(notification._id)}
                  style={{ cursor: "pointer" }}
                >
                  {notification.isRead ? (
                    <>Marked as read</>
                  ) : (
                    <img
                      src="/prepwrld/Images/notification/markIcon.svg"
                      alt="Unread Icon"
                      className="mark-read-icon"
                    />
                  )}
                </p>
              </div>
            </div>
          ))}

          <div className="notification__detail__mark__all__As__Read_container">
            <button
              className="notification__detail__mark__all__As__Read"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </button>
          </div>
        </div>
        :
        <div style={{ width: "100%", padding: "32px", borderRadius: "8px", border: "1px solid #CDCDCD" }}>
          <p className="notification__detail__heading__main" style={{ textAlign: "center" }}>No Notifications Yet</p></div>}

    </div>
  );
}

export default NotificationInvestorDetail;
