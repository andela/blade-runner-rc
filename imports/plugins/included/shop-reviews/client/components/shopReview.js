import React from "react";
import PropTypes from "prop-types";
import ReactStars from "react-stars";
import { Meteor } from "meteor/meteor";
import { Reaction } from "/client/api";
import ShopRating from "./shopRating";
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
    const sumOfRatings = reviews.map(review => review.rating)
      .reduce((total, rating) => total + rating, 0);
    let averageRating = Math.floor((sumOfRatings / reviews.length) * 100) / 100;
    if (isNaN(averageRating)) {
      averageRating = 0;
    }

    const reviewList = reviews.map(review => (
      <div className="media" key={review._id}>
        <div className="media-left" style={{ paddingRight: "39px" }}>
          <ReactionAvatar
            size={40}
            style={{ marginTop: 5 }}
            className={"img-responsive"}
            email={review.email}
            name={review.name === "" ? review.email : review.name}
            round
          />
        </div>
        <div className="media-body">
          <h4 className="media-heading" style={{ marginBottom: "12px" }}>
            <ReactStars edit={false} onChange={rating => { this.setState({ rating }); }} count={5} size={18}
              value={review.rating}
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
        <div className="col-md-4 col-md-offset-4" style={{ marginTop: "10px" }}>
          <Card>
            <CardHeader i18nKeyTitle={"Shop reviews"} title={"Shop reviews"} />
            <CardBody>
              {
                this.state.user.emails.length > 0 &&

                <div className="row" style={{ padding: "5px" }}>
                  <div className="media">
                    <div className="media-left" style={{ paddingRight: "39px" }}>
                      <ReactionAvatar
                        size={40}
                        style={{ marginTop: 5 }}
                        className={"img-responsive"}
                        email={this.state.user.emails[0].address}
                        name={this.state.user.name === "" ? this.state.user.emails[0].address : this.state.user.name}
                        round
                      />
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading" style={{ marginBottom: "12px" }}>
                        <ReactStars onChange={rating => { this.setState({ rating }); }} count={5} size={18} value={this.state.rating} />
                      </h4>
                      <textarea style={{ border: "2px solid #5cde86", boxShadow: "none", marginBottom: "4px" }} placeholder="Leave a review ..." cols="2" rows="2"
                        className="form-control"
                        value={this.state.review}
                        name="review"
                        onChange={event => { this.setState({ [event.target.name]: event.target.value }); }}
                      />
                      <div className="add-to-cart">
                        <button
                          className="btn pull-right"
                          onClick={this.createReview}
                          disabled={this.state.review.length < 8}
                          style={{ backgroundColor: "#5cde86", borderRadius: "0 2px 2px 0", color: "#ffffff" }}
                        >Publish review</button>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {
                this.state.user.emails.length < 1 &&
                <p className="text-center">Please sign in to add a review</p>
              }
              <div className="review-container" style={{ overflowY: "auto", height: "350px" }}>
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
