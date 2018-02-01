import { introJs } from "intro.js";
import landingPageTour from "./landingPageTour";

const intro = new introJs();

const startTour = () => {
  intro.setOptions({
    steps: landingPageTour,
    showBullets: true,
    showProgress: true,
    scrollToElement: true,
    showStepNumbers: false
  });
  intro.start();
};

export default startTour;
