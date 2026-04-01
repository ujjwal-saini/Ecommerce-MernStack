import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../middleware/authContext";
import Loader from "../../components/loading";

function AdminOrders() {

  const { API } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getOrders = async () => {
    try {
      const res = await axios.get(`${API}/getorders`, {
        withCredentials: true
      });

      setOrders(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {

      await axios.put(
        `${API}/orders/${id}`,
        { orderStatus: status },
        { withCredentials: true }
      );

      alert("Status Updated");

      getOrders();

    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder = async (id) => {

    const confirm = window.confirm("Cancel this order?");

    if (!confirm) return;

    try {

      await axios.put(
        `${API}/orders/${id}`,
        { orderStatus: "Cancelled" },
        { withCredentials: true }
      );

      alert("Order Cancelled");

      getOrders();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">🛒 Admin Orders Dashboard</h3>
      {orders.length === 0 ? (
        <div className="text-center mt-5">
        return <Loader/>
        </div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Items</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const orderDate = new Date(order.createdAt);
              const deliveryDate = new Date(orderDate);
              deliveryDate.setDate(orderDate.getDate() + 5);
              return (
                <tr key={order._id}>
                  <td>{order._id.slice(0, 8)}...</td>
                  <td>{order.customerName}</td>
                  <td>{order.phone}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>
                    <span className="badge bg-success">
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${order.orderStatus === "Pending"
                          ? "bg-warning"
                          : order.orderStatus === "Processing"
                            ? "bg-info"
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
                  <td>
                    {orderDate.toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() =>
                        setSelectedOrder(order)
                      }
                    >
                      View ({order.items.length})
                    </button>
                  </td>
                  <td>
                    <div className="d-flex gap-2 align-items-center w-100">
                      <select
                        className="form-select form-select-sm"
                        onChange={(e) =>
                          updateStatus(order._id, e.target.value)
                        }
                        defaultValue=""
                        style={{ width: "150px" }}
                      >
                        <option value="" disabled>
                          Update Status
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
                        className="btn btn-danger btn-sm"
                        onClick={() => cancelOrder(order._id)}>
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

          </tbody>

        </table>

      )}

      {/* Order Items Modal */}
      {selectedOrder && (

        <div className="card mt-4 p-3 shadow">

          <h5>📦 Order Items</h5>

          {selectedOrder.items.map((item, index) => (

            <div
              key={index}
              className="d-flex align-items-center border-bottom mb-3 pb-2"
            >

              <img
                src={item.image}
                alt={item.name}
                width="70"
                height="70"
                style={{ objectFit: "cover" }}
              />

              <div className="ms-3">
                <h6>{item.name}</h6>
                <p>₹{item.price}</p>
                <p>Qty: {item.quantity}</p>
              </div>

            </div>

          ))}

          <p>
            <strong>Address:</strong>{" "}
            {selectedOrder.address}
          </p>

          <p>
            🚚 Delivery Expected:{" "}
            {new Date(
              new Date(selectedOrder.createdAt)
                .setDate(
                  new Date(selectedOrder.createdAt).getDate() + 5
                )
            ).toLocaleDateString()}
          </p>

          <button
            className="btn btn-secondary"
            onClick={() => setSelectedOrder(null)}
          >
            Close
          </button>

        </div>

      )}

    </div>
  );
}

export default AdminOrders;