import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import WalletHistory from "./WalletHistory";
import WalletAction from "./WalletAction";

import roundToTwo from "../../helpers/roundToTwo";
class WalletDashboard extends Component {
  state = {
    currentPage: 1,
    limit: 5,
    walletHistory: this.props.walletHistory,
    pages: ["first", "prev", "next", "last"],
    pagesCount: this.props.pagesCount
  }

  componentWillReceiveProps(newProps) {
    const { walletHistory, pagesCount } = newProps;
    if (walletHistory) {
      this.setState({ walletHistory, pagesCount });
    }
  }

  fetchWalletHistory = (page) => {
    const { currentPage, pagesCount: lastPage } = this.state;

    if (page === "next" && currentPage < lastPage) {
      return this.setState({ currentPage: currentPage + 1 });
    }
    if (page === "prev" && currentPage > 1) {
      return this.setState({ currentPage: currentPage - 1 });
    }
    if (page === "first" && currentPage > 1) {
      return this.setState({ currentPage: 1 });
    }
    if (page === "last" && currentPage < lastPage) {
      return this.setState({ currentPage: lastPage });
    }

    return;
  }

  buttonDisabled = (page) => {
    const { currentPage, pagesCount } = this.state;
    if (currentPage === 1 && (page === "prev" || page === "first")) {
      return true;
    }
    if (currentPage === pagesCount && (page === "next" || page === "last")) {
      return true;
    }

    return false;
  }

  render() {
    const { wallet, fundWallet } = this.props;
    const { walletHistory, currentPage, pagesCount } = this.state;
    return (
      <div className="wallet-dashboard">
        <div className="container container-lg">
          <div className="panel">
            <div className="wallet-dashboard-balance">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4>My Wallet</h4>
                </div>
                <div className="panel-body">
                  <h2 className="wallet-dashboard-balance__amount">
                    ₦{roundToTwo(wallet.balance)}
                  </h2>
                </div>
              </div>
            </div>

            <div className="wallet-dashboard-intro">
              <WalletAction
                actionType="fund"
                headerTitle="Fund wallet"
                buttonText="Fund Wallet"
                formHandler={fundWallet}
                wallet={wallet}
              />

            </div>
          </div>
          <WalletHistory walletHistory={walletHistory} />
          {pagesCount > 1 &&
            <div className="pagination">
              <ul className="pagination-links">
                {
                  this.state.pages.map((page) => (
                    <li className={`pagination-link ${page}`}>
                      <button
                        onClick={() => this.fetchWalletHistory(page)}
                        disabled={this.buttonDisabled(page)}
                      >{page}</button>
                    </li>
                  ))
                }
              </ul>
              <p>Page: {currentPage}</p>
            </div>
          }
        </div>
      </div>
    );
  }
}

WalletDashboard.propTypes = {
  fetchWalletHistory: PropTypes.func.isRequired,
  fundWallet: PropTypes.func.isRequired,
  pagesCount: PropTypes.number.isRequired,
  wallet: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    ownerEmail: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired,
  walletHistory: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    transactionType: PropTypes.oneOf(["credit", "debit"]).isRequired,
    walletId: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired).isRequired
};
export default WalletDashboard;
