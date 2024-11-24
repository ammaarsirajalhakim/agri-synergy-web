const multer = require("multer");
const path = require("path");
const fs = require("fs");

const FILE_TYPES = {
  ALLOWED_MIMETYPES: ["image/png", "image/jpeg", "image/jpg"],
  MAX_SIZE: 2 * 1024 * 1024,
  UPLOAD_PATH: path.join(__dirname, "../../files/produk"),
};

const ERROR_MESSAGES = {
  INVALID_FORMAT: "Format file tidak sesuai",
  FILE_TOO_LARGE: "Ukuran file maksimal 2MB!",
  FILE_NOT_FOUND: "File tidak ditemukan!",
};

const getFormattedTimestamp = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

const RESPONSE = {
  createSuccess: (data, message) => ({
    success: true,
    code: 200,
    message,
    data,
    pagination: {
      total: data ? data.length : 0,
      per_page: data ? data.length : 0,
      current_page: 1,
      total_pages: 1,
    },
    timestamp: getFormattedTimestamp(),
    errors: null,
  }),

  createError: (code, message, errors = null) => ({
    success: false,
    code,
    message,
    data: null,
    pagination: null,
    timestamp: getFormattedTimestamp(),
    errors,
  }),
};

if (!fs.existsSync(FILE_TYPES.UPLOAD_PATH)) {
  fs.mkdirSync(FILE_TYPES.UPLOAD_PATH, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_TYPES.UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName); 
  },
});

const fileFilter = (req, file, cb) => {
  if (!FILE_TYPES.ALLOWED_MIMETYPES.includes(file.mimetype)) {
    return cb(new Error(ERROR_MESSAGES.INVALID_FORMAT), false);
  }
  cb(null, true);
};

const imageUploader = multer({
  storage: storage,
  limits: {
    fileSize: FILE_TYPES.MAX_SIZE,
  },
  fileFilter: fileFilter,
});

module.exports = {
  imageUploader,
  FILE_TYPES,
  ERROR_MESSAGES,
  RESPONSE,
};
