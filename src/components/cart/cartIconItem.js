import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCartItem, deleteCartItem } from "../../redux/cartSlice";
import GetInterfaceProduct from "../storemanager/getInterfaceProduct";
import productApi from "../../api/productApi";

const CartIconItem = ({ item }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Xử lý tăng số lượng
  const handleIncrease = () => {
    dispatch(updateCartItem({ id: item.id, data: { quantity: item.quantity + 1 } }));
  };

  // Xử lý giảm số lượng
  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateCartItem({ id: item.id, data: { quantity: item.quantity - 1 } }));
    } else {
      handleDelete();
    }
  };

  // Xử lý xóa sản phẩm khỏi giỏ hàng
  const handleDelete = () => {
    dispatch(deleteCartItem(item.id));
  };

  // Lấy thông tin sản phẩm
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const product = await productApi.getProductById(item.productId);
        setProduct(product);
      } catch (error) {
        setError("Không thể tải thông tin sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [item.productId]);

  if (loading) return <div className="text-gray-500">Đang tải...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-3 items-center py-2 gap-3 border-b">
      {/* Hình ảnh sản phẩm */}
      <div className="flex items-center justify-center">
        <GetInterfaceProduct
          productId={item.productId}
          className={`w-16 h-16 object-cover rounded-md ${
            product && product.imageUrl ? "" : "bg-gray-200"
          }`}
        />
      </div>


      {/* Thông tin sản phẩm */}
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
        <p className="text-sm text-red-500">{new Intl.NumberFormat("vi-VN").format(item.price)}đ</p>
      </div>

      {/* Vùng số lượng */}
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={handleDecrease}
          className="w-6 h-6 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center hover:bg-gray-300"
        >
          -
        </button>
        <span className="text-sm">{item.quantity}</span>
        <button
          onClick={handleIncrease}
          className="w-6 h-6 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center hover:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartIconItem;
