import React, { useState, useEffect, useRef } from "react";
import Logo from '../assets/logo1.png';
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartIcon from "./cart/shoppingCartIcon";
import { CiMenuBurger } from "react-icons/ci";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { logout, fetchCurrentUser } from '../redux/userSlice';
import CartTotalQuantity from "./cart/cartTotalQuantity";
import SearchBar from "./searchbar";
function Navbar() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const [totalQuantity, setTotalQuantity] = useState(0);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [searchSidebarOpen, setSearchSidebarOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleCategory = () => {
        setIsCategoryOpen(!isCategoryOpen);
    };

    const categories = [
            { name: "Điện thoại", path: "smartphone" },
            { name: "iPhone", path: "iphone" },
            { name: "Android", path: "android" },
            { name: "Điện thoại phổ thông", path: "basic-phone" },
            { name: "Phụ kiện", path: "accessories" },
            { name: "Ốp lưng & bao da", path: "cases" },
            { name: "Kính cường lực", path: "screen-protector" },
            { name: "Tai nghe & loa", path: "audio" },
            { name: "Sạc & pin dự phòng", path: "charger-powerbank" },
            { name: "Đồng hồ thông minh", path: "smartwatch" },
            { name: "Máy tính bảng", path: "tablet" },
            { name: "Khuyến mãi", path: "promotion" },
            { name: "Tin tức công nghệ", path: "tech-news" },
            { name: "Dịch vụ", path: "services" },
            { name: "Bảo hành & sửa chữa", path: "warranty-repair" },
            { name: "Thu cũ đổi mới", path: "trade-in" },
            { name: "Mua trả góp", path: "installment" }
                    
    ];

    const toggleSearchSidebar = () => setSearchSidebarOpen(!searchSidebarOpen);
    const { accessToken, user } = useSelector((state) => state.user);
    console.log(user);
    const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Trạng thái dropdown

    const dropdownRef = useRef(null); // Tham chiếu đến phần tử dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev); // Bật/Tắt dropdown
    };
    // Đóng dropdown khi nhấn bên ngoài
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false); // Đóng dropdown
            }
        };

        // Lắng nghe sự kiện click toàn cục
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        if (accessToken && !user) {
            console.log("Fetching current user...");
            dispatch(fetchCurrentUser());
        }
    }, [accessToken, user, dispatch]);
    const handleLogout = () => {
        dispatch(logout()); // Cập nhật trạng thái đăng xuất  
    };

    if (user?.username) {
        console.log("Username:", user.username);
    }

    return (
        <div className="w-full h-24 sticky top-0 bg-white text-black z-50 shadow-lg">
            <div className="flex justify-between items-center px-12 h-full">
                {/* Menu icon for small screens */}
                <button
                    className="lg:hidden text-black"
                    onClick={toggleMenu}
                >
                    <CiMenuBurger size={30} />
                </button>

                {/* Logo - Centered on small screens */}
                <div className="flex justify-center lg:justify-start">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="w-24 h-auto max-w-full" />
                    </Link>
                </div>

                {/* Left side menu (Home, Danh mục, etc.) */}
                <div className="flex items-center space-x-10 lg:flex hidden">
                    <a href="/" className="text-lg hover:text-gray-300">Trang Chủ</a>
                    <div className="relative group">
                        <a href="/" className="text-lg hover:text-gray-300">Danh Mục</a>
                        {/* Dropdown */}
                        <div className="hidden group-hover:block absolute top-[60%] left-0 w-80 bg-white border border-gray-300 mt-2 shadow-lg">
                            {categories.map((item, idx) => (
                                <Link key={idx} to={`/category/${item.path}`} className="block px-4 py-2 hover:bg-gray-600 hover:text-gray-100">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <a href="/special" className="text-lg hover:text-gray-300">Giá Ưu Đãi</a>
                    <a href="/bestsell" className="text-lg hover:text-gray-300">Sản Phẩm Bán Chạy</a>
                </div>

                {/* Right side icons (Search, Heart, Cart, User) */}
                <div className="flex items-center space-x-6">
                    {/* Search */}
                    <SearchBar></SearchBar>

                    {/* Heart (Favorites) */}
                    <Link to="/love">
                        <div className="text-xl cursor-pointer">
                            <CiHeart />
                        </div>
                    </Link>

                    {/* Cart */}
                    <div className="relative">
                        <div className="flex text-xl cursor-pointer" onClick={() => setSidebarVisible(true)}>
                            <CiShoppingCart size={25} color="black" />
                            <CartTotalQuantity />
                            {/* <span className="absolute h-4 w-4 left-4 top-[-20%] bg-gray-600 text-white text-sm rounded-full flex justify-center items-center ">{totalQuantity}</span> */}
                        </div>
                        {sidebarVisible && (
                            <>
                                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 h-full" onClick={() => setSidebarVisible(false)}></div>
                                <div className="fixed top-0 right-0 h-full w-[300px] lg:w-[400px] bg-gray-900 text-white z-50 shadow-lg p-4">
                                    <button className="absolute top-4 right-4 text-white text-xl" onClick={() => setSidebarVisible(false)}>X</button>
                                    <h3 className="text-xl border-b border-gray-700 pb-2">Giỏ hàng của bạn</h3>
                                    <p className="mt-4 text-gray-400">Danh sách sản phẩm</p>
                                    <div className="grid grid-rows p-1 gap-1">
                                        <ShoppingCartIcon />
                                    </div>
                                    <div className="grid grid-cols-1 gap-2 absolute bottom-10 left-0 w-full p-4">
                                        <Link to="/cart">
                                            <button className="bg-red-500 text-white py-2 px-2 rounded-md w-full">Xem giỏ hàng</button>
                                        </Link>
                                        {/* <Link to="/payments">
                                            <button className="bg-red-500 text-white py-2 px-2 rounded-md w-full">Thanh toán</button>
                                        </Link> */}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="relative" ref={dropdownRef}>
                        {/* Biểu tượng tài khoản */}
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={toggleDropdown} // Nhấn để bật/tắt dropdown
                        >
                            <AiOutlineUser className="text-xl" />
                            {accessToken && user?.username && (
                                <span className="ml-2">{user.username}</span>
                            )}
                        </div>
                        {/* Dropdown */}
                        {isDropdownOpen && (
                            <div
                                className="absolute top-[120%] -left-3 transform -translate-x-1/2 w-40 bg-white border border-gray-300 mt-2 shadow-lg z-10"
                                onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click thoát dropdown
                            >
                                {!accessToken ? (
                                    <>
                                        <Link
                                            to="/login"
                                            className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                                            onClick={() => setIsDropdownOpen(false)} // Đóng dropdown khi chuyển trang
                                        >
                                            Đăng nhập
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                                            onClick={() => setIsDropdownOpen(false)} // Đóng dropdown khi chuyển trang
                                        >
                                            Đăng ký
                                        </Link>
                                    </>
                                ) : (
                                    <div>
                                        <Link
                                            to="/account"
                                            onClick={() => {
                                                setIsDropdownOpen(false); // Đóng dropdown khi chuyển trang
                                            }}
                                            className="block px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
                                        >
                                            Thông tin tài khoản
                                        </Link>
                                        {user?.username === "superadmin" && (
                                            <Link
                                                to="/storemanager"
                                                onClick={() => {
                                                    setIsDropdownOpen(false); // Đóng dropdown khi chuyển trang
                                                }}
                                                className="block px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
                                            >
                                                Quản lý gian hàng
                                            </Link>
                                        )}
                                        <span
                                            onClick={handleLogout}
                                            className="block px-4 py-2 hover:bg-gray-600 hover:text-white cursor-pointer"
                                        >
                                            Đăng xuất
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar menu (menu that slides in from the right) */}
            {isMenuOpen && (
                <div>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 h-full" onClick={closeMenu}></div>
                    <div className="fixed top-0 left-0 w-4/5 h-full bg-white text-black z-50 shadow-lg p-4 transform transition-transform duration-300 ease-in-out" style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}>
                        <button className="absolute top-4 right-4 text-black text-xl" onClick={closeMenu}>X</button>
                        {/* Menu Header */}
                        <div className="text-xl font-semibold mb-2">Menu</div>
                        <hr className="border-gray-400 mb-4" />

                        {/* Menu Items */}
                        <div className="space-y-6">
                            <div>
                                <a href="/" className="text-lg hover:text-gray-300">Home</a>
                            </div>
                            {/* Category with dropdown */}
                            <div>
                                <div
                                    className="flex items-center justify-between text-lg cursor-pointer hover:text-gray-300"
                                    onClick={toggleCategory}
                                >
                                    <span>Danh mục</span>
                                    {isCategoryOpen ? (
                                        <BsChevronDown size={20} />
                                    ) : (
                                        <BsChevronRight size={20} />
                                    )}
                                </div>
                                {isCategoryOpen && (
                                    <div className="pl-4 mt-2 space-y-2">
                                        {categories.map((item, idx) => (
                                            <Link key={idx} to={`/category/${item.path}`} className="block px-4 py-2 hover:bg-gray-600 hover:text-gray-100">
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <a href="/" className="text-lg hover:text-gray-300">Giá ưu đãi</a>
                            </div>
                            <div>
                                <a href="/" className="text-lg hover:text-gray-300">Sản phẩm bán chạy</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {searchSidebarOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 h-full" onClick={toggleSearchSidebar}></div>
                    <div className="fixed top-0 right-0 w-2/5 h-full bg-white text-black z-50 shadow-lg p-4 transform transition-transform duration-300 ease-in-out" style={{ transform: searchSidebarOpen ? 'translateX(0)' : 'translateX(100%)' }}>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full h-10 px-4 rounded-full border border-gray-400 focus:border-gray-300 focus:outline-none"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Navbar;
