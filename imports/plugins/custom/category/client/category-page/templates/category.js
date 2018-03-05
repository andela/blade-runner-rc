import { Components } from "@reactioncommerce/reaction-components";
import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { Products } from "/lib/collections";
import { applyProductRevision } from "/lib/api/products";

const productsSubscription = Meteor.subscribe("Digital Products");

if (productsSubscription.ready()) {
  window.prerenderReady = true;
}

const productCursor = Products.find({
  isDigital: true
});

const products = productCursor.map((product) => {
  return applyProductRevision(product);
});

console.log(">>>>>>>>>>>>>>>>>>>Digital Products", products, productsSubscription.ready(), productCursor);


Template.categoryPage.helpers({
  CategorizedProducts() {
    return Components.Products;
  }
});
