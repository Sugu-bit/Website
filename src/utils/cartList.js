import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCartItems } from "../redux/cartSlice"; // Import action từ Redux slice

const CartList = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cartItems");

    // Nếu không có trong sessionStorage, fetch từ server
    if (!storedCart) {
      dispatch(fetchCartItems());
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default CartList;
