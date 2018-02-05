import PropTypes from "prop-types";
import React, { Component } from "react";
import { ReactionProduct } from "/lib/api";
import { ProductReviews } from "/lib/collections";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";

class ProductRating extends Component {
  static propTypes = {
    reviews: PropTypes.arrayOf(PropTypes.any)
  };
  render() {
    const { reviews } = this.props;
    const sumOfRatings = reviews.map(review => review.rating)
      .reduce((total, rating) => total + rating, 0);
    let averageRating = Math.floor((sumOfRatings / reviews.length) * 100) / 100;
    if (isNaN(averageRating)) {
      averageRating = 0;
    }

    return (
      <div className="text-center">
        <h1 className="text-center">
          {averageRating}
        </h1>
        <small>Based on {reviews.length} ratings</small>
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
