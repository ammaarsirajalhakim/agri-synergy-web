const express = require("express");
const router = express.Router();
const passport = require("passport");

const readSawah = require("../controllers/sawah/read");
const createSawah = require("../controllers/sawah/create");
const updateSawah = require("../controllers/sawah/update");
const deleteSawah = require("../controllers/sawah/delete");

// router.get("/sawah", passport.authenticate('jwt', { session: false }), readSawah);
// router.post("/sawah", passport.authenticate('jwt', { session: false }), createSawah);
// router.put("/sawah/:id_sawah", passport.authenticate('jwt', { session: false }), updateSawah);
// router.delete("/sawah/:id_sawah", passport.authenticate('jwt', { session: false }), deleteSawah);

router.get("/sawah", readSawah);
router.post("/sawah", createSawah);
router.put("/sawah/:id_sawah", updateSawah);
router.delete("/sawah/:id_sawah", deleteSawah);

module.exports = router;