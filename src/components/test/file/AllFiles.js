import React, { useEffect, useState } from "react";
import fileApi from "../../../api/fileApi";

const AllFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllFiles = async () => {
      try {
        const response = await fileApi.getAllFiles();
        setFiles(response);
      } catch (err) {
        setError("Failed to fetch all files");
      } finally {
        setLoading(false);
      }
    };

    fetchAllFiles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div>
      <h2>All Files</h2>
      {files.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>File Name</th>
              <th>File Path</th>
              <th>File Size</th>
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
                <td>{file.fileSize}</td>
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
        <p>No files available</p>
      )}
    </div>
  );
};

export default AllFiles;
