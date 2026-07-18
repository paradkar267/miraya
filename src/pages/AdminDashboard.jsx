import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ShoppingBag, Users, Crown, Package } from 'lucide-react';
import API_URL from '../config';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        // Fetch Stats
        const statsRes = await fetch(`${API_URL}/api/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!statsRes.ok) {
          throw new Error('Access denied. Admin only.');
        }
        const statsData = await statsRes.json();
        setStats(statsData);

        // Fetch Orders
        const ordersRes = await fetch(`${API_URL}/api/admin/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const ordersData = await ordersRes.json();
        setOrders(ordersData);

        // Fetch Bestsellers
        const bestsellersRes = await fetch(`${API_URL}/api/admin/bestsellers`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const bestsellersData = await bestsellersRes.json();
        setBestsellers(bestsellersData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <div className="admin-loading">Loading Dashboard...</div>;
  if (error) return <div className="admin-error">Error: {error}</div>;

  return (
    <div className="admin-dashboard animate-fade">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, Boss. Here is the overview of Miraya's performance.</p>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon-wrap bg-gold">
            <TrendingUp size={24} color="#fff" />
          </div>
          <div className="stat-info">
            <p>Total Revenue</p>
            <h3>₹{stats?.totalRevenue?.toLocaleString()}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrap bg-burgundy">
            <ShoppingBag size={24} color="#fff" />
          </div>
          <div className="stat-info">
            <p>Total Orders</p>
            <h3>{stats?.totalOrders}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrap bg-blue">
            <Users size={24} color="#fff" />
          </div>
          <div className="stat-info">
            <p>Registered Users</p>
            <h3>{stats?.totalUsers}</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Recent Orders Table */}
        <div className="orders-section">
          <h2>Recent Orders</h2>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Total Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan="6" style={{textAlign:'center', padding:'2rem'}}>No orders found.</td></tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id}>
                      <td>#MRY-{order.id}</td>
                      <td>
                        <strong>{order.user.firstName} {order.user.lastName}</strong><br/>
                        <span className="user-email">{order.user.email}</span>
                      </td>
                      <td className="address-col">{order.address}</td>
                      <td>₹{order.totalAmount.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge ${order.paymentStatus.toLowerCase()}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bestsellers Section */}
        <div className="bestsellers-section">
          <div className="bestseller-header">
            <Crown size={22} color="#cda372" />
            <h2>Bestsellers</h2>
          </div>
          <div className="bestsellers-list">
            {bestsellers.length === 0 ? (
              <p>No sales data available yet.</p>
            ) : (
              bestsellers.map((product, index) => (
                <div className="bestseller-item" key={product.id}>
                  <div className="rank">#{index + 1}</div>
                  <img src={product.image} alt={product.name} className="bs-img" />
                  <div className="bs-info">
                    <h4>{product.name}</h4>
                    <p>{product.totalSold} sold</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
