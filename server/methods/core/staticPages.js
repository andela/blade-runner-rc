import * as Collections from "/lib/collections";
import * as Schemas from "../../../lib/collections/schemas";
import { StaticPages } from "../../../lib/collections";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


Meteor.methods({
  insertPage: function (pageName, pageAddress, pageContent, userId, shopId, isEnabled, createdAt) {
    check(pageName, String);
    check(pageAddress, String);
    check(pageContent, String);
    check(userId, String);
    check(shopId, String);
    check(isEnabled, Boolean);
    check(createdAt, Date);

    const page = {
      pageName,
      pageAddress,
      pageContent,
      userId,
      shopId,
      isEnabled,
      createdAt
    };

    check(page, Schemas.StaticPages);
    Collections.StaticPages.insert(page);
  },
  updatePage: function (_id, pageName, pageAddress, pageContent, userId, shopId, isEnabled, createdAt, updatedAt) {
    check(_id, String);
    check(pageName, String);
    check(pageAddress, String);
    check(pageContent, String);
    check(userId, String);
    check(shopId, String);
    check(isEnabled, Boolean);
    check(createdAt, Date);
    check(updatedAt, Date);

    const page = {
      pageName,
      pageAddress,
      pageContent,
      userId,
      shopId,
      isEnabled,
      createdAt,
      updatedAt
    };

    check(page, Schemas.StaticPages);
    Collections.StaticPages.update(_id, { $set: page });
  },

  // deletePage: function
  "deletePage"(_id) {
    check(_id, String);
    StaticPages.remove(_id);
  }
});
