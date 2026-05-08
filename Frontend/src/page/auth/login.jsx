import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../middleware/authContext";
import { toast } from "react-toastify";

import {
  FaGoogle,
  FaFacebookF,
  FaEye,
  FaEyeSlash,
  FaShoppingBag,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const {
    isLoggedIn,
    fetchMe,
    role,
    API,
    theme,
    toggleTheme,
  } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const [loginSuccess, setLoginSuccess] = useState(false);

  const [activeLogin, setActiveLogin] = useState(false);

  const [form, setfrom] = useState({
    email: "",
    password: "",
  });

  // LOGIN
  const handlesubmit = async (e) => {

    e.preventDefault();

    const toastId = toast.loading("Logging in...");

    setActiveLogin(true);

    try {

      const res = await axios.post(
        `${API}/login`,
        form,
        { withCredentials: true }
      );

      if (res.status === 200) {

        toast.update(toastId, {
          render: "Login Successful 🚀",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        await fetchMe();

        setLoginSuccess(true);

        setTimeout(() => {

          if (res.data.user.role === "admin") {
            navigate("/admindashboard");
          } else {
            navigate("/");
          }

        }, 2000);
      }

    } catch (err) {

      toast.dismiss(toastId);

      setActiveLogin(false);

      if (err.response) {

        const status = err.response.status;

        if (status === 401) {
          toast.error("Invalid email or password");
        } else {
          toast.error(err.response.data.message);
        }

      } else {
        toast.error("Server not responding");
      }
    }
  };

  // REDIRECT
  useEffect(() => {

    if (!loginSuccess) {

      if (isLoggedIn === true && role === "user") {
        navigate("/");
      }

      else if (isLoggedIn === true && role === "admin") {
        navigate("/admindashboard");
      }
    }

  }, [isLoggedIn, role]);

  return (

    <div
      className={`container-fluid login-container vh-100 overflow-hidden d-flex justify-content-center align-items-center p-2 p-md-3 ${theme === "dark"
        ? "bg-dark"
        : "bg-light"
        }`}
    >

      {/* MAIN CARD */}
      <div
        className={`row overflow-hidden shadow-lg w-100 h-100 ${theme === "dark"
          ? "bg-black text-light"
          : "bg-white text-dark"
          }`}
        style={{
          maxWidth: "1250px",
          maxHeight: "100%",
          borderRadius: "35px",
        }}
      >

        {/* LEFT SIDE */}
        <div className="col-lg-6 d-none d-lg-flex p-4">

          <div
            className="w-100 position-relative overflow-hidden
       "

            style={{
              borderRadius: "10%",
              height: "100%",
              background:
                "linear-gradient(180deg, #ff7b00cc 0%, #d27926d3 100%)",
            }}
          >
            {/* CONTENT */}
            <div className="px-5 py-4 position-relative z-1">

              {/* LOGO */}
              <div className="d-flex align-items-center gap-3 mb-2">

                <div
                  className="d-flex justify-content-center align-items-center rounded-circle bg-white"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <FaShoppingBag
                    style={{
                      color: "#ff7b00",
                      fontSize: "1.5rem",
                    }}
                  />
                </div>

                <h3 className="fw-bold text-white m-0">
                  ShopPoint
                </h3>

              </div>

              {/* TITLE */}
              <h1
                className="fw-bold text-white"
                style={{
                  fontSize: "3.5rem",
                  lineHeight: "1.1",
                }}
              >
                Elevate your
                <br />
                shopping
                <br />
                experience
                <br />
                with smart
                <br />
                commerce.
              </h1>

              {/* DESCRIPTION */}
              <p
                className="text-white mt-4"
                style={{
                  maxWidth: "470px",
                  opacity: "0.9",
                  fontSize: "1rem",
                  lineHeight: "1.8",
                }}
              >
                Discover trending products, manage your orders,
                and enjoy seamless shopping with our modern
                eCommerce platform built for speed, style,
                and convenience.
              </p>

              {/* STATS */}
              <div className="row mt-4 g-4">

                <div className="col-4">

                  <h2 className="fw-bold text-white">
                    10K+
                  </h2>

                  <p className="text-white opacity-75 small">
                    Active Users
                  </p>

                </div>

                <div className="col-4">

                  <h2 className="fw-bold text-white">
                    25K+
                  </h2>

                  <p className="text-white opacity-75 small">
                    Products
                  </p>

                </div>

                <div className="col-4">

                  <h2 className="fw-bold text-white">
                    99%
                  </h2>

                  <p className="text-white opacity-75 small">
                    Satisfaction
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center">

          <div
            className="w-100 px-4 px-md-5 py-4"
            style={{
              maxWidth: "520px",
            }}
          >

            {/* THEME TOGGLE */}
            <div className="d-flex justify-content-end mb-3">

              <button
                onClick={() =>
                  toggleTheme(theme === "dark" ? "light" : "dark")
                }
                className={`btn rounded-circle shadow-sm d-flex justify-content-center align-items-center ${theme === "dark"
                  ? "btn-light text-dark"
                  : "btn-dark text-light"
                  }`}
                style={{
                  width: "48px",
                  height: "48px",
                  border: "none",
                  transition: "0.3s ease",
                }}
              >

                {theme === "dark"
                  ? <FaSun size={17} />
                  : <FaMoon size={17} />
                }

              </button>

            </div>

            {/* HEADING */}
            <div className="mb-4 text-center">

              <h1
                className="fw-bold"
                style={{
                  fontSize: "2.8rem",
                }}
              >
                Welcome Back
              </h1>

              <p
                className={`${theme === "dark"
                  ? "text-light opacity-75"
                  : "text-muted"
                  }`}
              >
                Login to continue your shopping journey
              </p>

            </div>

            {/* FORM */}
            <form onSubmit={handlesubmit}>

              {/* EMAIL */}
              <div className="mb-3">

                <label className="fw-semibold mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  className={`form-control border-0 ${theme === "dark"
                    ? "bg-dark text-light"
                    : "bg-light text-dark"
                    }`}
                  placeholder="Enter your email"
                  required
                  style={{
                    height: "58px",
                    borderRadius: "18px",
                    fontSize: "15px",
                  }}
                  onChange={(e) =>
                    setfrom({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />

              </div>

              {/* PASSWORD */}
              <div className="mb-2 position-relative">

                <label className="fw-semibold mb-2">
                  Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control border-0 pe-5 ${theme === "dark"
                    ? "bg-dark text-light"
                    : "bg-light text-dark"
                    }`}
                  placeholder="Enter your password"
                  required
                  style={{
                    height: "58px",
                    borderRadius: "18px",
                    fontSize: "15px",
                  }}
                  onChange={(e) =>
                    setfrom({
                      ...form,
                      password: e.target.value,
                    })
                  }
                />

                <span
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="position-absolute end-0 me-4"
                  style={{
                    top: "55px",
                    cursor: "pointer",
                    color:
                      theme === "dark"
                        ? "#bbb"
                        : "#666",
                  }}
                >
                  {showPassword
                    ? <FaEyeSlash />
                    : <FaEye />}
                </span>

              </div>

              {/* FORGOT */}
              <div className="text-end mb-3">

                <Link
                  to="/forgot-password"
                  className={`text-decoration-none small fw-medium ${theme === "dark"
                    ? "text-light"
                    : "text-dark"
                    }`}
                >
                  Forgot Password?
                </Link>

              </div>

              {/* LOGIN BTN */}
              <button
                type="submit"
                disabled={activeLogin}
                className="btn w-100 text-white fw-bold"
                style={{
                  height: "58px",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(90deg,#ff7b00,#ff9d42)",
                  border: "none",
                  fontSize: "1rem",
                }}
              >
                {activeLogin
                  ? "Logging in..."
                  : "Login"}
              </button>

              {/* DIVIDER */}
              <div className="d-flex align-items-center my-3">

                <hr className="flex-grow-1" />

                <span
                  className={`mx-3 small ${theme === "dark"
                    ? "text-light opacity-75"
                    : "text-muted"
                    }`}
                >
                  Or continue with
                </span>

                <hr className="flex-grow-1" />

              </div>

              {/* SOCIAL */}
              <div className="row g-3">

                <div className="col-6">

                  <button
                    type="button"
                    className={`btn w-100 fw-semibold ${theme === "dark"
                      ? "btn-dark border"
                      : "btn-light border"
                      }`}
                    style={{
                      height: "55px",
                      borderRadius: "16px",
                    }}
                  >
                    <FaGoogle className="me-2" />
                    Google
                  </button>

                </div>

                <div className="col-6">

                  <button
                    type="button"
                    className={`btn w-100 fw-semibold ${theme === "dark"
                      ? "btn-dark border"
                      : "btn-light border"
                      }`}
                    style={{
                      height: "55px",
                      borderRadius: "16px",
                    }}
                  >
                    <FaFacebookF className="me-2 text-primary" />
                    Facebook
                  </button>

                </div>

              </div>

              {/* SIGNUP */}
              <p
                className={`text-center mt-4 ${theme === "dark"
                  ? "text-light opacity-75"
                  : "text-muted"
                  }`}
              >
                Don’t have an account?

                <Link
                  to="/signup"
                  className="text-decoration-none fw-bold ms-2"
                  style={{
                    color: "#ff7b00",
                  }}
                >
                  Create Account
                </Link>

              </p>

            </form>

          </div>

        </div>

      </div>

      {/* MOBILE + HEIGHT FIX */}
      <style>
        {`
          body{
            overflow:hidden;
          }

          @media (max-width: 768px){

            .login-container{
              min-height:100dvh;
              overflow-y:auto;
              padding:10px;
            }

          }
        `}
      </style>

    </div>
  );
}

export default Login;