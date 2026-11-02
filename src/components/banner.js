import React, { useEffect, useState } from 'react'
import Banner4 from '../assets/banner4.jpg';
import Banner6 from '../assets/banner6.jpg';
import Banner7 from '../assets/banner7.jpg';
import Banner8 from '../assets/banner8.jpg';

const Banner = () => {
    const bannerAds = [Banner4, Banner6, Banner7, Banner8];
    const [currentAdIndex, setCurrentAdIndex] = useState(0);

    useEffect(() => {
        const interval = window.setInterval(() => {
            setCurrentAdIndex((index) => (index + 1) % bannerAds.length);
        }, 5000);

        return () => window.clearInterval(interval);
    }, [bannerAds.length]);

    const nextAd = () => {
        setCurrentAdIndex((index) => (index + 1) % bannerAds.length);
    };

    const prevAd = () => {
        setCurrentAdIndex((index) => (index - 1 + bannerAds.length) % bannerAds.length);
    };
    return (
        <div className='container mx-auto flex justify-center mb-5'>
            <div className="relative w-108 h-96 overflow-hidden group mt-3">
                <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${currentAdIndex * 100}%)`,
                }}
                >
                {bannerAds.map((banner, index) => (
                    <img
                    key={index}
                    src={banner}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-96 object-cover flex-shrink-0"
                    />
                ))}
                </div>
                {/* Buttons */}
                <button
                type="button"
                aria-label="Banner trước"
                onClick={prevAd}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white px-4 py-2 bg-black bg-opacity-50 rounded-full focus:outline-none hover:bg-opacity-70"
                >
                &lt;
                </button>
                <button
                type="button"
                aria-label="Banner tiếp theo"
                onClick={nextAd}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white px-4 py-2 bg-black bg-opacity-50 rounded-full focus:outline-none hover:bg-opacity-70"
                >
                &gt;
                </button>
            </div>
        </div>
    )
}

export default Banner