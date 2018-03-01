import React from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";

const CancelOrderButton = (props) => {
  const { order, orderStatus, onCancelOrderClick } = props;
  const checkOrderStatus = "coreOrderWorkflow/canceled";
  return (
    <div className="rfloat">
      {
        (orderStatus === "new" || orderStatus === checkOrderStatus) &&
        <Components.Button
          status="primary"
          disabled={orderStatus === checkOrderStatus}
          buttonType="submit"
          bezelStyle="solid"
          onClick={() => { onCancelOrderClick(order); }}
          label={orderStatus === checkOrderStatus ? "Cancelled" : "Cancel Order"}
        />
      }
    </div>
  );
};

CancelOrderButton.propTypes = {
  onCancelOrderClick: PropTypes.func,
  order: PropTypes.object,
  orderStatus: PropTypes.string
};

export default CancelOrderButton;
