import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link, useNavigate } from "react-router-dom";

import {
  House,
  Cart,
  BoxSeam,
  People,
  GraphUp,
  Gear,
  BoxArrowRight,
} from "react-bootstrap-icons";

import {
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import { AuthContext } from "../../middleware/authContext";

export default function Sidebar() {

  const { user, logout, theme } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] =
    useState(false);

  const handleLogout = async () => {

    await logout();

    navigate("/login");
  };

  return (

    <div className="d-none d-lg-block">

      <div
        className={`p-3 ${theme === "dark"
          ? "bg-black text-light"
          : "bg-white text-dark"
          }`}
        style={{
          width: "250px",
          minHeight: "100vh",
          borderRight:
            theme === "dark"
              ? "1px solid #222"
              : "1px solid #ddd",
        }}
      >

        {/* TOP */}

        <h4 className="fw-bold text-center mb-4">
          Admin Panel
        </h4>

        {/* MENU */}

        <div className="d-flex flex-column gap-2">

          {/* DASHBOARD */}

          <Link
            to=""
            className={`mobile-link ${theme === "dark"
              ? "text-light"
              : "text-dark"
              }`}
          >
            <House size={18} />
            Dashboard
          </Link>

          {/* MANAGEMENT DROPDOWN */}

          <button
            onClick={() =>
              setOpenDropdown(!openDropdown)
            }
            className={`mobile-link border-0 w-100 d-flex justify-content-between align-items-center ${theme === "dark"
              ? "bg-black text-light"
              : "bg-white text-dark"
              }`}
          >

            <div className="d-flex align-items-center gap-2">
              <BoxSeam size={18} />
              Management
            </div>

            {openDropdown
              ? <FaChevronUp />
              : <FaChevronDown />
            }

          </button>

          {/* DROPDOWN */}

          {openDropdown && (

            <div className="d-flex flex-column gap-2 ps-3">

              <Link
                to="products"
                className={`mobile-link ${theme === "dark"
                  ? "text-light"
                  : "text-dark"
                  }`}
              >
                <BoxSeam size={17} />
                Products
              </Link>

              <Link
                to="allorders"
                className={`mobile-link ${theme === "dark"
                  ? "text-light"
                  : "text-dark"
                  }`}
              >
                <Cart size={17} />
                Orders
              </Link>

              <Link
                to="customer"
                className={`mobile-link ${theme === "dark"
                  ? "text-light"
                  : "text-dark"
                  }`}
              >
                <People size={17} />
                Customers
              </Link>

              <Link
                to="analytic"
                className={`mobile-link ${theme === "dark"
                  ? "text-light"
                  : "text-dark"
                  }`}
              >
                <GraphUp size={17} />
                Analytics
              </Link>

            </div>

          )}

          {/* SETTINGS */}

          <Link
            to="setting"
            className={`mobile-link ${theme === "dark"
              ? "text-light"
              : "text-dark"
              }`}
          >
            <Gear size={18} />
            Settings
          </Link>

        </div>

        {/* BOTTOM */}

        <div className="mt-4 pt-3 border-top">

          {/* PROFILE */}

          <Link
            to="profile"
            className={`mobile-link mb-2 ${theme === "dark"
              ? "text-light"
              : "text-dark"
              }`}
          >

            <img
              src={user?.profile?.profilePic}
              width="28"
              height="28"
              className="rounded-circle"
              alt=""
            />

            {user?.name}

          </Link>

          {/* LOGOUT */}

          <button
            onClick={handleLogout}
            className={`mobile-link border-0 w-100 mt-2 ${theme === "dark"
              ? "bg-black text-danger"
              : "bg-white text-danger"
              }`}
          >
            <BoxArrowRight size={18} />
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}