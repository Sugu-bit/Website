import React, { useState } from "react";
import categoryApi from "../../../api/categoryApi";

const DeleteCategory = () => {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      await categoryApi.deleteCategory(id);
      setMessage(`Category with ID ${id} deleted successfully!`);
      setId("");
    } catch (error) {
      setMessage("Failed to delete category.");
    }
  };

  return (
    <div>
      <h2>Delete Category</h2>
      <input
        type="number"
        placeholder="Category ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteCategory;
