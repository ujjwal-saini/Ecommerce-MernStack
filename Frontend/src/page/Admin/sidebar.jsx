import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { House, Cart, BoxSeam, People, GraphUp, Gear, BoxArrowRight } from "react-bootstrap-icons";
import { useContext } from "react";
import { AuthContext } from "../../middleware/authContext";
export default function Sidebar() {
const { user , logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();      
    navigate("/login"); 
  };
  return (
    <div className="d-flex">
      <div
        className="bg-dark text-white p-3"
        style={{ width: "250px", minHeight: "100vh" }}>
        <h4 className="text-center mb-4">Admin Panel</h4>

        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item mb-2">
            <Link to="" className="nav-link text-white d-flex align-items-center gap-2">
              <House /> Dashboard
            </Link>
          </li>

          <li className="mb-2">
            <Link to="order" className="nav-link text-white d-flex align-items-center gap-2">
              <Cart /> Orders
            </Link>
          </li>

          <li className="mb-2">
            <Link to="products" className="nav-link text-white d-flex align-items-center gap-2">
              <BoxSeam /> Products
            </Link>
          </li>

          <li className="mb-2">
            <Link to="customer" className="nav-link text-white d-flex align-items-center gap-2">
              <People /> Customers
            </Link>
          </li>

          <li className="mb-2">
            <Link to="analytic" className="nav-link text-white d-flex align-items-center gap-2">
              <GraphUp /> Analytics
            </Link>
          </li>

          <li className="mb-2">
            <Link to="setting" className="nav-link text-white d-flex align-items-center gap-2">
              <Gear /> Settings
            </Link>
          </li>
        </ul>

        <hr />

        <div>


          {user && (
            <button
              onClick={handleLogout}
              className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2"
            >
              <BoxArrowRight /> Logout
            </button>
          )}

        </div>
      </div>
    </div>
  );
}