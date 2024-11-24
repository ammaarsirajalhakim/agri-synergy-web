const express = require("express");
const router = express.Router();
const passport = require("passport");
const { uploadMiddleware, staticFileMiddleware, validateStaticFile } = require("../middlewares/upload-file");

const readProduk = require("../controllers/produk/read");
const createProduk = require("../controllers/produk/create");
const updateProduk = require("../controllers/produk/update");
const deleteProduk = require("../controllers/produk/delete");

router.use("/file", validateStaticFile, staticFileMiddleware);

router.use('/file/*', (req, res) => {
  res.status(404).json({
    success: false,
    code: 404,
    message: "File tidak ditemukan",
    data: null,
    timestamp: new Date().toLocaleString("en-US", {
      timeZone: "Asia/Jakarta"
    }),
    errors: null
  });
});

router.get("/produk", passport.authenticate('jwt', { session: false }), readProduk);
router.post("/produk", passport.authenticate('jwt', { session: false }), uploadMiddleware, createProduk);
router.put("/produk/:id_produk", passport.authenticate('jwt', { session: false }), uploadMiddleware, updateProduk);
router.delete("/produk/:id_produk", passport.authenticate('jwt', { session: false }), deleteProduk);


module.exports = router;