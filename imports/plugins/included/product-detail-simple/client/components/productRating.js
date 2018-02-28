import PropTypes from "prop-types";
import React, { Component } from "react";
import { ReactionProduct } from "/lib/api";
import { cannotReview } from "./productReview";
import Scroll from "react-scroll-to-element";
import { ProductReviews } from "/lib/collections";
import calculateAverageRating from "./../helpers";
import StarRatingComponent from "react-star-rating-component";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";

class ProductRating extends Component {
  static propTypes = {
    reviews: PropTypes.arrayOf(PropTypes.any)
  };
  render() {
    const { reviews } = this.props;
    const averageRating = calculateAverageRating(reviews);
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="product-rating-details">
            <div className="react-stars-rating">
              <StarRatingComponent
                name="productRating"
                starCount={5}
                value={averageRating}
                editing={false}
                emptyStarColor="#EEE"
              />
            </div>
            <div className="react-rating-count tooltip">
              <span className="tooltiptext">no of ratings</span>
              ({reviews.length})
              <Scroll type="id" element="productReviews">
                {
                  !cannotReview() &&
                  <button className="btn btn-xs btn-default btn-write-review">
                    Write a review
                  </button>
                }
              </Scroll>
            </div>
          </div>
        </div>
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
