import { Components } from "@reactioncommerce/reaction-components";
import { Template } from "meteor/templating";

Template.shopReview.helpers({
  shopReview() {
    return Components.ShopReview;
  }
});
