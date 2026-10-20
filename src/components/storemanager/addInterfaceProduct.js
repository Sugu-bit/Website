import React, { useState } from "react";

const AddInterfaceProduct = ({ onFileSelected }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // Trạng thái cho ảnh xem trước
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Kiểm tra xem file có phải ảnh không
    if (!selectedFile.type.startsWith("image/")) {
      setFile(null); // Không lưu file không hợp lệ
      setPreview(null); // Xóa preview nếu file không hợp lệ
      setError("Chỉ được phép tải lên tệp hình ảnh!");
      return;
    }

    // Tạo URL tạm thời để xem trước ảnh
    const previewURL = URL.createObjectURL(selectedFile);
    setFile(selectedFile); // Lưu file hợp lệ
    setPreview(previewURL); // Lưu URL xem trước
    setError(null); // Reset lỗi

    // Gọi callback để thông báo về component cha
    if (onFileSelected) {
      onFileSelected(selectedFile);
    }
  };

  return (
    <div>
      <h3>Chọn Ảnh Giao Diện Sản Phẩm</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
      {preview && (
        <div style={{ marginTop: "10px" }}>
          <p>Ảnh xem trước:</p>
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "contain" }}
          />
        </div>
      )}
    </div>
  );
};

export default AddInterfaceProduct;
