import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Wallets, WalletHistories } from "/lib/collections";
import { Reaction } from "/server/api";

/**
 * @file Methods for posting and managing shop reviews.
 * Run these methods using `Meteor.call()`.
 * @example Meteor.call("shopReview/postReview", userId, shop._id, review)
 * @namespace Methods/Wallet
*/

/**
 * @method checkUserPermissions
 * @private
 * @summary Perform check to see if user is owner or admin
 * @return {Boolean} - check user permission status
 */
function checkUserPermissions() {
  const isOwner = Reaction.hasOwnerAccess();
  const isAdmin = Reaction.hasAdminAccess();
  const isGuest = !Reaction.hasPermission("account/profile");

  return (isOwner || isAdmin || isGuest);
}

Meteor.methods({
  /**
   * @name wallet/insertTransaction
   * @method
   * @memberof Methods/Wallet
   * @summary Allows authenticated users insert transaction
   * @param {String} userId - id of the user posting the review
   * @param {String} shopId - id of the shop being reviewed
   * @param {String} review - review of the product from the user
   * @return {Void} - or Error object on failure
   */
  "wallet/insertTransaction": function (transaction) {
    // check(userId, String);
    // check(shopId, String);
    check(transaction, Object);

    // if (checkUserPermissions()) {
    //   throw new Meteor.Error(403, "Owners or Admins can't review");
    // }

    // if (Meteor.user().name) {
    WalletHistories.insert(transaction);
    // } else {
    // throw new Meteor.Error(401, "Please update account profile");
    // }
  },
  /**
   * @name wallet/updateBalance
   * @method
   * @memberof Methods/Wallet
   * @summary Allows authenticated users that are not of owner or admin delete their reviews
   * @param {String} id - id of the review to be deleted
   * @param {String} userId - id of the user
   * @param {String} shopId - id of the shop
   * @return {Void} - or Error object on failure
   */
  "wallet/updateBalance": function (transaction) {
    check(transaction, Object);
    const {
      amount,
      to,
      from,
      transactionType
    } = transaction;

    const updateBalance = (currentBalance, updateAmount, ownerEmail) => {
      Wallets.update({ ownerEmail }, {
        $set: {
          balance: currentBalance + updateAmount
        }
      });
    };

    if (to === from) {
      const wallet = Wallets.findOne({ ownerEmail: from });
      const currentBalance = wallet.balance;
      updateBalance(currentBalance, amount, from);
    } else {
      if (transactionType === "credit") {
        const receiverWallet = Wallets.findOne({ ownerEmail: to });
        const currentBalance = receiverWallet.balance;
        updateBalance(currentBalance, amount, to);
      } else {
        const senderWallet = Wallets.findOne({ ownerEmail: from });
        const currentBalance = senderWallet.balance;
        updateBalance(currentBalance, -amount, from);
      }
    }
  },

  /**
   * @name wallet/getUserWalletId
   * @method
   * @memberof Methods/getUserWalletId
   * @summary Allows authenticated users that are not of owner or admin delete their reviews
   * @param {String} id - id of the review to be edited
   * @param {String} userId - id of the user
   * @param {String} shopId - id of the shop
   * @param {String} newReview - updated comment on product to replace exixting one
   * @return {Void} - or Error object on failure
   */
  "wallet/getUserWalletId": function (ownerEmail) {
    check(ownerEmail, String);

    const wallet = Wallets.findOne({ ownerEmail });
    if (wallet) {
      return wallet._id.valueOf();
    }
    throw new Meteor.Error(401, "Access denied");
  }
});
