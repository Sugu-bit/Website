import React, { useState } from "react";
import productApi from "../../../api/productApi";

const DeleteProduct = () => {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      await productApi.deleteProduct(id);
      setMessage(`Product with ID ${id} deleted successfully!`);
      setId("");
    } catch (error) {
      setMessage("Failed to delete product.");
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <input
        type="number"
        placeholder="Product ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteProduct;
