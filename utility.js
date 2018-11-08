const {accounts, transactions} = require("./db");

function fillTransactions(acctTransactions) {
  return acctTransactions.map(acctTransaction =>
    transactions().find(transaction =>
      acctTransaction === transaction.id));
}

function removeTransactions(acctTransactions) {
  const removed = [];
  for (let i = transactions().length - 1; i >= 0; i--) {
    let match = acctTransactions.find(acctTrans => transactions()[i].id === acctTrans);
    if (match) removed.push(transactions().splice(i, 1));
  }
  return removed;
}

module.exports = { fillTransactions, removeTransactions };
