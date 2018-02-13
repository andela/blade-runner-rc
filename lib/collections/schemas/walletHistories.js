import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

/**
 * @name WalletHistories
 * @summary Schema for wallet histories
 * @type {SimpleSchema}
 * @memberof schemas
 * @property {String} amount required
 * @property {Number} transactionType required
 * @property {Date} createdAt required
 * @property {String} walletId required
 * @property {Date} from required
 * @property {Date} to required
 */
export const WalletHistories = new SimpleSchema({
  amount: {
    type: Number,
    decimal: true,
    label: "Amount"
  },
  transactionType: {
    type: String,
    allowedValues: ["credit", "debit"]
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      }
    }
  },
  walletId: {
    type: String
  },
  from: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  to: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  }
});

registerSchema("WalletHistories", WalletHistories);
