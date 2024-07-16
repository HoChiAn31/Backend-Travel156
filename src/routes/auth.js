const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");

router.post("/", auth.login);

router.post("/sendOtp", auth.sendOtp);

router.post("/verifyOtp", auth.verifyOtp);

module.exports = router;
