import React from "react";

const FileCard = ({ file }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
      <h3>{file.fileName}</h3>
      <p><strong>Path:</strong> {file.filePath}</p>
      <p><strong>Size:</strong> {file.fileSize} bytes</p>
      <p><strong>Uploaded At:</strong> {file.uploadedAt}</p>
      <p><strong>Description:</strong> {file.description || "No description available"}</p>
    </div>
  );
};

export default FileCard;
