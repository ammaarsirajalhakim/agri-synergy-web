const express = require("express");
const router = express.Router();
const getuser = require("../controllers/user/get");
const cretaeuser = require("../controllers/user/create");
const updateuser = require("../controllers/user/update");
const deleleteuser = require("../controllers/user/delete");

router.get("/users", getuser);
router.post("/users", cretaeuser);
router.put("/users/:id_user", updateuser);
router.delete("/users/:id_user", deleleteuser);

module.exports = router;
