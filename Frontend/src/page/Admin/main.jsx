import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../middleware/authContext";

import {
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaRupeeSign,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import Loader from "../../components/loading";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Adminmain() {

  const { API, theme } = useContext(AuthContext);

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [birthday, setBirthday] = useState([]);

  const [loading, setLoading] = useState(true);
  console.log(recentUsers);
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {

    try {

      const res = await axios.get(`${API}/getAdminData`);

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
      setBirthday(data.birthdayUsers || []);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  // BAR CHART DATA

  const chartData = {

    labels: monthlySales.map((item) => item.month),

    datasets: [
      {
        label: "Revenue",

        data: monthlySales.map((item) => item.total),

        backgroundColor: "rgba(54, 162, 235, 0.6)",

        borderRadius: 10,
      },
    ],
  };

  return (

    <div
      className={`container-fluid min-vh-100 p-2 p-md-4 ${theme === "dark"
        ? "bg-black text-light"
        : "bg-light text-dark"
        }`}
    >

      {/* TITLE */}

      <div className="mb-4">

        <h2 className="fw-bold fs-3 fs-md-2">
          Admin Dashboard
        </h2>

        <p className="small opacity-75 mb-0">
          Overview of your store analytics
        </p>

      </div>

      {loading ? (

        <div className="text-center mt-5">
          <Loader />
        </div>

      ) : (
        <>

          {/* =========================
              STATS CARDS
          ========================= */}

          <div className="row g-3 g-md-4">

            <Link
              to="customer"
              className="col-6 col-md-6 col-lg-3 text-decoration-none"
            >

              <div
                className={`card border-0 rounded-4 h-100 shadow-sm ${theme === "dark"
                  ? "bg-dark text-light"
                  : "bg-white text-dark"
                  }`}
              >

                <div className="card-body">

                  <FaUsers
                    size={28}
                    className="text-primary mb-2"
                  />

                  <h6 className="small">
                    Total Users
                  </h6>

                  <h3 className="fw-bold">
                    {stats.users}
                  </h3>

                </div>

              </div>

            </Link>

            <Link
              to="products"
              className="col-6 col-md-6 col-lg-3 text-decoration-none"
            >

              <div
                className={`card border-0 rounded-4 h-100 shadow-sm ${theme === "dark"
                  ? "bg-dark text-light"
                  : "bg-white text-dark"
                  }`}
              >

                <div className="card-body">

                  <FaBox
                    size={28}
                    className="text-success mb-2"
                  />

                  <h6 className="small">
                    Total Products
                  </h6>

                  <h3 className="fw-bold">
                    {stats.products}
                  </h3>

                </div>

              </div>

            </Link>

            <Link
              to="allorders"
              className="col-6 col-md-6 col-lg-3 text-decoration-none"
            >

              <div
                className={`card border-0 rounded-4 h-100 shadow-sm ${theme === "dark"
                  ? "bg-dark text-light"
                  : "bg-white text-dark"
                  }`}
              >

                <div className="card-body">

                  <FaShoppingCart
                    size={28}
                    className="text-warning mb-2"
                  />

                  <h6 className="small">
                    Total Orders
                  </h6>

                  <h3 className="fw-bold">
                    {stats.orders}
                  </h3>

                </div>

              </div>

            </Link>

            <Link
              to="analytic"
              className="col-6 col-md-6 col-lg-3 text-decoration-none"
            >

              <div
                className={`card border-0 rounded-4 h-100 shadow-sm ${theme === "dark"
                  ? "bg-dark text-light"
                  : "bg-white text-dark"
                  }`}
              >

                <div className="card-body">

                  <FaRupeeSign
                    size={28}
                    className="text-danger mb-2"
                  />

                  <h6 className="small">
                    Total Revenue
                  </h6>

                  <h3 className="fw-bold fs-5 fs-md-3">
                    ₹ {stats.revenue}
                  </h3>

                </div>

              </div>

            </Link>

          </div>

          {/* =========================
              GRAPH SECTION
          ========================= */}

          <div className="row mt-4 g-4">

            {/* BAR GRAPH */}

            <div className="col-12 col-lg-8">

              <div
                className={`card border-0 rounded-4 shadow-sm h-100 ${theme === "dark"
                  ? "bg-dark text-light"
                  : "bg-white text-dark"
                  }`}
              >

                <div className="card-body">

                  <h5 className="mb-3">
                    Revenue Overview
                  </h5>

                  <div
                    style={{
                      width: "100%",
                      overflowX: "auto",
                    }}
                  >

                    <div
                      style={{
                        minWidth: "500px",
                      }}
                    >

                      <Bar data={chartData} />

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* SECOND GRAPH */}

            <div className="col-12 col-lg-4">

              <div
                className={`card border-0 rounded-4 shadow-sm h-100 ${theme === "dark"
                  ? "bg-dark text-light"
                  : "bg-white text-dark"
                  }`}
              >

                <div className="card-body">

                  <h5 className="mb-4">
                    Monthly Revenue
                  </h5>

                  <div className="d-flex flex-column gap-3">

                    {monthlySales.map((item, index) => (

                      <div key={index}>

                        <div className="d-flex justify-content-between small mb-1">

                          <span>
                            {item.month}
                          </span>

                          <span>
                            ₹ {item.total}
                          </span>

                        </div>

                        <div
                          className={`progress ${theme === "dark"
                            ? "bg-secondary"
                            : ""
                            }`}
                          style={{
                            height: "10px",
                            borderRadius: "20px",
                          }}
                        >

                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${item.total /
                                Math.max(
                                  ...monthlySales.map(
                                    (m) => m.total
                                  )
                                ) *
                                100
                                }%`,
                            }}
                          />

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =========================
              BIRTHDAY + USERS
          ========================= */}

          <div className="row mt-4 g-4">

            {/* BIRTHDAY */}

            <div className="col-12 col-lg-6">

              <div
                className={`card border-0 rounded-4 shadow-sm overflow-hidden ${theme === "dark"
                  ? "bg-dark text-light"
                  : "bg-white text-dark"
                  }`}
              >

                <div
                  className="p-4 text-white"
                  style={{
                    background:
                      "linear-gradient(135deg,#ff4b2b,#ff416c,#ff9a44)",
                  }}
                >

                  <div className="d-flex justify-content-between">

                    <div>

                      <h5 className="fw-bold">
                        🎂 Birthday Celebration
                      </h5>

                      <small>
                        Today's Users
                      </small>

                    </div>

                    <h4>
                      {birthday.length}
                    </h4>

                  </div>

                </div>

                <div
                  className={`card-body ${theme === "dark"
                    ? "bg-black"
                    : "bg-light"
                    }`}
                >

                  {birthday.length === 0 ? (

                    <div className="text-center py-4">

                      <h6 className="text-muted">
                        No Birthdays Today 🎉
                      </h6>

                    </div>

                  ) : (

                    birthday.map((u, i) => (

                      <div
                        key={i}
                        className={`card border-0 shadow-sm mb-3 rounded-4 ${theme === "dark"
                          ? "bg-dark text-light"
                          : "bg-white text-dark"
                          }`}
                      >

                        <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">

                          <div className="d-flex align-items-center">

                            <img
                              src={u.profile.profilePic}
                              alt=""
                              className="rounded-circle"
                              style={{
                                width: "55px",
                                height: "55px",
                                objectFit: "cover",
                              }}
                            />

                            <div className="ms-3">

                              <h6 className="fw-bold mb-0">
                                {u.name}
                              </h6>

                              <small className="text-muted">
                                {u.email}
                              </small>

                              <div className="small text-muted">
                                DOB: {u.dateOfBirth}
                              </div>

                            </div>

                          </div>

                          <div className="text-end">

                            <span className="badge bg-success px-3 py-2">
                              {u.age} yrs
                            </span>

                            <div className="small mt-1">
                              🎉 Happy Birthday
                            </div>

                          </div>

                        </div>

                      </div>

                    ))
                  )}

                </div>

              </div>

            </div>

            {/* RECENT USERS */}

            <div className="col-12 col-lg-6">

              <div
                className={`card border-0 rounded-4 shadow-sm h-100 ${theme === "dark"
                  ? "bg-dark text-light"
                  : "bg-white text-dark"
                  }`}
              >

                <div className="card-body">

                  <h5 className="mb-3">
                    Recent Users
                  </h5>

                  <div className="d-flex flex-column gap-2">

                    {recentUsers.map((u, i) => (

                      <div
                        key={i}
                        className={`p-3 rounded-3 d-flex justify-content-between align-items-center flex-wrap gap-2 ${theme === "dark"
                          ? "bg-black"
                          : "bg-light"
                          }`}
                      >

                        <div className="d-flex align-items-center gap-3">

                          <img
                            src={u.profile.profilePic}
                            alt=""
                            className="rounded-circle border"
                            style={{
                              width: "45px",
                              height: "45px",
                              objectFit: "cover",
                            }}
                          />

                          <div>

                            <div className="fw-semibold">
                              {u.name}
                            </div>

                            <small className="text-muted">
                              {u.email}
                            </small>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =========================
              RECENT ORDERS
          ========================= */}

          <div
            className={`card mt-4 border-0 rounded-4 shadow-sm ${theme === "dark"
              ? "bg-dark text-light"
              : "bg-white text-dark"
              }`}
          >

            <div className="card-body">

              <h5 className="mb-3">
                Recent Orders
              </h5>

              <div className="table-responsive">

                <table
                  className={`table align-middle ${theme === "dark"
                    ? "table-color"
                    : ""
                    }`}
                >

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

                        <td className="small">
                          {o.customerName}
                        </td>

                        <td className="small fw-semibold">
                          ₹ {o.totalAmount}
                        </td>

                        <td>

                          <span
                            className={`badge ${o.orderStatus === "Delivered"
                              ? "bg-success"
                              : o.orderStatus === "Pending"
                                ? "bg-warning text-dark"
                                : "bg-primary"
                              }`}
                          >
                            {o.orderStatus}
                          </span>

                        </td>

                        <td className="small">

                          {new Date(
                            o.createdAt
                          ).toLocaleDateString()}

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </>
      )}
    </div>
  );
}

export default Adminmain;