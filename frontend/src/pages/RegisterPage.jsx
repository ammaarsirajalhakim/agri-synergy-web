import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/logpage.css";
import backgroundImage2 from "../assets/background_2.jpg";
import backgroundImage4 from "../assets/background_4.jpg";
import backgroundImage3 from "../assets/background_3.jpg";
import Icon from "../assets/AGRI_SYNERGY.png";
import google_icon from "../assets/google_icon.png";

const images = [backgroundImage2, backgroundImage4, backgroundImage3];

const Register = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    nama: "",
    no_hp: "",
    alamat: "", 
    email: "",
    katasandi: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setError("");
  };

  const validateForm = () => {
    if (!formData.nama || !formData.no_hp || !formData.email || !formData.katasandi || !formData.alamat) {
      setError("Semua field harus diisi");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Format email tidak valid");
      return false;
    }

    const phoneRegex = /^[0-9]{10,13}$/;
    if (!phoneRegex.test(formData.no_hp)) {
      setError("Nomor handphone harus 10-13 digit");
      return false;
    }

    if (formData.katasandi.length < 8) {
      setError("Kata sandi minimal 8 karakter");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users",
        formData
      );

      if (response.data.success) {
        alert("Registrasi berhasil!");
        navigate("/login");
      } else {
        setError(response.data.message || "Terjadi kesalahan saat mendaftar");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Terjadi kesalahan pada server";
      setError(errorMessage);
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="image-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`side-image ${
              index === currentIndex ? "active" : "inactive"
            }`}
            style={{ opacity: index === currentIndex ? 1 : 0 }}
          />
        ))}
      </div>

      <div className="form-container">
        <img src={Icon} alt="Logo Agri Synergy" className="logo1" />
        <h2 className="log-h2">Bergabunglah dengan Komunitas Kami</h2>
        <p className="keterangan">
          Dapatkan Dukungan, Pelajari Lebih Dalam tentang Pertanian
        </p>
        <button type="button" className="google-login">
          <img src={google_icon} alt="google_icon" /> Login with Google
        </button>
        <div className="or-container">
          <div className="line"></div>
          <p className="or-text">OR</p>
          <div className="line"></div>
        </div>

        {error && (
          <div className="error-message text-red-500 text-sm mt-2">{error}</div>
        )}

        <p className="title_input_field">Nama Lengkap</p>
        <input
          type="text"
          name="nama"
          placeholder="Masukkan nama lengkap"
          className="input-field"
          value={formData.nama}
          onChange={handleInputChange}
        />

        <p className="title_input_field">Nomor Hp</p>
        <input
          type="text"
          name="no_hp"
          placeholder="Masukkan nomor handphone"
          className="input-field"
          value={formData.no_hp}
          onChange={handleInputChange}
        />

        <p className="title_input_field">Alamat</p>
        <input
          type="text"
          name="alamat"
          placeholder="Masukkan alamat lengkap"
          className="input-field"
          value={formData.alamat}
          onChange={handleInputChange}
        />

        <p className="title_input_field">Alamat Email</p>
        <input
          type="email"
          name="email"
          placeholder="Masukkan alamat email"
          className="input-field"
          value={formData.email}
          onChange={handleInputChange}
        />

        <p className="title_input_field">Kata Sandi</p>
        <input
          type="password"
          name="katasandi"
          placeholder="Masukkan kata sandi"
          className="input-field"
          value={formData.katasandi}
          onChange={handleInputChange}
        />

        <button 
          type="button" 
          className="submit-button" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Mendaftar..." : "Daftar"}
        </button>

        <button 
          type="button"
          className="signup-button" 
          onClick={() => navigate("/login")}
        >
          Sudah punya akun? Login disini
        </button>
      </div>
    </div>
  );
};

export default Register;