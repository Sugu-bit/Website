import React, { useState } from "react";
import fileApi from "../../../api/fileApi";

const FileViewer = () => {
  const [id, setId] = useState(""); // Trạng thái lưu ID được nhập
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchFile = async () => {
    if (!id.trim()) {
      setError("Please enter a valid file ID.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setFile(null);

      const response = await fileApi.getFileById(id.trim()); // Gọi API lấy file theo ID
      if (response) {
        response.fullPath = `https://localhost:8000/data/${response.filePath.replace(/\\/g, "/")}`; // Tạo đường dẫn đầy đủ
        setFile(response);
      } else {
        setError("File not found");
      }
    } catch (err) {
      setError("Failed to fetch file: " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>File Viewer</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter file ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleFetchFile} disabled={loading}>
          {loading ? "Loading..." : "Fetch File"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {file && (
        <div>
          <h3>File Details</h3>
          <p><strong>ID:</strong> {file.id}</p>
          <p><strong>Name:</strong> {file.fileName}</p>
          <p><strong>Path:</strong> 
            <a href={file.fullPath} target="_blank" rel="noopener noreferrer">
              {file.fullPath}
            </a>
          </p>
          <p><strong>Description:</strong> {file.description || "No description available"}</p>
          <div
            style={{
              marginTop: "20px",
              border: "1px solid #ddd",
              width: "200px",
              height: "200px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={file.fullPath}
              alt={file.fileName || "File preview"}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileViewer;
