import React, { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import ProductCart from "../productcart"; 

const Suggest = () => {
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchSuggestedProducts = async () => {
    const suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
    if (suggestions.length === 0) {
      setSuggestedProducts([]);
      setLoading(false);
      return;
    }

    try {
      const products = await Promise.all(
        suggestions.map(async (id) => {
          const product = await productApi.getProductById(id);
          console.log(product)
          return product;
        })
      );
      setSuggestedProducts(products);
    } catch (err) {
      setError("Không thể tải danh sách sản phẩm gợi ý.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestedProducts();
  }, []);

  if (loading) {
    return <div className="text-center">Đang tải sản phẩm gợi ý...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      {/* <h1 className="text-2xl my-5 text-center font-bold relative before:content-['']
      before:absolute before:top-1/2 before:left-0 before:w-1/4 before:h-0.5 before:bg-gray-300 
      before:translate-y-[-50%] after:content-[''] after:absolute after:top-1/2 
      after:right-0 after:w-1/4 after:h-0.5 after:bg-gray-300 after:translate-y-[-50%]">
        GỢI Ý HÔM NAY
      </h1> */}
      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-4 m-20">
        {suggestedProducts.length > 0 ? (
          suggestedProducts.map((product, key) => (
            <ProductCart key={key} data={product} />
          ))
        ) : (
          <p className="text-center col-span-full">Không có sản phẩm nào trong danh sách gợi ý.</p>
        )}
      </div>
    </div>
  );
};

export default Suggest;
