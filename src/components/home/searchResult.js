import React, { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import ProductCart from "../productcart";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    // Lấy từ khóa tìm kiếm từ query string
    const queryParams = new URLSearchParams(location.search);
    const keywords = queryParams.get("keywords") || "";
    // Hàm loại bỏ dấu từ chuỗi
    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    const fetchSearchResults = async () => {
        setLoading(true);
        setError(null);

        if (!keywords.trim()) {
            setSearchResults([]);  // Nếu không có từ khóa, không cần tìm kiếm
            setLoading(false);
            return;
        }

        try {
            const results = await productApi.searchProductsByKeywords(keywords);
            // Lọc thông tin cần thiết
            const filteredResults = results.data.filter((item) => {
                const productName = removeAccents(item.product.name.toLowerCase()); // Xử lý tên sản phẩm
                const keyword = removeAccents(keywords.toLowerCase()); // Xử lý từ khóa tìm kiếm
                return productName.includes(keyword); // Kiểm tra có chứa từ khóa không
            }).map((item) => ({
                id: item.product.id,
                name: item.product.name,
                image: item.product.image || "default_image.jpg",
                price: item.product.price || "Liên hệ",
            }));
            setSearchResults(filteredResults);
        } catch (err) {
            console.error(err);
            setError("Không thể tải kết quả tìm kiếm.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSearchResults();
    }, [keywords]);

    if (loading) {
        return <div className="text-center mt-10">Đang tải kết quả tìm kiếm...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <div>
            <h1 className="text-2xl my-5 text-center font-bold">
                Kết quả tìm kiếm cho "{keywords}"
            </h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 p-5">
                {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                        <ProductCart key={product.id} data={product} />
                    ))
                ) : (
                    <p className="text-center col-span-full">
                        Không có sản phẩm nào phù hợp với từ khóa.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
