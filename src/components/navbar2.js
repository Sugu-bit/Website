import Logo from '../assets/logo1.png';
import { Link } from "react-router-dom";
// Navbar cho trang đăng kí đăng nhập
function Navbar2() {
    return (
        <div className="w-full h-16 sticky top-0 bg-white text-black z-50 shadow-lg">
            <div className="flex justify-center items-center px-12 h-full">
                {/* Logo */}
                <div className="w-24 cursor-pointer">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="w-full h-auto" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar2;
