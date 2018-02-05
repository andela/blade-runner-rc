import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Shop review page",
  name: "shop-review-page",
  icon: "far fa-star",
  autoEnable: true,
  registry: [{
    route: "/review/:shopName",
    name: "review",
    template: "shopReview",
    workflow: "coreWorkflow"
  }],
  layout: [{
    layout: "coreLayout",
    workflow: "coreWorkflow",
    collection: "ShopReviews",
    theme: "default",
    enabled: true,
    structure: {
      template: "shopReview",
      layoutHeader: "layoutHeader",
      layoutFooter: "",
      notFound: "notFound",
      dashboardHeader: "dashboardHeader",
      dashboardControls: "",
      dashboardHeaderControls: "",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
