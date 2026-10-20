import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateCartItem, deleteCartItem, fetchCartItems } from "../../redux/cartSlice";
import GetInterfaceProduct from "../storemanager/getInterfaceProduct";
import Confirm from "../../components/confirm";
import { addToPayment, removeFromPayment, updatePaymentQuantity} from "../../redux/paymentSlice";
import productApi from "../../api/productApi";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const paymentItems = useSelector((state) => state.payment.selectedItems);
  const isSelected = paymentItems.some((i) => i.id === item.id);

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

  const handleIncrease = () => {
    dispatch(updateCartItem({ id: item.id, data: { quantity: item.quantity + 1 } }));
    dispatch(updatePaymentQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateCartItem({ id: item.id, data: { quantity: item.quantity - 1 } }));
      dispatch(updatePaymentQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      handleShowConfirm();
    }
  };

  const handleDelete = () => {
    dispatch(deleteCartItem(item.id));
    dispatch(removeFromPayment(item));
    dispatch(fetchCartItems());
    setShowConfirm(false);
  };

  const handleShowConfirm = () => {
    setShowConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  const handleToggleSelect = (e) => {
    if (e.target.checked) {
      dispatch(addToPayment(item));
    } else {
      dispatch(removeFromPayment(item));
    }
  };

  if (loading) return null;
  if (error) return null;

  return (
    <>
      {/* Cột chọn sản phẩm */}
      <td className="border border-gray-300 p-2 text-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleToggleSelect}
        />
      </td>

      {/* Cột 1: Hình ảnh sản phẩm */}
      <td className="border border-gray-300 p-2 text-center">
        <Link to={`/details/${item.productId}`}>
          <GetInterfaceProduct productId={item.productId} className="w-20 h-20 object-cover rounded-md" />
        </Link>
      </td>

      {/* Cột 2: Thông tin sản phẩm */}
      <td className="border border-gray-300 p-2">
        <Link to={`/details/${item.productId}`} className="hover:underline text-lg font-semibold">
          {product.name}
        </Link>
        <p className="text-sm text-gray-600">
          Giá: {new Intl.NumberFormat("vi-VN").format(item.price)}đ
        </p>
      </td>

      {/* Cột 3: Số lượng */}
      <td className="border border-gray-300 p-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <button
            className="w-8 h-8 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300"
            onClick={handleDecrease}
          >
            -
          </button>
          <span className="text-lg">{item.quantity}</span>
          <button
            className="w-8 h-8 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
      </td>

      {/* Cột 4: Thao tác */}
      <td className="border border-gray-300 p-2 text-center">
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleShowConfirm}
        >
          Xóa
        </button>

        {showConfirm && (
          <Confirm
            message="Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"
            onConfirm={handleDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </td>
    </>
  );
};

export default CartItem;
