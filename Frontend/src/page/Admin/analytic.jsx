import React, { useEffect, useState, useContext } from "react";
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

import { Line, Bar } from "react-chartjs-2";

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

  const { API, user } = useContext(AuthContext);

  const [monthlySales, setMonthlySales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);
  console.log(monthlySales);
  const fetchAnalytics = async () => {
    try {

      const res = await axios.get(`${API}/getAdminData`, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });

      setMonthlySales(res.data.monthlySales);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Loader />
      </div>
    );
  }
  console.log(monthlySales.map(m => m.total));
  // revenue graph
  const revenueData = {
    labels: monthlySales.map(m => m.month),

    datasets: [
      {
        label: "Monthly Revenue ₹",
        data: monthlySales.map(m => m.total),
        borderColor: "blue",
        backgroundColor: "lightblue",
        tension: 0.4
      }
    ]
  };

  // orders graph
  const orderData = {
    labels: monthlySales.map(m => m.month),

    datasets: [
      {
        label: "Orders",
        data: monthlySales.map(m => m.orders),
        backgroundColor: "green"
      }
    ]
  };

  return (
    <div className="container-fluid p-4">

      <h2 className="fw-bold mb-4">
        📊 Website Analytics
      </h2>

      {/* Revenue Graph */}

      <div className="card shadow mb-4">

        <div className="card-body">

          <h5 className="mb-3">
            💰 Monthly Revenue
            {monthlySales.length > 0 ? (
              <Line data={revenueData} />
            ) : (
              <Loader/>
            )}
          </h5>
        </div>

      </div>

      {/* Orders Graph */}

      <div className="card shadow mb-4">

        <div className="card-body">

          <h5 className="mb-3">
            📦 Orders Growth
          </h5>

          <Bar data={orderData} />

        </div>

      </div>

      {/* Comparison */}

      <div className="card shadow">

        <div className="card-body">

          <h5 className="mb-3">
            📈 Revenue Comparison
          </h5>

          <table className="table">

            <thead>
              <tr>
                <th>Month</th>
                <th>Revenue</th>
                <th>Orders</th>
              </tr>
            </thead>

            <tbody>

              {monthlySales.map((m, i) => (

                <tr key={i}>

                  <td>{m.month}</td>

                  <td className="text-success">
                    ₹{m.total}
                  </td>

                  <td>
                    {m.orders}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Analytic;