const bcrypt = require("bcrypt");
const {
  validasiEmail,
  validasiKatasandi,
  validasiHandphone,
} = require("../../utils/validation");

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

const validateFields = {
  validateUpdateData: async (req, db) => {
    const { email, katasandi, no_hp } = req.body;
    const userId = req.params.id_user;

    const validations = [
      {
        condition: email && !validasiEmail(email),
        errorMessage: "Email tidak valid",
      },
      {
        condition: katasandi && !validasiKatasandi(katasandi),
        errorMessage: "Kata sandi tidak valid",
      },
      {
        condition: no_hp && !validasiHandphone(no_hp),
        errorMessage: "Nomor handphone tidak valid",
      },
    ];

    for (const validation of validations) {
      if (validation.condition) {
        return {
          isValid: false,
          error: RESPONSE.updateError(400, validation.errorMessage),
        };
      }
    }

    const [currentUser] = await db
      .promise()
      .query("SELECT email, no_hp FROM user WHERE id_user = ?", [userId]);

    if (currentUser.length === 0) {
      return {
        isValid: false,
        error: RESPONSE.updateError(404, "User tidak ditemukan"),
      };
    }

    if (email && email !== currentUser[0].email) {
      const [emailExists] = await db
        .promise()
        .query("SELECT 1 FROM user WHERE email = ?", [email]);
      if (emailExists.length > 0) {
        return {
          isValid: false,
          error: RESPONSE.updateError(400, "Email sudah digunakan"),
        };
      }
    }

    if (no_hp && no_hp !== currentUser[0].no_hp) {
      const [phoneExists] = await db
        .promise()
        .query("SELECT 1 FROM user WHERE no_hp = ?", [no_hp]);
      if (phoneExists.length > 0) {
        return {
          isValid: false,
          error: RESPONSE.updateError(400, "Nomor handphone sudah digunakan"),
        };
      }
    }

    if (katasandi) {
      req.body.katasandi = await bcrypt.hash(katasandi, 10);
    }

    return {
      isValid: true,
      data: req.body,
    };
  },
};

module.exports = async (req, res) => {
  try {
    const validation = await validateFields.validateUpdateData(req, req.db);

    if (!validation.isValid) {
      return res.status(validation.error.code).json(validation.error);
    }

    const [rows] = await req.db
      .promise()
      .query("UPDATE user SET ? WHERE id_user = ?", [
        validation.data,
        req.params.id_user,
      ]);

    if (rows.affectedRows > 0) {
      return res
        .status(200)
        .json(RESPONSE.updateSuccess("Data user berhasil diupdate"));
    }
    return res
      .status(400)
      .json(RESPONSE.updateError(400, "User tidak ditemukan"));
      
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
