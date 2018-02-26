import { StaticPages } from "/lib/collections";
import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { Router } from "/client/api";

Template.staticPageView.helpers({
  staticPage() {
    const current = Router.current();
    const pageAddress = current.params.pageAddress;
    const subscription = Meteor.subscribe("StaticPages");
    if (subscription.ready()) {
      const page = StaticPages.find({ pageAddress }).fetch();
      if (page.length > 0) {
        const pageContent = page[0].pageContent;
        return ([{ title: page[0].pageName, content: pageContent }]);
      }
    }
  }
});
