import React from "react";
import { Router } from "/client/api";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";

const route = `http:https://blade-runner-rc-staging`;

const PriceRange = (props) => {
  return (
    <div className="pdp price-range">
      <Components.Currency {...props} />
      <div style={{ display: "inline-block" }}>
        <a className="twitter-share-button"
          href={`https://twitter.com/intent/tweet?text=Write%20Something&url=${route}`}
          data-size="large" target="_blank"
        >
          <i className="fa fa-twitter" style={{ fontSize: "3rem", margin: "2rem" }}/></a>

        <a className="twitter-share-button"
          href="https://twitter.com/intent/tweet?text=Hello%20world"
          data-size="large" target="_blank"
        >
          <i className="fa fa-facebook" style={{ fontSize: "3rem", margin: "2rem" }}/></a>
      </div>
    </div>
  );
};

registerComponent("PriceRange", PriceRange);

export default PriceRange;
