import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../middleware/authContext";
import { useSelector } from "react-redux";
import { CiLocationOn } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { FaShopify, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import MobileBottomNav from "./mobileBotomnav";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user, theme, toggleTheme } = useContext(AuthContext);

  const [productSearch, setproductSearch] = useState("");
  const [Suggestionfilter, setSuggestionfilter] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [mobileMenu, setMobileMenu] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.product.products);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);

  const wishlistCount = wishlistItems.length;

  // SEARCH FILTER
  useEffect(() => {
    if (!productSearch.trim()) {
      setSuggestionfilter([]);
      return;
    }

    const result = products.filter((item) =>
      item.name.toLowerCase().includes(productSearch.toLowerCase()),
    );

    setSuggestionfilter(result);
  }, [productSearch, products]);
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully", { autoClose: 1500 });
      setTimeout(() => {
        navigate("/login");
      }, 1600);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${productSearch}`);
    setSuggestionfilter([]);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top shadow-sm ${theme === "dark" ? "bg-black navbar-dark" : "bg-white navbar-light"
        }`}
    >
      <div className="container-fluid d-flex flex-wrap flex-lg-nowrap align-items-center py-1">
        {/* LOGO + TOGGLER */}
        <div className="d-flex align-items-center">
          <button
            className={`btn d-lg-none ${theme === "dark" ? "text-light" : "text-dark"
              }`}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          <Link
            className="navbar-brand fw-bold d-flex align-items-center"
            to="/"
          >
            <FaShopify
              className="me-1"
              style={{ color: "#ff7b00", fontSize: 28 }}
            />
            Shopra
          </Link>
        </div>

        {/* SEARCH (RESPONSIVE FIX) */}
        <form
          onSubmit={formSubmit}
          className="order-3 order-lg-2 col-12 col-lg mx-lg-4 mt-2 mt-lg-0 position-relative"
          style={{ maxWidth: "650px" }}
        >
          <div className="input-group">
            <input
              type="search"
              className={`form-control ${theme === "dark" ? "bg-dark text-light" : ""
                }`}
              placeholder="Search products..."
              value={productSearch}
              onChange={(e) => setproductSearch(e.target.value)}
              style={{ height: 35 }}
            />

            <button
              className="btn text-white d-flex align-items-center justify-content-center"
              style={{
                height: 35,
                background: "linear-gradient(90deg,#ff7b00,#ff9d42)",
              }}
            >
              <IoSearchOutline />
            </button>
          </div>

          {/* suggestions */}
          {Suggestionfilter.length > 0 && (
            <div
              className={`position-absolute w-100 mt-2 rounded shadow ${theme === "dark" ? "bg-black text-light" : "bg-white"
                }`}
              style={{ zIndex: 999 }}
            >
              {Suggestionfilter.slice(0, 6).map((item) => (
                <Link
                  key={item._id}
                  to={`/productdetail/${item._id}`}
                  className={`d-flex gap-2 p-2 text-decoration-none ${theme === "dark" ? " text-light" : "bg-white text-dark"
                    }`}
                  onClick={() => setSuggestionfilter([])}

                >
                  <img
                    src={item.mainImage}
                    width="40"
                    height="40"
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <div>{item.name}</div>
                    <small>₹{item.price}</small>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </form>

        {/* RIGHT ICONS */}

        <div className="d-flex align-items-center gap-1 ms-auto order-2">
          {/* THEME */}
          <button onClick={toggleTheme} className="btn btn-outline-secondary">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {/* CART */}
          <Link
            to="addtocart"
            className="btn btn-outline-dark position-relative d-none d-lg-block "
          >
            🛒
            {cartCount > 0 && (
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                {cartCount}
              </span>
            )}
          </Link>
          {/* WISHLIST */}
          <Link
            to="/wishlist"
            className={`btn position-relative ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
              }`}
          >
            ❤️
            {wishlistCount > 0 && (
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* USER DROPDOWN */}
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
                  width="38"
                  height="38"
                  className="rounded-circle border"
                  style={{ objectFit: "cover" }}
                />

                <span className="d-none d-lg-inline ms-2 fw-semibold">
                  {user.name}
                </span>
              </div>

              <ul
                className={`dropdown-menu dropdown-menu-end border-0 shadow-lg mt-3 ${theme === "dark"
                  ? "bg-black text-light dropdown-dark"
                  : "bg-white dropdown-light"
                  }`}
                style={{
                  minWidth: "220px",
                  borderRadius: "18px",
                  overflow: "hidden",
                }}
              >
                <li>
                  <Link
                    className={`dropdown-item custom-dropdown-item py-2 ${theme === "dark" ? "text-light" : "text-dark"
                      }`}
                    to="profile"
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <Link
                    to="wishlist"
                    className={`dropdown-item custom-dropdown-item py-2 position-relative ${theme === "dark" ? "text-light" : "text-dark"
                      }`}
                  >
                    Wishlist
                    {wishlistCount > 0 && (
                      <span className="badge bg-danger position-absolute top-50 end-0 translate-middle-y me-2">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                </li>

                <li>
                  <Link
                    className={`dropdown-item custom-dropdown-item py-2 ${theme === "dark" ? "text-light" : "text-dark"
                      }`}
                    to="/myorders"
                  >
                    Orders
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item custom-dropdown-item text-danger py-2"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn text-white"
              style={{
                background: "linear-gradient(90deg,#ff7b00,#ff9d42)",
                borderRadius: "12px",
                padding: "8px 14px",
              }}
            >
              Login
            </Link>
          )}
        </div>
        {/* MENU */}
        <div
          className="collapse navbar-collapse align-items-center res-btn"
          id="navbarContent"
        >
          <ul className="navbar-nav gap-2">
            <li>
              <Link
                to="/"
                className={`nav-link custom-nav-link ${location.pathname === "/" ? "active-nav" : ""
                  }`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/allproducts/men"
                className={`nav-link custom-nav-link ${location.pathname === "/allproducts/men" ? "active-nav" : ""
                  }`}
              >
                Men
              </Link>
            </li>

            <li>
              <Link
                to="/allproducts/women"
                className={`nav-link custom-nav-link ${location.pathname === "/allproducts/women" ? "active-nav" : ""
                  }`}
              >
                Women
              </Link>
            </li>

            <li>
              <Link
                to="/allproducts/sports"
                className={`nav-link custom-nav-link ${location.pathname === "/allproducts/sports"
                  ? "active-nav"
                  : ""
                  }`}
              >
                Sports
              </Link>
            </li>

            <li className="nav-link text-danger d-flex align-items-center gap-1">
              <Link
                className="text-decoration-none d-flex justify-content-center align-items-center"
                to={"/location"}
              >
                <CiLocationOn />
                {user?.profile?.address?.city || "Location"}
              </Link>
            </li>
          </ul>

          {/* MOBILE MENU */}
          {mobileMenu && (
            <div
              className={`d-lg-none mt-3 px-2 pb-3 ${theme === "dark" ? "bg-black" : "bg-white"
                }`}
            >
              <div className="d-flex flex-column gap-2">
                <Link
                  className={`text-decoration-none py-2 px-3 rounded ${theme === "dark" ? "text-light" : "text-dark"
                    }`}
                  to="/"
                  onClick={() => setMobileMenu(false)}
                >
                  Home
                </Link>

                <Link
                  className={`text-decoration-none py-2 px-3 rounded ${theme === "dark" ? "text-light" : "text-dark"
                    }`}
                  to="/allproducts/men"
                  onClick={() => setMobileMenu(false)}
                >
                  Men
                </Link>

                <Link
                  className={`text-decoration-none py-2 px-3 rounded ${theme === "dark" ? "text-light" : "text-dark"
                    }`}
                  to="/allproducts/women"
                  onClick={() => setMobileMenu(false)}
                >
                  Women
                </Link>

                <Link
                  className={`text-decoration-none py-2 px-3 rounded ${theme === "dark" ? "text-light" : "text-dark"
                    }`}
                  to="/allproducts/sports"
                  onClick={() => setMobileMenu(false)}
                >
                  Sports
                </Link>

                <Link
                  to="/location"
                  className="text-decoration-none text-danger py-2 px-3"
                >
                  <CiLocationOn /> {user?.profile?.address?.city || "Location"}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div
          className={`d-lg-none w-100 mt-2 px-3 pb-3 ${theme === "dark" ? "bg-black" : "bg-white"
            }`}
        >
          <div className="d-flex flex-column gap-2">
            <Link
              to="/"
              className={`text-decoration-none py-2 px-3 rounded ${theme === "dark" ? "text-light" : "text-dark"
                }`}
              onClick={() => setMobileMenu(false)}
            >
              Home
            </Link>

            <Link
              to="/allproducts/men"
              className={`text-decoration-none py-2 px-3 rounded ${theme === "dark" ? "text-light" : "text-dark"
                }`}
              onClick={() => setMobileMenu(false)}
            >
              Men
            </Link>

            <Link
              to="/allproducts/women"
              className={`text-decoration-none py-2 px-3 rounded ${theme === "dark" ? "text-light" : "text-dark"
                }`}
              onClick={() => setMobileMenu(false)}
            >
              Women
            </Link>

            <Link
              to="/allproducts/sports"
              className={`text-decoration-none py-2 px-3 rounded ${theme === "dark" ? "text-light" : "text-dark"
                }`}
              onClick={() => setMobileMenu(false)}
            >
              Sports
            </Link>

            <Link
              to="/location"
              className="text-decoration-none text-danger py-2 px-3"
              onClick={() => setMobileMenu(false)}
            >
              <CiLocationOn /> {user?.profile?.address?.city || "Location"}
            </Link>
          </div>
        </div>
      )}
      <MobileBottomNav />
    </nav>
  );
}

export default Navbar;
