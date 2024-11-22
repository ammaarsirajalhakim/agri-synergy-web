const { db } = require("../../database/db");

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
  updateSuccess: (message) => ({
    success: true,
    code: 200,
    message,
    data: null,
    timestamp: getFormattedTimestamp(),
    errors: null,
  }),

  updateError: (code, message, errors = null) => ({
    success: false,
    code,
    message,
    data: null,
    timestamp: getFormattedTimestamp(),
    errors,
  }),
};

const UPDATABLE_FIELDS = ["id_user", "jenis", "judul", "tanggal", "deskripsi"];

const validateFields = {
  validateUpdateData: async (req) => {
    const data = {};

    UPDATABLE_FIELDS.forEach((field) => {
      if (req.body[field]) {
        data[field] = req.body[field];
      }
    });

    return {
      isValid: true,
      data,
    };
  },
};

const updateKalender = async (db, kalenderId, updateData) => {
  const [rows] = await db
    .promise()
    .query("UPDATE kalender SET ? WHERE id_kalender = ?", [
      updateData,
      kalenderId,
    ]);

  return rows.affectedRows;
};

module.exports = async (req, res) => {
  try {
    const validation = await validateFields.validateUpdateData(req);

    if (!validation.isValid) {
      return res.status(validation.error.code).json(validation.error);
    }

    const affectedRows = await updateKalender(
      req.db,
      req.params.id_kalender,
      validation.data
    );

    if (affectedRows > 0) {
      return res
        .status(200)
        .json(RESPONSE.updateSuccess("Data kalender berhasil diupdate"));
    } else {
      return res
      .status(404)
      .json(RESPONSE.updateError(404, "Kalender tidak ditemukan"));
    }
  } catch (err) {
    console.log(err);
    const errorResponse = RESPONSE.updateError(
      500,
      "Terjadi kesalahan pada server",
      { message: err.message, code: err.code || "INTERNAL_SERVER_ERROR" }
    );
    return res.status(errorResponse.code).json(errorResponse);
  }
};