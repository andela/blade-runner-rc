import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { Reaction } from "/server/api";
import { ProductReviews } from "/lib/collections";

/**
 * @method cannotReview
 * @private
 * @summary Perform check to see if user is owner or admin
 * @return {Boolean} - check user permission status
 */
function cannotReview() {
  return (Reaction.hasOwnerAccess() || Reaction.hasAdminAccess() || !Reaction.hasPermission("account/profile"));
}
Meteor.methods({
  "productReview/createReview": function (productId, review, rating) {
    check(productId, String);
    check(review, String);
    check(rating, Number);

    if (cannotReview()) {
      throw new Meteor.Error(403, "Owners, admins, and unauthenticated users can't review products.");
    }
    const authUser = Meteor.user();
    ProductReviews.insert({
      userId: authUser._id,
      productId,
      review,
      rating: parseInt(rating, 10),
      name: authUser.name || "",
      email: authUser.emails[0].address
    });
  }
});
