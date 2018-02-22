import React from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";

const CancelOrderButton = (props) => {
  const { order, orderStatus } = props;
  return (
    <div>
      {
        (orderStatus === "new" || orderStatus === "coreOrderWorkflow/canceled") &&
      <Components.Button
        status="primary"
        disabled={orderStatus === "coreOrderWorkflow/canceled"}
        buttonType="submit"
        bezelStyle="solid"
        label={orderStatus === "coreOrderWorkflow/canceled" ? "Cancelled" : "Cancel Order"}
      />
      }
    </div>
  );
};

export default CancelOrderButton;
