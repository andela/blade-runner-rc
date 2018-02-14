import React from "react";
import PropTypes from "prop-types";
import ReactStars from "react-stars";
import { Meteor } from "meteor/meteor";
import { ReactionProduct } from "/lib/api";
import { ProductReviews } from "/lib/collections";
import { Card, CardHeader, CardBody, ReactionAvatar } from "/imports/plugins/core/ui/client/components";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";

class ProductReview extends React.Component {
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
    const thisComponent = this;
    if (this.state.rating === 0) {
      Alerts.toast("Please add a rating to your review.", "error");
      return;
    }
    Meteor.call("productReview/createReview", ReactionProduct.selectedProductId(), this.state.review, this.state.rating, function (error) {
      if (error) {
        // Alert to the user that something went wrong.
        Alerts.toast(error.reason, "error");
      } else {
        thisComponent.setState({ review: "", rating: 0 });
        //  Alert to the user that the review was created.
        Alerts.toast("Review published !", "success");
      }
    });
  }
  render() {
    const { reviews } = this.props;
    const { user, review: stateReview } = this.state;
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
      <div className="mt-3">
        <Card>
          <CardHeader i18nKeyTitle={"Product reviews"} title={"Product reviews"} />
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
                      <ReactStars onChange={rating => { this.setState({ rating }); }} half={false} count={5} size={18}
                        value={this.state.rating}
                      />
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
    );
  }
}

function composer(props, onData) {
  onData(null, {
    reviews: ProductReviews.find({ productId: ReactionProduct.selectedProductId() }, { sort: { createdAt: -1 }, limit: 20 }).fetch()
  });
}

registerComponent("ProductReview", ProductReview);

export default composeWithTracker(composer)(ProductReview);
