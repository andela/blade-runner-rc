import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Actionable Analytics",
  name: "actionableAnalytics",
  icon: "fa fa-bar-chart",
  autoEnable: true,
  template: "actionableAnalytics",
  settings: {
    name: "Actionable Analytics"
  },
  registry: [{
    provides: ["dashboard"],
    route: "/dashboard/analytics",
    name: "actionable-analytics",
    label: "Actionable Analytics",
    description: "Actionable Analytics",
    icon: "fa fa-bar-chart",
    priority: 1,
    container: "core",
    workflow: "coreDashboardWorkflow",
    template: "actionableAnalytics"
  }],
  layout: [{
    layout: "coreLayout",
    workflow: "coreDashboardWorkflow",
    theme: "default",
    enabled: true,
    structure: {
      template: "actionableAnalytics",
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
