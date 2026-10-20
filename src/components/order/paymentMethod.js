import React, { useState } from "react";
import { useSelector } from "react-redux";
import orderApi from "../../api/orderApi";
import PaymentStatusModal from "./paymentStatus"; // Modal hiển thị trạng thái thanh toán
import { useDispatch } from "react-redux";
import { deleteCartItem, fetchCartItems } from "../../redux/cartSlice";
import { clearPayment } from "../../redux/paymentSlice";
const ConfirmPayment = ({ formData }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null); // Trạng thái thanh toán ("success" hoặc "error")
  const [message, setMessage] = useState(""); // Thông báo hiển thị trong modal

  const handleConfirmPayment = async () => {
    // Kiểm tra thông tin người nhận
    if (!formData.fullName || !formData.address || !formData.phone) {
      alert("Vui lòng điền đầy đủ thông tin người nhận.");
      return;
    }

    // Kiểm tra giỏ hàng
    if (cartItems.length === 0) {
      alert("Giỏ hàng của bạn đang trống.");
      return;
    }

    // Chuẩn bị dữ liệu đơn hàng
    const orderData = {
      paymentMethod: formData.paymentMethod,
      shipCouponId: 1, // Giá trị mặc định
      productCouponId: 1, // Giá trị mặc định
      address: formData.address,
      cart: cartItems.map((item) => item.id), // Chỉ gửi danh sách ID sản phẩm
    };
    console.log(orderData);
    try {
      // Gửi yêu cầu tạo đơn hàng
      const response = await orderApi.createOrder(orderData);
      console.log("Đơn hàng đã được tạo:", response);

      // Cập nhật trạng thái sau khi thanh toán thành công
      setStatus("success");
      setMessage("Cảm ơn bạn đã mua sắm! Đơn hàng của bạn đã được xử lý.");
      dispatch(deleteCartItem(cartItems.map((item) => item.id)));
      dispatch(clearPayment()); // Xóa thông tin thanh toán trong Redux
      dispatch(fetchCartItems());
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);

      // Cập nhật trạng thái sau khi thanh toán thất bại
      setStatus("error");
      setMessage("Đã xảy ra lỗi khi xử lý thanh toán. Vui lòng thử lại sau.");
    }
  };

  const closeModal = () => {
    // Đóng modal sau khi xử lý xong
    setStatus(null);
    setMessage("");
  };

  return (
    <div>
      {/* Nút xác nhận thanh toán */}
      <div className="bg-gray-800 text-white p-4 flex justify-end">
        <button
          onClick={handleConfirmPayment}
          className="bg-green-500 px-8 py-2 rounded-md hover:bg-green-600"
        >
          Xác nhận thanh toán
        </button>
      </div>
      {status && <PaymentStatusModal status={status} message={message} onClose={closeModal} />}
    </div>
  );
};

export default ConfirmPayment;
