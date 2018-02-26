import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactStars from "react-stars";
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
      <div className="panel panel-default mt-2">
        <div className="panel-body">
          <p>
            We hope you like our service, kindly click on the button below to rate and give feedback on our service
          </p>
          <div className="text-center">
            <h1 className="text-center">
              {averageRating}
            </h1>
            <div className="text-center h6">
              <ReactStars
                className="inline-block"
                edit={false}
                count={5}
                size={11}
                value={averageRating}
              />
            </div>
            <small>Average shop rating</small> <br />
            <small>Based on {reviews.length} {reviews.length === 1 ? "rating" : "ratings"}</small>
          </div>
          <div className="text-center">
            <button onClick={this.reviewPage} className="btn-group shop-button">
              Rate {Reaction.getShopName()}
            </button>
          </div>
        </div>
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

