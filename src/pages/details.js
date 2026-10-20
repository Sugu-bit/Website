import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import productApi from "../api/productApi";
import ProductOverview from "../components/details/productOverview";
import ProductDetails from "../components/details/productDetails";
import Notification from "../components/details/notification";
import Navbar from "../components/navbar";

const DetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: "" });

  const { items: categories, loading: categoryLoading } = useSelector((state) => state.categories);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Bắt đầu tải dữ liệu
        const response = await productApi.getProductById(id);
        setProduct(response); // Lưu thông tin sản phẩm
      } catch (error) {
        setError("Không thể tải thông tin sản phẩm."); // Xử lý lỗi
      } finally {
        setLoading(false); // Kết thúc tải dữ liệu
      }
    };

    fetchProduct();
  }, [id]);

  // Hiển thị thông báo
  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: "" }), 3000); // Tự động ẩn thông báo sau 3 giây
  };

  // Xử lý tăng/giảm số lượng
  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Đang tải thông tin sản phẩm...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!product) {
    return <p className="text-center text-red-500">Sản phẩm không tồn tại!</p>;
  }

  return (
    <div className="bg-gray-300">
      <Navbar />
      {/* Hiển thị tổng quan sản phẩm */}
      <div className="container mx-auto p-5 bg-white mb-5 mt-3">
        <ProductOverview
          product={product}
          quantity={quantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      </div>
      {/* Hiển thị chi tiết sản phẩm */}
      <ProductDetails product={product} categoryLoading={categoryLoading} categories={categories} />

      {/* Hiển thị thông báo */}
      <Notification notification={notification} />
    </div>
  );
};

export default DetailsPage;
