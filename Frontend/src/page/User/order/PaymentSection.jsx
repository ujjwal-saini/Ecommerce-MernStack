import React, { useState, useContext } from "react";
import { AuthContext } from "../../../middleware/authContext";

function PaymentSection() {
  const [payment, setPayment] = useState("cod");
  const { theme } = useContext(AuthContext);

  return (
    <div className={`payment-card p-3 p-md-4 shadow-lg border-0 rounded-4 ${theme}`}>

      <h4 className="mb-3">💳 Choose Payment Method</h4>
      <hr />

      {/* COD */}
      <div
        onClick={() => setPayment("cod")}
        className={`payment-option d-flex align-items-center justify-content-between p-3 mb-3 rounded-3 ${payment === "cod" ? "active" : ""
          }`}
      >
        <div className="d-flex align-items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2331/2331946.png"
            width="35"
            alt="cod"
          />
          <div>
            <strong>Cash on Delivery</strong>
            <div className="text-muted small">Pay when you receive</div>
          </div>
        </div>

        <input type="radio" checked={payment === "cod"} readOnly />
      </div>

      {/* UPI */}
      <div
        onClick={() => setPayment("upi")}
        className={`payment-option p-3 mb-3 rounded-3 ${payment === "upi" ? "active" : ""
          }`}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6124/6124998.png"
              width="35"
              alt="upi"
            />
            <div>
              <strong>UPI / Google Pay</strong>
              <div className="text-muted small">Scan & Pay instantly</div>
            </div>
          </div>

          <input type="radio" checked={payment === "upi"} readOnly />
        </div>

        {payment === "upi" && (
          <div className="text-center mt-3">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi-payment"
              className="qr"
              alt="QR"
            />
            <div className="small text-muted mt-2">
              Scan using GPay / PhonePe / Paytm
            </div>
          </div>
        )}
      </div>

      {/* CARD */}
      <div
        onClick={() => setPayment("card")}
        className={`payment-option p-3 mb-3 rounded-3 ${payment === "card" ? "active" : ""
          }`}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/196/196578.png"
              width="35"
              alt="card"
            />
            <div>
              <strong>Credit / Debit Card</strong>
              <div className="text-muted small">Visa / Mastercard</div>
            </div>
          </div>

          <input type="radio" checked={payment === "card"} readOnly />
        </div>

        {payment === "card" && (
          <div className="mt-3">
            <input className="form-control mb-2" placeholder="Card Number" />
            <div className="d-flex gap-2 flex-column flex-md-row">
              <input className="form-control" placeholder="MM/YY" />
              <input className="form-control" placeholder="CVV" />
            </div>
          </div>
        )}
      </div>

      {/* STYLE */}
      <style>{`
        .payment-card {
          background: var(--bg);
          color: var(--text);
          transition: 0.3s;
        }

        .payment-option {
          border: 1px solid #ddd;
          cursor: pointer;
          transition: 0.2s;
          background: var(--card);
        }

        .payment-option:hover {
          transform: scale(1.01);
        }

        .payment-option.active {
          border: 2px solid #28a745;
          background: rgba(40, 167, 69, 0.1);
        }

        .qr {
          border-radius: 8px;
          background: white;
          padding: 5px;
        }

        /* LIGHT */
        .light {
          --bg: #fff;
          --text: #000;
          --card: #fff;
        }

        /* DARK */
        .dark {
          --bg: #1e1e1e;
          --text: #fff;
          --card: #2a2a2a;
        }

        /* mobile fix */
        @media (max-width: 768px) {
          .payment-card {
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default PaymentSection;