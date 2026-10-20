import React from 'react';
import './test.css';
import User from '../components/test/user/User';
import Product from "../components/test/product/Product";
import Category from "../components/test/category/Category";
import Security from "../components/test/security/Security";
import File from "../components/test/file/File";
import Cart from "../components/test/cart/Cart";
import Order from "../components/test/order/Order";
import OrderDetail from "../components/test/orderDetail/OrderDetail";


const Test = () => {
  return (
    <div className="test-page">
      <h1>Test API Page</h1>
      <h2 class="xxx">Security</h2>
      <Security />
      <h2 class="xxx">User</h2>
      <User />
      <h2 class="xxx">Product</h2>
      <Product />
      <h2 class="xxx">Category</h2>
      <Category />
      <h2 class="xxx">File</h2>
      <File />
      <h2 class="xxx">Cart</h2>
      <Cart />
      <h2 class="xxx">Order</h2>
      <Order />
      <h2 class="xxx">OrderDetail</h2>
      <OrderDetail />
    </div>
  );
};

export default Test;
