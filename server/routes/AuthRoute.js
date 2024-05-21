const express = require("express");
const container = require("../controllers/AuthController");
const router = express.Router();

router.post("/signup", container.Register);
router.post("/login", container.Login);
router.get("/logout/:id", container.Logout);

module.exports = router;
