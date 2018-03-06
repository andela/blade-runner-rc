import React, { Component } from "react";
import { Products } from "/lib/collections";
import { Router } from "/client/api";
import ProductGrid from "../../../../included/product-variant/components/productGrid";

class Category extends Component {
  constructor(props) {
    super(props);
    this.categoryName = Router.current().params.category.replace(/-/g, " ");
  }

  renderComponent = () => {
    const products = Products.find({ category: this.categoryName }).fetch();

    if (products.length > 0) {
      return <ProductGrid products={products} />;
    }
    return <div className="text-center"> No Products Found</div>;
  };

  render() {
    return (
      <div>
        <h1>{this.categoryName}</h1>
        {this.renderComponent()}
      </div>
    );
  }
}

export default Category;
