import { PaystackSettingsFormContainer } from "../containers";
import { Template } from "meteor/templating";
import "./paystack.html";

Template.paystackSettings.helpers({
  PaystackSettings() {
    return {
      component: PaystackSettingsFormContainer
    };
  }
});
