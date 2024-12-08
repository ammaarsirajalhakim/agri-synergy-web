import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/header.css";
import logo from "../assets/AGRI_SYNERGY.png";
import profile from "../assets/header/profileicon.png";
import market from "../assets/header/marketicon.png";
import notification from "../assets/header/notificationicon.png";

const Header = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [role, setRole] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const fetchCartItems = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get("http://localhost:3000/api/keranjang", {
        validateStatus: (status) => status < 500,
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("jwtToken");
        navigate("/");
        return;
      }

      const storedRole = localStorage.getItem("role");
      if (storedRole) {
        setRole(storedRole);
      }

      setCartItemCount(response.data.data.length);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      localStorage.removeItem("jwtToken");
      navigate("/");
      setCartItemCount(0);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="nav" id="navbar">
      <div className="logos">
        <img src={logo} alt="Logo" />
      </div>

      <nav>
        <ul>
          <li className="float-in">
            <a href="#" onClick={() => navigate("/")}>
              HOME
            </a>
          </li>
          <li className="float-in">
            <a href="#" onClick={() => navigate("/market")}>
              MARKET
            </a>
          </li>
          <li className="float-in">
            <a href="#" onClick={() => navigate("/konsultasi")}>
              KONSULTASI
            </a>
          </li>
          <li className="float-in">
            <a onClick={toggleDropdown} className="explore-button">
              <span className="explore-text">EXPLORE</span>
              <span className="explore-icon">
                {dropdownVisible ? "▲" : "▼"}
              </span>
            </a>
            {dropdownVisible && (
              <div className="dropdown-menu">
                <a href="#" onClick={() => navigate("/calendar")}>
                  KALENDER
                </a>
                <a href="#" onClick={() => navigate("/petalahan")}>
                  PETA LAHAN
                </a>
                <a href="#" onClick={() => navigate("/community")}>
                  FORUM KOMUNITAS
                </a>
                {(role === "admin" || role === "petani") && (
                  <a href="#" onClick={() => navigate("/kategori")}>
                    {role === "admin" ? "Admin Page" : "Dropshipper Page"}
                  </a>
                )}
              </div>
            )}
          </li>
        </ul>
        <div className="icon">
          <button className="hamburger" onClick={toggleMenu}>
            ☰
          </button>
          <div className={`icon-container ${isMenuOpen ? "open" : "closed"}`}>
            <div className="icon-wrapper" onClick={() => navigate("/cart")}>
              <img src={market} alt="Market Icon" />
              {cartItemCount > 0 && (
                <span className="badge">{cartItemCount}</span>
              )}
            </div>
            <div className="icon-wrapper">
              <img src={notification} alt="Notification Icon" />
              {/* <span className="badge">2</span> */}
            </div>
            <div className="icon-wrapper" onClick={() => navigate("/login")}>
              <img src={profile} alt="Profile Icon" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
