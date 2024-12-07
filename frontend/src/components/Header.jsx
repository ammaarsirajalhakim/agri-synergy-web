import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to import axios if it's not already
import '../css/header.css';
import logo from '../assets/AGRI_SYNERGY.png';
import profile from '../assets/header/profileicon.png';
import market from '../assets/header/marketicon.png';
import notification from '../assets/header/notificationicon.png';

const Header = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [role, setRole] = useState("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  // Check if the user is authenticated and handle token validation
  const checkAuthentication = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get("http://localhost:3000/api/produk", {
        validateStatus: (status) => status < 500,
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("jwtToken");
        navigate("/");
      }

      const storedRole = localStorage.getItem("role");
      if (storedRole) {
        setRole(storedRole);
      }
    } catch (error) {
      console.error("Error validating token:", error);
      localStorage.removeItem("jwtToken");
      navigate("/");
    }
  };

  // Fetch the user's role and other necessary data
  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <div className="nav" id="navbar">
      <div className="logos">
        <img src={logo} alt="Logo" />
      </div>

      <nav>
        <ul>
          <li className="float-in"><a href="#" onClick={() => navigate('/')}>HOME</a></li>
          <li className="float-in"><a href="#" onClick={() => navigate('/market')}>MARKET</a></li>
          <li className="float-in"><a href="#" onClick={() => navigate('/konsultasi')}>KONSULTASI</a></li>
          <li className="float-in">
            <a onClick={toggleDropdown} className="explore-button">
              <span className="explore-text">EXPLORE</span>
              <span className="explore-icon">{dropdownVisible ? '▲' : '▼'}</span>
            </a>
            {dropdownVisible && (
              <div className="dropdown-menu">
                <a href="#" onClick={() => navigate('/calendar')}>KALENDER</a>
                <a href="#" onClick={() => navigate('/petalahan')}>PETA LAHAN</a>
                <a href="#" onClick={() => navigate('/community')}>FORUM KOMUNITAS</a>
                {role === "admin" && <a href="#" onClick={() => navigate("/kategori")}>Admin Page</a>}
                {role === "tengkulak" && <a href="#" onClick={() => navigate("/kategori")}>Dropshipper Page</a>}
              </div>
            )}
          </li>
        </ul>
        <div className="icon">
          <button className="hamburger" onClick={toggleMenu}>
            ☰
          </button>
          <div className={`icon-container ${isMenuOpen ? 'open' : 'closed'}`}>
            <div className="icon-wrapper" onClick={() => navigate('/checkout')}>
              <img src={market} alt="Market Icon" />
              <span className="badge">1</span>
            </div>
            <div className="icon-wrapper">
              <img src={notification} alt="Notification Icon" />
              <span className="badge">2</span>
            </div>
            <div className="icon-wrapper" onClick={() => navigate('/login')}>
              <img src={profile} alt="Profile Icon" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
