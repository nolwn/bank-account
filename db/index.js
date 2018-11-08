const fs = require("fs");

// const accountsFile = fs.readFileSync("db/accounts.json", "utf-8");
const accounts = () => JSON.parse(fs.readFileSync("db/accounts.json", "utf-8"));

// const transactionsFile = fs.readFileSync("db/transactions.json", "utf-8");
const transactions = () => JSON.parse(fs.readFileSync("db/transactions.json", "utf-8"));

module.exports = { accounts,  transactions }
