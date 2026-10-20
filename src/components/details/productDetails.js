import React from "react";

const ProductDetails = ({ product, categoryLoading, categories }) => {
  // Tìm loại sản phẩm trong danh sách categories
  const productCategory = categories.find((cat) => cat.id === product.categoryId)?.description || "Không xác định";

  return (
    <div className="container mx-auto p-5 bg-white mb-5">
      {/* Chi tiết sản phẩm */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Chi tiết sản phẩm</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Loại sản phẩm */}
          <div className="flex flex-col">
            <span className="text-gray-600">Loại sản phẩm:</span>
            {categoryLoading ? (
              <span className="text-gray-500">Đang tải...</span>
            ) : (
              <span className="font-medium text-gray-800">{productCategory}</span>
            )}
          </div>
          {/* Số lượng */}
          <div className="flex flex-col">
            <span className="text-gray-600">Số lượng:</span>
            <span className="font-medium text-gray-800">{product.stock}</span>
          </div>
          {/* Xuất xứ */}
          <div className="flex flex-col">
            <span className="text-gray-600">Xuất xứ:</span>
            <span className="font-medium text-gray-800">{product.address || "Không xác định"}</span>
          </div>
          {/* Gửi từ */}
          <div className="flex flex-col">
            <span className="text-gray-600">Gửi từ:</span>
            <span className="font-medium text-gray-800">{product.add || "Không xác định"}</span>
          </div>
        </div>
      </div>

      {/* Mô tả sản phẩm */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Mô tả sản phẩm</h2>
        <p className="text-gray-700 leading-6">{product.description || "Không có mô tả."}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
