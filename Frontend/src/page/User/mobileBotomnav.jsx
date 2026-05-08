import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { AuthContext } from "../../middleware/authContext";

import {
  FaHome,
  FaShopify,
} from "react-icons/fa";

function MobileBottomNav() {

  const { user, theme } = useContext(AuthContext);

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  return (
    <div
      className={`d-lg-none position-fixed bottom-0 start-0 w-100 ${theme === "dark"
          ? "bg-black border-top border-secondary"
          : "bg-white border-top"
        }`}
      style={{
        zIndex: 2000,
        height: "65px",
      }}
    >
      <div className="d-flex justify-content-around align-items-center h-100">

        {/* HOME */}
        <Link
          to="/"
          className={`text-decoration-none d-flex flex-column align-items-center ${theme === "dark"
              ? "text-light"
              : "text-dark"
            }`}
        >
          <FaHome size={20} />
          <small>Home</small>
        </Link>

        {/* SHOP */}
        <Link
          to="/allproducts"
          className={`text-decoration-none d-flex flex-column align-items-center ${theme === "dark"
              ? "text-light"
              : "text-dark"
            }`}
        >
          <FaShopify size={20} />
          <small>Shop</small>
        </Link>

        {/* CART */}
        <Link
          to="/addtocart"
          className={`text-decoration-none d-flex flex-column align-items-center position-relative ${theme === "dark"
              ? "text-light"
              : "text-dark"
            }`}
        >
          🛒

          {cartCount > 0 && (
            <span
              className="badge bg-danger position-absolute"
              style={{
                top: "-5px",
                right: "-10px",
                fontSize: "10px",
              }}
            >
              {cartCount}
            </span>
          )}

          <small>Cart</small>
        </Link>

        {/* WISHLIST */}
        <Link
          to="/wishlist"
          className={`text-decoration-none d-flex flex-column align-items-center ${theme === "dark"
              ? "text-light"
              : "text-dark"
            }`}
        >
          ❤️
          <small>Wishlist</small>
        </Link>

        {/* PROFILE */}
        <Link
          to="/profile"
          className={`text-decoration-none d-flex flex-column align-items-center ${theme === "dark"
              ? "text-light"
              : "text-dark"
            }`}
        >
          <img
            src={user?.profile?.profilePic}
            alt=""
            width="24"
            height="24"
            className="rounded-circle"
            style={{
              objectFit: "cover",
            }}
          />

          <small>Profile</small>
        </Link>

      </div>
    </div>
  );
}

export default MobileBottomNav;