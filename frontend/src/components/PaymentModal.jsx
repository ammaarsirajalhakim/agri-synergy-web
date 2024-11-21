import React from "react";
import BRIIcon from "../assets/payment/BRIVA.jpg"; // Pastikan jalur ini benar
import GoPayIcon from "../assets/payment/GOPAY.jpg"; // Tambahkan ikon GoPay jika tersedia
import ShopeePayIcon from "../assets/payment/SHOPEEPAY.png"; // Tambahkan ikon ShopeePay jika tersedia
import "../css/PaymentModal.css";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className="payment-amount">Rp 301.000</h2>
        
        <h3>Last payment method</h3>
        <div className="payment-method" onClick={() => navigate('/ordersuccses')}>
          <img src={BRIIcon} alt="BRI" className="payment-icon" />
          <p>BRI Virtual Account</p>
        </div>
        
        <h3>All payment methods</h3>
        <div className="payment-method">
          <img src={GoPayIcon} alt="GoPay" className="payment-icon" />
          GoPay
        </div>
        <div className="payment-method">
          <img src={ShopeePayIcon} alt="ShopeePay" className="payment-icon" />
          ShopeePay
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
