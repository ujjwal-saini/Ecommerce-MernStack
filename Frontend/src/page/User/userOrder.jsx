import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../middleware/authContext";
import { toast } from "react-toastify";

function UserOrders() {

    const { user, API } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);


    const getOrders = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${API}/myorders/${user._id}`,
                {
                    withCredentials: true
                }
            );
            setOrders(res.data);

        } catch (error) {

            toast.error("Failed to fetch orders ❌");
            console.log(error);

        } finally {

            setLoading(false);
        }
    };


    const cancelOrder = (id) => {

        toast(
            ({ closeToast }) => (
                <div>

                    <p className="mb-2">
                        Are you sure you want to cancel this order?
                    </p>

                    <div className="d-flex justify-content-end gap-2">

                        <button
                            className="btn btn-sm btn-secondary"
                            onClick={closeToast}
                        >
                            No
                        </button>

                        <button
                            className="btn btn-sm btn-danger"
                            onClick={async () => {

                                closeToast();

                                const toastId = toast.loading("Cancelling order...");

                                try {

                                    const res = await axios.put(
                                        `${API}/cancelorder/${id}`,
                                        {},
                                        {
                                            withCredentials: true
                                        }
                                    );

                                    toast.update(toastId, {
                                        render: res.data.message || "Order Cancelled Successfully",
                                        type: "success",
                                        isLoading: false,
                                        autoClose: 2000
                                    });

                                    getOrders();

                                } catch (error) {

                                    toast.dismiss(toastId);
                                    toast.error("Failed to cancel order ❌");

                                    console.log(error);
                                }
                            }}
                        >
                            Yes Cancel
                        </button>

                    </div>

                </div>
            ),
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                closeButton: false
            }
        );
    };

    useEffect(() => {

        if (user) {
            getOrders();
        }

    }, [user]);

    return (
        <div className="container-fluid container-md mt-3 mb-5 px-2 px-md-3">

            <h3 className="mb-4 text-center text-md-start">
                📦 My Orders
            </h3>

            {loading ? (

                <div className="text-center mt-5">
                    <h5>Loading Orders...</h5>
                </div>

            ) : orders.length === 0 ? (

                <div className="text-center mt-5">
                    <h5>No Orders Found 😔</h5>
                </div>

            ) : (

                orders.map((order) => {

                    const orderDate = new Date(order.createdAt);
                    const deliveryDate = new Date(orderDate);
                    deliveryDate.setDate(orderDate.getDate() + 5);

                    return (

                        <div
                            key={order._id}
                            className="card mb-4 shadow border-0"
                        >

                            {/* Header */}

                            <div className="card-header bg-light d-flex flex-column flex-md-row justify-content-between align-items-md-center">

                                <div className="mb-2 mb-md-0">
                                    <strong>Order ID:</strong> {order._id}
                                </div>

                                <span
                                    className={`badge 
                                        ${order.orderStatus === "Pending"
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

                            {/* Body */}

                            <div className="card-body">

                                <p>
                                    <strong>Customer:</strong> {order.customerName}
                                </p>

                                <p>
                                    <strong>Phone:</strong> {order.phone}
                                </p>

                                <p>
                                    <strong>Address:</strong> {order.address}
                                </p>

                                <p>
                                    <strong>Order Date:</strong>{" "}
                                    {orderDate.toLocaleDateString()}
                                </p>

                                <p className="text-success">
                                    🚚 Expected Delivery:{" "}
                                    {deliveryDate.toLocaleDateString()}
                                </p>

                                <hr />

                                {/* ITEMS */}

                                {order.items.map((item, index) => (

                                    <div
                                        key={index}
                                        className="d-flex flex-column flex-md-row align-items-center border-bottom pb-3 mb-3"
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="mb-3 mb-md-0"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                                borderRadius: "10px"
                                            }}
                                        />

                                        <div className="ms-md-3 text-center text-md-start">

                                            <h6>{item.name}</h6>

                                            <p className="text-success mb-1">
                                                ₹{item.price}
                                            </p>

                                            <p className="mb-0">
                                                Quantity: {item.quantity || 1}
                                            </p>

                                        </div>

                                    </div>

                                ))}

                                <hr />

                                {/* Footer */}

                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">

                                    <h5 className="mb-3 mb-md-0">
                                        Total: ₹{order.totalAmount}
                                    </h5>

                                    <div>

                                        <span className="badge bg-success me-2">
                                            {order.paymentMethod}
                                        </span>

                                        {order.orderStatus === "Pending" && (

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    cancelOrder(order._id)
                                                }
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