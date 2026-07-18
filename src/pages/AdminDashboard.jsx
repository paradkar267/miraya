import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ShoppingBag, Users, Crown, Package, Plus, Edit2, Trash2, X, Ruler } from 'lucide-react';
import API_URL from '../config';
import ConfirmModal from '../components/ConfirmModal';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'products'
  
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [products, setProducts] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '', category: 'lehengas', price: '', priceValue: '', color: '', fabric: '', image: '', description: ''
  });

  const [measurementModalOpen, setMeasurementModalOpen] = useState(false);
  const [selectedMeasurements, setSelectedMeasurements] = useState(null);
  const [confirmConfig, setConfirmConfig] = useState(null);

  const askConfirm = (message, subMessage, confirmText, danger, onConfirm) =>
    setConfirmConfig({ message, subMessage, confirmText, danger, onConfirm });

  const fetchProducts = async (token) => {
    const res = await fetch(`${API_URL}/api/admin/products`, { headers: { Authorization: `Bearer ${token}` }});
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        const statsRes = await fetch(`${API_URL}/api/admin/dashboard`, { headers: { Authorization: `Bearer ${token}` }});
        if (!statsRes.ok) throw new Error('Access denied. Admin only.');
        setStats(await statsRes.json());

        const ordersRes = await fetch(`${API_URL}/api/admin/orders`, { headers: { Authorization: `Bearer ${token}` }});
        setOrders(await ordersRes.json());

        const bestsellersRes = await fetch(`${API_URL}/api/admin/bestsellers`, { headers: { Authorization: `Bearer ${token}` }});
        setBestsellers(await bestsellersRes.json());

        await fetchProducts(token);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  // Product CRUD Handlers
  const handleOpenProductModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setProductForm(product);
    } else {
      setEditingProduct(null);
      setProductForm({ name: '', category: 'lehengas', price: '', priceValue: '', color: '', fabric: '', image: '', description: '' });
    }
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = editingProduct 
      ? `${API_URL}/api/admin/products/${editingProduct.id}`
      : `${API_URL}/api/admin/products`;
    
    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(productForm)
      });
      if (res.ok) {
        setIsProductModalOpen(false);
        fetchProducts(token);
      } else {
        alert("Failed to save product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = (id) => {
    askConfirm(
      'Delete This Product?',
      'This product will be permanently removed from the store.',
      'Delete Product', true,
      async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchProducts(token);
    } catch (err) {
      console.error(err);
    }
      }
    );
  };

  // Measurement Viewer
  const handleViewMeasurements = (measurements) => {
    if (measurements && measurements.length > 0) {
      // Pick the default or first one
      const profile = measurements.find(m => m.isDefault) || measurements[0];
      setSelectedMeasurements(profile);
      setMeasurementModalOpen(true);
    } else {
      alert("No measurements found for this customer.");
    }
  };

  if (loading) return <div className="admin-loading">Loading Dashboard...</div>;
  if (error) return <div className="admin-error">Error: {error}</div>;

  return (
    <div className="admin-dashboard animate-fade">
      <ConfirmModal config={confirmConfig} onClose={() => setConfirmConfig(null)} />
      <div className="admin-header-flex">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, Boss. Manage your store operations here.</p>
        </div>
        <div className="admin-tabs">
          <button className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Overview</button>
          <button className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>Products</button>
        </div>
      </div>

      {activeTab === 'dashboard' && (
        <>
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
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
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
                            <span className={`status-badge ${order.status.toLowerCase()}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>
                            <button className="action-btn measure-btn" onClick={() => handleViewMeasurements(order.user.measurements)} title="View Measurements">
                              <Ruler size={16} /> Sizes
                            </button>
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
        </>
      )}

      {activeTab === 'products' && (
        <div className="products-manager-section">
          <div className="pm-header">
            <h2>Product Manager</h2>
            <button className="add-product-btn" onClick={() => handleOpenProductModal()}>
              <Plus size={18} /> Add New Product
            </button>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td><img src={product.image} alt={product.name} className="table-img" /></td>
                    <td><strong>{product.name}</strong></td>
                    <td style={{textTransform: 'capitalize'}}>{product.category}</td>
                    <td>{product.price}</td>
                    <td>
                      <div className="action-btns">
                        <button className="action-btn edit" onClick={() => handleOpenProductModal(product)}><Edit2 size={16}/></button>
                        <button className="action-btn delete" onClick={() => handleDeleteProduct(product.id)}><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {isProductModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content product-modal">
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button className="close-modal" onClick={() => setIsProductModalOpen(false)}><X size={20}/></button>
            </div>
            <form onSubmit={handleSaveProduct} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} required>
                    <option value="lehengas">Lehengas</option>
                    <option value="sarees">Sarees</option>
                    <option value="wedding">Wedding</option>
                    <option value="indo-western">Indo-Western</option>
                    <option value="coord-sets">Co-ord Sets</option>
                    <option value="sharara">Sharara</option>
                    <option value="kurtis">Kurtis</option>
                    <option value="salwar-suit">Salwar Suit</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price Display (e.g., ₹45,000)</label>
                  <input type="text" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Price Value (Number, e.g., 45000)</label>
                  <input type="number" value={productForm.priceValue} onChange={e => setProductForm({...productForm, priceValue: e.target.value})} required />
                </div>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input type="url" value={productForm.image} onChange={e => setProductForm({...productForm, image: e.target.value})} required placeholder="https://..." />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} rows="3"></textarea>
              </div>
              <button type="submit" className="save-btn">{editingProduct ? 'Update Product' : 'Create Product'}</button>
            </form>
          </div>
        </div>
      )}

      {/* Measurement Modal */}
      {measurementModalOpen && selectedMeasurements && (
        <div className="modal-overlay">
          <div className="modal-content measurement-modal">
            <div className="modal-header">
              <h3>Customer Measurements</h3>
              <button className="close-modal" onClick={() => setMeasurementModalOpen(false)}><X size={20}/></button>
            </div>
            <div className="measurement-grid">
              <div className="m-item"><span>Profile:</span> {selectedMeasurements.title} ({selectedMeasurements.fullName})</div>
              <div className="m-item"><span>Height:</span> {selectedMeasurements.height}</div>
              <div className="m-item"><span>Bust:</span> {selectedMeasurements.bust}</div>
              <div className="m-item"><span>Waist:</span> {selectedMeasurements.waist}</div>
              <div className="m-item"><span>Hips:</span> {selectedMeasurements.hips}</div>
              <div className="m-item"><span>Shoulder:</span> {selectedMeasurements.shoulder}</div>
              <div className="m-item"><span>Arm Length:</span> {selectedMeasurements.armLength}</div>
              <div className="m-item"><span>Neck:</span> {selectedMeasurements.neck}</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
