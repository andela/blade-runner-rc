import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Wallets, WalletHistories } from "/lib/collections";

/**
 * @file Methods for posting and managing shop reviews.
 * Run these methods using `Meteor.call()`.
 * @example Meteor.call("shopReview/postReview", userId, shop._id, review)
 * @namespace Methods/Wallet
*/

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
    check(transaction, Object);
    WalletHistories.insert(transaction);
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

    if (transactionType === "credit") {
      let wallet;
      to === from ? wallet = Wallets.findOne({ ownerEmail: to }) : "";
      const currentBalance = wallet.balance;
      updateBalance(currentBalance, amount, to);
    } else {
      const senderWallet = Wallets.findOne({ ownerEmail: from });
      const currentBalance = senderWallet.balance;
      updateBalance(currentBalance, -amount, from);
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