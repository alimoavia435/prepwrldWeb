import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./notificationComponent.css";
import { getdevnotification } from "../../services/redux/middleware/getdevnotification";
import { markasreaddev } from "../../services/redux/middleware/markasreaddev";
import { readallnotifyDev } from "../../services/redux/middleware/readallnotifyDev";
function NotificationComponent() {

  const [show, setShow] = useState(false);

  const [notifications, setNotifications] = useState({ today: [], thisWeek: [] });
  const dispatch = useDispatch();
  const notifyData = useSelector((state) => state?.getdevnotification?.profile?.data?.notifications)
  console.log("devNotify", notifyData)
  const hasUnreadNotifications = notifyData?.some(
    (notification) => !notification.isRead
  );

  useEffect(() => {
    const today = [];
    const thisWeek = [];

    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

    notifyData?.forEach((notification) => {
      const notificationDate = new Date(notification?.createdAt);
      if (notificationDate?.toDateString() === new Date().toDateString()) {

        today.push(notification);

      }

      else if (notificationDate >= startOfWeek) {

        thisWeek.push(notification);
      }

    });

    setNotifications({ today, thisWeek });
  }, [notifyData]);

  const navigate = useNavigate()
  // const notifications = {
  //   today: [
  //     {
  //       icon: (
  //         <img
  //           src="/Images/notification/notification1.svg"
  //           alt="Notification Icon"
  //         />
  //       ),
  //       title: "New Property Listed",
  //       description: "Corem ipsum dolor sit amet, consectetur adipiscing elit.",
  //       time: "10:00 AM",
  //     },
  //     {
  //       icon: (
  //         <img
  //           src="/Images/notification/notification2.svg"
  //           alt="Notification Icon"
  //         />
  //       ),
  //       title: "Property Sold Out",
  //       description: "Corem ipsum dolor sit amet, consectetur adipiscing elit.",
  //       time: "10:00 AM",
  //     },
  //   ],
  //   thisWeek: [
  //     {
  //       icon: (
  //         <img
  //           src="/Images/notification/notification1.svg"
  //           alt="Notification Icon"
  //         />
  //       ),
  //       title: "New Property Listed",
  //       description: "Corem ipsum dolor sit amet, consectetur adipiscing elit.",
  //       date: "Feb 1, 2025",
  //     },
  //     {
  //       icon: (
  //         <img
  //           src="/Images/notification/notification2.svg"
  //           alt="Notification Icon"
  //         />
  //       ),
  //       title: "Property Sold Out",
  //       description: "Corem ipsum dolor sit amet, consectetur adipiscing elit.",
  //       date: "Feb 1, 2025",
  //     },
  //     {
  //       icon: (
  //         <img
  //           src="/Images/notification/notification2.svg"
  //           alt="Notification Icon"
  //         />
  //       ),
  //       title: "Property Sold Out",
  //       description: "Corem ipsum dolor sit amet, consectetur adipiscing elit.",
  //       date: "Feb 1, 2025",
  //     },
  //   ],
  // };


  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const handleMarkAsRead = (id) => {
    console.log("notification id", id);
    dispatch(markasreaddev(id)).then((res) => {
      console.log("read response", res);
      dispatch(getdevnotification())
    });
  };
  const handleMarkAllAsRead = () => {
    dispatch(readallnotifyDev()).then((res) => {
      dispatch(getdevnotification())
    })
  };

  const handleViewAllClick = () => {
    navigate('/notifications')
    setShow(false);
  }

  useEffect(() => {
    console.log("usman n");
    dispatch(getdevnotification())
  }, [])

  return (
    <div>
      <Dropdown show={show} onToggle={(isOpen) => setShow(isOpen)}>
        <Dropdown.Toggle
          className="dropdown__notifcation__toggle__icon"
          as="div"
          variant="light"
          id="dropdown-basic"
          style={{ cursor: "pointer" }}
        >
          <img
            src=
            {hasUnreadNotifications ? "/Images/Dashboard/Notification.svg" :
              "/Images/Dashboard/readnotify.svg"}
            alt="Notification Icon"
            className="notification-icon"
          />
        </Dropdown.Toggle>
        <div>
          <Dropdown.Menu className="dropdown__main__container__1_notification">
            <div className="dropdown-header__profile">
              <p className="notifcation_dropdown__heading">Notification</p>
            </div>

            <div className="dropdown__main__container__1_notification__inner">
              <p className="notication__today__text">Today</p>
              {notifications?.today?.length > 0 ?
                notifications?.today?.map((item, index) => (
                  <div key={index} className="notification-item">
                    <div className="notification-content" onClick={() => handleMarkAsRead(item._id)}
                      style={{ cursor: "pointer" }}>
                      <img
                        style={{ height: "50px", width: "50px" }}
                        src={item.image}
                        alt="notification icon"
                      />
                      <div className="dropdown__main__container__1_notification__inner__1">
                        <div className="dropdown__main__container__1_notification__second">
                          <p className="dropdown__title__notofication__text">
                            {item.title}
                          </p>
                          <p className="dropdown__title__notofication__time">
                            <p>{formatTime(item.createdAt)}</p>
                          </p>
                        </div>
                        <p className="dropdown__title__notofication__description">
                          {item.content}
                        </p>
                        <div className="mark__as__read__text__container">
                          <p
                            className="notification___detail_mark__read"

                          >
                            {item.isRead ? (
                              <>Marked as read</>
                            ) : (
                              <img
                                src="/Images/notification/markIcon.svg"
                                alt="Unread Icon"
                                className="mark-read-icon"
                              />
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                :
                <div style={{ padding: "20px" }}>
                  <p className="notication__today__text" style={{ textAlign: "center" }}>No Notifications today</p>
                </div>
              }
            </div>

            <div className="dropdown__main__container__1_notification__inner">
              <p className="notication__today__text">This Week</p>
              {notifications?.thisWeek?.length > 0 ?
                notifications?.thisWeek?.map((item, index) => (
                  <div key={index} className="notification-item">
                    <div className="notification-content" onClick={() => handleMarkAsRead(item._id)}
                      style={{ cursor: "pointer" }}>
                      <img
                        style={{ height: "50px", width: "50px" }}
                        src={item.image}
                        alt="notification icon"
                      />
                      <div className="dropdown__main__container__1_notification__inner__1">
                        <div className="dropdown__main__container__1_notification__second">
                          <p className="dropdown__title__notofication__text">
                            {item.title}
                          </p>
                          <p className="dropdown__title__notofication__time">
                            <p>{formatTime(item.createdAt)}</p>
                          </p>
                        </div>
                        <p className="dropdown__title__notofication__description">
                          {item.content}
                        </p>
                        <div className="mark__as__read__text__container">
                          <p
                            className="notification___detail_mark__read"

                          >
                            {item.isRead ? (
                              <>Marked as read</>
                            ) : (
                              <img
                                src="/Images/notification/markIcon.svg"
                                alt="Unread Icon"
                                className="mark-read-icon"
                              />
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                :
                <div style={{ padding: "20px" }}>
                  <p className="notication__today__text" style={{ textAlign: "center" }}>No Notifications This Week</p>
                </div>
              }
            </div>

            <div className="dropdown-footer">
              
                <div className="mark__all__as__read__container">
                  <p className="mark__all__as__read"
                    onClick={handleMarkAllAsRead}
                  >Mark all as read</p>
                </div>
              
              <button onClick={handleViewAllClick} className="btn-view-all">View All</button>
            </div>
          </Dropdown.Menu>
        </div>
      </Dropdown>
    </div>
  );
}

export default NotificationComponent;
