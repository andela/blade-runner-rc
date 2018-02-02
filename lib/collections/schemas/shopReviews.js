import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const shopReviews = new SimpleSchema({
  _id: { type: String, label: "Shop Id" },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id },
  shopId: { type: String, regEx: SimpleSchema.RegEx.Id },
  review: { type: String, max: 225, label: "Review" },
  rating: { type: Number, min: 0, max: 5, defaultValue: 0, optional: true, label: "Rating" },
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
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      return new Date;
    },
    optional: true
  }
});

registerSchema("shopReviews", shopReviews);
