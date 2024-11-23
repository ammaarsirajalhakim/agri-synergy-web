const express = require("express");
const router = express.Router();
const passport = require("passport");

const createKalender = require("../controllers/kalender/create");
const readKalender = require("../controllers/kalender/read");
const updateKalender = require("../controllers/kalender/update");
const deleteKalender = require("../controllers/kalender/delete");

router.get("/kalender", passport.authenticate('jwt', { session: false }), readKalender);
router.post("/kalender", passport.authenticate('jwt', { session: false }), createKalender);
router.put("/kalender/:id_kalender", passport.authenticate('jwt', { session: false }), updateKalender);
router.delete("/kalender/:id_kalender", passport.authenticate('jwt', { session: false }), deleteKalender);

module.exports = router;