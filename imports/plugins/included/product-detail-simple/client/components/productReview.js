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
    // eslint-disable-next-line
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
      <div style={{ marginTop: "10px" }}>
        <Card>
          <CardHeader i18nKeyTitle={"Product reviews"} title={"Product reviews"} />
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
