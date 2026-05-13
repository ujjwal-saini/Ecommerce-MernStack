import React, {
  useEffect,
  useState,
  useContext
} from "react";

import axios from "axios";

import { AuthContext } from "../../middleware/authContext";

import Loader from "../../components/loading";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import {
  Line,
  Bar
} from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend
);

function Analytic() {

  const {
    API,
    user,
    theme
  } = useContext(AuthContext);

  const [monthlySales, setMonthlySales] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {

    try {

      const res = await axios.get(
        `${API}/getAdminData`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        }
      );

      setMonthlySales(
        res.data.monthlySales || []
      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }
  };

  if (loading) {

    return (

      <div
        className={`min-vh-100 d-flex justify-content-center align-items-center ${theme === "dark"
          ? "bg-black text-light"
          : "bg-light text-dark"
          }`}
      >
        <Loader />
      </div>

    );
  }

  // REVENUE GRAPH

  const revenueData = {

    labels: monthlySales.map(
      (m) => m.month
    ),

    datasets: [
      {
        label: "Monthly Revenue ₹",

        data: monthlySales.map(
          (m) => m.total
        ),

        borderColor: "#0d6efd",

        backgroundColor:
          "rgba(13,110,253,0.3)",

        tension: 0.4,

        fill: true,
      }
    ]
  };

  // ORDER GRAPH

  const orderData = {

    labels: monthlySales.map(
      (m) => m.month
    ),

    datasets: [
      {
        label: "Orders",
        data: monthlySales.map(
          (m) => m.orders
        ),
        backgroundColor:
          "rgba(25,135,84,0.8)",
        borderRadius: 8,
      }
    ]
  };

  return (

    <div
      className={`container-fluid min-vh-100 px-2 px-md-4 py-3 ${theme === "dark"
        ? "bg-black text-light"
        : "bg-light text-dark"
        }`}>
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold fs-3 fs-md-2">
          📊 Website Analytics
        </h2>
        <p
          className={`small mb-0 ${theme === "dark"
            ? "text-light"
            : "text-muted"
            }`}>
          Revenue & order insights overview
        </p>
      </div>
      {/* TOP CARDS */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div
            className={`rounded-4 shadow-sm p-3 h-100 ${theme === "dark"
              ? "bg-dark-mode text-light"
              : "bg-white"
              }`} >
            <h6 className="small mb-2">
              Total Revenue
            </h6>

            <h4 className="fw-bold text-success m-0">
              ₹
              {monthlySales.reduce(
                (a, b) => a + b.total,
                0
              )}
            </h4>

          </div>

        </div>

        <div className="col-6 col-md-3">

          <div
            className={`rounded-4 shadow-sm p-3 h-100 ${theme === "dark"
              ? "bg-dark-mode text-light"
              : "bg-white"
              }`}
          >

            <h6 className="small mb-2">
              Total Orders
            </h6>

            <h4 className="fw-bold text-primary m-0">
              {monthlySales.reduce(
                (a, b) => a + b.orders,
                0
              )}
            </h4>

          </div>

        </div>

        <div className="col-6 col-md-3">

          <div
            className={`rounded-4 shadow-sm p-3 h-100 ${theme === "dark"
              ? "bg-dark-mode text-light"
              : "bg-white"
              }`}
          >

            <h6 className="small mb-2">
              Best Month
            </h6>

            <h4 className="fw-bold text-warning m-0">
              {
                monthlySales.sort(
                  (a, b) =>
                    b.total - a.total
                )[0]?.month
              }
            </h4>

          </div>

        </div>

        <div className="col-6 col-md-3">

          <div
            className={`rounded-4 shadow-sm p-3 h-100 ${theme === "dark"
              ? "bg-dark-mode text-light"
              : "bg-white"
              }`}
          >

            <h6 className="small mb-2">
              Avg Revenue
            </h6>

            <h4 className="fw-bold text-danger m-0">
              ₹
              {Math.floor(
                monthlySales.reduce(
                  (a, b) => a + b.total,
                  0
                ) / monthlySales.length
              )}
            </h4>

          </div>

        </div>

      </div>

      {/* CHARTS */}

      <div className="row g-4">

        {/* REVENUE */}

        <div className="col-12 col-lg-7">

          <div
            className={`card border-0 shadow rounded-4 h-100 ${theme === "dark"
              ? "bg-dark-mode text-light"
              : "bg-white"
              }`}
          >

            <div className="card-body">

              <h5 className="mb-4">
                💰 Monthly Revenue
              </h5>

              <div
                style={{
                  width: "100%",
                  overflowX: "auto"
                }}
              >

                <div
                  style={{
                    minWidth: "500px",
                    height: "350px"
                  }}
                >

                  {monthlySales.length > 0 ? (
                    <Line
                      data={revenueData}
                    />
                  ) : (
                    <Loader />
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ORDERS */}

        <div className="col-12 col-lg-5">

          <div
            className={`card border-0 shadow rounded-4 h-100 ${theme === "dark"
              ? "bg-dark text-light"
              : "bg-white"
              }`}
          >

            <div className="card-body">

              <h5 className="mb-4">
                📦 Orders Growth
              </h5>

              <div
                style={{
                  width: "100%",
                  overflowX: "auto"
                }}
              >

                <div
                  style={{
                    minWidth: "400px",
                    height: "350px"
                  }}
                >

                  <Bar data={orderData} />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* TABLE */}

      <div
        className={`card border-0 shadow rounded-4 mt-4 overflow-hidden ${theme === "dark"
          ? "bg-dark text-light"
          : "bg-white"
          }`}
      >

        <div className="card-body">

          <h5 className="mb-4">
            📈 Revenue Comparison
          </h5>

          {/* MOBILE CARDS */}

          <div className="d-block d-md-none">

            {monthlySales.map((m, i) => (

              <div
                key={i}
                className={`rounded-4 p-3 mb-3 shadow-sm ${theme === "dark"
                  ? "bg-black border border-secondary"
                  : "bg-light"
                  }`}
              >

                <div className="d-flex justify-content-between mb-2">

                  <h6 className="fw-bold m-0">
                    {m.month}
                  </h6>

                  <span className="badge bg-primary">
                    {m.orders} Orders
                  </span>

                </div>

                <div className="text-success fw-bold fs-5">
                  ₹{m.total}
                </div>

              </div>

            ))}

          </div>

          {/* DESKTOP TABLE */}

          <div className="d-none d-md-block table-responsive">

            <table
              className={`table align-middle mb-0 ${theme === "dark"
                ? "table table-color"
                : "table table-hover"
                }`}
            >

              <thead
                className={
                  theme === "dark"
                    ? "table-dark"
                    : "table-light"
                }
              >

                <tr>

                  <th>Month</th>

                  <th>Revenue</th>

                  <th>Orders</th>

                </tr>

              </thead>

              <tbody>

                {monthlySales.map(
                  (m, i) => (

                    <tr key={i}>

                      <td>
                        {m.month}
                      </td>

                      <td className="text-success fw-bold">
                        ₹{m.total}
                      </td>

                      <td>
                        {m.orders}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytic;