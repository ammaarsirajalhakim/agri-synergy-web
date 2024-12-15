const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  uploadMiddleware,
  staticFileMiddleware,
  validateStaticFile,
} = require("../middlewares/upload-fileKomunitas");

const createKomunitas = require("../controllers/komunitas/create");
const readKomunitas = require("../controllers/komunitas/read");

router.use("/fileKomunitas", validateStaticFile, staticFileMiddleware);

router.use("/fileKomunitas/*", (req, res) => {
  res.status(400).json({
    success: false,
    code: 400,
    message: "File tidak ditemukan",
    data: null,
    timestamp: new Date().toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    }),
    errors: null,
  });
});

// router.post("/komunitas", passport.authenticate('jwt', { session: false }), createKomunitas);
// router.get("/komunitas", passport.authenticate("jwt", { session: false }), readKomunitas);

router.post("/komunitas", uploadMiddleware, createKomunitas);
router.get("/komunitas", readKomunitas);


module.exports = router;
