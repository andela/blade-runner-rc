import React from "react";
import { Router } from "/client/api";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";

const PriceRange = (props) => {
  const route = `https://blade-runner-rc-staging.herokuapp.com${Router.current().route.path}`;
  return (
    <div className="pdp price-range" style={{ display: "flex", justifyContent: "space-between" }}>
      <Components.Currency {...props} />
      <div style={{ display: "inline-block" }}>
        <a className="twitter-share-button"
          href={`https://twitter.com/intent/tweet?text=Write%20Something&url=${route}`}
          data-size="large" target="_blank"
        >
          <i className="fa fa-twitter" style={{ fontSize: "3rem", margin: "2rem" }}/></a>

        <iframe src={`https://www.facebook.com/plugins/share_button.php?href=${route}&layout=button_count&size=small&mobile_iframe=true&appId=1370390833065544&width=69&height=20`} width="69" height="20" style={{ border: "none", overflow: "hidden" }}
          scrolling="no" frameBorder="0" allowTransparency="true"
        />
      </div>
    </div>
  );
};

registerComponent("PriceRange", PriceRange);

export default PriceRange;
