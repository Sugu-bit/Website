import React from "react";
import { useSelector } from "react-redux";

const TreeSelect = ({ label, name, value, onChange, error }) => {
  const { items: categories, loading } = useSelector((state) => state.categories);

  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">-- Chọn danh mục --</option>
        {!loading && categories.length > 0
          ? categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.description}
              </option>
            ))
          : <option disabled>Đang tải...</option>}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TreeSelect;
