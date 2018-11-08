const model = require("../models/accounts");

function getAll(req, res, next) {
  const data = model.getAll();

  if (data.error)
    next({ status : 404, message : "Accounts not found." });
  else
    res.status(200).send(data);
}

function getOne(req, res, next) {
  const data = model.getOne(req.params.id);

  if (data.error) {
    data.status = 404;
    next(data);
  }
  else
    res.status(200).send(data);
}

function create(req, res, next) {
  const data = model.create(req.body);

  if (data.error) {
    data.status = 400;
    next(data);
  }
  else
    res.status(201).send(data);
}

function update(req, res, next) {
  const data = model.update(req.params.id, req.body);

  if (data.error) {
    data.status = 400;
    next(data);
  }
  else
    res.status(200).send(data);
}

function remove(req, res, next) {
  const data = model.remove(req.params.id);

  if (data.error) {
    data.status = 404;
    next(data);
  }
  else {

    res.status(200).send(data);
  }
}

module.exports = { getAll, getOne, create, update, remove };
