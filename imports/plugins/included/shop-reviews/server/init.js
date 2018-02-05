import { Reaction, Logger, Hooks } from "/server/api";
import { Shops } from "/lib/collections";

function addRolesToVisitors() {
  // Add the review permission to all default roles since it's available to all
  Logger.info("::: Adding review route permissions to default roles");
  const shop = Shops.findOne(Reaction.getShopId());
  Shops.update(shop._id, {
    $addToSet: { defaultVisitorRole: "review" }
  });
  Shops.update(shop._id, {
    $addToSet: { defaultRoles: "review" }
  });
}

/**
 * Hook to make additional configuration changes
 */
Hooks.Events.add("afterCoreInit", () => {
  addRolesToVisitors();
});
