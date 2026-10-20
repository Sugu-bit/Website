import React, { useState } from "react";
import categoryApi from "../../../api/categoryApi";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParent] = useState(null);
  const [message, setMessage] = useState("");
  const [hierarchyPath, setHierarchyPath] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await categoryApi.createCategory({
        name,
        description,
        parentId,
      });
      setMessage(
        `Category "${response.name}" created successfully with path: "${response.hierarchyPath}"`
      );
      setName("");
      setDescription("");
      setParent(null);
      setHierarchyPath(response.hierarchyPath);
    } catch (error) {
      setMessage("Failed to create category. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Name:</label>
          <input
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            placeholder="Enter description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Parent Category ID:</label>
          <input
            type="number"
            placeholder="Enter parentId ID (optional)"
            value={parentId || ""}
            onChange={(e) => setParent(e.target.value || null)}
          />
        </div>
        <button type="submit">Add Category</button>
      </form>
      {message && <p>{message}</p>}
      {hierarchyPath && <p>Hierarchy Path: {hierarchyPath}</p>}
    </div>
  );
};

export default AddCategory;
