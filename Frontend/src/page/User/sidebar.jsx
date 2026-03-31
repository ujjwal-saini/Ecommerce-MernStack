import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../middleware/authContext";
function Sidebar() {
  const {user } = useContext(AuthContext);
 
  return (
    <div
      className="bg-dark text-white d-flex flex-column"
      style={{ width: "280px", height: "100vh", position: "fixed" }}
    >
      {/* USER INFO */}
      <div className="p-3 border-bottom">
        {user ? (
          <Link to="profile" className="text-decoration-none text-white">
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle bg-warning d-flex justify-content-center align-items-center fw-bold text-dark"
                style={{ width: "45px", height: "45px", fontSize: "18px" }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div className="fw-semibold">
                Welcome, {user.name}
              </div>
            </div>
          </Link>
        ) : (
          <span className="text-secondary">Not logged in</span>
        )}
      </div>

      <div className="p-3 border-top">
        {user && (
          <div className="dropdown">
            <Link
              to="/profile"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <img
                src={user.profile.profilePic}
                alt="user"
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              {user.name}
            </Link>

            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
              <li>
                <Link className="dropdown-item" to="profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/settings">
                  Settings
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/logout">
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;