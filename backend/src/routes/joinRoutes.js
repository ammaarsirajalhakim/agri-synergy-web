const express = require("express");
const router = express.Router();
const readJoin = require("../controllers/tableJoin");

router.get("/produk-detail", readJoin);

module.exports = router;
