import PropTypes from "prop-types";
import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";


class ShopRating extends Component {
  static propTypes = {
    averageRating: PropTypes.number.isRequired,
    numberOfReviews: PropTypes.number.isRequired
  };
  render() {
    return (
      <div className="text-center">
        <h1>
          {this.props.averageRating}
        </h1>
        <small>Based on {this.props.numberOfReviews} ratings</small>
      </div>
    );
  }
}

registerComponent("ShopRating", ShopRating);

export default ShopRating;
