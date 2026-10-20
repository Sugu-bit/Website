// src/components/cart/Cart.js
import React from 'react';
import GetAllCartItems from './GetAllCartItems';
import GetAllCartItemUser from './GetAllCartItemsUser';
import GetCartItemById from './GetCartItemById';
import CreateCartItem from './CreateCartItem';
import UpdateCartItem from './UpdateCartItem';
import DeleteCartItem from './DeleteCartItem';

const Cart = () => {
  return (
    <div>
      <section>
        <h2>Get All Cart Items</h2>
        <GetAllCartItems />
      </section>
      <section>
        <h2>Get All Cart Item User</h2>
        <GetAllCartItemUser />
      </section>
      <section>
        <h2>Get Cart Item By ID</h2>
        <GetCartItemById />
      </section>
      <section>
        <h2>Create Cart Item</h2>
        <CreateCartItem />
      </section>
      <section>
        <h2>Update Cart Item</h2>
        <UpdateCartItem />
      </section>
      <section>
        <h2>Delete Cart Item</h2>
        <DeleteCartItem />
      </section>
    </div>
  );
};

export default Cart;
