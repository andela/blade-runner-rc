import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { PackageConfig } from "/lib/collections/schemas/registry";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const PaystackPackageConfig = new SimpleSchema([
  PackageConfig, {
    "settings.mode": {
      type: Boolean,
      defaultValue: true
    },
    "settings.publicKey": {
      type: String,
      label: "API Public Key",
      optional: true
    },
    "settings.secretKey": {
      type: String,
      label: "API Secret Key",
      optional: true
    }
  }
]);

registerSchema("PaystackPackageConfig", PaystackPackageConfig);

export const PaystackPayment = new SimpleSchema({
  name: {
    type: String,
    label: "Cardholder name"
  },
  email: {
    type: String,
    label: "Cardholder email"
  }
});

registerSchema("PaystackPayment", PaystackPayment);
