import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";


class WalletHistory extends Component {
  renderHistory = (walletHistory) => {
    if (walletHistory.length === 0) {
      return (
        <tr>
          <td
            colSpan={2}
            className="text-center"
          >No transaction found...</td>
        </tr>
      );
    }

    return walletHistory.map((history) => (
      <tr key={history._id} className="transaction">
        <td className="transaction__amount">{`₦ ${history.amount}`}</td>
        <td className="transaction__info">
          {
            history.from === history.to && history.transactionType === "credit" ?
              <p className="transaction__info-message">Wallet top up</p>
              :
              <p className="transaction__info-message">
                {
                  history.transactionType === "credit" ?
                    `Recieved from ${history.from}` :
                    `Sent to ${history.to}`
                }
              </p>
          }
        </td>
        <td><p>{moment(history.createdAt).format("MMM Do, YYYY h:mm:ss A")}</p></td>
      </tr>
    ));
  }
  render() {
    return (
      <div className="wallet-dashboard-history">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>Wallet History</h4>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Transaction Information</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="transactions">
              {
                this.renderHistory(this.props.walletHistory)
              }
            </tbody>
            <tfoot />
          </table>
        </div>
      </div>
    );
  }
}

WalletHistory.propTypes = {
  walletHistory: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    transactionType: PropTypes.oneOf(["credit", "debit"]).isRequired,
    walletId: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired
};

export default WalletHistory;
