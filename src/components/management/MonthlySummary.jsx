import React, { useState, useEffect } from 'react';
import '../../styles/MonthlySummary.css';

const MonthlySummary = () => {
  const [month, setMonth] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7); // Format: YYYY-MM
    setMonth(currentMonth);
    fetchTotalSales(currentMonth);
  }, []);

  const fetchTotalSales = async (selectedMonth) => {
    try {
      const response = await fetch(`http://localhost:3000/sales/total_sales?month=${selectedMonth}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('jwtToken')}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch total sales');
      }

      const data = await response.json();
      setOrders(data.orders);
      setError('');
    } catch (err) {
      setError('Failed to fetch total sales. Please try again.');
      setOrders([]);
    }
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setMonth(selectedMonth);
    fetchTotalSales(selectedMonth);
  };

  return (
    <div className="total-sales-container">
      <h2>Total Sales for a Month</h2>
      <div className="form-group">
        <label htmlFor="month">Select Month:</label>
        <input
          type="month"
          id="month"
          value={month}
          onChange={handleMonthChange}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <table className="sales-table">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_number}>
              <td>{order.order_number}</td>
              <td>${order.total_amount}</td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            <td>${orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0.0)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MonthlySummary;
