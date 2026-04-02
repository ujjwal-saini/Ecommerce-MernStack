import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../middleware/authContext";
import Loader from "../../components/loading";
import { CupStraw } from "react-bootstrap-icons";

function Customer() {
  const { API } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);

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
  console.log(customers);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete customer?")) return;

    try {
      await axios.delete(`${API}/deletecustomer/${id}`);
      fetchCustomers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid p-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Customers</h2>
      </div>

      {/* Loader */}
      {customers.length === 0 ? (
        <div className="text-center mt-5">
          <Loader />
        </div>
      ) : (
        <div className="card shadow">

          <div className="card-body table-responsive">

            <table className="table table-hover align-middle customer-table text-nowrap">

              <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
              <th>dateOfBirth</th>
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
                        className="customer-img"

                      />
                    </td>

                    <td title={c.name}>
                      {c.name}
                    </td>

                    <td title={c.email}>
                      {c.email}
                    </td>

                    <td>
                      {c.profile.phone || "N/A"}
                    </td>

                    <td title={c?.profile?.address?.fullAddress}>
                      {c?.profile?.address?.fullAddress || "N/A"}
                    </td>
                    <td>
                      {c.profile.dateOfBirth}
                    </td>


                    <td>
                      <span
                        className={`badge ${
                          c.status === "active"
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
                      <button className="btn btn-primary btn-sm me-2">
                        View
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        </div>
      )}
    </div>
  );
}

export default Customer;