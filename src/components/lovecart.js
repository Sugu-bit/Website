import React from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaShareSquare } from "react-icons/fa";
import GetInterfaceProduct from "../components/storemanager/getInterfaceProduct"; // Component hiển thị ảnh sản phẩm

const LoveCart = ({ product, onRemove }) => {
  return (
    <div className="border p-4 my-4 rounded-lg shadow-md bg-white flex items-center">
      {/* Ảnh sản phẩm */}
      <div className="w-20 h-20">
        <GetInterfaceProduct
          productId={product.id}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex-1 ml-4">
        <Link to={`/details/${product.id}`} className="hover:underline">
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.price}đ</p>
        </Link>
        <p className="text-sm text-gray-600">{product.categoryId || "Không rõ danh mục"}</p>
      </div>

      {/* Hành động */}
      <div className="flex space-x-4">
        {/* Chia sẻ */}
        <button
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => alert(`Share product: ${product.name}`)}
        >
          <FaShareSquare className="mr-2" /> Chia sẻ
        </button>

        {/* Xóa */}
        <button
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={() => onRemove(product.id)}
        >
          <FaTrashAlt className="mr-2" /> Xóa khỏi yêu thích
        </button>
      </div>
    </div>
  );
};

export default LoveCart;
