import React, { useContext } from "react";
import { AuthContext } from "../middleware/authContext";

function ProfileCustomer({ customer, onClose }) {

  const { theme } = useContext(AuthContext);

  if (!customer) return null;

  return (

    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "12px",
      }}
      onClick={onClose}
    >

      {/* MODAL */}

      <div
        className={`rounded-4 shadow-lg border overflow-hidden ${theme === "dark"
          ? "bg-dark text-light border-secondary"
          : "bg-white text-dark"
          }`}
        style={{
          width: "100%",
          maxWidth: "850px",
          maxHeight: "92vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}

        <div
          className={`d-flex justify-content-between align-items-center p-3 p-md-4 border-bottom ${theme === "dark"
            ? "border-secondary"
            : ""
            }`}
        >

          <h5 className="m-0 fw-bold fs-5 fs-md-4">
            Customer Profile
          </h5>

          <button
            className={`btn btn-sm ${theme === "dark"
              ? "btn-outline-light"
              : "btn-outline-dark"
              }`}
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        {/* BODY */}

        <div
          style={{
            maxHeight: "72vh",
            overflowY: "auto",
          }}
          className="p-3 p-md-4"
        >

          {/* PROFILE TOP */}

          <div className="text-center mb-4">

            <img
              src={
                customer?.profile?.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="customer"
              className="rounded-circle border border-3 border-secondary-subtle"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
            />

            <h4 className="mt-3 fw-bold fs-5 fs-md-3">
              {customer.name}
            </h4>

            <p
              className={`${theme === "dark"
                ? "text-light"
                : "text-muted"
                }`}
            >
              {customer.email}
            </p>

            <span
              className={`badge px-3 py-2 ${customer.status === "active"
                ? "bg-success"
                : "bg-secondary"
                }`}
            >
              {customer.status || "active"}
            </span>

          </div>

          {/* INFO CARD */}

          <div className="row g-3">

            <div className="col-12 col-md-6">

              <div
                className={`rounded-4 p-3 h-100 ${theme === "dark"
                  ? "bg-black border border-secondary"
                  : "bg-light"
                  }`}
              >
                <small className="fw-semibold">
                  Phone
                </small>

                <p className="mb-0 mt-1">
                  {customer.profile?.phone || "N/A"}
                </p>
              </div>

            </div>

            <div className="col-12 col-md-6">

              <div
                className={`rounded-4 p-3 h-100 ${theme === "dark"
                  ? "bg-black border border-secondary"
                  : "bg-light"
                  }`}
              >
                <small className="fw-semibold">
                  Date Of Birth
                </small>

                <p className="mb-0 mt-1">
                  {customer.profile?.dateOfBirth || "N/A"}
                </p>
              </div>

            </div>

            <div className="col-12 col-md-6">

              <div
                className={`rounded-4 p-3 h-100 ${theme === "dark"
                  ? "bg-black border border-secondary"
                  : "bg-light"
                  }`}
              >
                <small className="fw-semibold">
                  Created
                </small>

                <p className="mb-0 mt-1">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </p>
              </div>

            </div>

            <div className="col-12 col-md-6">

              <div
                className={`rounded-4 p-3 h-100 ${theme === "dark"
                  ? "bg-black border border-secondary"
                  : "bg-light"
                  }`}
              >
                <small className="fw-semibold">
                  Postal Code
                </small>

                <p className="mb-0 mt-1">
                  {customer.profile?.address?.postalCode || "N/A"}
                </p>
              </div>

            </div>

            {/* ADDRESS */}

            <div className="col-12">

              <div
                className={`rounded-4 p-3 ${theme === "dark"
                  ? "bg-black border border-secondary"
                  : "bg-light"
                  }`}
              >

                <small className="fw-semibold">
                  Full Address
                </small>

                <p className="mb-0 mt-1">
                  {customer.profile?.address?.fullAddress || "N/A"}
                </p>

              </div>

            </div>

            {/* COUNTRY */}

            <div className="col-12 col-md-4">

              <div
                className={`rounded-4 p-3 h-100 ${theme === "dark"
                  ? "bg-black border border-secondary"
                  : "bg-light"
                  }`}
              >
                <small className="fw-semibold">
                  Country
                </small>

                <p className="mb-0 mt-1">
                  {customer.profile?.address?.country || "N/A"}
                </p>
              </div>

            </div>

            {/* STATE */}

            <div className="col-12 col-md-4">

              <div
                className={`rounded-4 p-3 h-100 ${theme === "dark"
                  ? "bg-black border border-secondary"
                  : "bg-light"
                  }`}
              >
                <small className="fw-semibold">
                  State
                </small>

                <p className="mb-0 mt-1">
                  {customer.profile?.address?.state || "N/A"}
                </p>
              </div>

            </div>

            {/* CITY */}

            <div className="col-12 col-md-4">

              <div
                className={`rounded-4 p-3 h-100 ${theme === "dark"
                  ? "bg-black border border-secondary"
                  : "bg-light"
                  }`}
              >
                <small className="fw-semibold">
                  City
                </small>

                <p className="mb-0 mt-1">
                  {customer.profile?.address?.city || "N/A"}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div
          className={`p-3 p-md-4 border-top text-end ${theme === "dark"
            ? "border-secondary"
            : ""
            }`}
        >

          <button
            className={`btn px-4 ${theme === "dark"
              ? "btn-outline-light"
              : "btn-dark"
              }`}
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