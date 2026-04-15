import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../../middleware/authContext";
import axios from "axios";
import Swal from "sweetalert2";

function Payment() {

  const { user, API } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.items);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = async () => {
    try {

      setLoading(true);

      const res = await axios.post(`${API}/placeorder`, {
        userId: user._id,
        items: cartItems,
        total,
        paymentMethod
      });

      Swal.fire({
        icon: "success",
        title: "Order Placed Successfully",
        text: "Your order has been placed",
        timer: 2000,
        showConfirmButton: false
      });

      setLoading(false);

    } categorych (error) {

      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Order Failed"
      });

      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="mb-4">💳 Payment</h2>

      <div className="row">

        {/* Payment Method */}
        <div className="col-md-8">

          <div className="card p-4 shadow-sm">

            <h5>Select Payment Method</h5>

            <div className="mt-3">

              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <label className="form-check-label">
                  Cash on Delivery
                </label>
              </div>

              <div className="form-check mt-2">
                <input
                  type="radio"
                  className="form-check-input"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />
                <label className="form-check-label">
                  UPI Payment
                </label>
              </div>

              <div className="form-check mt-2">
                <input
                  type="radio"
                  className="form-check-input"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <label className="form-check-label">
                  Credit / Debit Card
                </label>
              </div>

            </div>

          </div>

        </div>

        {/* Order Summary */}
        <div className="col-md-4">

          <div className="card p-4 shadow-sm">

            <h5>Order Summary</h5>

            <hr />

            {cartItems.map((item) => (
              <div key={item._id} className="d-flex justify-content-between">
                <span>{item.name}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}

            <hr />

            <h4 className="text-success">
              Total ₹{total}
            </h4>

            <button
              className="btn btn-success w-100 mt-3"
              onClick={placeOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Payment;