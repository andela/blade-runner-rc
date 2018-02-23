import { Meteor } from "meteor/meteor";
import { compose, withProps } from "recompose";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import { Accounts, Wallets, WalletHistories } from "/lib/collections";

import { Paystack } from "../../../../../custom/payments-paystack/lib/api";
import roundToTwo from "../../helpers/roundToTwo";

import WalletDashboard from "../components/WalletDashboard";
const emailRegex = /\.{1}/;

const handlers = {
  fundWallet(amount) {
    return new Promise((resolve, reject) => {
      if (amount <= 0) {
        return reject(new Error("invalid amount, please try again"));
      }

      Meteor.subscribe("Packages", Reaction.getShopId());
      const email = Accounts.findOne({ _id: Meteor.userId() }).emails[0].address;
      let emailForPaystack = email;

      !emailRegex.test(email) ? emailForPaystack += ".com" : "";

      Meteor.call("paystack/loadApiKeys", (getPublicKeyError, { publicKey, secretKey }) => {
        if (!getPublicKeyError) {
          const payload = {
            key: publicKey,
            email: emailForPaystack,
            amount: (amount * 100),
            currency: "NGN",
            callback: function (response) {
              const { reference } = response;
              Paystack.verify(reference, secretKey, (paystackVerifyError, res) => {
                if (paystackVerifyError) {
                  reject(paystackVerifyError);
                } else {
                  Meteor.call("wallet/getUserWalletId", email, (getWalletIdError, walletId) => {
                    const transaction = {
                      amount: (res.data.amount / 100),
                      transactionType: "credit",
                      walletId,
                      from: email,
                      to: email
                    };

                    resolve({
                      message: "Wallet funded successfully",
                      type: "success"
                    });
                    Meteor.call("wallet/insertTransaction", transaction);
                    Meteor.call("wallet/updateBalance", transaction);
                  });
                }
              });
            },
            onClose: function () {
              reject(new Error("paystack-popup-close"));
            }
          };
          PaystackPop.setup(payload).openIframe();
        } else {
          reject(getPublicKeyError);
        }
      });
    });
  },

  transferToWallet(amount, receiverEmail, senderWallet) {
    const {
      _id: senderWalletId,
      ownerEmail: senderEmail,
      balance: senderBalance
    } = senderWallet;

    return new Promise((resolve, reject) => {
      if (receiverEmail === senderEmail) {
        return reject(new Error("You can't transfer to yourself"));
      }

      if (amount <= 0) {
        return reject(new Error("invalid amount, please try again"));
      }

      if (amount >  roundToTwo(senderBalance)) {
        return reject(new Error("You dont have enough for this transfer, please fund your wallet"));
      }

      Meteor.call("wallet/getUserWalletId", receiverEmail, (getWalletIdError, receiverWalletId) => {
        if (getWalletIdError) {
          return reject(getWalletIdError);
        }
        const senderTransaction = {
          amount: Number(amount),
          transactionType: "debit",
          walletId: senderWalletId,
          from: senderEmail,
          to: receiverEmail
        };
        const receiverTransaction = {
          amount: Number(amount),
          transactionType: "credit",
          walletId: receiverWalletId,
          from: senderEmail,
          to: receiverEmail
        };
        const transactions = [senderTransaction, receiverTransaction];
        transactions.forEach((transaction) => {
          Meteor.call("wallet/updateBalance", transaction);
          Meteor.call("wallet/insertTransaction", transaction);
        });

        resolve(new Error(`Transfer to ${receiverEmail} successful`));
      });
    });
  },

  fetchWalletHistory(page = 1, limit = 5) {
    const offset = (page - 1) * limit;
    const walletHistoryCount = WalletHistories.find({}).count();

    const pagesCount = Math.ceil(walletHistoryCount / limit);

    const walletHistory = WalletHistories.find({}, {
      sort: { createdAt: -1 },
      limit,
      skip: offset
    }).fetch();

    return {
      walletHistory,
      pagesCount
    };
  }
};

function composer(props, onData) {
  const subcription = Meteor.subscribe("WalletHistories");
  if (subcription.ready()) {
    const wallet = Wallets.find({}).fetch();
    if (wallet) {
      const { walletHistory, pagesCount } = handlers.fetchWalletHistory();

      onData(null, { wallet: wallet[0], walletHistory, pagesCount });
    }
  }
}

registerComponent("WalletDashboard", WalletDashboard, [
  withProps(handlers),
  composeWithTracker(composer)
]);

export default compose(
  withProps(handlers),
  composeWithTracker(composer)
)(WalletDashboard);
