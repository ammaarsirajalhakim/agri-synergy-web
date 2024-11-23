const express = require("express");
const router = express.Router();
const passport = require("passport");

const readSawahDetail = require("../controllers/sawahdetail/read");
const createSawahDetail = require("../controllers/sawahdetail/create");
const updateSawahDetail = require("../controllers/sawahdetail/update");
const deleteSawahDetail = require("../controllers/sawahdetail/delete");

router.get("/sawah-detail", readSawahDetail);
router.post("/sawah-detail", createSawahDetail);
router.put("/sawah-detail/:id_lokasi", updateSawahDetail);
router.delete("/sawah-detail/:id_lokasi", deleteSawahDetail);

module.exports = router;