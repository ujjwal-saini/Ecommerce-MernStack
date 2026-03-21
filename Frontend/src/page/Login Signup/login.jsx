import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { AuthContext } from "../../middleware/authContext";
import { useContext } from "react";


function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, fetchMe, role , API} = useContext(AuthContext);
  console.log(API);
  const [form, setfrom] = useState({
    email: "",
    password: ""
  });

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API}/login`,
        form,
        {
          withCredentials: true
        }
      );
      if (res.status === 200) {
        if (res.data.user.role === "admin") {
          await fetchMe();
          navigate("/admindashboard");
        } else {
          await fetchMe();
          navigate("/dashboard");
        }
      }
      if(res.status === 404)
      {
        alert(res.message);
      }
      
    } catch (err) {
      console.log(err);
    }
  };
  

  useEffect(() => {
    console.log(isLoggedIn , role);
    if (isLoggedIn === true && role === "user") {
      navigate("/dashboard");
    } else if (isLoggedIn === true && role === "admin") {
      navigate("/admindashboard");
    }
  }, [isLoggedIn])


  return (
    <div className="container-fluid bg-light d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)"
      }}>
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4 fw-bold">Login to ShopPoint</h3>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => {
                setfrom({ ...form, email: e.target.value })
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={(e) => {
                setfrom({ ...form, password: e.target.value })
              }}
            />
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div>
              <input type="checkbox" className="form-check-input me-2" />
              <label className="form-check-label">Remember me</label>
            </div>
            <Link to="/forgot-password" className="text-decoration-none">
              Forgot Password?
            </Link>
          </div>
          <button type="submit" className="btn btn-warning w-100 fw-bold">
            Login
          </button>
          <hr />
          <p className="text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-decoration-none fw-bold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
