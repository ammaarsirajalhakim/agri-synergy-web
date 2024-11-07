import React, { useState } from 'react';
import '../css/header.css';
import logo from '../assets/AGRI_SYNERGY.png';
import profile from '../assets/header/profileicon.png';
import market from '../assets/header/marketicon.png';
import notification from '../assets/header/notificationicon.png';

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
          <li className="float-in"><a href="#" className="">HOME</a></li>
          <li className="float-in"><a href="#" className="">MARKET</a></li>
          <li className="float-in"><a href="#" className="">KONSULTASI</a></li>
          <li className="float-in">
            <a onClick={toggleDropdown} className="explore-button">
              EXPLORE {dropdownVisible ? '▲' : '▼'}
            </a>
            {dropdownVisible && (
              <div className="dropdown-menu">
                <a href="#">KALENDER</a>
                <a href="#">PETA LAHAN</a>
                <a href="#">FORUM KOMUNITAS</a>
              </div>
            )}
          </li>
        </ul>
        <div className="icon">
          <div className="icon-wrapper">
            <img src={market} alt="Market Icon" />
            <span className="badge">1</span>
          </div>
          <div className="icon-wrapper">
            <img src={notification} alt="Notification Icon" />
            <span className="badge">2</span>
          </div>
          <div className="icon-wrapper">
            <img src={profile} alt="Profile Icon" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
