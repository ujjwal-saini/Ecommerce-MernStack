import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaCog,
} from "react-icons/fa";

import { AuthContext } from "../../middleware/authContext";

function MobileBootomnav() {

  const { theme } = useContext(AuthContext);

  return (

    <div
      className={`mobile-bottom-nav d-lg-none ${theme === "dark"
        ? "bg-black border-secondary"
        : "bg-white border-light"
        }`}
    >

      <NavLink
        to="/admindashboard"
        end
        className={({ isActive }) =>
          `bottom-nav-link ${isActive ? "active-bottom-nav" : ""
          } ${theme === "dark"
            ? "text-light"
            : "text-dark"
          }`
        }
      >

        <FaHome size={20} />

        <span>
          Home
        </span>

      </NavLink>

      <NavLink
        to="/admindashboard/products"
        className={({ isActive }) =>
          `bottom-nav-link ${isActive ? "active-bottom-nav" : ""
          } ${theme === "dark"
            ? "text-light"
            : "text-dark"
          }`
        }
      >

        <FaBoxOpen size={20} />

        <span>
          Products
        </span>

      </NavLink>

      <NavLink
        to="/admindashboard/allorders"
        className={({ isActive }) =>
          `bottom-nav-link ${isActive ? "active-bottom-nav" : ""
          } ${theme === "dark"
            ? "text-light"
            : "text-dark"
          }`
        }
      >

        <FaShoppingCart size={20} />

        <span>
          Orders
        </span>

      </NavLink>

      <NavLink
        to="/admindashboard/customer"
        className={({ isActive }) =>
          `bottom-nav-link ${isActive ? "active-bottom-nav" : ""
          } ${theme === "dark"
            ? "text-light"
            : "text-dark"
          }`
        }
      >

        <FaUsers size={20} />

        <span>
          Users
        </span>

      </NavLink>

      <NavLink
        to="/admindashboard/setting"
        className={({ isActive }) =>
          `bottom-nav-link ${isActive ? "active-bottom-nav" : ""
          } ${theme === "dark"
            ? "text-light"
            : "text-dark"
          }`
        }
      >

        <FaCog size={20} />

        <span>
          Settings
        </span>

      </NavLink>

    </div>
  );
}

export default MobileBootomnav;