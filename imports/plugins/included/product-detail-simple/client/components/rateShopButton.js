import React, { Component } from "react";
import { Router } from "/client/api";
import { Reaction } from "/client/api";
import { ShopReviews } from "/lib/collections";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";

class RateShopButton extends Component {
  static propTypes = {};
  reviewPage() {
    const shopName = Reaction.getShopName();
    Router.go(`/review/${shopName}`);
  }
  render() {
    const { reviews } = this.props;
    const sumOfRatings = reviews.map(review => review.rating)
      .reduce((total, rating) => total + rating, 0);
    let averageRating = Math.floor((sumOfRatings / reviews.length) * 100) / 100;
    if (isNaN(averageRating)) {
      averageRating = 0;
    }
    return (
      <div className="btn-group">
        <button className="btn btn-default" disabled>
          <i className="fa fa-star review-button-color"/>
          <span className="shop-rating">{averageRating}</span>
        </button>
        <button onClick={this.reviewPage} className="btn btn-default">
          Rate {Reaction.getShopName()}
        </button>
      </div>
    );
  }
}

function composer(props, onData) {
  onData(null, {
    reviews: ShopReviews.find({ shopId: Reaction.getShopId() }, { sort: { createdAt: -1 } }).fetch()
  });
}

registerComponent("RateShopButton", RateShopButton);

export default composeWithTracker(composer)(RateShopButton);

