import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/navbar"; // Thanh điều hướng
import Filter from "../components/filter"; // Bộ lọc sản phẩm
import LoveCart from "../components/lovecart"; // Card hiển thị sản phẩm
import { removeFromLove } from "../redux/loveSlice"; // Action xóa sản phẩm khỏi yêu thích
import productApi from "../api/productApi";

const Love = () => {
  const dispatch = useDispatch();
  const lovedItems = useSelector((store) => store.love.items); // Lấy danh sách yêu thích từ Redux
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  // Hàm tải thông tin sản phẩm yêu thích từ API
  const fetchLovedProducts = async () => {
    try {
      if (lovedItems.length > 0) {
        const productDetails = [];
        for (const lovedItem of lovedItems) {
          const data = await productApi.getProductById(lovedItem.productId);
          console.log(data);
          productDetails.push(data);
        }
        setProducts(productDetails);
        setFilteredProducts(productDetails);
      } else {
        setProducts([]);
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch loved products:", error);
    }
  };

  useEffect(() => {
    fetchLovedProducts();
  }, [lovedItems]);

  const handleFilterChange = (categoryId, priceRange) => {
    let filtered = products;

    if (categoryId) {
      filtered = filtered.filter((product) => product.categoryId === parseInt(categoryId, 10));
    }

    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  };

  // Hàm xóa sản phẩm khỏi yêu thích
  const handleRemoveFromLove = (productId) => {
    dispatch(removeFromLove({ productId }));
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Danh mục yêu thích</h2>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {showFilter ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
          </button>
        </div>

        {/* Hiển thị bộ lọc */}
        {showFilter && <Filter onFilterChange={handleFilterChange} />}

        {/* Hiển thị danh sách sản phẩm yêu thích */}
        <div className="grid grid-cols-1 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <LoveCart key={product.id} product={product} onRemove={handleRemoveFromLove} />
            ))
          ) : (
            <p className="text-center text-gray-500">Chưa có sản phẩm yêu thích nào.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Love;
