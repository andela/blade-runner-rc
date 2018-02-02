import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { Reaction } from "/server/api";
import { shopReviews } from "/lib/collections";

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
  "shopReview/createReview": function (shopId, review, rating) {
    check(shopId, String);
    check(review, String);
    check(rating, Number);

    if (!canReview()) {
      throw new Meteor.Error(403, "Owners, admins, and unauthenticated users can't review products.");
    }

    shopReviews.insert({
      userId: Meteor.user()._id, shopId,  review, rating: parseInt(rating, 10)
    });
  }
});
