import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Static-Page-View",
  name: "reaction-static-pages-view",
  autoEnable: true,
  registry: [
    {
      route: "/pages/:pageAddress",
      name: "pages",
      workflow: "coreStaticPagesWorkflow",
      template: "staticPageView"
    }
  ],
  layout: [{
    layout: "coreLayout",
    workflow: "coreProductWorkflow",
    collection: "StaticPages",
    theme: "default",
    enabled: true,
    structure: {
      template: "staticPageView",
      layoutHeader: "layoutHeader",
      layoutFooter: "",
      notFound: "productNotFound",
      dashboardHeader: "productDetailSimpleToolbar",
      dashboardControls: "productDetailDashboardControls",
      dashboardHeaderControls: "",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
