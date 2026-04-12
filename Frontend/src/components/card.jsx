import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../redux/cartSlice";
import Swal from "sweetalert2";
import { AuthContext } from "../middleware/authContext";
import axios from "axios";
import { FaShoppingCart, FaBolt } from "react-icons/fa";

function Card({ products }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
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

  const handleAddToCart = async (item) => {
    if (!isLoggedIn) return showLoginPopup();

    dispatch(addToCart(item));

    await axios.post(`${API}/addtocart`, {
      userId: user._id,
      productId: item._id,
      quantity: 1,
    });
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

    await axios.post(`${API}/updatecart`, {
      userId: user._id,
      productId: item._id,
      quantity: 1,
    });
  };

  const handleDecreaseQty = async (item) => {
    const cartItem = cartItems.find((ci) => ci._id === item._id);

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
  };

  const handleBuyNow = (item) => {
    if (!isLoggedIn) return showLoginPopup();
    handleAddToCart(item);
    navigate("/addtocart");
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row row-cols-2 row-cols-sm-2 row-cols-md-4 g-5">
        {products.map((item) => {
          const cartItem = cartItems.find((ci) => ci._id === item._id);
          return (
            <div className="col d-flex justify-content-center resposivecard" key={item._id}>
              <div
                className={`card h-100 border-0 shadow-sm product-card ${theme === "dark"
                    ? "bg-dark text-white border-secondary"
                    : ""
                  }`} style={{ width:"300px"}}>

                <Link
                  to={`/productdetail/${item._id}`}
                  className="text-decoration-none"
                >
                  <div className="product-img">
                    <img
                      src={item.mainImage}
                      alt={item.name}
                      className="product-image"
                    />
                  </div>
                </Link>

                {/* BODY */}
                <div className="card-body d-flex flex-column text-center p-2">

                  <h6 className="product-title">
                    {item.name}
                  </h6>

                  <p className="text-success fw-bold m-2">
                    ₹{item.discountPrice || item.price}
                  </p>

                  {!cartItem ? (
                    <div className="d-flex gap-2 mt-auto">

                      <button
                        className="btn btn-primary flex-fill btn-sm"
                        onClick={() => handleAddToCart(item)}
                      >
                        <FaShoppingCart /> Add
                      </button>

                      <button
                        className="btn btn-warning flex-fill btn-sm"
                        onClick={() => handleBuyNow(item)}
                      >
                        <FaBolt /> Buy
                      </button>

                    </div>
                  ) : (
                    <div className="d-flex justify-content-center align-items-center gap-3 mt-auto">

                      <button
                        className={`btn btn-sm ${theme === "dark"
                            ? "btn-outline-light"
                            : "btn-outline-secondary"
                          }`}
                        onClick={() => handleDecreaseQty(item)}
                      >
                        −
                      </button>

                      <span className="fw-bold">
                        {cartItem.qty}
                      </span>

                      <button
                        className={`btn btn-sm ${theme === "dark"
                            ? "btn-outline-light"
                            : "btn-outline-secondary"
                          }`}
                        onClick={() => handleIncreaseQty(item)}
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