import PropTypes from "prop-types";
import ReactStars from "react-stars";
import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";


class ShopRating extends Component {
  static propTypes = {
    averageRating: PropTypes.number.isRequired,
    numberOfReviews: PropTypes.number.isRequired
  };
  render() {
    const { numberOfReviews } = this.props;
    return (
      <div className="text-center">
        <h1>
          {this.props.averageRating}
        </h1>
        <div className="text-center h6">
          <ReactStars className="inline-block" edit={false} count={5} size={11}
            value={this.props.averageRating}
          />
        </div>
        <small>Average shop rating</small> <br />
        <small>Based on {numberOfReviews} {numberOfReviews === 1 ? "rating" : "ratings"}</small>
      </div>
    );
  }
}

registerComponent("ShopRating", ShopRating);

export default ShopRating;
