const express = require("express");
const router = express.Router();

const readProduk = require("../controllers/produk/read");
const createProduk = require("../controllers/produk/create");
const updateProduk = require("../controllers/produk/update");
const deleteProduk = require("../controllers/produk/delete");

router.get("/produk", readProduk);
router.post("/produk", createProduk);
router.put("/produk/:id_produk", updateProduk);
router.delete("/produk/:id_produk", deleteProduk);

module.exports = router;