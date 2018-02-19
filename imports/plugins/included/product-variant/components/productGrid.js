import React, { Component } from "react";
import PropTypes from "prop-types";
import { Reaction } from "/client/api";
import { Components } from "@reactioncommerce/reaction-components";
import startTour from "../../tour";

class ProductGrid extends Component {
  static propTypes = {
    products: PropTypes.array
  }

  componentDidMount() {
    const hasTakenLandingPageTour = localStorage.getItem("hasTakenLandingPageTour");
    const hasTakenDashboardTour = localStorage.getItem("hasTakenDashboardTour");

    if (!hasTakenLandingPageTour) {
      startTour();
      localStorage.setItem("hasTakenLandingPageTour", true);
    }
    if (!hasTakenDashboardTour && Reaction.hasPermission("admin")) {
      startTour();
      localStorage.setItem("hasTakenDashboardTour", true);
    }
  }

  renderProductGridItems = (products) => {
    if (Array.isArray(products)) {
      return products.map((product, index) => {
        return (
          <Components.ProductGridItems
            {...this.props}
            product={product} key={index} index={index}
          />
        );
      });
    }
    return (
      <div className="row">
        <div className="text-center">
          <h3>
            <Components.Translation defaultValue="No Products Found" i18nKey="app.noProductsFound" />
          </h3>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="product-grid">
          <Components.DragDropProvider>
            <ul className="product-grid-list list-unstyled" id="product-grid-list">
              {this.renderProductGridItems(this.props.products)}
            </ul>
          </Components.DragDropProvider>
        </div>
      </div>
    );
  }
}

export default ProductGrid;
