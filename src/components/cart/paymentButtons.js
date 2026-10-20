import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PaymentButtons = () => {
  const paymentItems = useSelector((state) => state.payment.selectedItems);
  const navigate = useNavigate();

  const handlePayment = () => {
    if (paymentItems.length === 0) {
      alert("Vui lòng chọn sản phẩm trước khi thanh toán!");
    } else {
      // Chuyển hướng đến trang thanh toán
      navigate("/payments");
    }
  };

  return (
    <div className="text-right mt-4">
      <button
        onClick={handlePayment} // Thay đổi từ <Link> thành xử lý sự kiện onClick
        className={`bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition ${
          paymentItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={paymentItems.length === 0} // Disable nút nếu không có sản phẩm
      >
        Thanh toán
      </button>
    </div>
  );
};

export default PaymentButtons;
