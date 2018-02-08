/* eslint camelcase: 0 */
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { AutoForm } from "meteor/aldeed:autoform";
import { $ } from "meteor/jquery";
import { Random } from "meteor/random";
import { Reaction } from "/client/api";
import { Cart, Packages } from "/lib/collections";
import { Paystack } from "../../lib/api";
import { PaystackPayment } from "../../lib/collections/schemas";

import "./paystack.html";

let submitting = false;

function uiEnd(template, buttonText) {
  template.$(":input").removeAttr("disabled");
  template.$("#btn-complete-order").text(buttonText);
  return template.$("#btn-processing").addClass("hidden");
}

function paymentAlert(errorMessage) {
  return $(".alert").removeClass("hidden").text(errorMessage);
}

function handlePaystackSubmitError(error) {
  const serverError = error !== null ? error.message : void 0;
  if (serverError) {
    return paymentAlert("Oops! " + serverError);
  } else if (error) {
    return paymentAlert("Oops! " + error, null, 4);
  }
}


const enableButton = (template, buttonText) => {
  template.$(":input").removeAttr("disabled");
  template.$("#btn-complete-order").text(buttonText);
  return template.$("#btn-processing").addClass("hidden");
};


Template.paystackPaymentForm.helpers({
  PaystackPayment() {
    return PaystackPayment;
  }
});

AutoForm.addHooks("paystack-payment-form", {
  onSubmit(doc) {
    Meteor.call("paystack/loadApiKeys", (err, keys) => {
      if (keys) {
        const {
          publicKey,
          secretKey
        } = keys;
        const packageData = Packages.findOne({
          name: "paystack-payment-method",
          shopId: Reaction.getShopId()
        });
        const cart = Cart.findOne();
        const amount = Math.round(cart.cartTotal()) * 100;
        const template = this.template;
        const details = {
          key: publicKey,
          name: doc.payerName,
          email: doc.email,
          reference: Random.id(),
          amount,
          callback(response) {
            if (response.reference) {
              Paystack.verify(response.reference, secretKey, (error, res) => {
                if (error) {
                  handlePaystackSubmitError(template, error);
                  enableButton(template, "Resubmit payment");
                } else {
                  submitting = false;
                  const transaction = res.data;
                  const paymentMethod = {
                    paymentPackageId: packageData._id,
                    paymentSettingsKey: packageData.registry[0].settingsKey,
                    method: "credit",
                    processor: "Paystack",
                    storedCard: transaction.authorization.card_type,
                    transactionId: transaction.reference,
                    currency: transaction.currency,
                    amount: transaction.amount / 100,
                    status: "passed",
                    mode: "authorize",
                    createdAt: new Date(),
                    transactions: []
                  };
                  Alerts.toast("Transaction successful");
                  paymentMethod.transactions.push(transaction.authorization);
                  Meteor.call("cart/submitPayment", paymentMethod);
                }
              });
            }
          },
          onClose() {
            enableButton(template, "Complete payment");
          }
        };
        try {
          PaystackPop.setup(details).openIframe();
        } catch (error) {
          handlePaystackSubmitError(template, error);
          enableButton(template, "Complete payment");
        }
      }
    });
    return false;
  },
  beginSubmit: function () {
    this.template.$(":input").attr("disabled", true);
    this.template.$("#btn-complete-order").text("Submitting ");
    return this.template.$("#btn-processing").removeClass("hidden");
  },
  endSubmit: function () {
    if (!submitting) {
      return uiEnd(this.template, "Complete your order");
    }
  }
});
