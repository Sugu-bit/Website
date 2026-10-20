import React, { useState } from "react";
import fileApi from "../../../api/fileApi";

const UpdateFile = ({
  currentDescription = "",
  currentIsActive = true,
  currentSort = 0,
  currentProductId = "",
  currentReviewId = "",
}) => {
  const [fileId, setFileId] = useState(""); // Thêm trường nhập File ID
  const [description, setDescription] = useState(currentDescription);
  const [isActive, setIsActive] = useState(currentIsActive);
  const [sort, setSort] = useState(currentSort);
  const [productId, setProductId] = useState(currentProductId);
  const [reviewId, setReviewId] = useState(currentReviewId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    if (!fileId.trim()) {
      setError("File ID cannot be empty");
      return;
    }

    if (!description.trim()) {
      setError("Description cannot be empty");
      return;
    }

    const data = { description, isActive, sort, productId, reviewId };

    try {
      setLoading(true);
      await fileApi.updateFile(fileId, data);
      alert("File updated successfully");
    } catch (err) {
      setError("Failed to update file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Update File Information</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>
          File ID:
          <input
            type="text"
            value={fileId}
            onChange={(e) => setFileId(e.target.value)}
            placeholder="Enter File ID"
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter new description"
          />
        </label>
      </div>
      <div>
        <label>
          Is Active:
          <select
            value={isActive ? "true" : "false"}
            onChange={(e) => setIsActive(e.target.value === "true")}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Sort:
          <input
            type="number"
            value={sort}
            onChange={(e) => setSort(Number(e.target.value))}
            placeholder="Enter sort order"
          />
        </label>
      </div>
      <div>
        <label>
          Product ID:
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Enter product ID"
          />
        </label>
      </div>
      <div>
        <label>
          Review ID:
          <input
            type="text"
            value={reviewId}
            onChange={(e) => setReviewId(e.target.value)}
            placeholder="Enter review ID"
          />
        </label>
      </div>
      <button onClick={handleUpdate} disabled={loading}>
        {loading ? "Updating..." : "Update File"}
      </button>
    </div>
  );
};

export default UpdateFile;
