import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../middleware/authContext";

function Adminmain() {
 const { user , API } = useContext(AuthContext);

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(
        `${API}/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      const data = res.data;

      setStats({
        users: data.usersLength,
        products: data.productsLength,
        orders: data.ordersLength,
        revenue: data.totalRevenue,
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        <div className="row g-4">
          {/* Users */}
          <div className="col-md-3">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h6 className="text-muted">Total Users</h6>
                <h3 className="fw-bold text-primary">{stats.users}</h3>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="col-md-3">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h6 className="text-muted">Total Products</h6>
                <h3 className="fw-bold text-success">{stats.products}</h3>
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="col-md-3">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h6 className="text-muted">Total Orders</h6>
                <h3 className="fw-bold text-warning">{stats.orders}</h3>
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="col-md-3">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h6 className="text-muted">Total Revenue</h6>
                <h3 className="fw-bold text-danger">₹ {stats.revenue}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Adminmain;
