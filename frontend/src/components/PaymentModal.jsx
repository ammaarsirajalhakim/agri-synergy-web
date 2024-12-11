import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BRIIcon from "../assets/payment/BRIVA.jpg";
import GoPayIcon from "../assets/payment/GOPAY.jpg";
import ShopeePayIcon from "../assets/payment/SHOPEEPAY.png";
import "../css/PaymentModal.css";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ onClose, totalAmount, updateUser, keranjang }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const idUser = localStorage.getItem("id_user");

  const handlePaymentMethodSelect = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    updateUser();

    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("jwtToken")}`;

      const tanggalMemesan = new Date().toISOString().split("T")[0];

      for (const item of keranjang) {
        const response = await axios.post(
          "http://localhost:3000/api/pemesanan",
          {
            id_user: idUser,
            id_produk: item.id_produk,
            kuantitas: item.total_produk,
            total_harga: totalAmount,
            tgl_memesan: tanggalMemesan,
            status: "pending",
          }
        );

        if (response.status === 200) {
          const result = await Swal.fire({
            icon: "success",
            title: "Success",
            text: "Pemesanan berhasil!",
            confirmButtonText: "Lihat Order",
            cancelButtonText: "Kembali ke Home",
            showCancelButton: true,
          });

          if (result.isConfirmed) {
            navigate("/orderhistory");
          } else {
            navigate("/");
          }
          break;
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2 className="payment-amount">{`Rp ${totalAmount.toLocaleString(
          "id-ID"
        )}. -`}</h2>

        <h3>Last payment method</h3>
        <div
          className="payment-method"
          onClick={() => handlePaymentMethodSelect("BRI")}
        >
          <img src={BRIIcon} alt="BRI" className="payment-icon" />
          <p>BRI Virtual Account</p>
        </div>

        <h3>All payment methods</h3>
        <div
          className="payment-method"
          onClick={() => handlePaymentMethodSelect("GoPay")}
        >
          <img src={GoPayIcon} alt="GoPay" className="payment-icon" />
          GoPay
        </div>
        <div
          className="payment-method"
          onClick={() => handlePaymentMethodSelect("ShopeePay")}
        >
          <img src={ShopeePayIcon} alt="ShopeePay" className="payment-icon" />
          ShopeePay
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
