import PropTypes from "prop-types";

export const walletHistoryProptypes = {
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

export const walletProptypes = {
  wallet: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    ownerEmail: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired
};
