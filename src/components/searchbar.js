import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';

const SearchBar = () => {
    const [keywords, setKeywords] = useState('');
    const navigate = useNavigate(); // Thay useHistory bằng useNavigate

    const handleSearch = (e) => {
        e.preventDefault();
        if (!keywords.trim()) {
            alert('Please enter a search term'); // Thông báo nếu không nhập từ khóa
            return;
        }
        // Chuyển hướng tới trang tìm kiếm kết quả
        navigate(`/search/products?keywords=${keywords}`);
    };

    return (
        <div>
            {/* Nút search cho giao diện nhỏ */}
            <button
                className="lg:hidden text-xl cursor-pointer"
                onClick={handleSearch} // Xử lý tìm kiếm khi nhấn nút
            >
                <MdSearch />
            </button>

            {/* Thanh tìm kiếm cho giao diện lớn */}
            <div className="relative hidden lg:block">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-80 h-10 px-4 pr-10 rounded-full border border-gray-400 focus:border-gray-300 focus:outline-none"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)} // Xử lý khi nhấn Enter
                    />
                    <MdSearch
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl cursor-pointer"
                        onClick={handleSearch} // Xử lý khi nhấn biểu tượng tìm kiếm
                    />
                </form>
            </div>
        </div>
    );
};

export default SearchBar;
