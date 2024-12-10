import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./footer";
import PaymentModal from "./PaymentModal";
import "../css/Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const [keranjang, setKeranjang] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Cek Autentikasi
  const checkAuthentication = async () => {
    const token = localStorage.getItem("jwtToken");
    const idUser = localStorage.getItem("id_user");
    if (!token || !idUser) {
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

      if (response.data?.token) {
        localStorage.setItem("jwtToken", response.data.token);
      }

      if (response.data?.data) {
        setKeranjang(response.data.data);
      }
    } catch (err) {
      console.error("Error validating token:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("jwtToken");
        navigate("/");
      }
    }
  };

  // Hitung Subtotal
  useEffect(() => {
    const total = keranjang.reduce(
      (sum, item) => sum + Number(item.total_harga),
      0
    );
    setSubtotal(total);
  }, [keranjang]);

  // Panggil Cek Autentikasi
  useEffect(() => {
    checkAuthentication();
  }, []);

  // Checkout dan Tutup Modal
  const handleCheckout = () => setShowPaymentModal(true);
  const handleCloseModal = () => setShowPaymentModal(false);

  return (
    <div className="checkout-page">
      <Header />

      <div className="checkout-container">
        {/* Bagian Informasi Billing */}
        <div className="billing-section">
          <h2 className="billing-title">Billing Information</h2>
          <form>
            <div className="form-row">
              <div className="form-group">
                <label>First name</label>
                <input type="text" placeholder="First name" />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input type="text" placeholder="Last name" />
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              <input type="text" placeholder="Address" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Provinsi</label>
                <select>
                  <option>Select...</option>
                  {/* Tambahkan pilihan provinsi */}
                </select>
              </div>
              <div className="form-group">
                <label>City</label>
                <select>
                  <option>Select...</option>
                  {/* Tambahkan pilihan kota */}
                </select>
              </div>
              <div className="form-group">
                <label>Zip Code</label>
                <input type="text" placeholder="Zip Code" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Email" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" placeholder="Phone Number" />
              </div>
            </div>
          </form>
        </div>

        {/* Bagian Ringkasan Pesanan */}
        <div className="order-summary-section">
          <h2 className="order-title">Order Summary</h2>
          {keranjang.length > 0 ? (
            keranjang.map((item) => (
              <div className="order-item" key={item.id_keranjang}>
                <img
                  src={`http://localhost:3000/api/fileProduk/${item.foto_produk}`}
                  alt={item.nama_produk}
                  width={80}
                />
                <div>
                  <p>{item.nama_produk}</p>
                  <p>
                    {item.total_produk} x Rp{" "}
                    {Number(item.total_harga).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Tidak ada item di keranjang</p>
          )}

          <div className="summary-details">
            <p>
              Sub-total:{" "}
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </p>
            <p>
              Shipping: <span>Free</span>
            </p>
            <p>
              Discount: <span>Rp 0</span>
            </p>
            <p>
              Tax: <span>Rp 1.000</span>
            </p>
            <p className="total">
              Total: <span>Rp {(subtotal + 1000).toLocaleString("id-ID")}</span>
            </p>
          </div>

          <button className="checkout-button" onClick={handleCheckout}>
            CHECKOUT →
          </button>
        </div>
      </div>

      {showPaymentModal && <PaymentModal onClose={handleCloseModal} />}
      <Footer />
    </div>
  );
};

export default Checkout;
