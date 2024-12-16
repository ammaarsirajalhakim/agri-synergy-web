const express = require("express");
const router = express.Router();
const passport = require("passport");

const readSend = require("../controllers/send/read");

// router.get("/send", passport.authenticate('jwt', { session: false }), readSend);

router.get("/send", readSend);

module.exports = router;