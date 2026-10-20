import React, { useState } from "react";
import productApi from "../../api/productApi";
import Confirm from "../confirm"; // Import component Confirm

const DeleteProduct = ({ productId, onDelete, onClose }) => {
  const [showConfirm, setShowConfirm] = useState(false); // Quản lý trạng thái hiển thị Confirm
  const [error, setError] = useState("");

  const handleConfirmDelete = async () => {
    try {
      await productApi.deleteProduct(productId); // Gọi API để xóa sản phẩm
      onDelete(productId); // Gọi callback để cập nhật danh sách sản phẩm
      setShowConfirm(false);
      onClose();
    } catch (err) {
      setError("Failed to delete product. Please try again.");
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false); // Đóng Confirm khi hủy
  };

  return (
    <div>
      {/* Hiển thị nút Delete */}
      <button
        onClick={() => setShowConfirm(true)} // Hiển thị Confirm khi nhấn Delete
        className="text-red-600 hover:underline mr-2"
      >
        Delete
      </button>

      {/* Hiển thị Confirm nếu trạng thái showConfirm là true */}
      {showConfirm && (
        <Confirm
          message="Bạn có chắc chắn muốn xóa sản phẩm này?"
          onConfirm={handleConfirmDelete} // Xác nhận xóa
          onCancel={handleCancelDelete}  // Hủy xóa
        />
      )}

      {/* Hiển thị lỗi nếu có */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default DeleteProduct;
