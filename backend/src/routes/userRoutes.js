const express = require("express");
const router = express.Router();
const getuser = require("../controllers/user/getuser");

router.get("/users", getuser);

module.exports = router;
