const express = require("express");
const router = express.Router();

const createKalender = require("../controllers/kalender/create");
const readKalender = require("../controllers/kalender/read");
const updateKalender = require("../controllers/kalender/update");

router.post("/kalender", createKalender);
router.get("/kalender", readKalender);
router.put("/kalender/:id_kalender", updateKalender);

module.exports = router;