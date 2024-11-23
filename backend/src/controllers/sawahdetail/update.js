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

const UPDATABLE_FIELDS = [
  "id_sawah",
  "jenis_tanah",
  "hasil_panen",
  "produksi",
  "deskripsi",
  "latitude",
  "longitude",
];

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

const updateLokasi = async (db, lokasiId, updateData) => {
  const [rows] = await db
    .promise()
    .query("UPDATE detail_sawah SET ? WHERE id_lokasi = ?", [updateData, lokasiId]);

  return rows.affectedRows;
};

module.exports = async (req, res) => {
  try {
    const validation = await validateFields.validateUpdateData(req);

    if (!validation.isValid) {
      return res.status(validation.error.code).json(validation.error);
    }

    const affectedRows = await updateLokasi(
      req.db,
      req.params.id_lokasi,
      validation.data
    );

    if (affectedRows > 0) {
      return res
        .status(200)
        .json(RESPONSE.updateSuccess("Update lokasi berhasil"));
    } else {
      return res
        .status(404)
        .json(RESPONSE.updateError(404, "Lokasi tidak ditemukan"));
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json(RESPONSE.updateError(500, "Terjadi kesalahan pada server"));
  }
};
