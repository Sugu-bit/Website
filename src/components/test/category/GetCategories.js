import React, { useEffect, useState } from "react";
import categoryApi from "../../../api/categoryApi";

const GetCategories = () => {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryApi.getAllCategories();
        console.log(data);
        setCategories(data);
      } catch (error) {
        setMessage("Failed to fetch categories.");
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Category List</h2>
      {message && <p>{message}</p>}
      {categories.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Parent Category</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.description || "No description"}</td>
                <td>
                  {category.hierarchyPath}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
};

export default GetCategories;
