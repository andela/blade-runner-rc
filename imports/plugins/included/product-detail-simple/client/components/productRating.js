import PropTypes from "prop-types";
import ReactStars from "react-stars";
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
      <div className="row">
        <div className="col-md-12">
          <div>
            <small>Average product rating:</small>
            <span>
              <ReactStars className="inline-block" edit={false} count={5} size={15}
                value={averageRating}
              />
            </span>
            ({reviews.length})
            <hr/>
          </div>
        </div>
      </div>
      // <div className="text-center">
      //   {/* <h1 className="text-center">
      //     {averageRating}
      //   </h1> */}
      //   {/* <div className="text-center h6">
      //     <ReactStars className="inline-block" edit={false} count={5} size={11}
      //       value={averageRating}
      //     />
      //   </div> */}
      //   <small>Average product rating</small> <br />
      //   <small>Based on {reviews.length} {reviews.length === 1 ? "rating" : "ratings"}</small>
      // </div>
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
