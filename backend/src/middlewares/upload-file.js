const multer = require("multer");
const {imageUploader, ERROR_MESSAGES, RESPONSE} = require("../utils/imageValidation");

const uploadMiddleware = (req, res, next) => {
  const upload = imageUploader.single("image");

  upload(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json(RESPONSE.createError(400, ERROR_MESSAGES.FILE_TOO_LARGE));
        }
      }

      return res.status(400).json(RESPONSE.createError(400, err.message));
    }

    if (!req.file) {
      return res
        .status(400)
        .json(RESPONSE.createError(400, ERROR_MESSAGES.FILE_NOT_FOUND));
    }

    req.body.foto_produk = req.file.filename;
    next();
  });
};

module.exports = uploadMiddleware;
