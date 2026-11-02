import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import productApi from "../api/productApi";
import ProductOverview from "../components/details/productOverview";
import ProductDetails from "../components/details/productDetails";
import Navbar from "../components/navbar";
import api from "../api/api";
import Footer from "../components/footer";
import ConnectWidget from "../components/connectwidget";

const DetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productOptions, setProductOptions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState("");
  const [quantity, setQuantity] = useState(1); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const { items: categories, loading: categoryLoading } = useSelector((state) => state.categories);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Bắt đầu tải dữ liệu
        setError(null);
        const productResponse = await productApi.getProductById(id);
        setProduct(productResponse);
        setProductOptions(Array.isArray(productResponse.options) ? productResponse.options : []);
      } catch (error) {
        setError("Không thể tải thông tin sản phẩm."); // Xử lý lỗi
      } finally {
        setLoading(false); // Kết thúc tải dữ liệu
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    let active = true;
    setReviewsLoading(true);
    setReviewsError("");
    api.get("/reviews")
      .then((response) => {
        if (active && Array.isArray(response.data)) {
          setReviews(response.data.filter((review) => Number(review.productId) === Number(id) && review.isApproved));
        }
      })
      .catch((reviewError) => {
        console.error("Không thể tải đánh giá sản phẩm:", reviewError);
        if (active) setReviewsError("Không thể tải đánh giá sản phẩm.");
      })
      .finally(() => {
        if (active) setReviewsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

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
    return <><Navbar /><p className="text-center text-gray-600 py-10" role="status">Đang tải thông tin sản phẩm...</p></>;
  }

  if (error) {
    return <><Navbar /><p className="text-center text-red-600 py-10" role="alert">{error}</p></>;
  }

  if (!product) {
    return <><Navbar /><p className="text-center text-red-600 py-10">Sản phẩm không tồn tại!</p></>;
  }

  return (
    <div className="bg-gray-300">
      <Navbar />
      {/* Hiển thị tổng quan sản phẩm */}
      <div className="container mx-auto p-5 bg-white mb-5 mt-3">
        <ProductOverview
          product={product}
          productOptions={productOptions}
          quantity={quantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          setQuantity={setQuantity}
        />
      </div>
      {/* Hiển thị chi tiết sản phẩm */}
      <ProductDetails product={product} categoryLoading={categoryLoading} categories={categories} />
      <section className="container mx-auto bg-white p-5 mb-8" aria-labelledby="product-reviews-heading">
        <h2 id="product-reviews-heading" className="text-2xl font-bold mb-3">Đánh giá sản phẩm</h2>
        {reviewsLoading ? (
          <p role="status">Đang tải đánh giá...</p>
        ) : reviewsError ? (
          <p className="text-red-600" role="alert">{reviewsError}</p>
        ) : reviews.length ? (
          <div className="space-y-4">
            <p className="font-semibold">
              {(reviews.reduce((total, review) => total + Number(review.rating || 0), 0) / reviews.length).toFixed(1)} / 5
              <span className="ml-2 text-gray-600">({reviews.length} đánh giá)</span>
            </p>
            {reviews.map((review) => (
              <article key={review.id} className="border-t pt-3">
                <p className="text-amber-600" aria-label={`${review.rating} trên 5 sao`}>
                  {"★".repeat(Math.max(0, Math.min(5, Number(review.rating) || 0)))}
                  <span className="text-gray-400">{"★".repeat(5 - Math.max(0, Math.min(5, Number(review.rating) || 0)))}</span>
                </p>
                {review.comment && <p className="mt-1 text-gray-700">{review.comment}</p>}
                <time className="text-sm text-gray-500">{review.createdAt}</time>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Sản phẩm chưa có đánh giá đã duyệt.</p>
        )}
      </section>
      <ConnectWidget />
      <Footer />
    </div>
  );
};

export default DetailsPage;
