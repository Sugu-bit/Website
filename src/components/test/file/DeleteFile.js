import React, { useState } from "react";
import fileApi from "../../../api/fileApi";

const DeleteFile = () => {
  const [fileId, setFileId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!fileId.trim()) {
      setError("File ID cannot be empty");
      return;
    }

    try {
      setLoading(true);
      await fileApi.deleteFile(fileId);
      alert("File deleted successfully");
      setFileId(""); // Clear input after success
    } catch (err) {
      setError("Failed to delete file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Delete File</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>
          File ID:
          <input
            type="text"
            value={fileId}
            onChange={(e) => setFileId(e.target.value)}
            placeholder="Enter file ID to delete"
          />
        </label>
      </div>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete File"}
      </button>
    </div>
  );
};

export default DeleteFile;
