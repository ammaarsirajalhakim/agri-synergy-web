const express = require("express");
const router = express.Router();
const passport = require("passport");

const readKeranjang = require("../controllers/keranjang/read");
const createKeranjang = require("../controllers/keranjang/create");
const updateKeranjang = require("../controllers/keranjang/update");
const deleteKeranjang = require("../controllers/keranjang/delete");

router.get("/keranjang", passport.authenticate('jwt', { session: false }), readKeranjang);
router.post("/keranjang", passport.authenticate('jwt', { session: false }), createKeranjang);
router.put("/keranjang/:id_keranjang", passport.authenticate('jwt', { session: false }), updateKeranjang);
router.delete("/keranjang/:id_keranjang", passport.authenticate('jwt', { session: false }), deleteKeranjang);

module.exports = router;