import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeNoti } from "../redux/NotiRedux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const timer = setTimeout(() => {
    dispatch(closeNoti());
  }, 5000);

  return (
    <div
      className={`notification sd-box ${notification.open ? "active" : " "}`}
    >
      <img src="/assets/notification.png" />
      <span>{notification.message.message}</span>
    </div>
  );
};

export default Notification;
