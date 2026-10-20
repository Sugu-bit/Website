import React, { useState } from "react";
import productApi from "../../../api/productApi";

const GetProductById = () => {
  const [id, setId] = useState("");
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");

  const handleFetch = async () => {
    try {
      const data = await productApi.getProductById(id);
      setProduct(data);
      setMessage("");
    } catch (error) {
      setMessage("Failed to fetch product.");
      setProduct(null);
    }
  };

  return (
    <div>
      <h2>Get Product By ID</h2>
      <input
        type="number"
        placeholder="Enter Product ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleFetch}>Fetch</button>
      {message && <p>{message}</p>}
      {product && (
        <div>
          <h3>{product.name}</h3>
          <p>Description: {product.description}</p>
          <p>Price: {product.prices || "Not available"}</p>
          <p>Stock: {product.stock}</p>
          <p>Location: {product.locationAddress}</p>
          <p>Category ID: {product.categoryId || "None"}</p>

          <h4>Attributes:</h4>
          {product.attributes ? (
            <div>
              {Object.entries(product.attributes).map(([key, values]) => (
                <div key={key}>
                  <strong>{key}:</strong>
                  <ul>
                    {values.map((value, index) => (
                      <li key={index}>{value}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p>No attributes available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GetProductById;
