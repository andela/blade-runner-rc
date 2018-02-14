import { WalletDashboardContainer } from "../containers";

import { Template } from "meteor/templating";
import "./wallet.html";

Template.walletDashboard.helpers({
  WalletDashboard() {
    return  {
      component: WalletDashboardContainer
    };
  }
});
