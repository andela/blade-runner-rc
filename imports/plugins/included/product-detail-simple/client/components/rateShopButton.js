import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router } from "/client/api";
import { Reaction } from "/client/api";
import { ShopReviews } from "/lib/collections";
import calculateAverageRating from "./../helpers";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";

class RateShopButton extends Component {
  static propTypes = {
    reviews: PropTypes.arrayOf(PropTypes.any)
  };
  reviewPage() {
    const shopName = Reaction.getShopName();
    Router.go(`/review/${shopName}`);
  }
  render() {
    const { reviews } = this.props;
    const averageRating = calculateAverageRating(reviews);
    return (
      <div className="btn-group">
        <button onClick={this.reviewPage} className="btn btn-default">
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

