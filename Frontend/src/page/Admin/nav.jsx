import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../middleware/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import MobileBar from "./mobileBar";

function Nav() {

  const navigate = useNavigate();

  const {
    user,
    logout,
    theme,
    toggleTheme
  } = useContext(AuthContext);

  const [productSearch, setproductSearch] = useState("");
  const [Suggestionfilter, setSuggestionfilter] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const products = useSelector(
    (state) => state.product.products
  );

  // SEARCH FILTER

  useEffect(() => {

    if (!productSearch.trim()) {

      setSuggestionfilter([]);

      return;
    }

    const result = products.filter((item) =>

      item.name?.toLowerCase().includes(productSearch.toLowerCase()) ||

      item.description?.toLowerCase().includes(productSearch.toLowerCase()) ||

      item.category?.toLowerCase().includes(productSearch.toLowerCase()) ||

      item.brand?.toLowerCase().includes(productSearch.toLowerCase())

    );

    setSuggestionfilter(result);

  }, [productSearch, products]);

  // FORM SUBMIT

  const formSubmit = (e) => {

    e.preventDefault();

    setSuggestionfilter([]);

    navigate(
      `/admindashboard/products?search=${productSearch.trim()}`
    );
  };

  // LOGOUT

  const handleLogout = async () => {

    await logout();

    navigate("/login");
  };

  return (

    <>
      {/* FIXED NAVBAR */}

      <div
        className={`border-bottom px-2 px-md-3 py-2 ${theme === "dark"
          ? "bg-black text-light"
          : "bg-white text-dark"
          }`}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          width: "100%"
        }}
      >

        {/* ======================
            DESKTOP NAVBAR
        ====================== */}

        <div className="d-none d-md-flex align-items-center h-100 gap-3">

          {/* LOGO */}

          <Link
            to={"/admindashboard"}
            className={`text-decoration-none fw-bold fs-4 flex-shrink-0 ${theme === "dark"
              ? "text-light"
              : "text-dark"
              }`}
          >
            Welcome Admin
          </Link>

          {/* SEARCH */}

          <form
            onSubmit={formSubmit}
            className="position-relative flex-grow-1"
          >

            <div className="d-flex">

              <input
                className={`form-control border-end-0 ${theme === "dark"
                  ? "bg-dark text-light border-secondary"
                  : ""
                  }`}
                type="search"
                placeholder="Search products..."
                value={productSearch}
                onChange={(e) => {

                  setproductSearch(e.target.value);

                  setActiveIndex(-1);

                }}
              />

              <button className="btn btn-dark px-3">
                <IoSearchOutline />
              </button>

            </div>

            {/* SEARCH SUGGESTIONS */}

            {Suggestionfilter.length > 0 && (

              <div
                className={`position-absolute top-100 start-0 w-100 shadow rounded mt-1 overflow-hidden ${theme === "dark"
                  ? "bg-dark text-light"
                  : "bg-white"
                  }`}
                style={{
                  zIndex: 9999,
                  maxHeight: "350px",
                  overflowY: "auto"
                }}
              >

                {Suggestionfilter
                  .slice(0, 6)
                  .map((item, index) => (

                    <Link
                      key={index}
                      to={`/admindashboard/productpreview/${item._id}`}
                      className={`d-flex align-items-center gap-2 p-2 text-decoration-none ${activeIndex === index
                        ? "bg-primary text-white"
                        : ""
                        } ${theme === "dark"
                          ? "text-light"
                          : "text-dark"
                        }`}
                      onMouseEnter={() =>
                        setActiveIndex(index)
                      }
                      onClick={() => {

                        setSuggestionfilter([]);

                        setproductSearch("");

                      }}
                    >

                      {item.mainImage && (

                        <img
                          src={item.mainImage}
                          width="45"
                          height="45"
                          className="rounded object-fit-cover"
                          alt=""
                        />

                      )}

                      <div className="overflow-hidden">

                        <div
                          className="fw-semibold text-truncate"
                          style={{
                            maxWidth: "250px",
                            fontSize: "14px"
                          }}
                        >
                          {item.name}
                        </div>

                        <small>
                          ₹ {item.price}
                        </small>

                      </div>

                    </Link>

                  ))}

              </div>

            )}

          </form>

          {/* RIGHT SIDE */}

          <div className="d-flex align-items-center gap-2 flex-shrink-0">

            {/* THEME */}

            <button
              onClick={toggleTheme}
              className={`btn ${theme === "dark"
                ? "btn-outline-light"
                : "btn-outline-dark"
                }`}
            >

              {theme === "dark"
                ? <FaSun />
                : <FaMoon />
              }

            </button>

            {/* PROFILE */}

            <div className="dropdown">

              <button
                className={`btn dropdown-toggle d-flex align-items-center ${theme === "dark"
                  ? "bg-dark text-light border-secondary"
                  : "bg-white"
                  }`}
                data-bs-toggle="dropdown"
              >

                <img
                  src={user?.profile?.profilePic}
                  width="35"
                  height="35"
                  className="rounded-circle me-2 object-fit-cover"
                  alt=""
                />

                <span className="fw-semibold">
                  {user?.name}
                </span>

              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow">

                <li>

                  <Link
                    className="dropdown-item"
                    to="/admindashboard/profile"
                  >
                    Profile
                  </Link>

                </li>

                <li>

                  <Link
                    className="dropdown-item"
                    to="/admindashboard/setting"
                  >
                    Settings
                  </Link>

                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>

                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                </li>

              </ul>

            </div>

          </div>

        </div>

        {/* ======================
            MOBILE NAVBAR
        ====================== */}

        <div className="d-md-none">

          {/* TOP */}

          <div className="d-flex justify-content-between align-items-center">

            {/* LEFT */}

            <div className="d-flex align-items-center gap-2">

              <button
                className="btn btn-dark"
                onClick={() => setMobileSidebar(true)}
              >
                <FaBars />
              </button>

              <Link
                to={"/admindashboard"}
                className={`text-decoration-none fw-bold ${theme === "dark"
                  ? "text-light"
                  : "text-dark"
                  }`}
              >
                Admin
              </Link>

            </div>

            {/* RIGHT */}

            <div className="d-flex align-items-center gap-2">

              {/* THEME */}

              <button
                onClick={toggleTheme}
                className={`btn btn-sm ${theme === "dark"
                  ? "btn-outline-light"
                  : "btn-outline-dark"
                  }`}
              >

                {theme === "dark"
                  ? <FaSun />
                  : <FaMoon />
                }

              </button>

              {/* PROFILE */}

              <div className="dropdown">

                <button
                  className={`btn btn-sm ${theme === "dark"
                    ? "btn-dark"
                    : "btn-light"
                    }`}
                  data-bs-toggle="dropdown"
                >

                  <img
                    src={user?.profile?.profilePic}
                    width="30"
                    height="30"
                    className="rounded-circle object-fit-cover"
                    alt=""
                  />

                </button>

                <ul className="dropdown-menu dropdown-menu-end">

                  <li>

                    <Link
                      className="dropdown-item"
                      to="/admindashboard/profile"
                    >
                      Profile
                    </Link>

                  </li>

                  <li>

                    <Link
                      className="dropdown-item"
                      to="/admindashboard/setting"
                    >
                      Settings
                    </Link>

                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>

                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>

                  </li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* NAVBAR SPACE FIX */}

      <div style={{ height: "75px" }}></div>

      {/* MOBILE SIDEBAR */}

      <MobileBar
        mobileSidebar={mobileSidebar}
        setMobileSidebar={setMobileSidebar}
        theme={theme}
      />
    </>
  );
}

export default Nav;