const uuid = require("uuid/v4");
const { accounts, transactions, writeAccounts, writeTransactions } = require("../../db")
const { fillTransactions, removeTransactions } = require("../../utility");

function getAll() {
  let result = accounts().map(function(acct) {
    const transactions = fillTransactions(acct.transactions)
    return {...acct, transactions }
    // const fill = Object.assign({}, accounts()[i]);
    // fill.transactions = fillTransactions(accounts()[i].transactions);
    // return fill;
  });

  return result;
}

function getOne(id) {
  const account = accounts().find(element => element.id === id);

  if (!account)
    return { error : `An account with the id ${id} could not be found` };
  else {
    // let result = Object.assign({}, account);
    // result.transactions = fillTransactions(account.transactions);
    const transactions = fillTransactions(acct.transactions)
    return {...account, transactions }
  }
}

function create(name, description, branch) {
  const properties = ["branch", "description", "name"];
  const missing = properties.filter(property => !newAccount[property]);

  arguments
  

  if (missing.length > 0)
    return {
      error : `New account could not be created. Missing: ${missing.join(", ")}`
    };
  else {
    const update = accounts();

    const acc = {
      id:uuid(),
      transactions:[],
      branch: newAccount.branch,
      description: newAccount.description,
      name: newAccount.name
    }

    update.push(acc);
    writeAccounts(update);

    return acc;
  }
}

function update(id, updatedAccount) {
  const update = accounts();
  const account = update.find(element => element.id === id);

  if (!account)
    return { error : `An account with the id ${id} could not be found.` };
  else {
    for (let property in updatedAccount)
      account[property] = updatedAccount[property];

    let result = Object.assign({}, account);
    result.transactions = fillTransactions(account.transactions);

    writeAccounts(update);

    return result;
  }
}

function remove(id) {
  const index = accounts().findIndex(element => element.id === id);

  if (index < 0)
    return { error : `An account with the id ${id} could not be found.` };
  else {
    const update = accounts();
    const removed = update.splice(index, 1)[0];
    const removedTransactions = removed.transactions.slice(0);
    removed.transactions = removeTransactions(removedTransactions);
    writeAccounts(update);
    return removed;
  }
}

module.exports = { getAll, getOne, create, update, remove };
