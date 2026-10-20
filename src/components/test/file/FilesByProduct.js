import React, { useState, useEffect } from "react";
import fileApi from "../../../api/fileApi";

const FilesByProduct = () => {
  const [productId, setProductId] = useState("");
  const [files, setFiles] = useState([]);
  const [onlyActive, setOnlyActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFiles = async () => {
    if (!productId) {
      setError("Product ID is required");
      return;
    }

    try {
      setLoading(true);
      const response = await fileApi.getFilesByProduct(productId, onlyActive);
      console.log(response);
      setFiles(response);
      setError(null);
    } catch (err) {
      setError("Failed to fetch files by product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Files By Product</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>
          Product ID:
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Only Active:
          <input
            type="checkbox"
            checked={onlyActive}
            onChange={(e) => setOnlyActive(e.target.checked)}
          />
        </label>
      </div>
      <button onClick={fetchFiles} disabled={loading}>
        {loading ? "Loading..." : "Fetch Files"}
      </button>

      {files.length > 0 && (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>File Name</th>
              <th>Description</th>
              <th>Uploaded At</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td>{file.id}</td>
                <td>{file.fileName}</td>
                <td>{file.description || "N/A"}</td>
                <td>{file.uploadedAt}</td>
                <td>{file.fileSize} bytes</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FilesByProduct;
