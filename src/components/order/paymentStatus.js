import React from "react";

const PaymentStatusModal = ({ status, message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className={`text-xl font-bold ${status === "success" ? "text-green-500" : "text-red-500"}`}>
          {status === "success" ? "Thanh toán thành công" : "Thanh toán thất bại"}
        </h2>
        <p className="mt-2 text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default PaymentStatusModal;
