import { Meteor } from "meteor/meteor";
import { ProductReviews } from "/lib/collections";

Meteor.publish("ProductReviews", function () {
  return ProductReviews.find();
});
