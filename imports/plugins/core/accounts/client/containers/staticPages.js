import { compose, withProps } from "recompose";
import { Reaction } from "/client/api";
import { Meteor } from "meteor/meteor";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import * as Collections from "/lib/collections";
import StaticPagesComponent from "../components/staticPages";

const handlers = {};

const composer = (props, onData) => {
  const subscription = Meteor.subscribe("StaticPages");
  let pages = [];
  if (subscription.ready()) {
    pages = Collections.StaticPages.find({
      shopId: Reaction.getShopId(),
      isEnabled: true
    }).fetch();
  }

  if (pages.length > 0) {
    onData(null, {
      pages
    });
  } else {
    onData(null, {
      pages
    });
  }
};

registerComponent("StaticPagesComponent", StaticPagesComponent, [
  composeWithTracker(composer),
  withProps(handlers)
]);

export default compose(
  composeWithTracker(composer),
  withProps(handlers)
)(StaticPagesComponent);
