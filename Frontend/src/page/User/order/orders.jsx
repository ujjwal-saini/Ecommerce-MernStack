import React from "react";
import AddressSection from "./AddressSection";
import DeliverySection from "./deliverysection";
import PaymentSection from "./PaymentSection";
import OrderSummary from "./OrderSummary";

function Orders() {
  return (
    <div className="container mt-4">

      <h2 className="mb-4">Checkout</h2>

      <div className="row">

        <div className="col-md-8">

          <AddressSection />

          <DeliverySection />

          <PaymentSection />

        </div>

        <div className="col-md-4">

          <OrderSummary />

        </div>

      </div>

    </div>
  );
}

export default Orders;