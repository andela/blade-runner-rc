import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { Reaction } from "/server/api";
import { ProductReviews } from "/lib/collections";

/**
 * @method checkUserPermissions
 * @private
 * @summary Perform check to see if user is owner or admin
 * @return {Boolean} - check user permission status
 */
function canReview() {
  return !Reaction.hasOwnerAccess() ||
         !Reaction.hasAdminAccess() ||
         Reaction.hasPermission("account/profile");
}

Meteor.methods({
  "productReview/createReview": function (productId, review, rating) {
    check(productId, String);
    check(review, String);
    check(rating, Number);

    if (!canReview()) {
      throw new Meteor.Error(403, "Owners, admins, and unauthenticated users can't review products.");
    }

    ProductReviews.insert({
      userId: Meteor.user()._id,  productId,  review, rating: parseInt(rating, 10)
    });
  }
});
