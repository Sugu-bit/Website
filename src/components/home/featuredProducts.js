import React, { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import ProductCart from "../productcart";

function FeaturedProducts({ mode = "all", brand = "", limit = 10 }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rankingAvailable, setRankingAvailable] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchProducts = async () => {
      try {
        const result = await productApi.getAllProducts();
        if (active) {
          if (!Array.isArray(result)) {
            throw new Error("Dữ liệu sản phẩm từ máy chủ không hợp lệ.");
          }
          let matchingProducts = result;
          if (mode === "discounted") {
            matchingProducts = result.filter((product) => Number(product.discountPercentage) > 0);
          } else if (mode === "brand") {
            const brandPattern = {
              Apple: /iphone|apple/i,
              Samsung: /samsung/i,
              Xiaomi: /xiaomi/i,
              OPPO: /oppo/i,
            }[brand];
            matchingProducts = result.filter((product) =>
              Number(product.categoryId) === 44 && brandPattern?.test(product.name || "")
            );
          }
          if (mode === "popular") {
            setRankingAvailable(matchingProducts.some((product) => Number(product.popularity) > 0));
            matchingProducts.sort((first, second) => Number(second.popularity || 0) - Number(first.popularity || 0));
          }
          setProducts(matchingProducts.slice(0, limit));
        }
      } catch {
        if (active) {
          setError("Không thể tải sản phẩm. Vui lòng kiểm tra kết nối máy chủ.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      active = false;
    };
  }, [mode, brand, limit]);

  if (loading) {
    return <p className="home-products__state" role="status">Đang tải sản phẩm...</p>;
  }

  if (error) {
    return <p className="home-products__state home-products__state--error" role="alert">{error}</p>;
  }

  if (products.length === 0) {
    return (
      <p className="home-products__state">
        {mode === "discounted"
          ? "Hiện chưa có sản phẩm được áp dụng khuyến mãi."
          : mode === "brand"
            ? `Hiện chưa có sản phẩm ${brand} phù hợp.`
            : "Chưa có sản phẩm để hiển thị."}
      </p>
    );
  }

  return (
    <div>
      {mode === "popular" && !rankingAvailable && (
        <p className="home-products__state" role="status">
          Chưa có dữ liệu xếp hạng bán hàng; danh sách bên dưới hiển thị sản phẩm hiện có.
        </p>
      )}
      <div className="home-product-grid">
        {products.map((product) => (
          <ProductCart key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
