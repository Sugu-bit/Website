import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Reset cuộn về đầu khi đường dẫn thay đổi
  }, [pathname]);

  return null;
};

export default ScrollToTop;

