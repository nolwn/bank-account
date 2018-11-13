const model = require("../models/transactions");

function getAll(req, res, next) {
  const data = model.getAll(req.params.aId);

  if (data.error) {
    // data.status = 404;
    next({...data, status:404});
  }
  else
    res.status(200).send(data);
}

function getOne(req, res, next) {
  const data = model.getOne(req.params.aId, req.params.tId);

  if (data.error) {
    data.status = 404;
    next(data);
  }
  else
    res.status(200).send(data);
}

function create(req, res, next) {
  const data = model.create(req.params.aId, req.body);

  if (data.error) {
    data.status = 400;
    next(data);
  }
  else
    res.status(201).send(data);
}

function update(req, res, next) {
  const data = model.update(req.params.aId, req.params.tId, req.body);

  if (data.error) {
    data.status = 400;
    next(data);
  }
  else
    res.status(200).send(data);
}

function remove(req, res, next) {
  const data = model.remove(req.params.aId, req.params.tId);

  if (data.error) {
    data.status = 404;
    next(data);
  }
  else {

    res.status(200).send(data);
  }
}

module.exports = { getAll, getOne, create, update, remove };
