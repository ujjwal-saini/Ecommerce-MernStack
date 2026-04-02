import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../middleware/authContext";
import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();
  const { isLoggedIn, fetchMe, role, API } = useContext(AuthContext);

  const [form, setfrom] = useState({
    email: "",
    password: ""
  });

  const handlesubmit = async (e) => {

    e.preventDefault();

    const toastId = toast.loading("Logging in...");

    try {

      const res = await axios.post(
        `${API}/login`,
        form,
        {
          withCredentials: true
        }
      );

      if (res.status === 200) {

        toast.update(toastId, {
          render: "Login Successful ",
          type: "success",
          isLoading: false,
          autoClose: 2000
        });

        await fetchMe();

        setTimeout(() => {
          if (res.data.user.role === "admin") {
            navigate("/admindashboard");
          } else {
            navigate("/");
          }
        }, 4000);
      }

    } catch (err) {

      toast.dismiss(toastId);

      if (err.response) {

        const status = err.response.status;

        if (status === 409) {
          toast.error("User already registered");
        }
        else if (status === 402) {
          toast.error("Please fill email and password");
        }
        else if (status === 401) {
          toast.error("Invalid email or password");
        }
        else {
          toast.error(err.response.data.message);
        }

      } else {
        toast.error("Server not responding");
      }
    }
  };

  useEffect(() => {

    if (isLoggedIn === true && role === "user") {
      navigate("/");
    }
    else if (isLoggedIn === true && role === "admin") {
      navigate("/admindashboard");
    }

  }, [isLoggedIn, role]);

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)"
      }}
    >

      <div className="card shadow p-4" style={{ width: "400px" }}>

        <h3 className="text-center mb-4 fw-bold">
          Login to ShopPoint
        </h3>

        <form onSubmit={handlesubmit}>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">
              Email address
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) =>
                setfrom({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={(e) =>
                setfrom({ ...form, password: e.target.value })
              }
            />
          </div>

          <div className="d-flex justify-content-between mb-3">
            <div>
              <input
                type="checkbox"
                className="form-check-input me-2"
              />
              <label className="form-check-label">
                Remember me
              </label>
            </div>

            <Link
              to="/forgot-password"
              className="text-decoration-none"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-warning w-100 fw-bold"
          >
            Login
          </button>

          <hr />

          <p className="text-center">
            Don’t have an account?
            <Link
              to="/signup"
              className="text-decoration-none fw-bold ms-2"
            >
              Sign Up
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;