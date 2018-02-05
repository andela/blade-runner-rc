import { Meteor } from "meteor/meteor";
import { ShopReviews } from "/lib/collections";

Meteor.publish("ShopReview", function () {
  return ShopReviews.find();
});
