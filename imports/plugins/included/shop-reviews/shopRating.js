import PropTypes from "prop-types";
import React, { Component } from "react";
import { Reaction } from "/client/api";
import { ShopReviews } from "/lib/collections";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";

class ShopRating extends Component {
  static propTypes = {
    reviews: PropTypes.arrayOf(PropTypes.any)
  };
  render() {
    const { reviews } = this.props;
    const sumOfRatings = reviews.map(review => review.rating)
      .reduce((total, rating) => total + rating, 0);
    const averageRating = Math.floor((sumOfRatings / reviews.length) * 100) / 100;
    return (
      <div>
        <h1>
          {averageRating}
        </h1>
        <small>Based on {reviews.length} ratings</small>
      </div>
    );
  }
}

function composer(props, onData) {
  onData(null, {
    reviews: ShopReviews.find({ shopId: Reaction.getShopId() }, { sort: { createdAt: -1 } }).fetch()
  });
}

registerComponent("ShopRating", ShopRating);

export default composeWithTracker(composer)(ShopRating);
