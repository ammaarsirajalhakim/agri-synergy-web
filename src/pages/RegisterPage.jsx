import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import '../css/logpage.css'
import backgroundImage2 from "../assets/background_2.jpg";
import backgroundImage4 from "../assets/background_4.jpg";
import backgroundImage3 from "../assets/background_3.jpg";
import Icon from "../assets/AGRI_SYNERGY.png"
import google_icon from "../assets/google_icon.png"

const images = [backgroundImage2, backgroundImage4, backgroundImage3];

const Register = () => {
    const navigate = useNavigate()
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="login-container">
            <div className="image-container">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className={`side-image ${index === currentIndex ? 'active' : 'inactive'}`}
                        style={{ opacity: index === currentIndex ? 1 : 0 }}
                    />
                ))}
            </div>

            <div className="form-container">
                <img src={Icon} alt="Logo Agri Synergy" className="logo1" />
                <h2 className="log-h2">Bergabunglah dengan Komunitas Kami</h2>
                <p className='keterangan'>Dapatkan Dukungan, Pelajari Lebih Dalam tentang Pertanian</p>
                <button className="google-login"><img src={google_icon} alt="google_icon" /> Login with Google</button>
                <div className="or-container">
                    <div className="line"></div>
                    <p className="or-text">OR</p>
                    <div className="line"></div>
                </div>
                <p className='title_input_field'>Nama Lengkap</p>
                <input type="email" placeholder="Masukkan nama lengkap" className="input-field" />
                <p className='title_input_field'>Nomor Hp</p>
                <input type="password" placeholder="Masukkan nomor handphone" className="input-field" />
                <p className='title_input_field'>Alamat Email</p>
                <input type="email" placeholder="Masukkan alamat email" className="input-field" />
                <p className='title_input_field'>Kata Sandi</p>
                <input type="password" placeholder="Masukkan kata sandi" className="input-field" />
                <button className="submit-button">Daftar</button>
                <button className="signup-button" onClick={() => navigate('/')}> Sudah punya akun? Login disini </button>
            </div>
        </div>
    )
}

export default Register