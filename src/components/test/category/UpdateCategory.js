import React, { useState } from "react";
import categoryApi from "../../../api/categoryApi";

const UpdateCategory = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParent] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    try {
      const category = await categoryApi.updateCategory(id, { name, description, parentId });
      setMessage(`Category "${category.name}" updated successfully!`);
    } catch (error) {
      setMessage("Failed to update category.");
    }
  };

  return (
    <div>
      <h2>Update Category</h2>
      <input
        type="number"
        placeholder="Category ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Parent Category ID (optional)"
        value={parentId || ""}
        onChange={(e) => setParent(e.target.value || null)}
      />
      <button onClick={handleUpdate}>Update</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateCategory;
