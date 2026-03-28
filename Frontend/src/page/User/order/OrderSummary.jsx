import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function OrderSummary() {

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="card p-4 shadow">

      <h5>🧾 Order Summary</h5>
      <hr />

      {cartItems.map((item) => (
        <div key={item._id} className="d-flex justify-content-between">

          <p>{item.name}</p>
          <p>₹{item.price * item.qty}</p>

        </div>
      ))}

      <hr />

      <h5 className="text-success">
        Total ₹{total}
      </h5>

      <Link
        to="/success"
        className="btn btn-success w-100 mt-3"
      >
        Place Order
      </Link>

    </div>
  );
}

export default OrderSummary;