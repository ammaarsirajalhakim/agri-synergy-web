import React, { useState } from "react";
import Header from "./Header"; // Import Header
import Footer from "./footer"; // Import Footer
import PaymentModal from "./PaymentModal"; // Import PaymentModal
import "../css/Checkout.css";

const Checkout = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleCheckout = () => {
    setShowPaymentModal(true); // Buka modal payment
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false); // Tutup modal payment
  };

  return (
    <div className="checkout-page">
      <Header /> {/* Tambahkan Header di sini */}

      <div className="checkout-container">
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
                  {/* Tambahkan pilihan provinsi di sini */}
                </select>
              </div>
              <div className="form-group">
                <label>City</label>
                <select>
                  <option>Select...</option>
                  {/* Tambahkan pilihan kota di sini */}
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
        
        <div className="order-summary-section">
          <h2 className="order-title">Order Summary</h2>
          <div className="order-item">
            <img src="https://via.placeholder.com/60" alt="Product" />
            <div>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
              <p>1 x Rp 150.000</p>
            </div>
          </div>
          <div className="order-item">
            <img src="https://via.placeholder.com/60" alt="Product" />
            <div>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
              <p>1 x Rp 150.000</p>
            </div>
          </div>
          <div className="summary-details">
            <p>Sub-total <span>Rp 300.000</span></p>
            <p>Shipping <span>Free</span></p>
            <p>Discount <span>0</span></p>
            <p>Tax <span>Rp 1.000</span></p>
            <p className="total">Total <span>Rp 301.000</span></p>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>CHECKOUT →</button>
        </div>
      </div>

      {showPaymentModal && <PaymentModal onClose={handleCloseModal} />} {/* Tampilkan Modal jika diperlukan */}

      <Footer /> {/* Tambahkan Footer di sini */}
    </div>
  );
};

export default Checkout;
