const express = require("express");
const router = express.Router({ mergeParams: true });
const controller = require("../controllers/transactions");

router.get("/transactions", controller.getAll);
router.get("/transactions/:tId", controller.getOne);
router.post("/transactions", controller.create);
router.patch("/transactions/:tId", controller.update);
router.delete("/transactions/:tId", controller.remove);

module.exports = router;
