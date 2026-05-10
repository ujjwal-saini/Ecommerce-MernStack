import React, { useContext, useState } from "react";
import { AuthContext } from "../../middleware/authContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

function Setting() {

  const {
    user,
    toggleTheme,
    API,
    theme
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);

  const [twoFactor, setTwoFactor] = useState(false);

  const [selectedTheme, setSelectedTheme] = useState(
    theme || "dark"
  );

  // DELETE ACCOUNT

  const handledDeleteAcc = async () => {

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete your account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#0d6efd",
      confirmButtonText: "Yes, Delete it!",
    });

    if (!result.isConfirmed) return;

    try {

      const res = await axios.delete(
        `${API}/delete/${user._id}`
      );

      if (res.status === 200) {

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Account deleted successfully",
          timer: 1500,
          showConfirmButton: false
        });

        navigate("/login");
      }

    } catch (err) {

      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Delete failed"
      });

    }
  };

  return (

    <div
      className={`container-fluid py-4 px-2 px-md-4 min-vh-100 overflow-hidden ${theme === "dark"
          ? "bg-black text-light"
          : "bg-light text-dark"
        }`}
    >

      {/* HEADER */}

      <div className="mb-4">

        <h2 className="fw-bold">
          Account Settings
        </h2>

        <p
          className={
            theme === "dark"
              ? "text-light"
              : "text-muted"
          }
        >
          Manage your account preferences and security
        </p>

      </div>

      {/* PROFILE SETTINGS */}

      <div
        className={`card shadow-sm border-0 rounded-4 mb-4 ${theme === "dark"
            ? "bg-dark text-light"
            : "bg-white text-dark"
          }`}
      >

        <div
          className={`card-header fw-bold border-0 ${theme === "dark"
              ? "bg-black text-light"
              : "bg-light text-dark"
            }`}
        >
          Profile Settings
        </div>

        <div className="card-body">

          <div className="row g-3">

            <div className="col-12 col-md-6">

              <label className="form-label">
                Full Name
              </label>

              <input
                type="text"
                className={`form-control ${theme === "dark"
                    ? "bg-black text-light border-secondary"
                    : ""
                  }`}
                value={user?.name}
                disabled
              />

            </div>

            <div className="col-12 col-md-6">

              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                className={`form-control ${theme === "dark"
                    ? "bg-black text-light border-secondary"
                    : ""
                  }`}
                value={user?.email}
                disabled
              />

            </div>

          </div>

        </div>

      </div>

      {/* SECURITY */}

      <div
        className={`card shadow-sm border-0 rounded-4 mb-4 ${theme === "dark"
            ? "bg-dark text-light"
            : "bg-white text-dark"
          }`}
      >

        <div
          className={`card-header fw-bold border-0 ${theme === "dark"
              ? "bg-black text-light"
              : "bg-light text-dark"
            }`}
        >
          Security
        </div>

        <div className="card-body">

          {/* CHANGE PASSWORD */}

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">

            <div>

              <h6 className="mb-1">
                Change Password
              </h6>

              <p
                className={`mb-0 small ${theme === "dark"
                    ? "text-light"
                    : "text-muted"
                  }`}
              >
                Update your account password
              </p>

            </div>

            <Link
              to="/forgot-password"
              className="btn btn-outline-danger btn-sm px-3"
              style={{ width: "fit-content" }}
            >
              Change Password
            </Link>

          </div>

          <hr
            className={
              theme === "dark"
                ? "border-secondary"
                : ""
            }
          />

          {/* TWO FACTOR */}

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">

            <div>

              <h6 className="mb-1">
                Two-Factor Authentication
              </h6>

              <p
                className={`mb-0 small ${theme === "dark"
                    ? "text-light"
                    : "text-muted"
                  }`}
              >
                Add extra security to your account
              </p>

            </div>

            <div className="form-check form-switch m-0">

              <input
                className="form-check-input"
                type="checkbox"
                checked={twoFactor}
                onChange={() =>
                  setTwoFactor(!twoFactor)
                }
              />

            </div>

          </div>

        </div>

      </div>

      {/* NOTIFICATIONS */}

      <div
        className={`card shadow-sm border-0 rounded-4 mb-4 ${theme === "dark"
            ? "bg-dark text-light"
            : "bg-white text-dark"
          }`}
      >

        <div
          className={`card-header fw-bold border-0 ${theme === "dark"
              ? "bg-black text-light"
              : "bg-light text-dark"
            }`}
        >
          Notifications
        </div>

        <div className="card-body">

          <div className="form-check">

            <input
              className="form-check-input"
              type="checkbox"
              checked={notifications}
              onChange={() =>
                setNotifications(!notifications)
              }
            />

            <label className="form-check-label">
              Email notifications for orders & offers
            </label>

          </div>

        </div>

      </div>

      {/* APPEARANCE */}

      <div
        className={`card shadow-sm border-0 rounded-4 mb-4 ${theme === "dark"
            ? "bg-dark text-light"
            : "bg-white text-dark"
          }`}
      >

        <div
          className={`card-header fw-bold border-0 ${theme === "dark"
              ? "bg-black text-light"
              : "bg-light text-dark"
            }`}
        >
          Appearance
        </div>

        <div className="card-body">

          <label className="form-label">
            Theme
          </label>

          <select
            className={`form-select w-100 w-md-25 ${theme === "dark"
                ? "bg-black text-light border-secondary"
                : ""
              }`}
            value={selectedTheme}
            onChange={(e) => {
              setSelectedTheme(e.target.value);
              toggleTheme(e);
            }}
          >

            <option value="light">
              Light
            </option>

            <option value="dark">
              Dark
            </option>

          </select>

        </div>

      </div>

      {/* DANGER ZONE */}

      <div
        className={`card shadow-sm border-danger rounded-4 ${theme === "dark"
            ? "bg-dark text-light"
            : "bg-white text-dark"
          }`}
      >

        <div className="card-header bg-danger text-white fw-bold border-0">
          Danger Zone
        </div>

        <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">

          <div>

            <h6 className="mb-1">
              Delete Account
            </h6>

            <p
              className={`mb-0 small ${theme === "dark"
                  ? "text-light"
                  : "text-muted"
                }`}
            >
              This action cannot be undone
            </p>

          </div>

          <button
            className="btn btn-danger btn-sm px-3"
            style={{ width: "fit-content" }}
            onClick={handledDeleteAcc}
          >
            Delete Account
          </button>

        </div>

      </div>

    </div>
  );
}

export default Setting;