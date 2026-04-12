import React from "react";
import { Link } from "react-router-dom";

function BottomNav({ toggleSidebar }) {
  return (
    <div className="container-fluid bottom-navbar-wrapper px-0">

      <nav className="navbar navbar-expand-lg bottom-navbar px-3">

        <div className="container-fluid navbarcss">

          {/* LEFT SIDE */}
          <div className="d-flex align-items-center">

            <button
              className="btn btn-outline-theme me-3"
              onClick={toggleSidebar}
            >
              ☰
            </button>

            <span className="fw-bold bottom-nav-title ">
              SHOP BY CATEGORIES
            </span>

          </div>

          {/* RIGHT TOGGLER */}
          <button
            className="btn btn-outline-theme"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#bottomNav"
          >
            ☰
          </button>

        </div>

        {/* COLLAPSE MENU */}
        <div className="collapse navbar-collapse mt-2" id="bottomNav">

          <ul className="navbar-nav ms-auto gap-lg-4 w-100 justify-content-end">

            <li className="nav-item">
              <Link className="nav-link" to="allproducts/all">All</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="allproducts/fashion">Fashion</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="allproducts/electronics">Electronics</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="allproducts/phone">Phones</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="allproducts/bags">Bags</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="allproducts/footwear">Footwear</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="allproducts/groceries">Groceries</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="allproducts/beauty">Beauty</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="allproducts/wellness">Wellness</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="allproducts/jewellery">Jewellery</Link>
            </li>

          </ul>

        </div>

      </nav>

    </div>
  );
}

export default BottomNav;