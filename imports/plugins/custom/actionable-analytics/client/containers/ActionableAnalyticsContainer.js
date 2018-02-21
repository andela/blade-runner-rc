/* eslint-disable */
import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { Orders } from "/lib/collections";

class ActionableAnalyticsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const order = Orders.find().fetch();
  }

  render() {
    return (
      <div>Actionable Analytics</div>
    );
  }
}

registerComponent("ActionableAnalyticsContainer", ActionableAnalyticsContainer);

export default ActionableAnalyticsContainer;
