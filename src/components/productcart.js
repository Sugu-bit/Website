import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import GetInterfaceProduct from "./storemanager/getInterfaceProduct";

const ProductCart = (props) => {
    const { id, name, price } = props.data;
    const [isFavorite, setIsFavorite] = useState(false);
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
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

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
                <div className="w-full aspect-square overflow-hidden flex items-center justify-center bg-gray-100">
                    <GetInterfaceProduct productId={id} className="max-w-full max-h-full object-contain" />
                </div>
            </Link>

            <div className="mt-2">
                <h2 className="text-base font-sans text-black truncate max-w-full p-2"> {name} </h2>
                <p className="text-base font-sans text-red-600 p-2 font-bold"> {formatPrice(price)} đ </p>
            </div>
            {/* <div className="absolute top-4 left-4 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Mới!
            </div> */}
        </div>
    );
};

export default ProductCart;
