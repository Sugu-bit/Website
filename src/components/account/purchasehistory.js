import React, { useEffect, useState } from 'react';
import orderApi from '../../api/orderApi'; // Đường dẫn đến file orderApi

const PurchaseHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm lấy dữ liệu từ API
  const fetchOrders = async () => {
    try {
      const data = await orderApi.getAllOrders(); // Gọi hàm getAllOrders từ orderApi
      setOrders(data);
    } catch (err) {
      setError("Không thể tải dữ liệu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lịch sử mua hàng</h2>
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg p-4 mb-4 shadow-md bg-white">
          <h3 className="text-lg font-semibold">ID đơn hàng: {order.id}</h3>
          <p>Phương thức thanh toán: {order.paymentMethod}</p>
          <p>Trạng thái đơn hàng: {order.shippingStatus}</p>
          <h4 className="mt-3 font-semibold">Sản phẩm:</h4>
          <ul className="list-disc pl-5">
            {order.products.map((product, index) => {
              // Bỏ qua trường có giá trị null
              if (!product[1]) return null;
              return (
                <li key={index}>
                  <span>{product[1]} - </span>
                  <span>Số lượng: {product[3]} - </span>
                  <span>Giá trị: {product[2]}đ</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PurchaseHistory;
