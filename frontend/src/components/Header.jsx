import React, { useState } from 'react';
import '../css/header.css';
import logo from '../assets/AGRI_SYNERGY.png';
import profile from '../assets/header/profileicon.png';
import market from '../assets/header/marketicon.png';
import notification from '../assets/header/notificationicon.png';
import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="nav" id="navbar">
      <div className="logos">
        <img src={logo} alt="Logo" />
      </div>

      <nav>
        <ul>
          <li className="float-in"><a href="#" className="" onClick={() => navigate('/')}>HOME</a></li>
          <li className="float-in"><a href="#" className="" onClick={() => navigate('/market')}>MARKET</a></li>
          <li className="float-in"><a href="#" className="" onClick={() => navigate('/konsultasi')}>KONSULTASI</a></li>
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
              </div>
            )}
          </li>
        </ul>
        <div className="icon">
          <button className="hamburger" onClick={toggleMenu}>
            ☰
          </button>
          <div className={`icon-container ${isMenuOpen ? 'open' : 'closed'}`}>
            <div className="icon-wrapper" onClick={()=> navigate('/checkout')}>
              <img src={market} alt="Market Icon" />
              <span className="badge">1</span>
            </div>
            <div className="icon-wrapper">
              <img src={notification} alt="Notification Icon" />
              <span className="badge">2</span>
            </div>
            <div className="icon-wrapper" onClick={()=> navigate('/login')}>
              <img src={profile} alt="Profile Icon" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
