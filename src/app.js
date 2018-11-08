const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const accounts = require("./routes/accounts");
const transactions = require("./routes/transactions");

app.disable("x-powered-by");
app.use(bodyParser.json());
app.use("/accounts", accounts);
app.use("/accounts/", transactions);

app.use((req, res, next) => {
  next({status : 404, message : "Path not found."});
});

app.use((err, req, res, next) => {
  const error = {};

  error.status = err.status || 500;
  error.error = err.error || "Internal server error.";
  error.stack = err.stack || undefined;

  res.status(error.status).send(error);
});

function listener() {
  console.log(`Listening on port ${port}`);
}

app.listen(port, listener);
