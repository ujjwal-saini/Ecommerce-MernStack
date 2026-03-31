import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../middleware/authContext";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function UpdatePass() {
  const {email } = useParams();
  const { API } = useContext(AuthContext);
  const navigate = useNavigate();
console.log(email);


  const [form, setForm] = useState({
    email: email,
    newPassword: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log(form);
    try {
      const res = await axios.patch(`${API}/reset-password`,form,
        {
          withCredentials: true
        });
      if (res.status === 200) {
        alert("Password updated successfully");
        navigate("/login");
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server not responding");
      }
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)"
      }}>
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4 fw-bold">
          Update Password
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={form.email}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm new password"
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-warning w-100 fw-bold">
            Update Password
          </button>
          <hr />
          <Link to="/login" className="text-center">
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default UpdatePass;