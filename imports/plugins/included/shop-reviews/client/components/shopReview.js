import React from "react";
import PropTypes from "prop-types";
import ReactStars from "react-stars";
import { Meteor } from "meteor/meteor";
import { Reaction } from "/client/api";
import ShopRating from "./shopRating";
import calculateAverageRating from "./../../../product-detail-simple/client/helpers";
import { ShopReviews } from "/lib/collections";
import { Card, CardHeader, CardBody, ReactionAvatar } from "/imports/plugins/core/ui/client/components";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";

class ShopReview extends React.Component {
  static propTypes = {
    reviews: PropTypes.arrayOf(PropTypes.any)
  };
  constructor(props) {
    super(props);
    this.state = {
      review: "",
      rating: 0,
      user: Meteor.user()
    };
  }
  createReview = () => {
    if (this.state.rating === 0) {
      Alerts.toast("Please add a rating to your review.", "error");
      return;
    }
    const self = this;
    Meteor.call("shopReview/createReview", this.state.user._id, Reaction.getShopId(), this.state.review, this.state.rating, function (error) {
      if (error) {
        // Dislay an error message to the user
        Alerts.toast(error.reason, "error");
      } else {
        self.setState({ review: "", rating: 0 });
        Alerts.toast("Review published !", "success");
      }
    });
  }
  render() {
    const { reviews } = this.props;
    const { user, review: stateReview } = this.state;
    const averageRating = calculateAverageRating(reviews);

    const reviewList = reviews.map(review => (
      <div className="media" key={review._id}>
        <div className="media-left pr-small">
          <ReactionAvatar
            size={40}
            className={"img-responsive mt-2"}
            email={review.email}
            name={review.name === "" ? review.email : review.name}
            round
          />
        </div>
        <div className="media-body">
          <h4 className="media-heading mb-2">
            <ReactStars edit={false} onChange={rating => { this.setState({ rating }); }} count={5} size={18}
              value={review.rating} half={false}
            />
          </h4>
          <p>
            {review.review}
          </p>
        </div>
      </div>
    ));
    return (
      <div>
        <ShopRating averageRating={averageRating} numberOfReviews={reviews.length} />
        <div className="col-md-4 col-md-offset-4 mt-3">
          <Card>
            <CardHeader i18nKeyTitle={"Shop reviews"} title={"Shop reviews"} />
            <CardBody>
              {
                user.emails.length > 0 &&

                <div className="row pad">
                  <div className="media">
                    <div className="media-left pr-small">
                      <ReactionAvatar
                        size={40}
                        className={"img-responsive mt-2"}
                        email={user.emails[0].address}
                        name={user.name === "" ? user.emails[0].address : user.name}
                        round
                      />
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading mb-2">
                        <ReactStars half={false} onChange={rating => { this.setState({ rating }); }} count={5} size={18} value={this.state.rating} />
                      </h4>
                      <textarea placeholder="Leave a review ..." cols="2" rows="2"
                        className="form-control text-format"
                        value={stateReview}
                        name="review"
                        onChange={event => { this.setState({ [event.target.name]: event.target.value }); }}
                      />
                      <div className="add-to-cart">
                        <button
                          className="btn pull-right publish-button"
                          onClick={this.createReview}
                          disabled={stateReview.length < 8}
                        >Publish review</button>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {
                user.emails.length < 1 &&
                <p className="text-center">Please sign in to add a review</p>
              }
              <div className="review-container review-box">
                {reviewList}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

function composer(props, onData) {
  onData(null, {
    reviews: ShopReviews.find({ shopId: Reaction.getShopId() }, { sort: { createdAt: -1 }, limit: 20 }).fetch()
  });
}

registerComponent("ShopReview", ShopReview);

export default composeWithTracker(composer)(ShopReview);
