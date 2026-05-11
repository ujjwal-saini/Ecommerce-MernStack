import React from "react";
import AddressSection from "./AddressSection";
import DeliverySection from "./deliverysection";
import PaymentSection from "./PaymentSection";
import OrderSummary from "./OrderSummary";

function Orders() {
  return (
    <div className="container-fluid py-4">

      <h2 className="fw-bold mb-4 text-center text-md-start">
        Checkout
      </h2>

      <div className="row g-4">

        {/* LEFT SIDE */}
        <div className="col-lg-8">

          <AddressSection />
          <DeliverySection />
          <PaymentSection />

        </div>

        {/* RIGHT SIDE - STICKY SUMMARY */}
        <div className="col-lg-4">
          <div className="order-summary-wrapper">
            <OrderSummary />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Orders;