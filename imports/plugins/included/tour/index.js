import { introJs } from "intro.js";
import { Reaction } from "/client/api";
import landingPageTour from "./landingPageTour";
import dashboardTour from "./dashboardTour";

const intro = new introJs();

const startTour = () => {
  let steps;

  Reaction.hasPermission("admin") ?
    steps = dashboardTour :
    steps = landingPageTour;

  intro.setOptions({
    steps,
    showBullets: true,
    showProgress: true,
    scrollToElement: true,
    showStepNumbers: false
  });
  intro.start();
};

export default startTour;
