import React from "react";
import { useSelector } from "react-redux";

const CartTotalQuantity = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <span className="absolute h-5 w-5 left-4 top-[-20%] bg-gray-600 text-white text-sm rounded-full flex justify-center items-center">
      {totalQuantity}
    </span>
  );
};

export default CartTotalQuantity;
