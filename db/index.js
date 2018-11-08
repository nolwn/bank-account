const fs = require("fs");

const accounts = () => JSON.parse(fs.readFileSync("db/accounts.json", "utf-8"));

const transactions = () =>
  JSON.parse(fs.readFileSync("db/transactions.json", "utf-8"));

const writeAccounts = (update) =>
  fs.writeFileSync("db/accounts.json", JSON.stringify(update));

const writeTransactions = (update) =>
  fs.writeFileSync("db/transactions.json", JSON.stringify(update));

module.exports = { accounts,  transactions, writeAccounts, writeTransactions }
