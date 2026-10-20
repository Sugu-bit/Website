import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCartItem, fetchCartItems } from "../../redux/cartSlice";
import { addToLove, removeFromLove} from "../../redux/loveSlice";
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import GetInterfaceProduct from "../storemanager/getInterfaceProduct";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
const ProductOverview = ({ product, quantity, increaseQuantity, decreaseQuantity }) => {
  const dispatch = useDispatch();
  const lovedItems = useSelector((state) => state.love.items);
  const [notification, setNotification] = useState({ show: false, message: "" });
  const isFavorite = lovedItems.some((item) => item.productId === product.id);
  const navigate = useNavigate();
  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: "" }), 3000);
  };

  const handleAddToCart = async () => {
    try {
      const response = await api.get(`/products/${product.id}/option-default`);
      console.log(response);
      await dispatch(createCartItem({ productOptionId: response.data.id, quantity })).unwrap();
      showNotification(`${product.name} đã được thêm vào giỏ hàng!`);
    } catch (error) {
      showNotification("Thêm vào giỏ hàng thất bại!");
    }
  };

  const handleBuyNow = async () => {
    try {
      // Gọi API để lấy thông tin product option
      const response = await api.get(`/products/${product.id}/option-default`);
  
      // Thêm sản phẩm vào giỏ hàng
      const cartItem = {
        productOptionId: response.data.id,
        quantity : 1,
      };
      await dispatch(createCartItem(cartItem)).unwrap();
      await dispatch(fetchCartItems(cartItem))
      // Thêm sản phẩm vào danh sách thanh toán
      // const paymentItem = {
      //   ...cartItem,
      //   name: product.name,
      //   price: product.price,
      // };
      // dispatch(addToPayment(paymentItem));
      navigate("/cart");
    } catch (error) {
      showNotification("Không thể mua ngay sản phẩm này!");
    }
  };  

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromLove({ productId: product.id }));
      showNotification(`${product.name} đã được xóa khỏi yêu thích!`);
    } else {
      dispatch(addToLove({ productId: product.id }));
      showNotification(`${product.name} đã được thêm vào yêu thích!`);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: `Xem sản phẩm ${product.name} với giá ${product.price}`,
          url: window.location.href,
        })
        .catch(() => showNotification("Không thể chia sẻ sản phẩm."));
    } else {
      showNotification("Tính năng chia sẻ không khả dụng trên trình duyệt của bạn.");
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Hình ảnh sản phẩm */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-full aspect-square overflow-hidden flex items-center justify-center bg-gray-100">
          <GetInterfaceProduct productId={product.id} className="max-w-full max-h-full object-contain" />
        </div>
        <div className="flex flex-row justify-content-end gap-2 w-full">
          {/* Yêu thích */}
          <button
            onClick={handleToggleFavorite}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border bg-red-500 ${
              isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
            } hover:bg-gray-300 transition`}
          >
            {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
            {isFavorite ? "Đã yêu thích" : "Thêm vào yêu thích"}
          </button>

          {/* Chia sẻ */}
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            <AiOutlineShareAlt />
            Chia sẻ
          </button>
        </div>
      </div>

      {/* Chi tiết sản phẩm */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-xl text-red-500 my-3">
          Giá: {new Intl.NumberFormat("vi-VN").format(product.price)}đ
        </p>
        <p className="text-gray-700">{product.description}</p>

        {/* Số lượng */}
        <div className="mt-4 flex items-center space-x-3">
          <p className="text-gray-700">Số lượng:</p>
          <div className="flex items-center space-x-2">
            <button
              onClick={decreaseQuantity}
              className="w-8 h-8 bg-gray-200 border border-gray-400 text-gray-600 rounded flex items-center justify-center hover:bg-gray-300"
              disabled={quantity <= 1}
            >
              -
            </button>
            <div className="w-12 h-8 flex items-center justify-center border border-gray-400 rounded bg-white">
              {quantity}
            </div>
            <button
              onClick={increaseQuantity}
              className="w-8 h-8 bg-gray-200 border border-gray-400 text-gray-600 rounded flex items-center justify-center hover:bg-gray-300"
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>
          <p className="text-gray-500 ml-4">Số lượng có sẵn: {product.stock}</p>
        </div>

        {/* Các hành động */}
        <div className="mt-5 flex flex-col gap-3">
          {/* Thêm vào giỏ hàng */}
          <button
            onClick={handleAddToCart}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"
          >
            Thêm vào giỏ hàng
          </button>

          {/* Mua ngay */}
          <button
            onClick={handleBuyNow}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
          >
            Mua ngay
          </button>
        </div>

        {/* Thông báo */}
        {notification.show && (
          <div className="fixed bottom-5 right-5 bg-black text-white py-2 px-4 rounded-lg shadow-lg">
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductOverview;
