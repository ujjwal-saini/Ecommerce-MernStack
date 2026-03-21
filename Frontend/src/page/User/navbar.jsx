import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../middleware/authContext";
import Shopora from "../../../public/image/Shopora.png";
import { useSelector } from "react-redux";
import { CiLocationOn } from "react-icons/ci";

function Navbar() {

  const navigate = useNavigate();
  const [productSearch, setproductSearch] = useState("");

  const { logout, user, theme, toggleTheme } = useContext(AuthContext);

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);

  const formSubmit = (e) => {
    e.preventDefault();
    const searchValue = productSearch.trim();
    console.log(searchValue, "search");
    navigate(`/dashboard?search=${searchValue}`);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg px-3 app-navbar">

      <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/dashboard">
        <img src={Shopora} alt="Shopora Logo" height="38" />
      </Link>

      <div className="collapse navbar-collapse">

        <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">

          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="allproducts/men">Men</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="allproducts/women">Women</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="allproducts/sports">Sports</Link>
          </li>

          <li className="nav-item d-flex justify-content-center">
            <span className="nav-link d-flex align-items-center gap-1  rounded-pill  ">

              <CiLocationOn size={20} className="text-danger" />

              <span className=" text-dark">
                {user?.profile?.address?.city || "Select Location"}
              </span>

            </span>
          </li>

        </ul>

        {/* SEARCH */}

        <form onSubmit={formSubmit} className="d-flex flex-grow-1 mx-lg-4">

          <input
            className="form-control w-100"
            type="search"
            placeholder="Search products..."
            value={productSearch}
            onChange={(e) => setproductSearch(e.target.value)}
          />

        </form>

        <div className="d-flex align-items-center gap-2">
          <Link to="addtocart" className="btn btn-outline-theme position-relative">
            🛒
            {cartCount > 0 && (
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={toggleTheme} className="btn btn-outline-theme">
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          {user ? (
            <div className="dropdown">
              <button className="btn btn-outline-theme dropdown-toggle" data-bs-toggle="dropdown">
                <img
                  src={user.profile.profilePic}
                  alt="user"
                  width="30"
                  height="30"
                  className="rounded-circle"
                />
                {user.name}
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow">
                <li>
                  <Link className="dropdown-item" to="profile">Profile</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/setting">Settings</Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item text-danger">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-outline-theme">Login</Link>
              <Link to="/signup" className="btn btn-warning">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;