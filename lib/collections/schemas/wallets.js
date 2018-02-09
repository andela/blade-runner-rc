import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

/**
 * @name Wallet
 * @memberof schemas
 * @type {SimpleSchema}
 * @property {String} ownerEmail required
 * @property {String} name
 * @property {Number} balance required
 */
export const Wallets = new SimpleSchema({
  ownerEmail: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  name: {
    type: String,
    optional: true
  },
  balance: {
    type: Number,
    label: "balance",
    decimal: true,
    optional: true,
    defaultValue: 0
  }
});

registerSchema("Wallets", Wallets);
