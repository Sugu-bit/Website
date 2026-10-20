import React, { useState } from "react";
import categoryApi from "../../../api/categoryApi";

const GetSubcategories = () => {
    const [categoryId, setCategoryId] = useState("");
    const [subcategories, setSubcategories] = useState([]);
    const [message, setMessage] = useState("");

    const handleFetch = async () => {
        try {
            const data = await categoryApi.getSubcategories(categoryId);
            setSubcategories(data);
            setMessage("");
        } catch (error) {
            setMessage("Failed to fetch subcategories.");
        }
    };

    return (
        <div>
            <h2>Get Subcategories By Category</h2>
            <input
                type="number"
                placeholder="Enter Category ID"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            />
            <button onClick={handleFetch}>Fetch</button>
            {message && <p>{message}</p>}
            {subcategories.length > 0 ? (
                <div>
                    <h3>Subcategories:</h3>
                    <ul>
                        {subcategories.map((subcategory) => (
                            <li key={subcategory.id}>
                                <h4>{subcategory.name}</h4>
                                <p>Description: {subcategory.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No subcategories found for this category.</p>
            )}
        </div>
    );
};

export default GetSubcategories;
