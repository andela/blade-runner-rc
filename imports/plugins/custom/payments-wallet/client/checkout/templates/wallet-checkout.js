import { Template } from "meteor/templating";
import { WalletCheckoutContainer } from "../containers";

import "./wallet-checkout.html";

Template.walletPayment.helpers({
  WalletCheckout() {
    return {
      component: WalletCheckoutContainer
    };
  }
});
