import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../middleware/authContext";
import { FaUsers, FaBox, FaShoppingCart, FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Chart as ChartJS, BarElement,CategoryScale,LinearScale,Tooltip,Legend,} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Adminmain() {
  const { user, API } = useContext(AuthContext);

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(`${API}/getAdminData`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const data = res.data;

      setStats({
        users: data.usersLength,
        products: data.productsLength,
        orders: data.ordersLength,
        revenue: data.totalRevenue,
      });

      setRecentOrders(data.recentOrders || []);
      setRecentUsers(data.recentUsers || []);
      setMonthlySales(data.monthlySales || []);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const chartData = {
    labels: monthlySales.map((item) => item.month),
    datasets: [
      {
        label: "Revenue",
        data: monthlySales.map((item) => item.total),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">

      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border"></div>
        </div>
      ) : (
        <>
          {/* Cards */}
          <div className="row g-4">

            <Link to="customer" className="col-md-3 text-decoration-none text-dark">
              <div className="card shadow border-0 h-100">
                <div className="card-body">
                  <FaUsers size={28} className="text-primary mb-2" />
                  <h6>Total Users</h6>
                  <h3 className="fw-bold">{stats.users}</h3>
                </div>
              </div>
            </Link>

            <Link to="products" className="col-md-3 text-decoration-none text-dark">
              <div className="card shadow border-0 h-100">
                <div className="card-body">
                  <FaBox size={28} className="text-success mb-2" />
                  <h6>Total Products</h6>
                  <h3 className="fw-bold">{stats.products}</h3>
                </div>
              </div>
            </Link>

            <Link to="allorders" className="col-md-3 text-decoration-none text-dark">
              <div className="card shadow border-0 h-100">
                <div className="card-body">
                  <FaShoppingCart size={28} className="text-warning mb-2" />
                  <h6>Total Orders</h6>
                  <h3 className="fw-bold">{stats.orders}</h3>
                </div>
              </div>
            </Link>

            <Link to="analytic" className="col-md-3 text-decoration-none text-dark">
              <div className="card shadow border-0 h-100">
                <div className="card-body">
                  <FaRupeeSign size={28} className="text-danger mb-2" />
                  <h6>Total Revenue</h6>
                  <h3 className="fw-bold">₹ {stats.revenue}</h3>
                </div>
              </div>
            </Link>

          </div>

          {/* Chart */}
          <div className="row mt-4">
            <div className="col-md-8">
              <div className="card shadow border-0">
                <div className="card-body">
                  <h5 className="mb-3">Revenue Overview</h5>
                  <Bar data={chartData} />
                </div>
              </div>
            </div>

            {/* Recent Users */}
            <div className="col-md-4">
              <div className="card shadow border-0">
                <div className="card-body">
                  <h5>Recent Users</h5>

                  <ul className="list-group mt-3">
                    {recentUsers.map((u, i) => (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between"
                      >
                        {u.name}
                        <span className="text-muted">
                          {u.email}
                        </span>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="card mt-4 shadow border-0">
            <div className="card-body">
              <h5>Recent Orders</h5>

              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((o, i) => (
                    <tr key={i}>
                      <td>{o.customerName}</td>
                      <td>₹ {o.totalAmount}</td>
                      <td>{o.orderStatus}</td>
                      <td>
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

        </>
      )}
    </div>
  );
}

export default Adminmain;