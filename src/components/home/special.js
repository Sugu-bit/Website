import React, { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import ProductCart from "../productcart";

const SpecialProducts = () => {
    const [specialProducts, setSpecialProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSpecialProducts = async () => {
        const specials = JSON.parse(localStorage.getItem("specialProducts")) || [];
        if (specials.length === 0) {
            setSpecialProducts([]);
            setLoading(false);
            return;
        }

        try {
            const products = await Promise.all(
                specials.map(async (id) => {
                    const product = await productApi.getProductById(id);
                    return product;
                })
            );
            setSpecialProducts(products);
        } catch (err) {
            setError("Không thể tải danh sách sản phẩm đặc biệt.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSpecialProducts();
    }, []);

    if (loading) {
        return <div className="text-center">Đang tải sản phẩm đặc biệt...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div>
            <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-4 m-20">
                {specialProducts.length > 0 ? (
                    specialProducts.map((product, key) => (
                        <ProductCart key={key} data={product} />
                    ))
                ) : (
                    <p className="text-center col-span-full">Không có sản phẩm nào trong danh sách đặc biệt.</p>
                )}
            </div>
        </div>
    );
};

export default SpecialProducts;
