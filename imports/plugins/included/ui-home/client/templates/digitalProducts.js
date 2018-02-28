import { Template } from "meteor/templating";
import DigitalProducts from "../digitalProducts/components/DigitalProducts";
import "./digitalProducts.html";

Template.digitalProducts.helpers({
  DigitalProducts() {
    return DigitalProducts;
  }
});
