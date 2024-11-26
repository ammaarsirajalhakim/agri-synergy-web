const express = require("express");
const router = express.Router();
const passport = require("passport");

const createKalender = require("../controllers/kalender/create");
const readKalender = require("../controllers/kalender/read");
const updateKalender = require("../controllers/kalender/update");
const deleteKalender = require("../controllers/kalender/delete");

router.get("/kalender", readKalender);
router.post("/kalender", createKalender);
router.put("/kalender/:id_kalender", updateKalender);
router.delete("/kalender/:id_kalender", deleteKalender);

module.exports = router;