const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user");

router.post("/create", user_controller.user_create);
router.post("/login", user_controller.login);

module.exports = router;
