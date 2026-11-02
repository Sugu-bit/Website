import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCartItem, fetchCartItems } from "../../redux/cartSlice";
import { addToLove, removeFromLove } from "../../redux/loveSlice";
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from "react-icons/ai";
import GetInterfaceProduct from "../storemanager/getInterfaceProduct";
import getProductImageUrl from "../../utils/productImages";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const formatPrice = (value) => {
  const price = Number(value);
  return Number.isFinite(price) && value !== null && value !== undefined
    ? `${new Intl.NumberFormat("vi-VN").format(price)} đ`
    : "Liên hệ";
};

const ProductOverview = ({ product, productOptions, quantity, increaseQuantity, decreaseQuantity, setQuantity }) => {
  const dispatch = useDispatch();
  const lovedItems = useSelector((state) => state.love.items);
  const [notification, setNotification] = useState({ show: false, message: "" });
  const [selectedOptionId, setSelectedOptionId] = useState(productOptions[0]?.id || "");
  const isFavorite = lovedItems.some((item) => item.productId === product.id);
  const navigate = useNavigate();
  const selectedOption = productOptions.find((option) => String(option.id) === String(selectedOptionId)) || productOptions[0];
  const stock = selectedOption?.stock ?? product.stock ?? 0;
  const price = selectedOption?.price ?? product.price;
  const discount = Math.min(100, Math.max(0, Number(product.discountPercentage) || 0));
  const discountedPrice = price === null || price === undefined ? null : Number(price) * (1 - discount / 100);

  useEffect(() => {
    setSelectedOptionId(productOptions[0]?.id || "");
  }, [product.id, productOptions]);

  const showNotification = (message) => {
    setNotification({ show: true, message });
    window.setTimeout(() => setNotification({ show: false, message: "" }), 3000);
  };

  const getSelectedOptionId = async () => {
    if (selectedOption?.id) return selectedOption.id;
    const response = await api.get(`/products/${product.id}/option-default`);
    return response.data.id;
  };

  const handleAddToCart = async () => {
    try {
      const productOptionId = await getSelectedOptionId();
      await dispatch(createCartItem({ productOptionId, quantity })).unwrap();
      showNotification(`${product.name} đã được thêm vào giỏ hàng!`);
    } catch (error) {
      console.error("Không thể thêm sản phẩm vào giỏ hàng:", error);
      showNotification("Thêm vào giỏ hàng thất bại. Vui lòng thử lại.");
    }
  };

  const handleBuyNow = async () => {
    try {
      const productOptionId = await getSelectedOptionId();
      const cartItem = { productOptionId, quantity: 1 };
      await dispatch(createCartItem(cartItem)).unwrap();
      await dispatch(fetchCartItems(cartItem));
      navigate("/cart");
    } catch (error) {
      console.error("Không thể mua ngay sản phẩm:", error);
      showNotification("Không thể mua ngay sản phẩm này. Vui lòng thử lại.");
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

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Xem sản phẩm ${product.name} với giá ${formatPrice(discountedPrice)}`,
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        showNotification("Đã sao chép liên kết sản phẩm.");
      } else {
        showNotification("Trình duyệt không hỗ trợ chia sẻ liên kết.");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Không thể chia sẻ sản phẩm:", error);
        showNotification("Không thể chia sẻ sản phẩm.");
      }
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="flex flex-col items-center gap-3">
        <div className="w-full aspect-square overflow-hidden flex items-center justify-center bg-gray-100">
          <GetInterfaceProduct
            productId={product.id}
            imageUrl={getProductImageUrl(product.id)}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full">
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border ${
              isFavorite ? "bg-red-500 text-white" : "bg-gray-100 text-gray-800"
            }`}
          >
            {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
            {isFavorite ? "Đã yêu thích" : "Thêm vào yêu thích"}
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border bg-gray-100 text-gray-800"
          >
            <AiOutlineShareAlt />
            Chia sẻ
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-2xl text-red-600 my-3 font-bold">{formatPrice(discountedPrice)}</p>
        {discount > 0 && (
          <p className="text-sm text-gray-500">
            <span className="line-through">{formatPrice(price)}</span>
            <span className="ml-2 font-semibold text-red-600">Giảm {discount}%</span>
          </p>
        )}
        {productOptions.length > 1 && (
          <label className="mt-4 block font-medium" htmlFor="product-option">
            Phiên bản
            <select
              id="product-option"
              value={selectedOptionId}
              onChange={(event) => {
                setSelectedOptionId(event.target.value);
                setQuantity(1);
              }}
              className="mt-2 block w-full rounded-lg border p-3"
            >
              {productOptions.map((option) => {
                const attributes = Object.entries(option.values || {}).map(([name, value]) => `${name}: ${value}`);
                return (
                  <option key={option.id} value={option.id} disabled={Number(option.stock) <= 0}>
                    {attributes.length ? attributes.join(" / ") : `Phiên bản ${option.id}`}
                    {" — "}{formatPrice(option.price)}
                    {Number(option.stock) <= 0 ? " (Hết hàng)" : ""}
                  </option>
                );
              })}
            </select>
          </label>
        )}
        <p className="mt-3 text-gray-700">{product.description || "Chưa có mô tả sản phẩm."}</p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="text-gray-700 font-medium">Số lượng:</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={decreaseQuantity}
              className="w-9 h-9 bg-gray-100 border rounded"
              disabled={quantity <= 1}
              aria-label="Giảm số lượng"
            >
              -
            </button>
            <span className="w-12 text-center" aria-live="polite">{quantity}</span>
            <button
              type="button"
              onClick={increaseQuantity}
              className="w-9 h-9 bg-gray-100 border rounded"
              disabled={quantity >= stock}
              aria-label="Tăng số lượng"
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-600">{Number(stock) > 0 ? `Còn ${stock} sản phẩm` : "Hết hàng"}</span>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={Number(stock) <= 0}
            className="bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Thêm vào giỏ hàng
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={Number(stock) <= 0}
            className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Mua ngay
          </button>
        </div>
      </div>

      {notification.show && (
        <div className="fixed bottom-5 right-5 z-50 bg-black text-white py-2 px-4 rounded-lg shadow-lg" role="status">
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default ProductOverview;
