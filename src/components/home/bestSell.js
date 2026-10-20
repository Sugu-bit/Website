import React, { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import ProductCart from "../productcart";

const BestSellProducts = () => {
    const [bestSellProducts, setBestSellProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBestSellProducts = async () => {
        const bestSells = JSON.parse(localStorage.getItem("bestSells")) || [];
        if (bestSells.length === 0) {
            setBestSellProducts([]);
            setLoading(false);
            return;
        }

        try {
            const products = await Promise.all(
                bestSells.map(async (id) => {
                    const product = await productApi.getProductById(id);
                    return product;
                })
            );
            setBestSellProducts(products);
        } catch (err) {
            setError("Không thể tải danh sách sản phẩm bán chạy.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBestSellProducts();
    }, []);

    if (loading) {
        return <div className="text-center">Đang tải sản phẩm bán chạy...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div>
            <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-4 m-20">
                {bestSellProducts.length > 0 ? (
                    bestSellProducts.map((product, key) => (
                        <ProductCart key={key} data={product} />
                    ))
                ) : (
                    <p className="text-center col-span-full">Không có sản phẩm nào trong danh sách bán chạy.</p>
                )}
            </div>
        </div>
    );
};

export default BestSellProducts;
