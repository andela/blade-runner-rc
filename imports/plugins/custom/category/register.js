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
      route: "/category",
      provides: ["shortcut"],
      template: "categoryPage",
      name: "category-page",
      workflow: "coreWorkFlow",
      permissions: [{
        label: "category-page",
        permission: "category-page"
      }]
    }
  ]
});
