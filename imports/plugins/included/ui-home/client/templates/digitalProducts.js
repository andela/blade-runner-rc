import { Components } from "@reactioncommerce/reaction-components";
import { Template } from "meteor/templating";
import "./digitalProducts.html";

Template.digitalProducts.helpers({
  DigitalProducts() {
    return Components.Products;
  }
});
