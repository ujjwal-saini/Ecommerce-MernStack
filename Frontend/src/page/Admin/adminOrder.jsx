import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../middleware/authContext";
import Loader from "../../components/loading";


function AdminOrders() {

  const { API, theme } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // GET ORDERS
  const getOrders = async () => {

    try {

      const res = await axios.get(`${API}/getorders`, {
        withCredentials: true,
      });

      setOrders(res.data);

    } catch (error) {

      console.log(error);

      Swal.fire({
        title: "Error!",
        text: "Failed to fetch orders",
        icon: "error",
      });

    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // UPDATE STATUS
  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `${API}/orders/${id}`,
        { orderStatus: status },
        { withCredentials: true }
      );

      Swal.fire({
        title: "Updated!",
        text: `Order marked as ${status}`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      getOrders();

    } catch (error) {

      console.log(error);

      Swal.fire({
        title: "Error!",
        text: "Status not updated",
        icon: "error",
      });

    }
  };

  // CANCEL ORDER
  const cancelOrder = async (id) => {

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#0d6efd",
      confirmButtonText: "Yes, Cancel it!",
    });

    if (!result.isConfirmed) return;

    try {

      await axios.put(
        `${API}/cancelorder/${id}`,
        { orderStatus: "Cancelled" },
        { withCredentials: true }
      );

      Swal.fire({
        title: "Cancelled!",
        text: "Order cancelled successfully",
        icon: "success",
      });

      getOrders();

    } catch (error) {

      console.log(error);

      Swal.fire({
        title: "Error!",
        text: "Something went wrong",
        icon: "error",
      });

    }
  };

  return (
    <div
      className={`w-100 py-2 py-md-4 px-2 px-md-3 ${theme === "dark"
        ? "bg-black text-white"
        : "bg-light text-dark"
        }`}
      style={{ minHeight: "100vh" }}
    >
      <div className="admin-orders-wrapper">

        {/* HEADER */}

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">

          <div>

            <h2 className="fw-bold mb-1">
              🛒 Admin Orders Dashboard
            </h2>

            <p
              className={
                theme === "dark"
                  ? "text-light"
                  : "text-muted"
              }
            >
              Manage customer orders easily
            </p>

          </div>

          <div
            className={`shadow rounded-pill px-4 py-2 fw-bold ${theme === "dark"
              ? "bg-secondary text-white"
              : "bg-white text-dark"
              }`}
          >
            Total Orders : {orders.length}
          </div>

        </div>

        {/* TABLE */}

        {orders.length === 0 ? (

          <div className="text-center mt-5">
            <Loader />
          </div>

        ) : (

          <div
            className={`card border-0 shadow-lg rounded-4 overflow-hidden ${theme === "dark"
              ? "bg-black text-white"
              : "bg-white text-dark"
              }`}
          >

            <div
              className="table-responsive admin-table-wrapper"
              style={{
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
              }}
            >

              <table
                className={`table align-middle table-hover mb-0 ${theme === "dark"
                  ? "table-color"
                  : ""
                  }`}
              >

                <thead
                  className={
                    theme === "dark"
                      ? "bg-black"
                      : "table-primary"
                  }
                >

                  <tr>

                    <th className="p-2 p-md-3">Order ID</th>
                    <th className="p-2 p-md-3">Customer</th>
                    <th className="p-2 p-md-3">Phone</th>
                    <th className="p-2 p-md-3">Total</th>
                    <th className="p-2 p-md-3">Payment</th>
                    <th className="p-2 p-md-3">Status</th>
                    <th className="p-2 p-md-3">Date</th>
                    <th className="p-2 p-md-3">Items</th>
                    <th className="p-2 p-md-3">Actions</th>

                  </tr>

                </thead>

                <tbody>

                  {orders.map((order) => {

                    const orderDate = new Date(order.createdAt);

                    return (

                      <tr key={order._id}>

                        <td className="fw-semibold p-2 p-md-3">
                          #{order._id.slice(0, 8)}
                        </td>

                        <td className="p-2 p-md-3">
                          {order.customerName}
                        </td>

                        <td className="p-2 p-md-3">
                          {order.phone}
                        </td>

                        <td className="fw-bold text-success p-2 p-md-3">
                          ₹{order.totalAmount}
                        </td>

                        <td className="p-2 p-md-3">

                          <span className="badge bg-success px-3 py-2 rounded-pill">
                            {order.paymentMethod}
                          </span>

                        </td>

                        <td className="p-2 p-md-3">

                          <span
                            className={`badge px-3 py-2 rounded-pill ${order.orderStatus === "Pending"
                              ? "bg-warning text-dark"
                              : order.orderStatus === "Processing"
                                ? "bg-info text-dark"
                                : order.orderStatus === "Shipped"
                                  ? "bg-primary"
                                  : order.orderStatus === "Delivered"
                                    ? "bg-success"
                                    : "bg-danger"
                              }`}
                          >
                            {order.orderStatus}
                          </span>

                        </td>

                        <td className="p-2 p-md-3">
                          {orderDate.toLocaleDateString()}
                        </td>

                        <td className="p-2 p-md-3">

                          <button
                            className="btn btn-secondary btn-sm rounded-pill px-3 w-100"
                            onClick={() => setSelectedOrder(order)}
                          >
                            View ({order.items.length})
                          </button>

                        </td>

                        <td className="p-2 p-md-3">

                          <div className="d-flex flex-column flex-md-row gap-2">

                            <select
                              className="form-select form-select-sm rounded-pill w-100"
                              value={order.orderStatus}
                              onChange={(e) =>
                                updateStatus(order._id, e.target.value)
                              }
                            >

                              <option value="Pending">
                                Pending
                              </option>

                              <option value="Processing">
                                Processing
                              </option>

                              <option value="Shipped">
                                Shipped
                              </option>

                              <option value="Delivered">
                                Delivered
                              </option>

                            </select>

                            <button
                              className="btn btn-danger btn-sm rounded-pill px-3 w-100"
                              onClick={() => cancelOrder(order._id)}
                            >
                              Cancel
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>

          </div>

        )}

        {/* ORDER DETAILS */}

        {selectedOrder && (

          <div
            className={`card border-0 shadow-lg rounded-4 mt-4 overflow-hidden ${theme === "dark"
              ? "bg-black text-white"
              : "bg-white text-dark"
              }`}
          >

            <div className="card-header bg-black text-white d-flex justify-content-between align-items-center flex-wrap gap-2">

              <h4 className="mb-0">
                📦 Order Details
              </h4>

              <button
                className="btn btn-light btn-sm rounded-pill"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>

            </div>

            <div
              className={`card-body ${theme === "dark"
                ? "bg-black text-white"
                : "bg-light text-dark"
                }`}
            >

              {selectedOrder.items.map((item, index) => (

                <div
                  key={index}
                  className={`d-flex flex-column flex-sm-row align-items-center gap-3 border rounded-4 shadow-sm p-3 mb-3 ${theme === "dark"
                    ? "bg-dark border-secondary"
                    : "bg-white"
                    }`}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    width="90"
                    height="90"
                    className="rounded-4"
                    style={{ objectFit: "cover" }}
                  />

                  <div className="text-center text-sm-start">

                    <h5 className="fw-bold mb-1">
                      {item.name}
                    </h5>

                    <p className="text-success fw-bold mb-1">
                      ₹{item.price}
                    </p>

                    <p className="mb-0">
                      Qty : {item.quantity}
                    </p>

                  </div>

                </div>

              ))}

              <div className="mt-4">

                <p>
                  <strong> Address :</strong>{" "}
                  {selectedOrder.address}
                </p>

                <p>
                  <strong> Delivery Expected :</strong>{" "}
                  {new Date(
                    new Date(selectedOrder.createdAt).setDate(
                      new Date(selectedOrder.createdAt).getDate() + 5
                    )
                  ).toLocaleDateString()}
                </p>

              </div>

            </div>

          </div>

        )}
      </div>
    </div>
  );
}

export default AdminOrders;