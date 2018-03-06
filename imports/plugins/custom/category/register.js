import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Category Page",
  name: "category",
  autoEnable: true,
  settings: {
    enabled: true
  },
  registry: [
    {
      route: "/category/:category",
      template: "categoryPage"
    }
  ]
});
