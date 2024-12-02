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
  async deleteSawah(db, sawahId) {
    const [rows] = await db
      .promise()
      .query("DELETE FROM sawah WHERE id_sawah = ?", [sawahId]);
    return rows.affectedRows > 0;
  },
};

module.exports = async (req, res) => {
  try {
    const isDeleted = await deleteService.deleteSawah(
      req.db,
      req.params.id_sawah
    );
    if (!isDeleted) {
      return res.status(400).json(
        RESPONSE.deleteError(400, "sawah tidak ditemukan", {
          message: "ID sawah tidak ada dalam database",
          code: "SAWAH_NOT_FOUND",
        })
      );
    }

    return res
      .status(200)
      .json(RESPONSE.deleteSuccess("Data sawah berhasil dihapus"));
  } catch (err) {
    console.log(err);
    return res.status(500).json(RESPONSE.deleteError(500, error.message));
  }
};
