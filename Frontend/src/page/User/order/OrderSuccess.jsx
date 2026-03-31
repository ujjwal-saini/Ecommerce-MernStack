import React from "react";
import { Link } from "react-router-dom";

function OrderSuccess() {

  return (
    <div className="container mt-5 text-center">

      <h2 className="text-success">
        Order Placed Successfully 🎉
      </h2>

      <p>Your order will be delivered in 2 days</p>

      <Link to="/" className="btn btn-primary">
        Continue Shopping
      </Link>

    </div>
  );
}

export default OrderSuccess;