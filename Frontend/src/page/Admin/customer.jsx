import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { AuthContext } from "../../middleware/authContext";
import Loader from "../../components/loading";
import ProfileCustomer from "../../components/ProfileCustomer";

function Customer() {

  const { API, theme } = useContext(AuthContext);

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {

    try {

      const res = await axios.get(`${API}/customers`);

      setCustomers(res.data.data);

    } catch (error) {

      console.log(error);

    }
  };

  // DELETE CUSTOMER

  const handleDelete = async (id) => {

    try {

      await axios.delete(`${API}/deletecustomer/${id}`);

      fetchCustomers();

      Swal.fire({
        title: "Deleted!",
        text: "Customer deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (error) {

      console.log(error);

      Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
      });

    }
  };

  // VIEW CUSTOMER

  const handleView = (customer) => {

    setSelectedCustomer(customer);

    setShowProfile(true);

  };

  return (

    <div
      className={`container-fluid p-2 p-md-4 min-vh-100 ${theme === "dark"
        ? "bg-black text-light"
        : "bg-light text-dark"
        }`}
    >

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-3 mb-md-4">

        <h2 className="fw-bold fs-4 fs-md-2 m-0">
          Customers
        </h2>

      </div>

      {/* LOADER */}

      {customers.length === 0 ? (

        <div className="text-center mt-5">
          <Loader />
        </div>

      ) : (

        <div
          className={`card border-0 shadow rounded-4 overflow-hidden ${theme === "dark"
            ? "bg-dark text-light"
            : "bg-white text-dark"
            }`}
        >

          {/* MOBILE CARD VIEW */}

          <div className="d-block d-md-none p-2">

            {customers.map((c) => (

              <div
                key={c._id}
                className={`rounded-4 p-3 mb-3 shadow-sm ${theme === "dark"
                  ? "bg-black border border-secondary"
                  : "bg-light"
                  }`}
              >

                {/* TOP */}

                <div className="d-flex align-items-center gap-3">

                  <img
                    src={
                      c?.profile?.profilePic ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="customer"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />

                  <div className="flex-grow-1 overflow-hidden">

                    <h6 className="fw-bold mb-1 text-truncate">
                      {c.name}
                    </h6>

                    <p className="small mb-1 text-truncate">
                      {c.email}
                    </p>

                    <span
                      className={`badge ${c.status === "active"
                        ? "bg-success"
                        : "bg-secondary"
                        }`}
                    >
                      {c.status || "active"}
                    </span>

                  </div>

                </div>

                {/* INFO */}

                <div className="mt-3 small">

                  <div className="mb-2">
                    <b>Phone:</b>{" "}
                    {c?.profile?.phone || "N/A"}
                  </div>

                  <div className="mb-2">
                    <b>DOB:</b>{" "}
                    {c?.profile?.dateOfBirth || "N/A"}
                  </div>

                  <div className="mb-2">
                    <b>Address:</b>{" "}
                    {c?.profile?.address?.fullAddress || "N/A"}
                  </div>

                  <div>
                    <b>Created:</b>{" "}
                    {new Date(c.createdAt).toLocaleDateString()}
                  </div>

                </div>

                {/* BUTTONS */}

                <div className="d-flex gap-2 mt-3">

                  <button
                    className="btn btn-primary btn-sm w-100"
                    onClick={() => handleView(c)}
                  >
                    View
                  </button>

                  <button
                    className="btn btn-danger btn-sm w-100"
                    onClick={async () => {

                      const result = await Swal.fire({
                        title: "Are you sure?",
                        text: "You want to delete this customer?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#dc3545",
                        cancelButtonColor: "#0d6efd",
                        confirmButtonText: "Yes, Delete it!",
                      });

                      if (!result.isConfirmed) return;

                      handleDelete(c._id);

                    }}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* DESKTOP TABLE */}

          <div className="d-none d-md-block card-body table-responsive">

            <table
              className={`table align-middle customer-table text-nowrap ${theme === "dark"
                ? "table table-color"
                : "table table-hover"
                }`}
            >

              <thead
                className={
                  theme === "dark"
                    ? "table-dark"
                    : "table-light"
                }
              >

                <tr>

                  <th>Image</th>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Phone</th>

                  <th>Address</th>

                  <th>Date Of Birth</th>

                  <th>Status</th>

                  <th>Created</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {customers.map((c) => (

                  <tr key={c._id}>

                    <td>

                      <img
                        src={
                          c?.profile?.profilePic ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="customer"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />

                    </td>

                    <td>{c.name}</td>

                    <td>{c.email}</td>

                    <td>
                      {c?.profile?.phone || "N/A"}
                    </td>

                    <td>
                      {c?.profile?.address?.fullAddress || "N/A"}
                    </td>

                    <td>
                      {c?.profile?.dateOfBirth || "N/A"}
                    </td>

                    <td>

                      <span
                        className={`badge ${c.status === "active"
                          ? "bg-success"
                          : "bg-secondary"
                          }`}
                      >
                        {c.status || "active"}
                      </span>

                    </td>

                    <td>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>

                    <td>

                      <div className="d-flex gap-2">

                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleView(c)}
                        >
                          View
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={async () => {

                            const result = await Swal.fire({
                              title: "Are you sure?",
                              text: "You want to delete this customer?",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#dc3545",
                              cancelButtonColor: "#0d6efd",
                              confirmButtonText: "Yes, Delete it!",
                            });

                            if (!result.isConfirmed) return;

                            handleDelete(c._id);

                          }}
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

      {/* PROFILE POPUP */}

      {showProfile && (

        <ProfileCustomer
          customer={selectedCustomer}
          onClose={() => setShowProfile(false)}
        />

      )}

    </div>
  );
}

export default Customer;