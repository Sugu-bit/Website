import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomerInfoForm from "../components/order/customerInfo";
import CartSummary from "../components/cart/cartSummary";
import PaymentMethod from "../components/order/paymentMethod";
import Navbar from "../components/navbar";
import { MdPayment } from "react-icons/md";
const Payments = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
  });

  return (
    <div>
      <Navbar />
      <div className="bg-blue-700 text-white p-4 flex items-center justify-between">
          {/* Đường dẫn */}
          <div className="flex items-center text-2xl">
              <Link to="/" className="text-white hover:text-gray-300 font-medium">
              Trang chủ
              </Link>
              <span className="mx-2">&gt;</span> {/* Dấu > */}
              <Link to="/cart" className="text-white hover:text-gray-300 font-medium">
              Giỏ hàng
              </Link>
              <span className="mx-2">&gt;</span> {/* Dấu > */}
              <span>Thanh toán</span>
          </div>

          {/* Tiêu đề */}
          <div className="flex items-center">
              <MdPayment size={40} className="mr-2 text-white text-2xl" />
              <h1 className="text-2xl font-semibold">Thanh toán</h1>
          </div>
      </div>
      <CustomerInfoForm formData={formData} setFormData={setFormData} />
      <CartSummary />
      <PaymentMethod formData={formData}/>
    </div>
  );
};

export default Payments;
