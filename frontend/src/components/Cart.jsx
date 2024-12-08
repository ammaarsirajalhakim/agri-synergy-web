import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from './Header'; // Sesuaikan dengan path file Header Anda
import Footer from './footer'; // Sesuaikan dengan path file Footer Anda
import '../css/Cart.css'; // Sesuaikan dengan path file CSS Anda

const Cart = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleContinueToCheckout = () => {
    navigate('/checkout'); // Arahkan ke halaman checkout
  };

  return (
    <div>
      <Header />
      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-item">
            <img src="https://via.placeholder.com/80" alt="Item 1" />
            <div className="item-details">
              <h4>Lorem ipsum dolor</h4>
              <p>Quantity: 1</p>
              <p>Rp 150.000</p>
            </div>
            <button className="remove-button">Remove</button>
          </div>
          <div className="cart-item">
            <img src="https://via.placeholder.com/80" alt="Item 2" />
            <div className="item-details">
              <h4>Lorem ipsum dolor</h4>
              <p>Quantity: 1</p>
              <p>Rp 150.000</p>
            </div>
            <button className="remove-button">Remove</button>
          </div>
        </div>
        <div className="order-summary">
          <h3>Order Summary</h3>
          <input
            type="text"
            placeholder="Enter coupon code here"
            className="coupon-input"
          />
          <div className="summary-details">
            <p>
              Coupon (-): <span>Rp 0</span>
            </p>
            <p>
              Subtotal: <span>Rp 300.000</span>
            </p>
            <p>
              Total: <span>Rp 300.000</span>
            </p>
          </div>
          <button
            className="checkout-button"
            onClick={handleContinueToCheckout} // Tambahkan handler
          >
            Continue to checkout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
