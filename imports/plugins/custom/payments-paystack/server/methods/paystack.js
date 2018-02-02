/* eslint camelcase: 0 */
// meteor modules
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
// reaction modules
import { Reaction, Logger } from "/server/api";
import { PaystackApi } from "./paystackapi";
import { Packages } from "/lib/collections";

Meteor.methods({
  /**
   * Submit a card for Authorization
   * @param  {Object} transactionType authorize or capture
   * @param  {Object} cardData card Details
   * @param  {Object} paymentData The details of the Payment Needed
   * @return {Object} results normalized
   */
  "paystackSubmit": (transactionType, cardData, paymentData) => {
    check(transactionType, String);
    check(cardData, {
      name: String,
      email: String
    });

    check(paymentData, {
      total: String,
      currency: String
    });
    const total = parseFloat(paymentData.total);
    let result;
    try {
      const transaction = PaystackApi.methods.authorize.call({
        transactionType: transactionType,
        cardData: cardData,
        paymentData: paymentData
      });

      result = {
        saved: true,
        status: "created",
        currency: paymentData.currency,
        amount: total,
        riskLevel: normalizeRiskLevel(transaction),
        transactionId: transaction.id,
        response: {
          amount: total,
          transactionId: transaction.id,
          currency: paymentData.currency
        }
      };
    } catch (error) {
      Logger.warn(error);
      result = {
        saved: false,
        error: error
      };
    }
    return result;
  },

  /**
   * Load Api Keys
   * @return {Object} keys from the database
   */
  "paystack/loadApiKeys": () => {
    const packageData = Packages.findOne({
      name: "paystack-payment-method",
      shopId: Reaction.getShopId()
    });
    const {
      publicKey,
      secretKey
    } = packageData.settings["paystack-payment-method"];
    return {
      publicKey,
      secretKey
    };
  },

  /**
   * Capture a Charge
   * @param {Object} paymentData Object containing data about the transaction to capture
   * @return {Object} results normalized
   */
  "paystack/payment/capture": (paymentData) => {
    check(paymentData, Reaction.Schemas.PaymentMethod);
    const authorizationId = paymentData.transactionId;
    const amount = paymentData.amount;
    const response = PaystackApi.methods.capture.call({
      authorizationId: authorizationId,
      amount: amount
    });
    const result = {
      saved: true,
      response: response
    };
    return result;
  },

  /**
   * Create a refund
   * @param  {Object} paymentMethod object
   * @param  {Number} amount The amount to be refunded
   * @return {Object} result
   */
  "paystack/refund/create": (paymentMethod, amount) => {
    check(paymentMethod, Reaction.Schemas.PaymentMethod);
    check(amount, Number);
    const { transactionId } = paymentMethod;
    const response = PaystackApi.methods.refund.call({
      transactionId: transactionId,
      amount: amount
    });
    const results = {
      saved: true,
      response: response
    };
    return results;
  },

  /**
   * List refunds
   * @param  {Object} paymentMethod Object containing the pertinant data
   * @return {Object} result
   */
  "paystack/refund/list": (paymentMethod) => {
    check(paymentMethod, Reaction.Schemas.PaymentMethod);
    const { transactionId } = paymentMethod;
    const response = PaystackApi.methods.refunds.call({
      transactionId: transactionId
    });
    const result = [];
    for (const refund of response.refunds) {
      result.push(refund);
    }
    const emptyResult = [];
    return emptyResult;
  }
});

/**
 * @method normalizeRiskLevel
 * @private
 * @summary Normalizes the risk level response of a transaction to the values defined in paymentMethod schema
 * @param  {object} transaction - The transaction that we need to normalize
 * @return {string} normalized status string - either elevated, high, or normal
 */
function normalizeRiskLevel(transaction) {
  // the values to be checked against will depend on the return codes/values from the payment API
  if (transaction.riskStatus === "low_risk_level") {
    return "elevated";
  }

  if (transaction.riskStatus === "highest_risk_level") {
    return "high";
  }

  // default to normal if no other flagged
  return "normal";
}
