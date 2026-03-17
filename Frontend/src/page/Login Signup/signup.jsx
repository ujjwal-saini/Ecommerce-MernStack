import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { GoogleLoginButton } from 'react-social-login-buttons';
import { AuthContext } from "../../middleware/authContext";

function Signup() {
  const [formdata, setFormdata] = useState({ name: "", email: "", password: "", profilePic: "" })
  const { API } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formdata.name);
    data.append("email", formdata.email);
    data.append("password", formdata.password);
    data.append("profilePic", formdata.profilePic);

    try {
       const res = await axios.post(`${API}/register`,data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            },
        }
      );
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)"
      }}>
      <div
        className="card shadow-lg p-4 border-0 rounded-4"
        style={{ width: "420px" }}>
        <h3 className="text-center mb-4 fw-bold">Create Your Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              onChange={(e) => {
                setFormdata({ ...formdata, name: e.target.value })
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => {
                setFormdata({ ...formdata, email: e.target.value })
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Create password"
              onChange={(e) => {
                setFormdata({ ...formdata, password: e.target.value })
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Profile Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => {
                setFormdata({
                  ...formdata,
                  profilePic: e.target.files[0],
                });
              }}
            />
          </div>
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label">
              I agree to the Terms & Conditions
            </label>
          </div>
          <button type="submit" className="btn btn-warning w-100 fw-bold mb-3">
            Sign Up
          </button>
          <button type="button" className=" btn w-100 ">
            <GoogleLoginButton />
          </button>
          <hr />
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none fw-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;






