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

module.exports = async (req, res) => {
  const getSuccessResponse = (rows) => ({
    success: rows.length > 0,
    code: 200,
    message:
      rows.length > 0
        ? "Data komunitas berhasil diambil"
        : "Data komunitas tidak tersedia",
    data: rows,
    pagination: {
      total: rows.length,
      per_page: rows.length,
      current_page: 1,
      total_pages: 1,
    },
    timestamp: getFormattedTimestamp(),
    errors: null,
  });

  const getErrorResponse = (err) => ({
    success: false,
    code: 500,
    message: "Terjadi kesalahan pada server",
    data: null,
    pagination: null,
    timestamp: getFormattedTimestamp(),
    errors: {
      message: err.message,
      code: err.code || "INTERNAL_SERVER_ERROR",
    },
  });

  try {
    const [komunitas] = await req.db.promise().query("SELECT * FROM komunitas");

    const komunitasWithKomentator = await Promise.all(
      komunitas.map(async (kom) => {
        const [komentator] = await req.db.promise().query(
          `
            SELECT 
              kk.id_komentator,
              kk.id_user,
              u.nama AS nama_user,
              kk.deskripsi,
              kk.type
            FROM komentator kk
            JOIN user u ON kk.id_user = u.id_user
            WHERE kk.id_komunitas = ?
            LIMIT 3
          `,
          [kom.id_komunitas]
        );

        return {
          ...kom,
          komentator,
        };
      })
    );

    const responseData = getSuccessResponse(komunitasWithKomentator);
    return res.status(responseData.code).json(responseData);
  } catch (err) {
    console.error(err);
    const responseData = getErrorResponse(err);
    return res.status(responseData.code).json(responseData);
  }
};
