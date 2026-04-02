import React, { useEffect } from "react";

function ProfileCustomer({ customer, onClose }) {

  if (!customer) return null;



  return (

    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.4)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
      onClick={onClose}
    >

      <div
        className="bg-white rounded shadow"
        style={{
          width: "100%",
          maxWidth: "800px",
          maxHeight: "90vh",
          overflow: "hidden"
        }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}

        <div className="d-flex justify-content-between align-items-center border-bottom p-3">

          <h5 className="m-0">
            Customer Profile
          </h5>

          <button
            className="btn-close"
            onClick={onClose}
          ></button>

        </div>


        <div
          style={{
            maxHeight: "70vh",
            overflowY: "auto",
            padding: "20px"
          }}
        >

          <div className="text-center mb-4">

            <img
              src={
                customer?.profile?.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="customer"
              className="rounded-circle"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover"
              }}
            />

            <h4 className="mt-3">
              {customer.name}
            </h4>

            <p className="text-muted">
              {customer.email}
            </p>

          </div>

          <hr />

          <div className="row">

            <div className="col-md-6 mb-3">
              <strong>Phone</strong>
              <p>{customer.profile?.phone || "N/A"}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Status</strong>
              <p>{customer.status || "active"}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Date of Birth</strong>
              <p>{customer.profile?.dateOfBirth || "N/A"}</p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Created</strong>
              <p>
                {new Date(customer.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="col-12 mb-3">
              <strong>Address</strong>
              <p>
                {customer.profile?.address?.fullAddress || "N/A"}
              </p>
            </div>

            <div className="col-md-4 mb-3">
              <strong>Country</strong>
              <p>
                {customer.profile?.address?.country || "N/A"}
              </p>
            </div>

            <div className="col-md-4 mb-3">
              <strong>State</strong>
              <p>
                {customer.profile?.address?.state || "N/A"}
              </p>
            </div>

            <div className="col-md-4 mb-3">
              <strong>City</strong>
              <p>
                {customer.profile?.address?.city || "N/A"}
              </p>
            </div>

            <div className="col-md-6 mb-3">
              <strong>Postal Code</strong>
              <p>
                {customer.profile?.address?.postalCode || "N/A"}
              </p>
            </div>

          </div>

        </div>


        <div className="border-top p-3 text-end">

          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProfileCustomer;