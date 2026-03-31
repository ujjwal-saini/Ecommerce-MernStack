import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../middleware/authContext";

function UserOrders() {

    const { user, API } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {

            const res = await axios.get(`${API}/myorders/${user._id}`, {
                withCredentials: true
            });

            setOrders(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    // cancel order
    const cancelOrder = async (id) => {
        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this order?"
        );
        if (!confirmCancel) return;
        try {
            const res = await axios.put(
                `${API}/cancelorder/${id}`,
                {},
                { withCredentials: true }
            );
            alert(res.data.message);
            getOrders();

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user) getOrders();
    }, [user]);

    return (
        <div className="container mt-4">

            <h3 className="mb-4">📦 My Orders</h3>

            {orders.length === 0 ? (
                <h5>No Orders Found</h5>
            ) : (
                orders.map((order) => {

                    const orderDate = new Date(order.createdAt);
                    const deliveryDate = new Date(orderDate);
                    deliveryDate.setDate(orderDate.getDate() + 5);

                    return (

                        <div key={order._id} className="card mb-4 shadow">

                            {/* Header */}
                            <div className="card-header bg-light d-flex justify-content-between">

                                <div>
                                    <strong>Order ID:</strong> {order._id}
                                </div>

                                <div>
                                    <span
                                        className={`badge ${order.orderStatus === "Pending"
                                                ? "bg-warning"
                                                : order.orderStatus === "Shipped"
                                                    ? "bg-info"
                                                    : order.orderStatus === "Delivered"
                                                        ? "bg-success"
                                                        : "bg-danger"
                                            }`}
                                    >
                                        {order.orderStatus}
                                    </span>
                                </div>

                            </div>

                            {/* Body */}
                            <div className="card-body">

                                <p><strong>Customer:</strong> {order.customerName}</p>
                                <p><strong>Phone:</strong> {order.phone}</p>
                                <p><strong>Address:</strong> {order.address}</p>

                                <p>
                                    <strong>Order Date:</strong>{" "}
                                    {orderDate.toLocaleDateString()}
                                </p>

                                <p className="text-success">
                                    🚚 Expected Delivery:{" "}
                                    {deliveryDate.toLocaleDateString()}
                                </p>

                                <hr />

                                {/* Items */}
                                {order.items.map((item, index) => (

                                    <div
                                        key={index}
                                        className="d-flex align-items-center border-bottom pb-3 mb-3"
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                                borderRadius: "10px"
                                            }}
                                        />

                                        <div className="ms-3">

                                            <h6>{item.name}</h6>

                                            <p className="text-success">
                                                ₹{item.price}
                                            </p>

                                            <p>
                                                Quantity: {item.quantity || 1}
                                            </p>

                                        </div>

                                    </div>

                                ))}

                                <hr />

                                <div className="d-flex justify-content-between align-items-center">

                                    <h5>Total: ₹{order.totalAmount}</h5>

                                    <div>

                                        <span className="badge bg-success me-2">
                                            {order.paymentMethod}
                                        </span>

                                        {/* Cancel Button */}
                                        {order.orderStatus === "Pending" && (
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => cancelOrder(order._id)}
                                            >
                                                Cancel Order
                                            </button>
                                        )}

                                    </div>

                                </div>

                            </div>

                        </div>

                    );
                })
            )}

        </div>
    );
}

export default UserOrders;