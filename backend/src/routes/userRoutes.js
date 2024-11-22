const express = require("express");
const router = express.Router();
const readUser = require("../controllers/user/read");
const createUser = require("../controllers/user/create");
const updateUser = require("../controllers/user/update");
const deleleteUser = require("../controllers/user/delete");

router.get("/users", readUser);
router.post("/users", createUser);
router.put("/users/:id_user", updateUser);
router.delete("/users/:id_user", deleleteUser);

module.exports = router;
