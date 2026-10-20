import React, { useEffect, useState } from "react";
import fileApi from "../../../api/fileApi";

const FilesByUser = () => {
  const [userId, setUserId] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFilesByUser = async () => {
    if (!userId.trim()) {
      setError("User ID cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const response = await fileApi.getFilesByUser(userId);
      setFiles(response);
      setError(null);
    } catch (err) {
      setError("Failed to fetch files for this user.");
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Fetch Files by User</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
          />
        </label>
        <button onClick={fetchFilesByUser} disabled={loading}>
          {loading ? "Loading..." : "Fetch Files"}
        </button>
      </div>
      {files.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>File Name</th>
              <th>Uploaded At</th>
              <th>Size</th>
              <th>Active</th>
              <th>Description</th>
              <th>Product ID</th>
              <th>Review ID</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td>{file.id}</td>
                <td>{file.fileName}</td>
                <td>{file.uploadedAt}</td>
                <td>{file.fileSize} bytes</td>
                <td>{file.isActive ? "Yes" : "No"}</td>
                <td>{file.description || "No description"}</td>
                <td>{file.productId || "N/A"}</td>
                <td>{file.reviewId || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: "20px" }}>
          {files.length === 0 && !loading && !error ? "No files found for this user." : ""}
        </p>
      )}
    </div>
  );
};

export default FilesByUser;
