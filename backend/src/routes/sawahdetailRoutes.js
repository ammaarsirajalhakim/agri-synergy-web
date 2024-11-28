const express = require("express");
const router = express.Router();
const passport = require("passport");

const readSawahDetail = require("../controllers/sawahdetail/read");
const createSawahDetail = require("../controllers/sawahdetail/create");
const updateSawahDetail = require("../controllers/sawahdetail/update");
const deleteSawahDetail = require("../controllers/sawahdetail/delete");

// router.get("/sawah-detail", passport.authenticate('jwt', { session: false }), readSawahDetail);
// router.post("/sawah-detail", passport.authenticate('jwt', { session: false }), createSawahDetail);
// router.put("/sawah-detail/:id_lokasi", passport.authenticate('jwt', { session: false }), updateSawahDetail);
// router.delete("/sawah-detail/:id_lokasi", passport.authenticate('jwt', { session: false }), deleteSawahDetail);

router.get("/sawah-detail", readSawahDetail);
router.post("/sawah-detail", createSawahDetail);
router.put("/sawah-detail/:id_lokasi", updateSawahDetail);
router.delete("/sawah-detail/:id_lokasi", deleteSawahDetail);

module.exports = router;