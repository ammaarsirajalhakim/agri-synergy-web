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
  
  const UPDATABLE_FIELDS = ["id_user", "deskripsi", "gambar"];
  
  const validateFields = {
    validateUpdateData: async (req) => {
      const data = {};
      const emptyFields = [];
  
      for (const field of UPDATABLE_FIELDS) {
        if (field === "gambar") {
  
          if (req.file) {
  
            data.gambar = req.file.filename;
          } else if (req.body.gambar === null) {
  
            data.gambar = null;
          } else {
            const [rows] = await req.db
              .promise()
              .query("SELECT gambar FROM komunitas WHERE id_komunitas = ?", [
                req.params.id,
              ]);
  
            if (rows[0].gambar === null) {
              continue;
            }
  
            if (rows[0].gambar !== null) {
              continue;
            }
          }
          continue;
        }
  
        if (req.body[field] !== undefined && req.body[field] !== null) {
          if (
            typeof req.body[field] === "string" &&
            req.body[field].trim() === ""
          ) {
            emptyFields.push(field);
          } else {
            data[field] = req.body[field];
          }
        }
      }
  
      if (emptyFields.length > 0) {
        return {
          isValid: false,
          error: {
            code: 400,
            message: `Field ${emptyFields.join(", ")} kosong!`,
          },
        };
      }
  
      return {
        isValid: true,
        data,
      };
    },
  };
  
  const updateKomunitas = async (db, komunitasId, updateData) => {
    const [rows] = await db
      .promise()
      .query("UPDATE komunitas SET ? WHERE id_komunitas = ?", [
        updateData,
        komunitasId,
      ]);
  
    return rows.affectedRows;
  }
  
  module.exports = async (req, res) => {
    try {
      const validation = await validateFields.validateUpdateData(req);
  
      if (!validation.isValid) {
        return res
          .status(validation.error.code)
          .json(
            RESPONSE.updateError(validation.error.code, validation.error.message)
          );
      }
  
      if (Object.keys(validation.data).length === 0) {
        return res
          .status(400)
          .json(RESPONSE.updateError(400, "Tidak ada data yang diupdate"));
      }
  
      const affectedRows = await updateKomunitas(
        req.db,
        req.params.id_komunitas,
        validation.data
      );
  
      if (affectedRows > 0) {
        return res
          .status(200)
          .json(RESPONSE.updateSuccess("Data komunitas berhasil diupdate"));
      } else {
        return res
          .status(400)
          .json(RESPONSE.updateError(400, "komunitas tidak ditemukan"));
      }
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json(RESPONSE.updateError(500, "Terjadi kesalahan pada server"));
    }
  };
  