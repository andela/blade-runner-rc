import { Meteor } from "meteor/meteor";
import { compose, withProps } from "recompose";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import { Accounts, Wallets, WalletHistories } from "/lib/collections";

import { Paystack } from "../../../../../custom/payments-paystack/lib/api";

import WalletDashboard from "../components/WalletDashboard";

const handlers = {
  fundWallet(amount) {
    return new Promise((resolve, reject) => {
      if (amount <= 0) {
        return reject(new Error("invalid amount, please try againsss"));
      }

      Meteor.subscribe("Packages", Reaction.getShopId());
      const email = Accounts.findOne({ _id: Meteor.userId() }).emails[0].address;

      Meteor.call("paystack/loadApiKeys", (getPublicKeyError, { publicKey, secretKey }) => {
        if (!getPublicKeyError) {
          const payload = {
            key: publicKey,
            email,
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
