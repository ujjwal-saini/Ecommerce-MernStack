import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../middleware/authContext";

import {
  FaHome,
  FaUser,
  FaChevronDown,
  FaHeart,
  FaShoppingCart,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaCog,
  FaHeadset,
  FaQuestionCircle,
  FaPhoneAlt,
  FaSignOutAlt,
  FaTags,
} from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.min.css";

function Sidebar() {
  const { user, theme } = useContext(AuthContext);

  // DROPDOWN STATES
  const [shopOpen, setShopOpen] = useState(true);
  const [accountOpen, setAccountOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  // MENU STYLE
  const menuBtnStyle = {
    background: theme === "dark" ? "#111" : "#f8f9fa",
    borderRadius: "14px",
    padding: "12px 15px",
    border: theme === "dark" ? "1px solid #222" : "1px solid #eee",
  };

  const linkClass = `d-block py-2 px-3 rounded text-decoration-none ${theme === "dark" ? "text-light" : "text-dark"
    }`;

  return (
    <div
      className={`d-flex flex-column ${theme === "dark"
        ? "bg-black text-light"
        : "bg-white text-dark"
        }`}
      style={{
        width: "280px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1050,
        overflowY: "auto",
        borderRight:
          theme === "dark"
            ? "1px solid #1f1f1f"
            : "1px solid #e9ecef",
        transition: "0.3s ease",
      }}
    >
      {/* USER */}
      <div
        className="p-4"
        style={{
          borderBottom:
            theme === "dark"
              ? "1px solid #1f1f1f"
              : "1px solid #e9ecef",
        }}
      >
        {user ? (
          <Link
            to="/profile"
            className="text-decoration-none"
          >
            <div className="d-flex align-items-center gap-3">
              {/* PROFILE */}
              <div
                className="rounded-circle overflow-hidden"
                style={{
                  width: "55px",
                  height: "55px",
                  border: "2px solid #ff7b00",
                }}
              >
                <img
                  src={user?.profile?.profilePic}
                  alt="profile"
                  width="100%"
                  height="100%"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* INFO */}
              <div>
                <div
                  className={`small ${theme === "dark"
                    ? "text-secondary"
                    : "text-muted"
                    }`}
                >
                  Welcome Back
                </div>

                <div
                  className={`fw-bold ${theme === "dark"
                    ? "text-light"
                    : "text-dark"
                    }`}
                >
                  {user?.name}
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div
            className={`${theme === "dark"
              ? "text-secondary"
              : "text-muted"
              }`}
          >
            Not Logged In
          </div>
        )}
      </div>

      {/* MENU */}
      <div className="p-3">

        {/* SHOP */}
        <div className="mb-3">
          <button
            onClick={() => setShopOpen(!shopOpen)}
            className={`btn w-100 d-flex justify-content-between align-items-center ${theme === "dark"
              ? "text-light"
              : "text-dark"
              }`}
            style={menuBtnStyle}
          >
            <span className="d-flex align-items-center gap-2">
              <FaHome />
              Shop
            </span>

            <FaChevronDown
              size={12}
              style={{
                transition: "0.3s",
                transform: shopOpen
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
            />
          </button>

          {shopOpen && (
            <ul className="list-unstyled mt-2 ps-2">

              <li>
                <Link to="/" className={linkClass}>
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/allproducts/all"
                  className={linkClass}
                >
                  All Products
                </Link>
              </li>

              <li>
                <Link
                  to="/allproducts/men"
                  className={linkClass}
                >
                  Men Fashion
                </Link>
              </li>

              <li>
                <Link
                  to="/allproducts/women"
                  className={linkClass}
                >
                  Women Fashion
                </Link>
              </li>

              <li>
                <Link
                  to="/allproducts/sports"
                  className={linkClass}
                >
                  Sports
                </Link>
              </li>

              <li>
                <Link
                  to="/offers"
                  className={linkClass}
                >
                  <FaTags className="me-2" />
                  Offers
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* ACCOUNT */}
        <div className="mb-3">
          <button
            onClick={() =>
              setAccountOpen(!accountOpen)
            }
            className={`btn w-100 d-flex justify-content-between align-items-center ${theme === "dark"
              ? "text-light"
              : "text-dark"
              }`}
            style={menuBtnStyle}
          >
            <span className="d-flex align-items-center gap-2">
              <FaUser />
              My Account
            </span>

            <FaChevronDown
              size={12}
              style={{
                transition: "0.3s",
                transform: accountOpen
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
            />
          </button>

          {accountOpen && (
            <ul className="list-unstyled mt-2 ps-2">

              <li>
                <Link
                  to="/profile"
                  className={linkClass}
                >
                  <FaUser className="me-2" />
                  Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/myorders"
                  className={linkClass}
                >
                  <FaBoxOpen className="me-2" />
                  My Orders
                </Link>
              </li>

              <li>
                <Link
                  to="/wishlist"
                  className={linkClass}
                >
                  <FaHeart className="me-2" />
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  to="/addtocart"
                  className={linkClass}
                >
                  <FaShoppingCart className="me-2" />
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/location"
                  className={linkClass}
                >
                  <FaMapMarkerAlt className="me-2" />
                  Address
                </Link>
              </li>

              <li>
                <Link
                  to="/settings"
                  className={linkClass}
                >
                  <FaCog className="me-2" />
                  Settings
                </Link>
              </li>

              <li>
                <Link
                  to="/logout"
                  className="d-block py-2 px-3 rounded text-decoration-none text-danger"
                >
                  <FaSignOutAlt className="me-2" />
                  Logout
                </Link>
              </li>

            </ul>
          )}
        </div>

        {/* SUPPORT */}
        <div className="mb-3">
          <button
            onClick={() =>
              setSupportOpen(!supportOpen)
            }
            className={`btn w-100 d-flex justify-content-between align-items-center ${theme === "dark"
              ? "text-light"
              : "text-dark"
              }`}
            style={menuBtnStyle}
          >
            <span className="d-flex align-items-center gap-2">
              <FaHeadset />
              Support
            </span>

            <FaChevronDown
              size={12}
              style={{
                transition: "0.3s",
                transform: supportOpen
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
            />
          </button>

          {supportOpen && (
            <ul className="list-unstyled mt-2 ps-2">

              <li>
                <Link
                  to="/help"
                  className={linkClass}
                >
                  <FaQuestionCircle className="me-2" />
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className={linkClass}
                >
                  <FaPhoneAlt className="me-2" />
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className={linkClass}
                >
                  FAQs
                </Link>
              </li>

            </ul>
          )}
        </div>

      </div>
    </div>
  );
}

export default Sidebar;