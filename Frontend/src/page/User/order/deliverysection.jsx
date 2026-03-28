import React, { useState } from "react";

function DeliverySection() {

  const [delivery, setDelivery] = useState("standard");

  return (
    <div className="card p-3 mb-3 shadow">

      <h5>🚚 Delivery Method</h5>
      <hr />

      <div className="form-check">

        <input
          className="form-check-input"
          type="radio"
          checked={delivery === "standard"}
          onChange={() => setDelivery("standard")}
        />

        <label className="form-check-label">
          Standard Delivery (Free - 3 Days)
        </label>
      </div>

      <div className="form-check mt-2">

        <input
          className="form-check-input"
          type="radio"
          checked={delivery === "express"}
          onChange={() => setDelivery("express")}
        />

        <label className="form-check-label">
          Express Delivery (₹50 - 1 Day)
        </label>
      </div>

    </div>
  );
}

export default DeliverySection;