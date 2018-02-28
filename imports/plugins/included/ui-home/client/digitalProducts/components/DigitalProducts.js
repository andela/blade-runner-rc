import React, { Component } from "react";
import { Products } from "/lib/collections";
import ProductGrid from "../../../../../included/product-variant/components/productGrid";

class DigitalProducts extends Component {
  renderComponent = () => {
    const products = Products.find({ isDigital: true }).fetch();
    return <ProductGrid products={products} />;
  };

  render() {
    return (
      <div>
        {this.renderComponent()}
      </div>
    );
  }
}

export default DigitalProducts;
