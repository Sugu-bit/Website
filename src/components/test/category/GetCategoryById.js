import React, { useState } from "react";
import categoryApi from "../../../api/categoryApi";

const GetCategoryById = () => {
  const [id, setId] = useState("");
  const [category, setCategory] = useState(null);
  const [message, setMessage] = useState("");

  const handleFetch = async () => {
    try {
      const data = await categoryApi.getCategoryById(id);
      setCategory(data);
      setMessage("");
    } catch (error) {
      setMessage("Failed to fetch category.");
    }
  };

  return (
    <div>
      <h2>Get Category By ID</h2>
      <input
        type="number"
        placeholder="Enter Category ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleFetch}>Fetch</button>
      {message && <p>{message}</p>}
      {category && (
        <div>
          <h3>{category.name}</h3>
          <p>Description: {category.description || "No description"}</p>
          {category.hierarchyPath}
        </div>
      )}
    </div>
  );
};

export default GetCategoryById;
