import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../redux/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlistSlice";
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

  const showLoginPopup = () => {
    Swal.fire({
      title: "Login Required",
      text: "Please login to continue",
      icon: "warning",
      confirmButtonText: "Login",
    }).then((result) => {
      if (result.isConfirmed) navigate("/login");
    });
  };

  // 🛒 CART FUNCTIONS
  const handleAddToCart = async (item) => {
    if (!isLoggedIn) return showLoginPopup();
    console.log(item);
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

  const handleIncreaseQty = async (item) => {
    const cartItem = cartItems.find((ci) => ci._id === item._id);

    if (cartItem && cartItem.qty >= item.stock) {
      Swal.fire({
        icon: "warning",
        title: "Stock Limit Reached",
        timer: 1500,
        showConfirmButton: false,
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

  const handleBuyNow = (item) => {
    if (!isLoggedIn) return showLoginPopup();
    handleAddToCart(item);
    navigate("/addtocart");
  };

  // WISHLIST FUNCTION
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
        });
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="container-fluid mt-4">
      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-4 g-4">
        {products.map((item) => {
          const cartItem = cartItems.find((ci) => ci._id === item._id);

          //  Average Rating
          const avgRating =
            item.reviews && item.reviews.length > 0
              ? (
                item.reviews.reduce((acc, r) => acc + r.rating, 0) /
                item.reviews.length
              ).toFixed(1)
              : 4.2;

          const isWishlisted = wishlistItems.find(
            (w) => w._id === item._id
          );

          return (
            <div
              className="col d-flex justify-content-center"
              key={item._id}
            >
              <div
                className={`card h-100 shadow border-0 ${theme === "dark" ? "bg-dark text-white" : ""
                  }`}
                style={{ width: "300px" }}
              >
                {/* IMAGE */}
                <div style={{ position: "relative" }} className="d-flex overflow-hidden rounded-t-lg justify-content-center mb-3">
                  <Link to={`/productdetail/${item._id}`}>

                    {/* MAIN IMAGE */}
                    <img
                      src={item.mainImage}
                      alt={item.name}
                      className="w-auto"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                      }}
                    />
                    {/* +MORE BADGE */}
                    {item.images?.length > 2 && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-30px",
                          right: "5px",
                          width: "60px",
                          height: "28px",
                          background: "rgba(0,0,0,0.6)",
                          color: "white",
                          fontSize: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "6px",
                        }}
                      >
                        +{item.images.length} More
                      </div>
                    )}
                  </Link>

                  {/*  WISHLIST */}
                  <button
                    onClick={() => handleWishlist(item)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      border: "none",
                      background: "white",
                      borderRadius: "50%",
                      padding: "6px 8px",
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    {isWishlisted ? (
                      <FaHeart color="red" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                </div>

                {/* BODY */}
                <div className="card-body d-flex flex-column  px-3 py-4">

                  <h6 className="fw-semibold">{item.name}</h6>

                  {/* PRICE */}
                  <div className="d-flex justify-content-between gap-2">
                    <span className="text-success fw-bold">
                      ₹{item.discountPrice || item.price}
                    </span>

                    {item.discountPrice && (
                      <>
                        <span className="text-muted text-decoration-line-through small">
                          ₹{item.price}
                        </span>

                        <span className="text-success small fw-bold">
                          {Math.round(
                            ((item.price - item.discountPrice) /
                              item.price) *
                            100
                          )}
                          % off
                        </span>
                      </>
                    )}
                  </div>

                  {/* DELIVERY */}
                  <p className="small mt-1 mb-1">
                    {item.freeDelivery ? (
                      <span className="text-success fw-semibold">
                        Free Delivery
                      </span>
                    ) : (
                      <span className="text-muted">
                        Paid Delivery
                      </span>
                    )}
                  </p>

                  {/* REVIEWS */}
                  <div className="d-flex justify-content-start gap-2 mb-2">
                    <span className="badge bg-success">
                      {avgRating} ⭐
                    </span>
                    <span className="text-muted small">
                      ({item.reviews?.length || 0} Reviews)
                    </span>
                  </div>

                  {/* BUTTONS */}
                  {!cartItem ? (
                    <div className="d-flex gap-2 mt-auto">
                      <button
                        className="btn btn-primary flex-fill btn-sm"
                        onClick={() => handleAddToCart(item)}>
                        <FaShoppingCart /> Add
                      </button>

                      <button
                        className="btn btn-warning flex-fill btn-sm"
                        onClick={() => handleBuyNow(item)}>
                        <FaBolt /> Buy
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center gap-3 mt-auto">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleDecreaseQty(item)}>
                        −
                      </button>

                      <span className="fw-bold">{cartItem.qty}</span>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleIncreaseQty(item)}>
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