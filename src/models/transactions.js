const uuid = require("uuid/v4");
const {accounts, transactions} = require("../../db")
const { fillTransactions, removeTransactions } = require("../../utility");

function getAll(aId) {
  const account = accounts.find(acct => acct.id === aId);

  if (!account)
    return { error : `An account with the id ${aId} could not be found` };
  else {
    const transIds = account.transactions;
    const result = fillTransactions(transIds);
    return result;
  }
}

function getOne(aId, tId) {
  const account = accounts.find(acct => acct.id === aId);

  if (!account)
    return { error : `An account with the id ${aId} could not be found` };
  else if (!account.transactions.includes(tId)) {
    return { error : `The account you are searching does not contain a ` +
       `transaction with the id ${tId}` };
  } else {
    const result = transactions.find(trans => trans.id === tId);
    return result;
  }
}

function create(aId, newTransaction) {
  const parameters = ["amount", "pending", "title"];
  const account = accounts.find(acct => acct.id === aId);
  const missing = parameters.filter(property => !newTransaction[property]);

  if (!account)
    return { error : `An account with the id ${aId} could not be found` };
  else if (missing.length > 0)
    return {
      error : `New transaction could not be created. Missing:` +
        ` ${missing.join(", ")}`
    };
  else if (newTransaction.title.length > 8) {
    return { error : `The transaction could not be created because the title `
       + `"${newTransaction.title}" is too long.` };
  }
  else {
    newTransaction.id = uuid();
    transactions.push(newTransaction);
    account.transactions.push(newTransaction.id);
    return newTransaction;
  }
}

function update(aId, tId, updatedTransaction) {
  const account = accounts.find(acct => acct.id === aId);
  const transaction = transactions.find(trans => trans.id === tId);

  if (!account)
    return { error : `An account with the id ${aId} could not be found.` };
  else if (!account.transactions.includes(tId))
    return { error : `The account you are searching for does not contain a ` +
       `transaction with the id ${tId}` };
  else if (updatedTransaction.title && updatedTransaction.title.length > 8)
    return { error : `The transaction could not be updated because the title ` +
      `"${newTransaction.title}" is too long.` };
  else {
    for (let property in updatedTransaction)
      transaction[property] = updatedTransaction[property];

    return transaction;
  }
}

function remove(aId, tId) {
  const account = accounts.find(acct => acct.id === aId);
  const index = transactions.findIndex(trans => trans.id === tId);

  if (!account)
    return { error : `An account with the id ${aId} could not be found.` };
  else if (!account.transactions.includes(tId))
    return { error : `The account you are searching for does not contain a ` +
       `transaction with the id ${tId}` };
  else {
    const acctIndex = account.transactions.indexOf(tId);
    const result = transactions.splice(index, 1);
    account.transactions.splice(acctIndex, 1);
    return result;
  }
}

module.exports = { getAll, getOne, create, update, remove };
