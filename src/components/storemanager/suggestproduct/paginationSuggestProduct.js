import { useNavigate } from 'react-router-dom';
function Pagination({ currentPage, onPageChange }) {
    const navigate = useNavigate();

    // Lấy sản phẩm từ localStorage
    const suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
    const productsPerPage = 10; // Số sản phẩm mỗi trang
    const totalPages = Math.ceil(suggestions.length / productsPerPage); // Tính tổng số trang

    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
            navigate(`/storemanager/suggest?page=${currentPage - 1}`);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
            navigate(`/storemanager/suggest?page=${currentPage + 1}`);
        }
    };

    const handlePageClick = (page) => {
        onPageChange(page);
        navigate(`/storemanager/suggest?page=${page}`);
    };

    // Tạo mảng các trang để hiển thị
    let pageNumbers = [];
    if (totalPages <= 5) {
        // Hiển thị tất cả các trang nếu tổng số trang <= 5
        pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
        // Nếu tổng số trang > 5, ta hiển thị các trang liền kề và "..."
        if (currentPage <= 3) {
            pageNumbers = [1, 2, 3, 4, '...', totalPages];
        } else if (currentPage >= totalPages - 2) {
            pageNumbers = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        } else {
            pageNumbers = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
        }
    }

    return (
        <div className="pagination-container mt-4">
            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={handlePrev}>
                            &laquo; Trước
                        </button>
                    </li>
                    {pageNumbers.map((page, index) => (
                        <li
                            key={index}
                            className={`page-item ${currentPage === page ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => page !== '...' && handlePageClick(page)}
                                style={page === '...' ? { pointerEvents: 'none' } : {}}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={handleNext}>
                            Tiếp &raquo;
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
export default Pagination;