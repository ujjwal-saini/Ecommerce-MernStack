import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaTimes,
  FaUser,
  FaBoxOpen,
  FaCog,
  FaHome,
  FaChevronDown,
  FaChevronUp,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
} from "react-icons/fa";

function MobileBar({
  mobileSidebar,
  setMobileSidebar,
  theme,
}) {

  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <>
      {/* OVERLAY */}

      <div
        className={`mobile-sidebar-overlay ${mobileSidebar ? "show" : ""
          }`}
        onClick={() => setMobileSidebar(false)}
      />

      {/* SIDEBAR */}

      <div
        className={`mobile-sidebar ${mobileSidebar ? "show" : ""
          } ${theme === "dark"
            ? "bg-black text-light"
            : "bg-white text-dark"
          }`}
      >

        {/* TOP */}

        <div className="d-flex justify-content-between align-items-center border-bottom p-3">

          <h5 className="m-0 fw-bold">
            Admin Panel
          </h5>

          <button
            className={`btn btn-sm ${theme === "dark"
              ? "btn-outline-light"
              : "btn-outline-dark"
              }`}
            onClick={() => setMobileSidebar(false)}
          >
            <FaTimes />
          </button>

        </div>

        {/* MENU */}

        <div className="p-3 d-flex flex-column gap-2">

          <Link
            to="/admindashboard"
            className={`mobile-link ${theme === "dark"
              ? "text-light"
              : "text-dark"
              }`}
            onClick={() => setMobileSidebar(false)}
          >
            <FaHome />
            Dashboard
          </Link>

          {/* DROPDOWN */}

          <button
            className={` border-0 w-100 d-flex justify-content-between align-items-center ${theme === "dark"
              ? "bg-black text-light"
              : "bg-white text-dark"
              }`}
            onClick={() =>
              setOpenDropdown(!openDropdown)
            }
          >

            <div className="d-flex align-items-center gap-2">
              <FaBoxOpen />
              Management
            </div>

            {openDropdown
              ? <FaChevronUp />
              : <FaChevronDown />
            }

          </button>

          {/* DROPDOWN MENU */}

          {openDropdown && (

            <div className="d-flex flex-column gap-2 ps-3">

              <Link
                to="/admindashboard/products"
                className={`mobile-link ${theme === "dark"
                  ? "text-light"
                  : "text-dark"
                  }`}
                onClick={() =>
                  setMobileSidebar(false)
                }
              >
                <FaBoxOpen />
                Products
              </Link>

              <Link
                to="/admindashboard/allorders"
                className={`mobile-link ${theme === "dark"
                  ? "text-light"
                  : "text-dark"
                  }`}
                onClick={() =>
                  setMobileSidebar(false)
                }
              >
                <FaShoppingCart />
                Orders
              </Link>

              <Link
                to="/admindashboard/customer"
                className={`mobile-link ${theme === "dark"
                  ? "text-light"
                  : "text-dark"
                  }`}
                onClick={() =>
                  setMobileSidebar(false)
                }
              >
                <FaUsers />
                Customers
              </Link>

              <Link
                to="/admindashboard/analytic"
                className={`mobile-link ${theme === "dark"
                  ? "text-light"
                  : "text-dark"
                  }`}
                onClick={() =>
                  setMobileSidebar(false)
                }
              >
                <FaChartBar />
                Analytics
              </Link>

            </div>

          )}

          <Link
            to="/admindashboard/profile"
            className={`mobile-link ${theme === "dark"
              ? "text-light"
              : "text-dark"
              }`}
            onClick={() => setMobileSidebar(false)}
          >
            <FaUser />
            Profile
          </Link>

          <Link
            to="/admindashboard/setting"
            className={`mobile-link ${theme === "dark"
              ? "text-light"
              : "text-dark"
              }`}
            onClick={() => setMobileSidebar(false)}
          >
            <FaCog />
            Settings
          </Link>

        </div>

      </div>
    </>
  );
}

export default MobileBar;