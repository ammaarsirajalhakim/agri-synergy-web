const express = require("express");
const router = express.Router();
const passport = require("passport");

const readSawah = require("../controllers/sawah/read");
const createSawah = require("../controllers/sawah/create");
const updateSawah = require("../controllers/sawah/update");
const deleteSawah = require("../controllers/sawah/delete");

router.post("/sawah", createSawah);
router.get("/sawah", readSawah);
router.put("/sawah/:id_sawah", updateSawah);
router.delete("/sawah/:id_sawah", deleteSawah);

module.exports = router;