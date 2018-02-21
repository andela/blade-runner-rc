import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Wallet",
  name: "wallet",
  icon: "fa fa-google-wallet",
  autoEnable: true,
  settings: {
    enabled: true
  },
  registry: [
    {
      template: "walletPayment",
      provides: ["paymentMethod"],
      icon: "fa fa-credit-card-alt"
    },
    {
      route: "/account/wallet",
      icon: "fa fa-google-wallet",
      provides: ["shortcut"],
      template: "walletDashboard",
      label: "Wallet",
      name: "wallet",
      workflow: "coreWorkFlow"
    }
  ],
  layout: [ {
    collection: "Wallets"
  }
  ] // Array of layout objects - optional
});
