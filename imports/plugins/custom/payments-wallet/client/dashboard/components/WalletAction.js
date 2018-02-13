import React, { Component } from "react";
import PropTypes from "prop-types";

class WalletAction extends Component {
  state = {
    isLoading: false
  }

  resetInputs = () => {
    this.amountInput.value = "";
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const amount = parseInt(this.amountInput.value, 10);
    this.setState({ isLoading: true });

    if (this.props.actionType === "fund") {
      this.props.formHandler(amount)
        .then((fundWalletSuccess) => {
          Alerts.toast(fundWalletSuccess.message);

          this.resetInputs();

          this.setState({ isLoading: false });
        })
        .catch((fundWalletError) => {
          if (fundWalletError.message === "paystack-popup-close") {
            this.resetInputs();

            this.setState({ isLoading: false });

            return;
          }
          Alerts.toast(fundWalletError.message, "error");

          this.resetInputs();

          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    const { buttonText, headerTitle, actionType } = this.props;
    return (
      <div className={`wallet-dashboard-action ${actionType}`}>
        <div className="panel panel-default wallet-action">
          <div className="panel-heading">
            <h4>{headerTitle}</h4>
          </div>
          <div className="panel-body">
            <form
              className="wallet-dashboard-action__form"
              onSubmit={this.handleFormSubmit}
            >
              <label>
                Amount (in Naira)
                <input
                  type="number"
                  placeholder="e.g: 5000"
                  className="form-control"
                  ref={(node) => (this.amountInput = node)}
                  required
                />
              </label>

              <button className="add-cart" type="submit" disabled={this.state.isLoading}>
                <i
                  className={`fa fa-spinner fa-spin ${!this.state.isLoading && "hidden"}`}
                  id="btn-processing"
                />
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

WalletAction.propTypes = {
  actionType: PropTypes.oneOf(["fund", "transfer"]).isRequired,
  buttonText: PropTypes.string.isRequired,
  formHandler: PropTypes.func.isRequired,
  headerTitle: PropTypes.string.isRequired,
  wallet: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    ownerEmail: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired
};

export default WalletAction;
