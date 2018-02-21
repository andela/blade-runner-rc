import { Components } from "@reactioncommerce/reaction-components";
import { Template } from "meteor/templating";

Template.shopRating.helpers({
  shopRating() {
    return Components.ShopRating;
  }
});
