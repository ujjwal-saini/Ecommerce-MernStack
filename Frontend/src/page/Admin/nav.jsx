import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../middleware/authContext'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoSearchOutline } from "react-icons/io5";
function Nav() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [productSearch, setproductSearch] = useState("");
  const products = useSelector((state) => state.product.products);
  const [Suggestionfilter, setSuggestionfilter] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const formSubmit = (e) => {
    e.preventDefault();
    setSuggestionfilter([]);
    console.log(productSearch, "p");
    navigate(`/admindashboard/products?search=${productSearch.trim()}`);
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
        navigate(`/admindashboard/productpreview/${selectedItem._id}`);
        setSuggestionfilter([]);
      }

      setproductSearch("");
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


  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="d-flex w-full items-center justify-content-between px-3 py-2 border-b bg-white border app-navbar">
      <h2 className="text-xl font-semibold">Welcome Admin</h2>
      <div className="d-flex items-center gap-1">
        {/* SEARCH BAR */}
        <form
          onSubmit={formSubmit}
          className="d-flex justify-content-center align-items-center flex-column flex-grow-1 mx-lg-3 mt-2 mt-lg-0 position-relative">
          <div className="flex w-full">
            <input
              className="w-full px-3 py-1 border rounded-start"
              type="search"
              placeholder="Search for shoes, mobiles, fashion..."
              value={productSearch}
              onChange={(e) => {
                setproductSearch(e.target.value);
                setActiveIndex(-1);
              }}

              onKeyDown={handleKeyDown}
              style={{ width: "400px" }} />

            <button className="bg-dark text-white px-3 rounded-end">
              <IoSearchOutline />
            </button>
          </div>

          {Suggestionfilter.length > 0 && (
            <div className="position-absolute top-100 start-0 w-100 bg-white shadow mt-1 rounded z-3">
              {Suggestionfilter.slice(0, 6).map((item, index) => (
                <Link
                  key={index}
                  to={`/admindashboard/productpreview/${item._id}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`d-flex align-items-center gap-2 p-2 text-dark text-decoration-none border-bottom 
  ${activeIndex === index ? "bg-primary text-white" : ""}`}
                  onClick={() => {
                    setSuggestionfilter([]);
                    setproductSearch("");
                  }}
                >
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
        <div className="dropdown">
          <button
            className="btn dropdown-toggle d-flex align-items-center"
            type="button"
            data-bs-toggle="dropdown"
          >
            <img
              src={user.profile.profilePic}
              alt="profile"
              className="rounded-circle me-2"
              width="35"
              height="35"
            />
            {user.name}
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow">
            <li><Link className="dropdown-item" to="profile">Profile</Link></li>
            <li><Link className="dropdown-item" to="setting">Settings</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link onClick={handleLogout} className="dropdown-item text-danger">Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Nav
