import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Details from './pages/details';
import StoreManager from './pages/storemanager';
import Test from './pages/test';
import TokenRefresher from './utils/tokenRefresher';
import Account from './pages/account';
import Cart from './pages/cart';
import Payments from './pages/payments';
import Love from './pages/love';
import Category from './pages/category';
import SearchResults from "./pages/searchResult";
import ProtectedRoute from "./components/ProtectedRoute";
import CategoryList from './utils/categoryList';
import BestSell from './pages/bestsell';
import Special from './pages/special';
import CartList from './utils/cartList';
import User from './utils/user';
function App() {
  return (
    <BrowserRouter>
      <TokenRefresher />
      <User />
      <CategoryList />
      <CartList />
      {/* <FileList /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>} />
        <Route path="/register"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/storemanager/*" element={<StoreManager />} />
        <Route path="/test" element={<Test />} />
        <Route path="/account/*" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/love" element={<Love />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/bestsell" element={<BestSell />} />
        <Route path="/special" element={<Special />} />
        <Route path="/search/products" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
