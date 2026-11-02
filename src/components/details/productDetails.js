import React from "react";

const ProductDetails = ({ product, categoryLoading, categories }) => {
  // Tìm loại sản phẩm trong danh sách categories
  const productCategory = categories.find((cat) => Number(cat.id) === Number(product.categoryId))?.description || "Không xác định";
  const attributes = Object.entries(product.attributes || {}).flatMap(([name, values]) =>
    (Array.isArray(values) ? values : [values]).filter((value) => value && value !== "default").map((value) => ({ name, value }))
  );

  return (
    <div className="container mx-auto p-5 bg-white mb-5">
      {/* Chi tiết sản phẩm */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Chi tiết sản phẩm</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="flex flex-col">
            <span className="text-gray-600">Địa chỉ cửa hàng/kho:</span>
            <span className="font-medium text-gray-800">{product.locationAddress || "Chưa cập nhật"}</span>
          </div>
        </div>
      </div>

      {attributes.length > 0 && (
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Thông số sản phẩm</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {attributes.map(({ name, value }, index) => (
              <div key={`${name}-${value}-${index}`} className="flex justify-between gap-4 border-b py-2">
                <dt className="text-gray-600">{name}</dt>
                <dd className="font-medium text-gray-800 text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Mô tả sản phẩm */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Mô tả sản phẩm</h2>
        <p className="text-gray-700 leading-6">{product.description || "Không có mô tả."}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
