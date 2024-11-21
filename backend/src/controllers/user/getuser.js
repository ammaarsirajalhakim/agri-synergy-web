module.exports = async (req, res) => {
    try {
      const [rows] = await req.db.promise().query("SELECT * FROM user");
  
      if (rows.length === 0) {
        return res.status(200).json({
          status: "warning",
          message: "Data user tidak ada",
          data: [],
          meta: {
            total: rows.length,
          },
        });
      }
  
      res.status(200).json({
        status: "success",
        message: "Data user berhasil diambil",
        data: rows,
        meta: {
          total: rows.length,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };
  