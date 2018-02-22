import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Static Pages",
  name: "staticPages",
  icon: "fa fa-file",
  autoEnable: true,
  settings: {
    name: "Static Pages"
  },
  registry: [{
    provides: ["dashboard"],
    route: "/dashboard/static",
    name: "static-pages",
    label: "Static Pages",
    description: "Create static pages",
    icon: "fa fa-file",
    priority: 1,
    container: "core",
    workflow: "coreDashboardWorkflow",
    permissions: [{
      label: "dashboard/static",
      permission: "dashboard/static"
    }],
    template: "staticPages"
  }],
  layout: [{
    layout: "coreLayout",
    workflow: "coreDashboardWorkflow",
    collection: "StaticPages",
    theme: "default",
    enabled: true,
    structure: {
      template: "staticPages",
      layoutHeader: "layoutHeader",
      layoutFooter: "layoutFooter",
      notFound: "notFound",
      dashboardHeader: "dashboardHeader",
      dashboardControls: "dashboardControls",
      dashboardHeaderControls: "dashboardControls",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
