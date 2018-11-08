const uuid = require("uuid/v4");
const {accounts, transactions} = require("../../db")
const { fillTransactions, removeTransactions } = require("../../utility");

function getAll() {
  let result = accounts.map(function(acct, i) {
    const fill = Object.assign({}, accounts[i]);
    fill.transactions = fillTransactions(accounts[i].transactions);
    return fill;
  });

  return result;
}

function getOne(id) {
  const account = accounts.find(element => element.id === id);

  if (!account)
    return { error : `An account with the id ${id} could not be found` };
  else {
    let result = Object.assign({}, account);
    result.transactions = fillTransactions(account.transactions);
    return result;
  }
}

function create(newAccount) {
  const properties = ["branch", "description", "name"];
  const missing = properties.filter(property => !newAccount[property]);

  if (missing.length > 0)
    return {
      error : `New account could not be created. Missing: ${missing.join(", ")}`
    };
  else {
    newAccount.id = uuid();
    newAccount.transactions = [];
    accounts.push(newAccount);
    return newAccount;
  }
}

function update(id, updatedAccount) {
  const account = accounts.find(element => element.id === id);

  if (!account)
    return { error : `An account with the id ${id} could not be found.` };
  else {
    for (let property in updatedAccount)
      account[property] = updatedAccount[property];

    let result = Object.assign({}, account);
    result.transactions = fillTransactions(account.transactions);

    return result;
  }
}

function remove(id) {
  const index = accounts.findIndex(element => element.id === id);

  if (index < 0)
    return { error : `An account with the id ${id} could not be found.` };
  else {
    const removed = accounts.splice(index, 1)[0];
    const removedTransactions = removed.transactions.slice(0);
    removed.transactions = removeTransactions(removedTransactions);
    return removed;
  }
}

module.exports = { getAll, getOne, create, update, remove };
