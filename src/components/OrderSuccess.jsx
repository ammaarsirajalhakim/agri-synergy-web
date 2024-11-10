import React from 'react';
import Header from './Header';
import Footer from './footer';
import '../css/OrderSuccess.css';

const OrderSuccess = () => {
  return (
    <div className="order-success-page">
      <Header />

      <div className="order-success-container">
        <div className="order-success-content">
          <div className="order-success-icon">
            <span>&#10004;</span>
          </div>
          <h2 className='order-success-title'>Pembayaran Berhasil</h2>
          <p>Silahkan order lagi terima kasih!</p>
          <div className="order-success-buttons">
            <button className="back-home-btn">Kembali ke Home</button>
            <button className="view-order-btn">Lihat Order</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderSuccess;