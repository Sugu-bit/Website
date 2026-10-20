import React, { useEffect, useState } from "react";
import fileApi from "../../../api/fileApi";

const FileList = ({ page, limit }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fileApi.getFilesPaginated(page, limit);
        if (response.length === 0) {
          setError("No files available");
        }
        setFiles(response);
      } catch (err) {
        setError("Failed to fetch files");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [page, limit]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div>
      <h2>Paginated File List</h2>
      {files.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>File Name</th>
              <th>File Path</th>
              <th>File Size (KB)</th>
              <th>Sort</th>
              <th>Uploaded At</th>
              <th>Active</th>
              <th>Target</th>
              <th>Target ID</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td>{file.id}</td>
                <td>{file.userId}</td>
                <td>{file.fileName}</td>
                <td>{file.filePath}</td>
                <td>{(file.fileSize / 1024).toFixed(2)}</td>
                <td>{file.sort || "-"}</td>
                <td>{file.uploadedAt}</td>
                <td>{file.isActive ? "Yes" : "No"}</td>
                <td>{file.target || "N/A"}</td>
                <td>{file.targetId || "N/A"}</td>
                <td>{file.description || "No description"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No files to display</p>
      )}
    </div>
  );
};

export default FileList;
