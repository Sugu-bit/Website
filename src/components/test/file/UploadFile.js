import React, { useState } from "react";
import fileApi from "../../../api/fileApi";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [sort, setSort] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [productId, setProductId] = useState(""); // Thêm state cho productId
  const [reviewId, setReviewId] = useState(""); // Thêm state cho reviewId
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedFilePath, setUploadedFilePath] = useState(null); // Đường dẫn file đã tải lên

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null); // Reset lỗi khi người dùng chọn file mới
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleProductIdChange = (e) => {
    setProductId(e.target.value); // Xử lý thay đổi productId
  };

  const handleReviewIdChange = (e) => {
    setReviewId(e.target.value); // Xử lý thay đổi reviewId
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = {
      description: description.trim(),
      sort: sort ? parseInt(sort, 10) : null,
      isActive,
      productId: productId.trim() || null, // Truyền productId nếu có
      reviewId: reviewId.trim() || null, // Truyền reviewId nếu có
    };

    try {
      setLoading(true);
      const response = await fileApi.uploadFile(file, formData);
      console.log(file);
      alert(response.message || "File uploaded successfully");
      const fullPath = `https://localhost:8000/data/${response.file.replace(/\\/g, "/")}`;
      setUploadedFilePath(fullPath); // Lưu đường dẫn đầy đủ
      // Reset trạng thái
      setFile(null);
      setDescription("");
      setSort("");
      setProductId("");
      setReviewId("");
      setError(null);
    } catch (err) {
      setError("File upload failed: " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Description"
      />
      <input
        type="number"
        value={sort}
        onChange={handleSortChange}
        placeholder="Sort Order (optional)"
      />
      <input
        type="text"
        value={productId}
        onChange={handleProductIdChange}
        placeholder="Product ID (optional)"
      />
      <input
        type="text"
        value={reviewId}
        onChange={handleReviewIdChange}
        placeholder="Review ID (optional)"
      />
      <label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        Active
      </label>
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {uploadedFilePath && (
        <div style={{ marginTop: "20px" }}>
          <p>Uploaded File Path:</p>
          <a href={uploadedFilePath} target="_blank" rel="noopener noreferrer">
            {uploadedFilePath}
          </a>
          <div
            style={{
              marginTop: "10px",
              border: "1px solid #ddd",
              width: "100px",
              height: "100px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={uploadedFilePath}
              alt="Uploaded file"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
