// components/OrderHistoryPage.jsx
import React from 'react';
import '../css/OrderHistoryPage.css';

function OrderHistoryPage() {
  const orderData = [
    { id: '#96459761', status: 'IN PROGRESS', date: 'Oct 24, 2024 07:52', total: 'Rp 150.000' },
    { id: '#71667167', status: 'COMPLETED', date: 'Oct 24, 2019 23:26', total: 'Rp 150.000' }
  ];

  return (
    <div className="order-history-page">
      <h2>Order History</h2>
      <table className="order-history-table">
        <thead>
          <tr>
            <th>ORDER ID</th>
            <th>STATUS</th>
            <th>DATE</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td className={order.status === 'COMPLETED' ? 'status-completed' : 'status-in-progress'}>
                {order.status}
              </td>
              <td>{order.date}</td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistoryPage;
