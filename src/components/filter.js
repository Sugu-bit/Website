import React, { useState } from "react";

const Filter = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const categoryTree = JSON.parse(sessionStorage.getItem("categories")) || [];

  // Xử lý thay đổi danh mục
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Xử lý thay đổi khoảng giá
  const handlePriceInputChange = (event) => {
    const { name, value } = event.target;
    if (/^\d*$/.test(value)) {
      setPriceRange({ ...priceRange, [name]: value });
    }
  };

  // Gửi dữ liệu lọc khi nhấn "Áp dụng"
  const handleApplyFilter = () => {
    const min = priceRange.min === "" ? 0 : parseInt(priceRange.min, 10);
    const max =
      priceRange.max === "" ? Number.MAX_SAFE_INTEGER : parseInt(priceRange.max, 10);
    onFilterChange(selectedCategory, [min, max]);
  };

  // Hàm render danh mục con từ `categoryTree`
  const renderCategoryOptions = (categories) => {
    return categories.map((category) => (
      <React.Fragment key={category.id}>
        <option value={category.id}>{category.name}</option>
        {category.children && category.children.length > 0 && (
          <optgroup label={`-- ${category.name}`}>
            {renderCategoryOptions(category.children)}
          </optgroup>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="p-4 border rounded-lg shadow-md mb-4 bg-white">
      <h3 className="text-xl font-semibold mb-3">Lọc sản phẩm</h3>

      {/* Lọc theo danh mục */}
      <div className="mb-3">
        <label htmlFor="category" className="block text-gray-700 font-medium">
          Danh mục
        </label>
        <select
          id="category"
          value={selectedCategory || ""}
          onChange={handleCategoryChange}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Tất cả</option>
          {renderCategoryOptions(categoryTree)}
        </select>
      </div>

      {/* Lọc theo khoảng giá */}
      <div className="mb-3">
        <label className="block text-gray-700 font-medium">Khoảng giá</label>
        <div className="flex space-x-2">
          <input
            type="text"
            name="min"
            value={priceRange.min}
            onChange={handlePriceInputChange}
            placeholder="Từ"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            name="max"
            value={priceRange.max}
            onChange={handlePriceInputChange}
            placeholder="Đến"
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Nút áp dụng */}
      <div className="mt-3">
        <button
          onClick={handleApplyFilter}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
};

export default Filter;
