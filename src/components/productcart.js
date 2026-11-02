import React from 'react';
import { Link } from 'react-router-dom';
import GetInterfaceProduct from "./storemanager/getInterfaceProduct";
import getProductImageUrl from "../utils/productImages";

const ProductCart = (props) => {
    const { id, name, price, imageUrl, discountPercentage, stock, description } = props.data;
    // const slugify = (text) => {
    //     return text
    //         .toLowerCase()
    //         .replace(/[^a-z0-9]+/g, '-')
    //         .replace(/^-+|-+$/g, '');
    // };
    // const slug = slugify(name);

    // const toggleFavorite = () => {
    //     setIsFavorite(!isFavorite);
    // };

    const formatPrice = (price) => {
        if (price === null || price === undefined || price === "") {
            return "Liên hệ";
        }

        const numericPrice = Number(price);
        return Number.isFinite(numericPrice)
            ? `${new Intl.NumberFormat("vi-VN").format(numericPrice)} đ`
            : "Liên hệ";
    };
    const discount = Math.min(100, Math.max(0, Number(discountPercentage) || 0));
    const isReferenceData = typeof description === "string"
        && description.startsWith("Dữ liệu tham khảo:");
    const currentPrice = price === null || price === undefined || price === ""
        ? null
        : Number(price) * (1 - discount / 100);

    return (
        <div className="relative bg-white shadow-md border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300
        hover:border-blue-500">
            {/* <div 
                className="absolute top-4 right-4 text-red-500 cursor-pointer z-10"
                onClick={toggleFavorite}
            >
                {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            </div> */}

            <Link to={`/details/${id}`} className="block overflow-hidden rounded-lg">
                <div className="relative w-full aspect-square overflow-hidden flex items-center justify-center bg-gray-100">
                    {discount > 0 && (
                        <span className="absolute left-2 top-2 z-10 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
                            -{discount}%
                        </span>
                    )}
                    <GetInterfaceProduct
                        productId={id}
                        imageUrl={imageUrl || getProductImageUrl(id)}
                        alt={name}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            </Link>

            <div className="mt-2">
                <h2 className="text-base font-sans text-black truncate max-w-full p-2"> {name} </h2>
                <p className="text-base font-sans text-red-600 px-2 font-bold"> {formatPrice(currentPrice)} </p>
                {isReferenceData && (
                    <p className="mx-2 rounded bg-amber-50 px-2 py-1 text-xs leading-4 text-amber-800" role="note">
                        Giá tham khảo; xác nhận giá và tồn kho trước khi mua
                    </p>
                )}
                {discount > 0 && (
                    <p className="px-2 pb-1 text-sm text-gray-500 line-through">{formatPrice(price)}</p>
                )}
                {stock !== undefined && (
                    <p className={`px-2 pb-2 text-xs ${Number(stock) > 0 ? "text-green-700" : "text-red-600"}`}>
                        {Number(stock) > 0 ? "Còn hàng" : "Hết hàng"}
                    </p>
                )}
            </div>
            {/* <div className="absolute top-4 left-4 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Mới!
            </div> */}
        </div>
    );
};

export default ProductCart;
