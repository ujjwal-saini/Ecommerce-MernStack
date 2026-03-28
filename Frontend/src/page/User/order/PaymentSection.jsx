import React, { useState } from "react";

function PaymentSection() {

  const [payment, setPayment] = useState("cod");

  return (
    <div className="card p-3 mb-3 shadow">

      <h5>💳 Payment Method</h5>
      <hr />

      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          checked={payment === "cod"}
          onChange={() => setPayment("cod")}
        />
        <label className="form-check-label">
          Cash on Delivery
        </label>
      </div>

      <div className="form-check mt-2">
        <input
          type="radio"
          className="form-check-input"
          checked={payment === "upi"}
          onChange={() => setPayment("upi")}
        />
        <label className="form-check-label">
          UPI
        </label>
      </div>

      <div className="form-check mt-2">
        <input
          type="radio"
          className="form-check-input"
          checked={payment === "card"}
          onChange={() => setPayment("card")}
        />
        <label className="form-check-label">
          Credit/Debit Card
        </label>
      </div>

    </div>
  );
}

export default PaymentSection;