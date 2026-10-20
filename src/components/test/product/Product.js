import React from "react";
import AddProduct from "./AddProduct";
import GetProducts from "./GetProducts";
import GetProductById from "./GetProductById";
import UpdateProduct from "./UpdateProduct";
import DeleteProduct from "./DeleteProduct";
import GetProductsByCategory from "./GetProductsByCategory";
import MigrateProduct from "./MigrateProduct";
import MigrateProductOption from "./MigrateProductOption";

const Product = () => {
  return (
    <div>
      <section>
        <AddProduct />
      </section>
      <section>
        <MigrateProduct />
      </section>
      <section>
        <MigrateProductOption />
      </section>
      <section>
        <GetProducts />
      </section>

      <section>
        <GetProductById />
      </section>

      <section>
        <UpdateProduct />
      </section>

      <section>
        <DeleteProduct />
      </section>

      <section>
        <GetProductsByCategory />
      </section>
      <h2>Các API khác của product thì đọc file README.md của API</h2>
    </div>
  );
};

export default Product;
