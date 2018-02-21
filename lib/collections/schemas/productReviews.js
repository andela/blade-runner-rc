import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const ProductReviews = new SimpleSchema({
  _id: { type: String, label: "Review Id" },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id },
  email: { type: String, label: "Reviewer email" },
  name: { type: String, label: "Reviewer name", optional: true },
  productId: { type: String, regEx: SimpleSchema.RegEx.Id },
  review: { type: String, max: 255, label: "Review" },
  rating: { min: 0, max: 5, defaultValue: 0, optional: true, label: "Rating", type: Number },
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

registerSchema("ProductReviews", ProductReviews);
