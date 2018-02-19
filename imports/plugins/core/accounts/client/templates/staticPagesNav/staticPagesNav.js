import { Template } from "meteor/templating";
import StaticPagesContainer from "../../containers/staticPages";

Template.staticPagesNav.helpers({
  staticPages() {
    return {
      component: StaticPagesContainer
    };
  }
});
