const fs = require("fs");

const accountsFile = fs.readFileSync("db/accounts.json", "utf-8");
const accounts = JSON.parse(accountsFile);

const transactionsFile = fs.readFileSync("db/transactions.json", "utf-8");
const transactions = JSON.parse(transactionsFile);

module.exports = { accounts,  transactions }
