import React from "react";
import { useSelector } from "react-redux";
const CartSummary = () => {
  const paymentItems = useSelector((state) => state.payment.selectedItems);
  console.log(paymentItems)
  const totalAmount = paymentItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-5">
      <h2 className="text-xl font-bold mb-4">Đơn mua</h2>

      {/* Danh sách sản phẩm */}
      <div className="mb-4">
        {paymentItems.length > 0 ? (
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-center">Số lượng</th>
                <th className="border border-gray-300 p-2 text-right">Giá</th>
                <th className="border border-gray-300 p-2 text-right">Tổng</th>
              </tr>
            </thead>
            <tbody>
              {paymentItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="border border-gray-300 p-2 text-center">{item.quantity}</td>
                  <td className="border border-gray-300 p-2 text-right">
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)}
                  </td>
                  <td className="border border-gray-300 p-2 text-right">
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                      item.price * item.quantity
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">Chưa có sản phẩm nào trong danh sách đơn mua.</p>
        )}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-700 font-medium">Tổng giá trị:</span>
        <span className="font-semibold text-lg text-red-600">
          {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalAmount)}
        </span>
      </div>
    </div>
  );
};

export default CartSummary;
