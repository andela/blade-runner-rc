import { Meteor } from "meteor/meteor";
import { Reaction } from "/server/api";
import { Orders } from "/lib/collections";

Meteor.publish("GetOrders", function () {
  const shopId = Reaction.getShopId();
  if (!shopId) {
    return this.ready();
  }
  return Orders.find({
    shopId
  });
});
