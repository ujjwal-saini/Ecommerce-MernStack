import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../middleware/authContext";
import Shopora from "../../../public/image/Shopora.png";
import { useSelector } from "react-redux";
import { CiLocationOn } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { FaShopify } from "react-icons/fa";

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

  return (
    <nav className={`navbar navbar-expand-lg px-2 px-md-3 app-navbar sticky-top ${theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-white shadow-sm"}`}>
      <div className="container-fluid d-flex align-items-center justify-content-center nav-resp">
        <div className="d-flex align-items-center">
          <button
            className="navbar-toggler border-0 p-1 me-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent">
            <span className="navbar-toggler-icon" style={{ width: '1.2rem', height: '1.2rem' }}></span>
          </button>
          <Link className="navbar-brand d-flex fw-bold m-0" to="/">
            <FaShopify style={{ fontSize: "28px" }} />
            <h1 className="d-none d-md-block ps-2 " style={{fontSize:"25px"}}>shopra</h1>
          </Link>
        </div>


        <div className="collapse navbar-collapse mx-2" id="navbarContent">
          <hr className="d-lg-none my-2 text-secondary" />
          <ul className="navbar-nav me-auto px-5 mb-2 mb-lg-0" style={{ paddingRight:"30px"}}>
            <li className="nav-item pe-3"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item pe-3"><Link className="nav-link" to="allproducts/men">Men</Link></li>
            <li className="nav-item pe-3"><Link className="nav-link" to="allproducts/women">Women</Link></li>
            <li className="nav-item pe-3"><Link className="nav-link" to="allproducts/sports">Sports</Link></li>
            <li className="nav-item pe-3"><Link className="nav-link" to="allproducts/men">Men</Link></li>
            <li className="nav-item pe-3"><Link className="nav-link" to="allproducts/women">Women</Link></li>
            <li className="nav-item pe-3"><Link className="nav-link" to="allproducts/sports">Sports</Link></li>
            <li className="nav-item pe-3">
              <Link to="/location" className="nav-link text-danger d-flex align-items-center gap-1">
                <CiLocationOn size={18} /> {user?.profile?.address?.city || "Location"}
              </Link>
            </li>
          </ul>
        </div>

        <form onSubmit={formSubmit} className="d-flex mx-2 mx-lg-4 flex-grow-1 res-search" style={{ minWidth: "50px"}}>
          <div className="input-group input-group-sm">
            <input
              className="form-control border-end-0 shadow-none"
              style={{ maxWidth: "510px" }}
              type="search"
              placeholder="Search..."
              value={productSearch}
              onChange={(e) => setproductSearch(e.target.value)}
            />
            <button className="btn btn-outline-secondary border border-start-0 d-flex justify-content-center align-item-center bg-dark" type="submit">
              <IoSearchOutline />
            </button>
          </div>
        </form>

        <div className="d-flex align-items-center gap-1 gap-md-3 me-2 px-2">

          {/* Cart */}
          <Link to="addtocart" className="btn btn-sm  position-relative">
            <span style={{ fontSize: '1.2rem' }}>🛒</span>
            {cartCount > 0 && (
              <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle" style={{ fontSize: '0.6rem' }}>
                {cartCount}
              </span>
            )}
          </Link>


          <button onClick={toggleTheme} className="btn btn-sm   d-lg-block">
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>


        {user ? (
          <div className="dropdown">
            <div className="dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown" role="button" style={{ cursor: 'pointer' }}>
              <img
                src={user.profile.profilePic}
                alt="user"
                width="30"
                height="30"
                className="rounded-circle border"
              />
              <span className="d-none d-lg-inline ms-2 small">{user.name}</span>
            </div>
            <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
              <li><Link className="dropdown-item" to="profile">Profile</Link></li>
              <li><Link className="dropdown-item" to="/myorders">Orders</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button onClick={handleLogout} className="dropdown-item text-danger">Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm btn-warning fw-bold d-md-block">Login</Link>
        )}

      </div>
    </nav>
  );
}

export default Navbar;