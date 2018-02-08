import PropTypes from "prop-types";
import React, { Component } from "react";
import { ReactionProduct } from "/lib/api";
import { ProductReviews } from "/lib/collections";
import calculateAverageRating from "./../helpers";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";

class ProductRating extends Component {
  static propTypes = {
    reviews: PropTypes.arrayOf(PropTypes.any)
  };
  render() {
    const { reviews } = this.props;
    const averageRating = calculateAverageRating(reviews);
    return (
      <div className="text-center">
        <h1 className="text-center">
          {averageRating}
        </h1>
        <small>Average product rating</small> <br />
        <small>Based on {reviews.length} {reviews.length > 1 ? "ratings" : "rating"}</small>
      </div>
    );
  }
}

function composer(props, onData) {
  onData(null, {
    reviews: ProductReviews.find({ productId: ReactionProduct.selectedProductId() }, { sort: { createdAt: -1 } }).fetch()
  });
}

registerComponent("ProductRating", ProductRating);

export default composeWithTracker(composer)(ProductRating);
