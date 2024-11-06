import React from 'react';
import { FaUser, FaShoppingCart, FaTruck, FaSignOutAlt } from 'react-icons/fa';
import '../css/SidebarProfile.css'

function Sidebar({ setActivePage }) {
  return (
    <div className="sidebar-container">
      <div className="sidebar-option sidebar-profile" onClick={() => setActivePage('profile')}>
        <FaUser className="sidebar-icon icon-profile" />
        <span>Profile</span>
      </div>
      <div className="sidebar-option sidebar-order-history" onClick={() => setActivePage('orderHistory')}>
        <FaShoppingCart className="sidebar-icon icon-order-history" />
        <span>Riwayat Pembelian</span>
      </div>
      <div className="sidebar-option sidebar-dropshipper" onClick={() => setActivePage('dropshipper')}>
        <FaTruck className="sidebar-icon icon-dropshipper" />
        <span>Dropshipper</span>
      </div>
      <div className="sidebar-option sidebar-logout" onClick={() => setActivePage('logout')}>
        <FaSignOutAlt className="sidebar-icon icon-logout" />
        <span>Logout</span>
      </div>
    </div>
  );
}

export default Sidebar;
