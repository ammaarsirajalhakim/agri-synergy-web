const express = require("express");
const router = express.Router();
const passport = require("passport"); 

const readProduk = require("../controllers/produk/read");
const createProduk = require("../controllers/produk/create");
const updateProduk = require("../controllers/produk/update");
const deleteProduk = require("../controllers/produk/delete");

router.get("/produk", passport.authenticate('jwt', { session: false }), readProduk);
router.post("/produk", passport.authenticate('jwt', { session: false }), createProduk);
router.put("/produk/:id_produk", passport.authenticate('jwt', { session: false }), updateProduk);
router.delete("/produk/:id_produk", passport.authenticate('jwt', { session: false }), deleteProduk);

module.exports = router;