import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { schemaIdAutoValue } from "./helpers";
import { registerSchema } from "@reactioncommerce/reaction-collections";

/**
 * @name Wallet
 * @summary Schema for items we're inserting into our Payments
 * To keep track of what items were paid for with a given paymentMethod
 * @type {SimpleSchema}
 * @memberof schemas
 * @property {String} _id optional, Shipment Line Item
 * @property {Number} balance required
 * @property {Number} ownerId optional, Shipment Item ShopId
 */
export const Wallet = new SimpleSchema({
  _id: {
    type: String,
    label: "Wallet Id",
    optional: true,
    autoValue: schemaIdAutoValue
  },
  balance: {
    type: Number,
    index: 1
  },
  userId: {
    type: Number,
    index: 1
  }
});

registerSchema("Wallet", Wallet);

/**
 * @name Wallet
 * @summary Schema for items we're inserting into our Payments
 * To keep track of what items were paid for with a given paymentMethod
 * @type {SimpleSchema}
 * @memberof schemas
 * @property {String} _id optional, Shipment Line Item
 * @property {String} transactionType optional, Shipment Line Item
 * @property {Number} balance required
 * @property {Number} userId optional, Shipment Item ShopId
 * @property {Number} senderId optional, Shipment Item ShopId
 * @property {Number} receiverId optional, Shipment Item ShopId
 * @property {String} description optional, Shipment Item ShopId
 * @property {Date} createdAt optional, Shipment Item ShopId
 */
export const WalletHistory = new SimpleSchema({
  _id: {
    type: String,
    label: "Wallet Id",
    optional: true,
    autoValue: schemaIdAutoValue
  },
  transactionType: {
    type: String,
    index: 1
  },
  walletId: {
    type: Number,
    index: 1
  },
  description: {
    type: String,
    index: 1
  },
  amount: {
    type: Number,
    index: 1
  },
  senderId: {
    type: Number,
    index: 1
  },
  recieverId: {
    type: Number,
    index: 1
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      }
    },
    denyUpdate: true
  }
});

registerSchema("WalletHistory", WalletHistory);

