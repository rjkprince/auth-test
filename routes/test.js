const express = require("express");
const router = express.Router();

const test_controller = require("../controllers/test");
const {
  adminOnly,
  authenticate,
  usersOnly,
  allUsers,
} = require("../middlewares/auth");

// a simple test url to check that all of our files are communicating correctly.
router.get("/adminOnly", adminOnly, authenticate, test_controller.adminOnly);
router.get("/usersOnly", usersOnly, authenticate, test_controller.userOnly);
router.get("/allUsers", allUsers, authenticate, test_controller.allUsers);
router.get("/openApi", test_controller.openApi);

module.exports = router;
