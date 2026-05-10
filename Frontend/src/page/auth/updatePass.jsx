import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../middleware/authContext";
import {
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";

import { toast } from "react-toastify";

import {
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaShoppingBag,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function UpdatePass() {

  const { email } = useParams();

  const { API, theme, toggleTheme } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    email: email,
    newPassword: "",
    confirmPassword: "",
  });

  // UPDATE PASSWORD
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      form.newPassword !==
      form.confirmPassword
    ) {

      toast.error(
        "Passwords do not match"
      );

      return;
    }

    const toastId =
      toast.loading(
        "Updating password..."
      );

    setLoading(true);

    try {

      const res = await axios.patch(
        `${API}/reset-password`,
        form,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {

        toast.update(toastId, {
          render:
            "Password updated successfully",
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

      if (err.response) {

        toast.error(
          err.response.data.message
        );

      } else {

        toast.error(
          "Server not responding"
        );

      }

    } finally {

      setLoading(false);

    }
  };

  return (

    <div
      className={`container-fluid update-container vh-100 overflow-hidden d-flex justify-content-center align-items-center p-2 p-md-3 ${theme === "dark"
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
          maxWidth: "1150px",
          maxHeight: "95%",
          borderRadius: "32px",
        }}
      >

        {/* LEFT FORM */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center">

          <div
            className="w-100 px-4 px-md-5 py-4"
            style={{
              maxWidth: "500px",
            }}
          >

            {/* THEME BTN */}
            <div className="d-flex justify-content-end mb-3">

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
                  width: "45px",
                  height: "45px",
                  border: "none",
                }}
              >

                {theme === "dark"
                  ? <FaSun size={16} />
                  : <FaMoon size={16} />
                }

              </button>

            </div>

            {/* HEADING */}
            <div className="mb-3 text-center">

              <h1
                className="fw-bold"
                style={{
                  fontSize: "2.2rem",
                }}
              >
                Update Password
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
                Create a strong new password
              </p>

            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>

              {/* EMAIL */}
              <div className="mb-3">

                <label
                  className="fw-semibold mb-1"
                  style={{
                    fontSize: "14px",
                  }}
                >
                  Email Address
                </label>

                <div className="position-relative">

                  <input
                    type="email"
                    value={form.email}
                    readOnly
                    className={`form-control border-0 ps-5 ${theme === "dark"
                      ? "bg-dark text-light"
                      : "bg-light text-dark"
                      }`}
                    style={{
                      height: "50px",
                      borderRadius: "14px",
                      fontSize: "14px",
                    }}
                  />

                  <FaEnvelope
                    className="position-absolute"
                    style={{
                      top: "17px",
                      left: "18px",
                      color:
                        theme === "dark"
                          ? "#aaa"
                          : "#666",
                    }}
                  />

                </div>

              </div>

              {/* NEW PASSWORD */}
              <div className="mb-3">

                <label
                  className="fw-semibold mb-1"
                  style={{
                    fontSize: "14px",
                  }}
                >
                  New Password
                </label>

                <div className="position-relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    required
                    placeholder="Enter new password"
                    className={`form-control border-0 ps-5 pe-5 ${theme === "dark"
                      ? "bg-dark text-light"
                      : "bg-light text-dark"
                      }`}
                    style={{
                      height: "50px",
                      borderRadius: "14px",
                      fontSize: "14px",
                    }}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        newPassword:
                          e.target.value,
                      })
                    }
                  />

                  <FaLock
                    className="position-absolute"
                    style={{
                      top: "17px",
                      left: "18px",
                      color:
                        theme === "dark"
                          ? "#aaa"
                          : "#666",
                    }}
                  />

                  <span
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="position-absolute end-0 me-3"
                    style={{
                      top: "15px",
                      cursor: "pointer",
                      color:
                        theme === "dark"
                          ? "#aaa"
                          : "#666",
                    }}
                  >
                    {showPassword
                      ? <FaEyeSlash />
                      : <FaEye />}
                  </span>

                </div>

              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mb-4">

                <label
                  className="fw-semibold mb-1"
                  style={{
                    fontSize: "14px",
                  }}
                >
                  Confirm Password
                </label>

                <div className="position-relative">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    required
                    placeholder="Confirm password"
                    className={`form-control border-0 ps-5 pe-5 ${theme === "dark"
                      ? "bg-dark text-light"
                      : "bg-light text-dark"
                      }`}
                    style={{
                      height: "50px",
                      borderRadius: "14px",
                      fontSize: "14px",
                    }}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        confirmPassword:
                          e.target.value,
                      })
                    }
                  />

                  <FaLock
                    className="position-absolute"
                    style={{
                      top: "17px",
                      left: "18px",
                      color:
                        theme === "dark"
                          ? "#aaa"
                          : "#666",
                    }}
                  />

                  <span
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="position-absolute end-0 me-3"
                    style={{
                      top: "15px",
                      cursor: "pointer",
                      color:
                        theme === "dark"
                          ? "#aaa"
                          : "#666",
                    }}
                  >
                    {showConfirmPassword
                      ? <FaEyeSlash />
                      : <FaEye />}
                  </span>

                </div>

              </div>

              {/* BTN */}
              <button
                type="submit"
                disabled={loading}
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
                {loading
                  ? "Updating..."
                  : "Update Password"}
              </button>

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
                Back to

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

        {/* RIGHT TEXT */}
        <div className="col-lg-6 d-none d-lg-flex p-4">

          <div
            className="w-100 position-relative overflow-hidden"
            style={{
              borderRadius: "10%",
              height: "100%",
              background:
                "linear-gradient(180deg,#ff7b00cc 0%,#d27926d3 100%)",
            }}
          >

            <div className="px-5 py-4 position-relative z-1">

              {/* LOGO */}
              <div className="d-flex align-items-center gap-3 mb-3">

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
                  fontSize: "3rem",
                  lineHeight: "1.1",
                }}
              >
                Secure your
                <br />
                account
                <br />
                with a
                <br />
                fresh password.
              </h1>

              {/* DESC */}
              <p
                className="text-white mt-4"
                style={{
                  maxWidth: "470px",
                  opacity: "0.9",
                  fontSize: "1rem",
                  lineHeight: "1.8",
                }}
              >
                Your account security
                matters to us. Create
                a strong password and
                continue shopping safely.
              </p>

              {/* STATS */}
              <div className="row mt-4 g-4">

                <div className="col-4">

                  <h2 className="fw-bold text-white">
                    100%
                  </h2>

                  <p className="text-white opacity-75 small">
                    Safe
                  </p>

                </div>

                <div className="col-4">

                  <h2 className="fw-bold text-white">
                    Fast
                  </h2>

                  <p className="text-white opacity-75 small">
                    Update
                  </p>

                </div>

                <div className="col-4">

                  <h2 className="fw-bold text-white">
                    Secure
                  </h2>

                  <p className="text-white opacity-75 small">
                    System
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


    </div>
  );
}

export default UpdatePass;