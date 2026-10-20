import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../redux/cartSlice";
import CartIconList from "./cartIconList";

const ShoppingCartIcon = () => {
  const dispatch = useDispatch();
  const { items: cartItems, isLoading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  if (isLoading) {
    return <p className="text-center text-gray-600">Đang tải giỏ hàng...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Đã xảy ra lỗi: {error}</p>;
  }

  return (
    <div className="container mx-auto">
      <CartIconList cartItems={cartItems} />
    </div>
  );
};

export default ShoppingCartIcon;
