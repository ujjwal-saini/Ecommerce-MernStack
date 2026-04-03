import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../middleware/authContext";

function Sidebar() {

  const { user } = useContext(AuthContext);

  return (
    <div
      className="bg-dark text-white d-flex flex-column"
      style={{
        height: "100vh",
        position: "fixed"
      }}>

      <div className="p-3 border-bottom">

        {user ? (

          <Link to="profile" className="text-decoration-none text-white">

            <div className="d-flex align-items-center gap-3">

              <div
                className="rounded-circle bg-warning d-flex justify-content-center align-items-center fw-bold text-dark"
                style={{
                  width: "45px",
                  height: "45px",
                  fontSize: "18px"
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div className="fw-semibold">
                Welcome, {user.name}
              </div>

            </div>

          </Link>

        ) : (

          <span className="text-secondary">
            Not logged in
          </span>

        )}

      </div>

      <ul className="list-unstyled ps-3 pt-2">

        {/* Home */}
        <li className="mb-1">

          <button
            className="btn btn-toggle align-items-center rounded text-white w-100 text-start ps-3"
            data-bs-toggle="collapse"
            data-bs-target="#home-collapse"
            aria-expanded="true"
          >
            Home
          </button>

          <div className="collapse show" id="home-collapse">

            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

              <li>
                <Link to="/" className="text-white text-decoration-none d-block py-1 ps-4">
                  Overview
                </Link>
              </li>

              <li>
                <Link to="/updates" className="text-white text-decoration-none d-block py-1 ps-4">
                  Updates
                </Link>
              </li>

              <li>
                <Link to="/reports" className="text-white text-decoration-none d-block py-1 ps-4">
                  Reports
                </Link>
              </li>

            </ul>
          </div>
        </li>

        {/* Dashboard */}
        <li className="mb-1">

          <button
            className="btn btn-toggle align-items-center rounded text-white w-100 text-start ps-3"
            data-bs-toggle="collapse"
            data-bs-target="#dashboard-collapse"
            aria-expanded="true"
          >
            Dashboard
          </button>

          <div className="collapse show" id="dashboard-collapse">

            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

              <li>
                <Link to="/dashboard" className="text-white d-block py-1 text-decoration-none ps-4">
                  Overview
                </Link>
              </li>

              <li>
                <Link to="/dashboard/weekly" className="text-white d-block py-1 text-decoration-none ps-4">
                  Weekly
                </Link>
              </li>

              <li>
                <Link to="/dashboard/monthly" className="text-white d-block py-1 text-decoration-none ps-4">
                  Monthly
                </Link>
              </li>

              <li>
                <Link to="/dashboard/yearly" className="text-white d-block py-1 text-decoration-none ps-4">
                  Annually
                </Link>
              </li>

            </ul>
          </div>
        </li>

        {/* Orders */}
        <li className="mb-1">

          <button
            className="btn btn-toggle align-items-center rounded text-white w-100 text-start ps-3 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#orders-collapse"
            aria-expanded="false"
          >
            Orders
          </button>

          <div className="collapse" id="orders-collapse">

            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

              <li>
                <Link to="/orders/new" className="text-white d-block py-1 text-decoration-none ps-4">
                  New
                </Link>
              </li>

              <li>
                <Link to="/orders/processed" className="text-white d-block py-1 text-decoration-none ps-4">
                  Processed
                </Link>
              </li>

              <li>
                <Link to="/orders/shipped" className="text-white d-block py-1 text-decoration-none ps-4">
                  Shipped
                </Link>
              </li>

              <li>
                <Link to="/orders/returned" className="text-white d-block py-1 text-decoration-none ps-4">
                  Returned
                </Link>
              </li>

            </ul>
          </div>
        </li>

        {/* Account */}
        <li className="mb-1">

          <button
            className="btn btn-toggle align-items-center rounded text-white w-100 text-start ps-3 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#account-collapse"
            aria-expanded="false"
          >
            Account
          </button>

          <div className="collapse" id="account-collapse">

            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">

              <li>
                <Link to="/new" className="text-white d-block py-1 text-decoration-none ps-4">
                  New
                </Link>
              </li>

              <li>
                <Link to="/profile" className="text-white d-block py-1 text-decoration-none ps-4">
                  Profile
                </Link>
              </li>

              <li>
                <Link to="/settings" className="text-white d-block py-1 text-decoration-none ps-4">
                  Settings
                </Link>
              </li>

              <li>
                <Link to="/logout" className="text-danger d-block py-1 text-decoration-none ps-4">
                  Sign out
                </Link>
              </li>

            </ul>
          </div>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;