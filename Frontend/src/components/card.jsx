import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../redux/cartSlice";

import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";

import Swal from "sweetalert2";
import { AuthContext } from "../middleware/authContext";
import axios from "axios";

import { FaShoppingCart, FaBolt, FaHeart, FaRegHeart } from "react-icons/fa";

function Card({ products = [] }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  const { isLoggedIn, user, theme, API } = useContext(AuthContext);

  // LOGIN POPUP
  const showLoginPopup = () => {
    Swal.fire({
      title: "Login Required",
      text: "Please login to continue",
      icon: "warning",
      confirmButtonText: "Login",
      background: theme === "dark" ? "#0f0f0f" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };

  // ADD TO CART
  const handleAddToCart = async (item) => {
    if (!isLoggedIn) return showLoginPopup();

    dispatch(addToCart(item));

    try {
      await axios.post(`${API}/addtocart`, {
        userId: user._id,
        productId: item._id,
        quantity: 1,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // INCREASE QTY
  const handleIncreaseQty = async (item) => {
    const cartItem = cartItems.find((ci) => ci._id === item._id);

    if (cartItem && cartItem.qty >= item.stock) {
      Swal.fire({
        icon: "warning",
        title: "Stock Limit Reached",
        timer: 1500,
        showConfirmButton: false,
        background: theme === "dark" ? "#0f0f0f" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
      });

      return;
    }

    dispatch(increaseQty(item._id));

    try {
      await axios.post(`${API}/updatecart`, {
        userId: user._id,
        productId: item._id,
        quantity: 1,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // DECREASE QTY
  const handleDecreaseQty = async (item) => {
    const cartItem = cartItems.find((ci) => ci._id === item._id);

    try {
      if (cartItem.qty === 1) {
        dispatch(removeFromCart(item._id));

        await axios.post(`${API}/removecart`, {
          userId: user._id,
          productId: item._id,
        });
      } else {
        dispatch(decreaseQty(item._id));

        await axios.post(`${API}/updatecart`, {
          userId: user._id,
          productId: item._id,
          quantity: -1,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // BUY NOW
  const handleBuyNow = (item) => {
    if (!isLoggedIn) return showLoginPopup();

    handleAddToCart(item);

    navigate("/addtocart");
  };

  // WISHLIST
  const handleWishlist = async (item) => {
    if (!isLoggedIn) return showLoginPopup();

    const exists = wishlistItems.find((w) => w._id === item._id);

    try {
      if (exists) {
        dispatch(removeFromWishlist(item._id));

        await axios.post(`${API}/removewishlist`, {
          userId: user._id,
          productId: item._id,
        });

        Swal.fire({
          icon: "success",
          title: "Removed from Wishlist",
          timer: 1200,
          showConfirmButton: false,
          background: theme === "dark" ? "#0f0f0f" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
        });
      } else {
        dispatch(addToWishlist(item));

        await axios.post(`${API}/addwishlist`, {
          userId: user._id,
          productId: item._id,
        });

        Swal.fire({
          icon: "success",
          title: "Added to Wishlist",
          timer: 1200,
          showConfirmButton: false,
          background: theme === "dark" ? "#0f0f0f" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid ">
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
        {products.map((item) => {
          const cartItem = cartItems.find((ci) => ci._id === item._id);

          // AVG RATING
          const avgRating =
            item.reviews && item.reviews.length > 0
              ? (
                item.reviews.reduce((acc, r) => acc + r.rating, 0) /
                item.reviews.length
              ).toFixed(1)
              : 4.2;

          // WISHLIST CHECK
          const isWishlisted = wishlistItems.find((w) => w._id === item._id);

          return (
            <div className="col" key={item._id}>
              <div
                className={`card border-0 h-100 overflow-hidden ${theme === "dark"
                  ? "bg-black text-light"
                  : "bg-white text-dark"
                  }`}
                style={{
                  borderRadius: "22px",
                  transition: "0.3s ease",
                  boxShadow:
                    theme === "dark"
                      ? "0 5px 20px rgba(255,255,255,0.05)"
                      : "0 5px 20px rgba(0,0,0,0.08)",
                  border:
                    theme === "dark"
                      ? "1px solid #1f1f1f"
                      : "1px solid #f1f1f1",
                }}
              >
                {/* IMAGE */}
                <div
                  className="position-relative overflow-hidden d-flex justify-content-center align-items-center"
                  style={{
                    height: "250px",
                    background: theme === "dark" ? "#0a0a0a" : "#f8f9fa",
                  }}
                >
                  <Link
                    to={`/productdetail/${item._id}`}
                    className="w-100 h-100 d-flex justify-content-center align-items-center"
                  >
                    <img
                      src={item.mainImage}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "contain",
                        transition: "0.3s",
                        padding: "15px",
                      }}
                    />
                  </Link>

                  {/* MORE BADGE */}
                  {item.images?.length > 2 && (
                    <div
                      className="position-absolute"
                      style={{
                        bottom: "12px",
                        left: "12px",
                        background: "rgba(0,0,0,0.7)",
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        backdropFilter: "blur(5px)",
                      }}
                    >
                      +{item.images.length} More
                    </div>
                  )}

                  {/* WISHLIST */}
                  <button
                    onClick={() => handleWishlist(item)}
                    className="btn position-absolute"
                    style={{
                      top: "12px",
                      right: "12px",
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: theme === "dark" ? "#111" : "#fff",
                      border:
                        theme === "dark" ? "1px solid #222" : "1px solid #eee",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                    }}
                  >
                    {isWishlisted ? <FaHeart color="red" /> : <FaRegHeart />}
                  </button>
                </div>

                {/* BODY */}
                <div className="card-body d-flex flex-column p-3">
                  {/* PRODUCT NAME */}
                  <h6
                    className="fw-semibold mb-2"
                    style={{
                      minHeight: "42px",
                      fontSize: "14px",
                      lineHeight: "1.5",
                    }}
                  >
                    {item.name}
                  </h6>

                  {/* PRICE */}
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <span
                      className="fw-bold"
                      style={{
                        fontSize: "18px",
                        color: "#16a34a",
                      }}
                    >
                      ₹{item.discountPrice || item.price}
                    </span>

                    {item.discountPrice && (
                      <>
                        <span
                          className={`small text-decoration-line-through ${theme === "dark" ? "text-secondary" : "text-muted"
                            }`}
                        >
                          ₹{item.price}
                        </span>

                        <span
                          className="small fw-bold"
                          style={{
                            color: "#16a34a",
                          }}
                        >
                          {Math.round(
                            ((item.price - item.discountPrice) / item.price) *
                            100,
                          )}
                          % OFF
                        </span>
                      </>
                    )}
                  </div>

                  {/* DELIVERY */}
                  <div className="mt-2">
                    {item.freeDelivery ? (
                      <span
                        className="badge"
                        style={{
                          background: "#198754",
                          fontWeight: "500",
                        }}
                      >
                        Free Delivery
                      </span>
                    ) : (
                      <span
                        className={`small ${theme === "dark" ? "text-secondary" : "text-muted"
                          }`}
                      >
                        Paid Delivery
                      </span>
                    )}
                  </div>

                  {/* REVIEWS */}
                  <div className="d-flex align-items-center gap-2 mt-3 mb-3">
                    <span
                      className="badge"
                      style={{
                        background: "#16a34a",
                        fontSize: "12px",
                        padding: "6px 8px",
                      }}
                    >
                      {avgRating} ⭐
                    </span>

                    <span
                      className={`small ${theme === "dark" ? "text-secondary" : "text-muted"
                        }`}
                    >
                      ({item.reviews?.length || 0} Reviews)
                    </span>
                  </div>

                  {/* BUTTONS */}
                  {!cartItem ? (
                    <div className="d-flex gap-2 mt-auto">
                      {/* ADD */}
                      <button
                        className="btn flex-fill fw-semibold"
                        onClick={() => handleAddToCart(item)}
                        style={{
                          height: "42px",
                          borderRadius: "12px",
                          background: theme === "dark" ? "#111" : "#f1f1f1",
                          color: theme === "dark" ? "#fff" : "#000",
                          border:
                            theme === "dark"
                              ? "1px solid #222"
                              : "1px solid #ddd",
                        }}
                      >
                        <FaShoppingCart className="me-2" />
                        Add
                      </button>

                      {/* BUY */}
                      <button
                        className="btn flex-fill fw-semibold text-white"
                        onClick={() => handleBuyNow(item)}
                        style={{
                          height: "42px",
                          borderRadius: "12px",
                          border: "none",
                          background: "linear-gradient(90deg,#ff7b00,#ff9d42)",
                        }}
                      >
                        <FaBolt className="me-2" />
                        Buy
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <button
                        className="btn btn-sm"
                        onClick={() => handleDecreaseQty(item)}
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "12px",
                          background: theme === "dark" ? "#111" : "#f1f1f1",
                          color: theme === "dark" ? "#fff" : "#000",
                        }}
                      >
                        −
                      </button>

                      <span
                        className="fw-bold"
                        style={{
                          fontSize: "16px",
                        }}
                      >
                        {cartItem.qty}
                      </span>

                      <button
                        className="btn btn-sm"
                        onClick={() => handleIncreaseQty(item)}
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "12px",
                          background: theme === "dark" ? "#111" : "#f1f1f1",
                          color: theme === "dark" ? "#fff" : "#000",
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
