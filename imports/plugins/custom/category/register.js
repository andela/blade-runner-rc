import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Category Page",
  name: "category-page",
  icon: "fa fa-google-wallet",
  autoEnable: true,
  settings: {
    enabled: true
  },
  registry: [
    {
      template: "categoryPage",
      icon: "fa fa-credit-card-alt",
      permissions: [{
        label: "category-page",
        permission: "category-page"
      }]
    },
    {
      route: "/category/:categoryName",
      name: "category-page",
      workflow: "coreWorkFlow",
      provides: ["shortcut"],
      label: "category-page",
      template: "categoryPage"
    }
  ] // Array of layout objects - optional
});
