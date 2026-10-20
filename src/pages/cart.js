import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import CartList from "../components/cart/cartList";
import CartSummary from "../components/cart/cartSummary";
import { CiShoppingCart } from "react-icons/ci";
import PaymentButtons from "../components/cart/paymentButtons";
const CartPage = () => {
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
                <span>Giỏ hàng</span>
            </div>

            {/* Tiêu đề */}
            <div className="flex items-center">
                <CiShoppingCart size={40} className="mr-2 text-white text-2xl" />
                <h1 className="text-2xl font-semibold">Giỏ hàng</h1>
            </div>
        </div>
        <div className="container mx-auto p-5">
            <CartList />
            <CartSummary />
            <PaymentButtons />  
        </div>
    </div>
  );
};

export default CartPage;
