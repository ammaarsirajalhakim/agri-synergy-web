import React from 'react'
import '../css/header.css'
import logo from '../assets/AGRI_SYNERGY.png'
import profile from '../assets/header/profileicon.png'
import market from '../assets/header/marketicon.png'
import notification from '../assets/header/notificationicon.png'

const Header = () => {
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
              <li className="float-in"><a href="#" className="">EXPLORE</a></li>
            </ul>
            <div className="icon">
              <img src={market} alt="Market Icon" />
              <img src={notification} alt="Notification Icon" />
              <img src={profile} alt="Profile Icon" />
            </div>
          </nav>

        </div>
  )
}

export default Header