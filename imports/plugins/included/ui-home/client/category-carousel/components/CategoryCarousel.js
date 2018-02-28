import React, { Component } from "react";
import PropTypes from "prop-types";
import categories from "../../../../../included/product-admin/client/containers/categories";

class CategoryCarousel extends Component {
  constructor(props) {
    super(props);
  }

  renderComponent = () => {
    return (<div className="carousel-div">
      <div className="owl-carousel">
        {
          categories.map(category => (
            <div>
              <img src="resources/img/cart1.jpg" className="cart-image" />
              <div>
                <a className="heading" href={category.route}>{category.value}</a>
              </div>
            </div>
          ))
        }
      </div>
    </div>);
  };

  render() {
    return (
      <div>
        {this.renderComponent()}
      </div>
    );
  }
}

export default CategoryCarousel;
