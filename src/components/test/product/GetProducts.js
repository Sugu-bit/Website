import React, { useEffect, useState } from "react";
import productApi from "../../../api/productApi";

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getProducts();
        setProducts(data);
      } catch (error) {
        setMessage("Failed to fetch products.");
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {message && <p>{message}</p>}
      {products.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Prices</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Location</th>
              <th>Attributes</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.prices !== null ? `$${product.prices}` : "Not available"}</td>
                <td>{product.stock}</td>
                <td>{product.description || "No description"}</td>
                <td>{product.locationAddress}</td>
                <td>
                  {product.attributes ? (
                    <ul>
                      {Object.entries(product.attributes).map(([key, values]) => (
                        <li key={key}>
                          <strong>{key}:</strong> {values.join(", ")}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No attributes"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default GetProducts;
