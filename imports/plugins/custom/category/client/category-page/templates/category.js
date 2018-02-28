import { Router } from "/client/api";
import { Products } from "/lib/collections/schemas/products";
import { Components } from "@reactioncommerce/reaction-components";
import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";

Template.categoryPage.helpers({
  products: function () {
    const current = Router.current();
    console.log(">>>>>>>>>>>>", current);
    const categoryName = current.params.categoryName;
    const subscription = Meteor.subscribe("Product");
    if (subscription.ready()) {
      const products = Products.find({ categoryName }).fetch();
      if (products.length > 0) {
        console.log(">>>>>>>>>>>>", products);
        return products;
      }
    }
  }
});

Template.categoryPage.helpers({
  Products: function () {
    return Components.Products;
  }
});
