import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../middleware/authContext";
import { useSelector } from "react-redux";
import { CiLocationOn } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { FaShopify } from "react-icons/fa";
import SearchPage from "../../components/searchPage";

function Navbar() {
  const navigate = useNavigate();
  const [productSearch, setproductSearch] = useState("");
  const { logout, user, theme, toggleTheme } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.product.products);
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);
  const [Suggestionfilter, setSuggestionfilter] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);


  const formSubmit = (e) => {
    e.preventDefault();
    setSuggestionfilter([]);
    navigate(`/?search=${productSearch.trim()}`);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleKeyDown = (e) => {
    if (!Suggestionfilter.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => prev < Suggestionfilter.length - 1 ? prev + 1 : prev);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => prev > 0 ? prev - 1 : 0
      );
    }
    if (e.key === "Enter") {
      if (activeIndex >= 0) {
        e.preventDefault();
        const selectedItem = Suggestionfilter[activeIndex];
        navigate(`/productdetail/${selectedItem._id}`);
        setSuggestionfilter([]);
      }
    }
  };

  const suggestionFunc = () => {
    if (!productSearch.trim()) {
      setSuggestionfilter([]);
      return;
    }

    const result = products.filter((item) =>
      item.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(productSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      item.brand.toLowerCase().includes(productSearch.toLowerCase())
    );
    setSuggestionfilter(result);
  }

  useEffect(() => {
    suggestionFunc();
  }, [productSearch, products]);

  return (
    <nav
      className={`navbar navbar-expand-lg px-2 px-md-3 sticky-top ${theme === "dark"
        ? "navbar-dark bg-dark"
        : "navbar-light bg-white shadow-sm"
        }`}>
      <div className="container-fluid d-flex flex-wrap align-items-center">
        {/* LEFT: Logo */}
        <div className="d-flex align-items-center">
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link className="navbar-brand d-flex fw-bold m-0" to="/">
            <FaShopify style={{ fontSize: "28px" }} />
            <span className="ps-1" style={{ fontSize: "22px" }}>
              shopra
            </span>
          </Link>
        </div>
        {/* NAV LINKS */}
        <div
          className="collapse navbar-collapse order-3 order-lg-1 ms-4"
          id="navbarContent"
        >
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">

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

            <li className="nav-item">
              <Link
                to="/location"
                className="nav-link text-danger d-flex align-items-center gap-1"
              >
                <CiLocationOn />
                {user?.profile?.address?.city || "Location"}
              </Link>
            </li>

          </ul>
        </div>

        {/* SEARCH BAR */}
        <form
          onSubmit={formSubmit}
          className="order-2 order-lg-2 flex-grow-1 mx-lg-3 mt-2 mt-lg-0">
          <div className="input-group input-group-sm">
            <input
              className="form-control"
              type="search"
              placeholder="Search..."
              value={productSearch}
              onChange={(e) => {
                setproductSearch(e.target.value);
                setActiveIndex(-1);
              }}
              onKeyDown={(e) => handleKeyDown(e)}/>

            <button className="btn btn-dark" type="submit">
              <IoSearchOutline />
            </button>
          </div>
          {Suggestionfilter.length > 0 && (
            <div
              className="position-absolute bg-white shadow w-100 mt-1 rounded"
              style={{ zIndex: 999 }}>
              {Suggestionfilter.slice(0, 6).map((item, index) => (
                <Link
                  key={index}
                  to={`/productdetail/${item._id}`}
                  className={`d-flex align-items-center gap-2 p-2 text-dark text-decoration-none border-bottom 
                  ${activeIndex === index ? "bg-primary text-white" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={()=>{ setSuggestionfilter([]) , setproductSearch("")}}>
                  {item.mainImage && (
                    <img
                      src={item.mainImage}
                      alt=""
                      width="40"
                      height="40"
                      className="rounded"
                    />
                  )}
                  <div>
                    <div style={{ fontSize: "14px" }}>{item.name}</div>
                    <small className="text-muted">₹ {item.price}</small>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </form>

        {/* RIGHT SIDE */}
        <div className="d-flex align-items-center gap-2 order-1 order-lg-3 ms-auto">

          {/* Cart */}
          <Link to="addtocart" className="btn btn-sm position-relative">
            🛒
            {cartCount > 0 && (
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Theme */}
          <button onClick={toggleTheme} className="btn btn-sm">
            {theme === "dark" ? "🌙" : "☀️"}
          </button>

          {/* User */}
          {user ? (
            <div className="dropdown">
              <div
                className="dropdown-toggle d-flex align-items-center"
                data-bs-toggle="dropdown"
                role="button"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={user.profile.profilePic}
                  alt="user"
                  width="30"
                  height="30"
                  className="rounded-circle border"
                />
                <span className="d-none d-lg-inline ms-2 small">
                  {user.name}
                </span>
              </div>

              <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                <li>
                  <Link className="dropdown-item" to="profile">
                    Profile
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/myorders">
                    Orders
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item text-danger"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm btn-warning fw-bold d-md-block"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;