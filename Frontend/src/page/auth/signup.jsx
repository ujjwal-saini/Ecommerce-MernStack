import React, { useContext, useState } from "react";
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

function Signup() {

  const navigate = useNavigate();

  const { API, theme, toggleTheme } =
    useContext(AuthContext);

  const [showPassword, setShowPassword] =
    useState(false);

  const [btnActive, setBtnactive] =
    useState(false);

  const [formdata, setFormdata] =
    useState({
      name: "",
      email: "",
      password: "",
      profilePic: "",
    });

  // SIGNUP
  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append("name", formdata.name);
    data.append("email", formdata.email);
    data.append("password", formdata.password);
    data.append("profilePic", formdata.profilePic);

    const toastId =
      toast.loading("Registering user...");

    setBtnactive(true);

    try {

      const res = await axios.post(
        `${API}/register`,
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {

        toast.update(toastId, {
          render:
            "Signup Successful, Please Login",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }

    } catch (err) {

      toast.dismiss(toastId);

      setBtnactive(false);

      if (err.response) {

        const status = err.response.status;

        if (status === 409) {
          toast.error(
            "User already registered"
          );
        }

        else if (status === 402) {
          toast.error(
            "Please fill all fields"
          );
        }

        else {
          toast.error(
            err.response.data.message
          );
        }

      } else {

        toast.error(
          "Server not responding"
        );

      }
    }
  };

  return (

    <div
      className={`container-fluid signup-container vh-100 overflow-hidden d-flex justify-content-center align-items-center p-2 ${theme === "dark"
        ? "bg-dark"
        : "bg-light"
        }`}
    >

      {/* MAIN CARD */}
      <div
        className={`row overflow-hidden shadow-lg w-100 ${theme === "dark"
          ? "bg-black text-light"
          : "bg-white text-dark"
          }`}
        style={{
          maxWidth: "1180px",
          maxHeight: "95vh",
          borderRadius: "28px",
        }}
      >

        {/* LEFT SIDE FORM */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center">

          <div
            className="w-100 px-3 px-md-4 py-3"
            style={{
              maxWidth: "500px",
            }}
          >

            {/* THEME BTN */}
            <div className="d-flex justify-content-end mb-2">

              <button
                onClick={() =>
                  toggleTheme(
                    theme === "dark"
                      ? "light"
                      : "dark"
                  )
                }
                className={`btn rounded-circle shadow-sm d-flex justify-content-center align-items-center ${theme === "dark"
                  ? "btn-light text-dark"
                  : "btn-dark text-light"
                  }`}
                style={{
                  width: "42px",
                  height: "42px",
                  border: "none",
                }}
              >

                {theme === "dark"
                  ? <FaSun size={15} />
                  : <FaMoon size={15} />
                }

              </button>

            </div>

            {/* HEADING */}
            <div className="mb-3 text-center">

              <h1
                className="fw-bold"
                style={{
                  fontSize: "2.1rem",
                  lineHeight: "1.1",
                }}
              >
                Create Account
              </h1>

              <p
                className={`mb-0 ${theme === "dark"
                  ? "text-light opacity-75"
                  : "text-muted"
                  }`}
                style={{
                  fontSize: "14px",
                }}
              >
                Join us and start shopping today
              </p>

            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>

              {/* NAME */}
              <div className="mb-2">

                <label
                  className="fw-semibold mb-1"
                  style={{
                    fontSize: "14px",
                  }}
                >
                  Full Name
                </label>

                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className={`form-control border-0 ${theme === "dark"
                    ? "bg-dark text-light"
                    : "bg-light text-dark"
                    }`}
                  style={{
                    height: "48px",
                    borderRadius: "14px",
                    fontSize: "14px",
                  }}
                  onChange={(e) =>
                    setFormdata({
                      ...formdata,
                      name: e.target.value,
                    })
                  }
                />

              </div>

              {/* EMAIL */}
              <div className="mb-2">

                <label
                  className="fw-semibold mb-1"
                  style={{
                    fontSize: "14px",
                  }}
                >
                  Email Address
                </label>

                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className={`form-control border-0 ${theme === "dark"
                    ? "bg-dark text-light"
                    : "bg-light text-dark"
                    }`}
                  style={{
                    height: "48px",
                    borderRadius: "14px",
                    fontSize: "14px",
                  }}
                  onChange={(e) =>
                    setFormdata({
                      ...formdata,
                      email: e.target.value,
                    })
                  }
                />

              </div>

              {/* PASSWORD */}
              <div className="mb-2 position-relative">

                <label
                  className="fw-semibold mb-1"
                  style={{
                    fontSize: "14px",
                  }}
                >
                  Password
                </label>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  required
                  placeholder="Create password"
                  className={`form-control border-0 pe-5 ${theme === "dark"
                    ? "bg-dark text-light"
                    : "bg-light text-dark"
                    }`}
                  style={{
                    height: "48px",
                    borderRadius: "14px",
                    fontSize: "14px",
                  }}
                  onChange={(e) =>
                    setFormdata({
                      ...formdata,
                      password:
                        e.target.value,
                    })
                  }
                />

                <span
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="position-absolute end-0 me-3"
                  style={{
                    top: "44px",
                    cursor: "pointer",
                    fontSize: "14px",
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

              {/* IMAGE */}
              <div className="mb-3">

                <label
                  className="fw-semibold mb-1"
                  style={{
                    fontSize: "14px",
                  }}
                >
                  Profile Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  className={`form-control ${theme === "dark"
                    ? "bg-dark text-light border-secondary"
                    : ""
                    }`}
                  style={{
                    height: "48px",
                    borderRadius: "14px",
                    paddingTop: "10px",
                    fontSize: "13px",
                  }}
                  onChange={(e) =>
                    setFormdata({
                      ...formdata,
                      profilePic:
                        e.target.files[0],
                    })
                  }
                />

              </div>

              {/* SIGNUP BTN */}
              <button
                type="submit"
                disabled={btnActive}
                className="btn w-100 text-white fw-bold"
                style={{
                  height: "50px",
                  borderRadius: "14px",
                  background:
                    "linear-gradient(90deg,#ff7b00,#ff9d42)",
                  border: "none",
                  fontSize: "15px",
                }}
              >
                {btnActive
                  ? "Creating..."
                  : "Create Account"}
              </button>

              {/* DIVIDER */}
              <div className="d-flex align-items-center my-2">

                <hr className="flex-grow-1" />

                <span
                  className={`mx-2 small ${theme === "dark"
                    ? "text-light opacity-75"
                    : "text-muted"
                    }`}
                  style={{
                    fontSize: "12px",
                  }}
                >
                  Or continue with
                </span>

                <hr className="flex-grow-1" />

              </div>

              {/* SOCIAL */}
              <div className="row g-2">

                <div className="col-6">

                  <button
                    type="button"
                    className={`btn w-100 fw-semibold ${theme === "dark"
                      ? "btn-dark border"
                      : "btn-light border"
                      }`}
                    style={{
                      height: "46px",
                      borderRadius: "14px",
                      fontSize: "13px",
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
                      height: "46px",
                      borderRadius: "14px",
                      fontSize: "13px",
                    }}
                  >
                    <FaFacebookF className="me-2 text-primary" />
                    Facebook
                  </button>

                </div>

              </div>

              {/* LOGIN */}
              <p
                className={`text-center mt-3 mb-0 ${theme === "dark"
                  ? "text-light opacity-75"
                  : "text-muted"
                  }`}
                style={{
                  fontSize: "14px",
                }}
              >
                Already have an account?

                <Link
                  to="/login"
                  className="text-decoration-none fw-bold ms-2"
                  style={{
                    color: "#ff7b00",
                  }}
                >
                  Login
                </Link>

              </p>

            </form>

          </div>

        </div>

        {/* RIGHT SIDE TEXT */}
        <div className="col-lg-6 d-none d-lg-flex p-3">

          <div
            className="w-100 position-relative overflow-hidden"
            style={{
              borderRadius: "8%",
              height: "100%",
              background:
                "linear-gradient(180deg, #ff7b00cc 0%, #d27926d3 100%)",
            }}
          >

            <div className="px-4 py-3 position-relative z-1">

              {/* LOGO */}
              <div className="d-flex align-items-center gap-3 mb-3">

                <div
                  className="d-flex justify-content-center align-items-center rounded-circle bg-white"
                  style={{
                    width: "46px",
                    height: "46px",
                  }}
                >
                  <FaShoppingBag
                    style={{
                      color: "#ff7b00",
                      fontSize: "1.3rem",
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
                  fontSize: "2.8rem",
                  lineHeight: "1.1",
                }}
              >
                Start your
                <br />
                shopping
                <br />
                journey
                <br />
                with us
                <br />
                today.
              </h1>

              {/* DESC */}
              <p
                className="text-white mt-3"
                style={{
                  maxWidth: "430px",
                  opacity: "0.9",
                  fontSize: "0.95rem",
                  lineHeight: "1.7",
                }}
              >
                Create your account and
                explore thousands of
                products with smooth,
                secure and modern
                shopping experience.
              </p>

              {/* STATS */}
              <div className="row mt-4 g-3">

                <div className="col-4">

                  <h2 className="fw-bold text-white">
                    50K+
                  </h2>

                  <p className="text-white opacity-75 small">
                    Happy Users
                  </p>

                </div>

                <div className="col-4">

                  <h2 className="fw-bold text-white">
                    100K+
                  </h2>

                  <p className="text-white opacity-75 small">
                    Orders
                  </p>

                </div>

                <div className="col-4">

                  <h2 className="fw-bold text-white">
                    24/7
                  </h2>

                  <p className="text-white opacity-75 small">
                    Support
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* MOBILE FIX */}
      <style>
        {`
          body{
            overflow:hidden;
          }

          @media (max-width:768px){

            .signup-container{
              min-height:100dvh;
              overflow-y:auto;
              padding:8px;
            }

            .signup-container .row{
              max-height:none !important;
            }

          }
        `}
      </style>

    </div>
  );
}

export default Signup;