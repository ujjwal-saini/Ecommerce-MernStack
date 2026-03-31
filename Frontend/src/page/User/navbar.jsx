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
    navigate(`/?search=${searchValue}`);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (<nav
    className={`navbar navbar-expand-lg px-3 app-navbar ${theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-white"
      }`}
  >

    {/* Logo */}
    <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
      <img src={Shopora} alt="Shopora Logo" height="38" />
    </Link>

    {/* Mobile Toggle */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarContent"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarContent">

      {/* Left Links */}
      <ul className="navbar-nav me-auto gap-lg-2">

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

        {/* Location */}
        <li className="nav-item">
          <Link
            to="/location"
            className="nav-link d-flex align-items-center gap-1"
          >
            <CiLocationOn
              size={20}
              className="text-danger"
            />
            {user?.profile?.address?.city ||
              "Select Location"}
          </Link>
        </li>

      </ul>

      {/* Search */}
      <form onSubmit={formSubmit} className="d-flex my-2 my-lg-0 mx-lg-3 w-100">
        <input
          className="form-control"
          type="search"
          placeholder="Search products..."
          value={productSearch}
          onChange={(e) => setproductSearch(e.target.value)}
        />
      </form>

      {/* Right Side */}
      <div className="d-flex align-items-center gap-2">

        {/* Cart */}
        <Link to="addtocart" className="btn btn-outline-theme position-relative">
          🛒
          {cartCount > 0 && (
            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Theme */}
        <button onClick={toggleTheme} className="btn btn-outline-theme">
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        {/* User */}
        {user ? (
          <div className="dropdown">
            <button
              className="btn btn-outline-theme dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <img
                src={user.profile.profilePic}
                alt="img"
                width="30"
                height="30"
                className="rounded-circle me-1"
              />
              {user.name}
            </button>

            <ul className="dropdown-menu dropdown-menu-end shadow">
              <li>
                <Link className="dropdown-item" to="profile">Profile</Link>
              </li>
               <li>
                <Link className="dropdown-item" to="/myorders">Orders</Link>
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