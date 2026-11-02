import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiHeadphones,
  FiInfo,
  FiSmartphone,
  FiTablet,
} from 'react-icons/fi';
import Navbar from '../components/navbar';
import HomeHero from '../components/home/homeHero';
import ConnectWidget from '../components/connectwidget';
import Footer from '../components/footer';
import FeaturedProducts from '../components/home/featuredProducts';
import './home.css';

const categories = [
  { name: 'Điện thoại', icon: FiSmartphone, path: '/category/smartphone' },
  { name: 'iPhone', icon: FiSmartphone, path: '/category/iphone' },
  { name: 'Samsung', icon: FiSmartphone, path: '/category/smartphone?brand=Samsung' },
  { name: 'Xiaomi', icon: FiSmartphone, path: '/category/smartphone?brand=Xiaomi' },
  { name: 'OPPO', icon: FiSmartphone, path: '/category/smartphone?brand=OPPO' },
  { name: 'Redmi', icon: FiSmartphone, path: '/category/smartphone?brand=Redmi' },
  { name: 'Máy tính bảng', icon: FiTablet, path: '/category/tablet' },
  { name: 'Phụ kiện điện thoại', icon: FiHeadphones, path: '/category/accessories' },
];

const featuredBrands = [
  { brand: 'Apple', title: 'iPhone nổi bật', path: '/category/iphone' },
  { brand: 'Samsung', title: 'Samsung nổi bật', path: '/category/smartphone?brand=Samsung' },
  { brand: 'Xiaomi', title: 'Xiaomi nổi bật', path: '/category/smartphone?brand=Xiaomi' },
  { brand: 'OPPO', title: 'OPPO nổi bật', path: '/category/smartphone?brand=OPPO' },
];

function HomeSection({ eyebrow, title, description, to, linkText, children }) {
  return (
    <section className="home-section">
      <div className="home-section__heading">
        <div>
          <span className="home-section__eyebrow">{eyebrow}</span>
          <h2 className="home-section__title">{title}</h2>
          {description && <p className="home-section__description">{description}</p>}
        </div>
        {to && (
          <Link className="home-section__link" to={to}>
            {linkText}
            <FiArrowRight aria-hidden="true" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <main className="home-content">
        <HomeHero />

        <section className="home-categories" aria-labelledby="home-categories-title">
          <div className="home-section__heading">
            <div>
              <span className="home-section__eyebrow">Tìm nhanh theo nhu cầu</span>
              <h2 className="home-section__title" id="home-categories-title">
                Danh mục nổi bật
              </h2>
            </div>
          </div>
          <div className="home-category-grid">
            {categories.map(({ name, icon: Icon, path, query }) => (
              <Link
                className="home-category-card"
                to={path || `/search/products?keywords=${encodeURIComponent(query)}`}
                key={name}
              >
                <span className="home-category-card__icon">
                  <Icon aria-hidden="true" />
                </span>
                <span>{name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-benefits" aria-label="Thông tin mua sắm">
          <div className="home-benefit">
            <span className="home-benefit__icon"><FiSmartphone aria-hidden="true" /></span>
            <div>
              <h3 className="home-benefit__title">Đa dạng điện thoại</h3>
              <p className="home-benefit__description">Nhiều lựa chọn theo nhu cầu sử dụng</p>
            </div>
          </div>
          <div className="home-benefit">
            <span className="home-benefit__icon"><FiInfo aria-hidden="true" /></span>
            <div>
              <h3 className="home-benefit__title">Thông tin rõ ràng</h3>
              <p className="home-benefit__description">Tham khảo thông tin từng sản phẩm</p>
            </div>
          </div>
          <div className="home-benefit">
            <span className="home-benefit__icon"><FiHeadphones aria-hidden="true" /></span>
            <div>
              <h3 className="home-benefit__title">Hỗ trợ khi cần</h3>
              <p className="home-benefit__description">Kết nối với cửa hàng để được tư vấn</p>
            </div>
          </div>
        </section>

        <HomeSection
          eyebrow="Điện thoại và công nghệ"
          title="Sản phẩm tại cửa hàng"
          description="Giá và tồn kho được tải trực tiếp từ máy chủ."
          to="/category/smartphone"
          linkText="Xem tất cả"
        >
          <FeaturedProducts />
        </HomeSection>
        {featuredBrands.map(({ brand, title, path }) => (
          <HomeSection
            key={brand}
            eyebrow="Chọn theo thương hiệu"
            title={title}
            to={path}
            linkText="Xem tất cả"
          >
            <FeaturedProducts mode="brand" brand={brand} limit={4} />
          </HomeSection>
        ))}
        <HomeSection
          eyebrow="Khuyến mãi"
          title="Ưu đãi đang áp dụng"
          description="Chỉ hiển thị ưu đãi được cấu hình cho sản phẩm tại cửa hàng."
          to="/special"
          linkText="Xem ưu đãi"
        >
          <FeaturedProducts mode="discounted" limit={8} />
        </HomeSection>
      </main>
      <ConnectWidget />
      <Footer />
    </div>
  );
}

export default Home;
