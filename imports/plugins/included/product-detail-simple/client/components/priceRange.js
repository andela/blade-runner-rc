import React from "react";
import { Router } from "/client/api";
import { Meteor } from "meteor/meteor";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";
import "./index.less";

const PriceRange = (props) => {
  const hostUrl = Meteor.settings.public.HOST_URL;
  const route = `${hostUrl}${Router.current().route.path}`;
  return (
    <div className="pdp price-range" id="price-range">
      <Components.Currency {...props} />
      <div style={{ display: "inline-block" }}>
        <a className="twitter-share-button"
          href={`https://twitter.com/intent/tweet?text=Write%20Something&url=${route}&hashtags=BladeRunnerRc`}
          data-size="large" target="_blank"
        >
          <i className="fa fa-twitter"/></a>
      </div>
    </div>
  );
};

registerComponent("PriceRange", PriceRange);

export default PriceRange;
