import React, { Component } from "react";
import PropTypes from "prop-types";
import swal from "sweetalert2";

class WalletAction extends Component {
  state = {
    isLoading: false
  }

  resetInputs = () => {
    this.amountInput.value = "";
    if (this.props.actionType === "transfer") {
      this.emailInput.value = "";
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const amount = parseInt(this.amountInput.value, 10);
    this.setState({ isLoading: true });
    let email;

    if (this.props.actionType === "fund") {
      this.props.formHandler(amount)
        .then((fundWalletSuccess) => {
          Alerts.toast(fundWalletSuccess.message);

          this.resetInputs();

          this.setState({ isLoading: false });
        })
        .catch((fundWalletError) => {
          this.resetInputs();
          this.setState({ isLoading: false });
          Alerts.toast(fundWalletError.message, "error");
        });
    } else {
      email = this.emailInput.value;
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this transfer",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, transfer"
      })
        .then(() => this.props.formHandler(amount, email, this.props.wallet))
        .then((transferSuccess) => {
          Alerts.toast(transferSuccess.message);

          this.resetInputs();

          this.setState({ isLoading: false });
        })
        .catch((transferError) => {
          if (typeof transferError === "object") {
            Alerts.toast(transferError.message, "error");
          }

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

              {
                actionType === "transfer"
                &&
                <label>
                  Wallet Holder Email
                  <input
                    type="email"
                    className="form-control"
                    placeholder="e.g: johndoe@mail.com"
                    ref={(node) => (this.emailInput = node)}
                    required
                  />
                </label>

              }

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
