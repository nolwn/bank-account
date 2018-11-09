# Bank accounts

An API that tracks bank accounts at an imaginary bank.

## Installation

1. Download or clone this repo
2. Run `npm install`.
3. Run `npm run start` to start the server.

## Usage

Use http requests to access and manipulate information on the server.

### Reading
* `GET /accounts` returns all accounts with their transactions.
* `GET /accounts/<account-id>/transactions`, where `<account-id>` is the id of a particular account, returns all the transactions for a that account.
* `GET /accounts/<account-id>` returns information about the given account.
* `GET /accounts/<account-id>/transactions/<transaction-id>` returns information about a given transaction of a given account.

### Creating
* `POST /accounts` lets you send a JSON formatted body which represents the new account. Accounts must include (1) `name`, a name, (2) `branch`, a branch, and (3) `description`, a description.
* `POST /accounts/<account-id>/transactions`, where `<account-id>` is the id of a particular account, lets you send a JSON formatted body which represents a new transaction to the account you specified. Transactions must include (1) `title`, a title, (2) `amount`, an amount, (3) `pending`, a boolean representing whether or not the transaction is pending.

### Updating
* `PATCH /accounts/<account-id>` lets you send a JSON object which represents the changes you want to make to a given account.
* `PATCH /accounts/<account-id>/transactions/<transaction-id>` lets you send a JSON object which represents the changes you want to make to a given account's given transaction.

### Deleting
* `DELETE /accounts/<account-id>` deletes the given account
* `DELETE /accounts/<account-id>/transactions/<transaction-id>` deletes the given account's given transaction
