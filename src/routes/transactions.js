const express = require("express");
const router = express.Router();
const controller = require("../controllers/transactions");

router.get("/:aId/transactions", controller.getAll);
router.get("/:aId/transactions/:tId", controller.getOne);
router.post("/:aId/transactions", controller.create);
router.patch("/:aId/transactions/:tId", controller.update);
router.delete("/:aId/transactions/:tId", controller.remove);

module.exports = router;
