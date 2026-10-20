import React from "react";

const Notification = ({ notification }) => {
  if (!notification.show) return null; // Nếu không có thông báo, không render gì cả.

  return (
    <div className="fixed bottom-5 right-5 bg-black bg-opacity-80 text-white py-2 px-4 rounded-lg shadow-lg transition-opacity duration-300">
      {notification.message}
    </div>
  );
};

export default Notification;
