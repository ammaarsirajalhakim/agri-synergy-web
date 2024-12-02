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
  deleteSuccess: (message) => ({
    success: true,
    code: 200,
    message,
    data: null,
    timestamp: getFormattedTimestamp(),
    errors: null,
  }),

  deleteError: (code, message, errors = null) => ({
    success: false,
    code,
    message,
    data: null,
    timestamp: getFormattedTimestamp(),
    errors,
  }),
};

const deleteService = {
  async deleteLokasi(db, LokasiId) {
    const [rows] = await db
      .promise()
      .query("DELETE FROM detail_sawah WHERE id_lokasi = ?", [LokasiId]);
    return rows.affectedRows > 0;
  },
};

module.exports = async (req, res) => {
  try {
    const isDeleted = await deleteService.deleteLokasi(
      req.db,
      req.params.id_lokasi
    );

    if (!isDeleted) {
      return res.status(400).json(
        RESPONSE.deleteError(400, "lokasi tidak ditemukan", {
          message: "ID lokasi tidak ada dalam database",
          code: "LOKASI_NOT_FOUND",
        })
      );
    }

    return res
      .status(200)
      .json(RESPONSE.deleteSuccess("Lokasi berhasil dihapus"));
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json(RESPONSE.deleteError(500, "Terjadi kesalahan pada server"));
  }
};
