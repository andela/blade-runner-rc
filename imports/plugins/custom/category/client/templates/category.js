import { Template } from "meteor/templating";
import Category from "../components/Category";

Template.categoryPage.helpers({
  CategorizedProducts() {
    return Category;
  }
});
