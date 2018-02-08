import PropTypes from "prop-types";
import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";


class ShopRating extends Component {
  static propTypes = {
    averageRating: PropTypes.number.isRequired,
    numberOfReviews: PropTypes.number.isRequired
  };
  render() {
    const reviews = this.props.numberOfReviews;
    return (
      <div className="text-center">
        <h1>
          {this.props.averageRating}
        </h1>
        <small>Average product rating</small> <br />
        <small>Based on {reviews.length} {reviews.length > 1 ? "ratings" : "rating"}</small>
      </div>
    );
  }
}

registerComponent("ShopRating", ShopRating);

export default ShopRating;
