import React, { useState } from "react";
import fileApi from "../../api/fileApi";

const DeleteInterfaceProduct = ({ fileId, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!fileId) {
      setError("Không tìm thấy ID của ảnh cần xóa.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Gọi API xóa file
      await fileApi.deleteFile(fileId);

      // Thông báo thành công
      alert("Ảnh đã được xóa thành công!");

      // Gọi callback để thông báo về component cha
      if (onDeleteSuccess) {
        onDeleteSuccess(); // Ví dụ: Reset trạng thái ảnh hiện tại ở EditProduct
      }
    } catch (err) {
      setError("Lỗi khi xóa ảnh: " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
      >
        {loading ? "Đang xóa..." : "Xóa ảnh"}
      </button>
    </div>
  );
};

export default DeleteInterfaceProduct;
