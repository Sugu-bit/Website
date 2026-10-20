import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./cartItem";

const CartList = () => {
  const carts = useSelector((state) => state.cart.items);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {carts.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          {/* Header của bảng */}
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="border border-gray-300 p-2">Chọn mua</th>
              <th className="border border-gray-300 p-2">Ảnh</th>
              <th className="border border-gray-300 p-2">Thông tin</th>
              <th className="border border-gray-300 p-2">Số lượng</th>
              <th className="border border-gray-300 p-2">Thao tác</th>
            </tr>
          </thead>

          {/* Body của bảng */}
          <tbody>
            {carts.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                    <CartItem item={item} />
                </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-600">
          Giỏ hàng của bạn đang trống. Hãy thêm sản phẩm để tiếp tục mua sắm.
        </div>
      )}
    </div>
  );
};

export default CartList;
