import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCartItem } from "../../redux/cartSlice";
import { addToLove, removeFromLove } from "../../redux/loveSlice"; 
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";

const DetailsProductActions = ({ product, quantity }) => {
  const dispatch = useDispatch();
  const lovedItems = useSelector((state) => state.love.items);
  const [notification, setNotification] = useState({ show: false, message: "" });

  const isFavorite = lovedItems.some((item) => item.productId === product.id);

  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: "" }), 3000);
  };

  const handleAddToCart = async () => {
    try {
      await dispatch(createCartItem({ productOptionId: product.id, quantity })).unwrap();
      showNotification(`${product.name} đã được thêm vào giỏ hàng!`);
    } catch (error) {
      showNotification("Thêm vào giỏ hàng thất bại!");
    }
  };

  const handleBuyNow = () => {
    showNotification(`Bạn đã mua ngay sản phẩm: ${product.name}`);
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

  // Xử lý chia sẻ
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
    <div className="mt-5 flex flex-col gap-3">
      {/* Nút Thêm vào giỏ hàng */}
      <button
        onClick={handleAddToCart}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"
      >
        Thêm vào giỏ hàng
      </button>

      {/* Nút Mua ngay */}
      <button
        onClick={handleBuyNow}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
      >
        Mua ngay
      </button>

      {/* Nút Yêu thích */}
      <button
        onClick={handleToggleFavorite}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border ${
          isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
        } hover:bg-gray-300 transition`}
      >
        {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
        {isFavorite ? "Đã yêu thích" : "Thêm vào yêu thích"}
      </button>

      {/* Nút Chia sẻ */}
      <button
        onClick={handleShare}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
      >
        <AiOutlineShareAlt />
        Chia sẻ
      </button>

      {/* Hiển thị thông báo */}
      {notification.show && (
        <div className="fixed bottom-5 right-5 bg-black text-white py-2 px-4 rounded-lg shadow-lg">
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default DetailsProductActions;
