import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQty, decreaseQty ,removeFromCart } from "../redux/cartSlice";
import Swal from "sweetalert2";
import { AuthContext } from "../middleware/authContext";
import axios from "axios";

function Card({ products }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const { isLoggedIn, user, theme ,API} = useContext(AuthContext);

  const showLoginPopup = () => {
    Swal.fire({
      title: "Login Required",
      text: "Please login to continue",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Login",
      confirmButtonColor: "#0d6efd",
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
      text: "You cannot add more than available stock",
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
    dispatch(addToCart(item));
    // handleIncreaseQty(item);
    navigate("/dashboard/addtocart");
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {products.map((item) => {
          const cartItem = cartItems.find((ci) => ci._id === item._id);

          return (
            <div className="col px-2" key={item._id}>
              <div
                className={`card h-100 shadow-sm p-2 ${
                  theme === "dark" ? "bg-dark text-white border-secondary" : ""
                }`}>

                <Link
                  to={`/productdetail/${item._id}`}
                  className={`text-decoration-none ${
                    theme === "dark" ? "text-white" : "text-dark"
                  }`}>

                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "220px" }}>

                    <img
                      src={item.thumbnail || item.image}
                      alt={item.name}
                      style={{
                        maxHeight: "220px",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </Link>

                {/* BODY */}
                <div className="card-body d-flex flex-column text-center">
                  <h6 className="card-title">{item.name}</h6>

                  <p className="card-text text-success fw-semibold mb-3">
                    ₹{item.discountPrice || item.price}
                  </p>

                  {!cartItem ? (
                    <div className="d-flex justify-content-center gap-3 mt-auto">
                      <button
                        className="btn btn-primary"
                        style={{ width: "120px", height: "42px" }}
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </button>

                      <button
                        className="btn btn-warning"
                        style={{ width: "120px", height: "42px" }}
                        onClick={() => handleBuyNow(item)}>
                        Buy Now
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center align-items-center gap-4 mt-auto">
                      <button
                        className={`btn ${
                          theme === "dark"
                            ? "btn-outline-light"
                            : "btn-outline-secondary"
                        }`}
                        style={{ width: "40px", height: "40px" }}
                        onClick={() => handleDecreaseQty(item)}
                      >
                        −
                      </button>

                      <span className="fw-bold">{cartItem.qty}</span>

                      <button
                        className={`btn ${
                          theme === "dark"
                            ? "btn-outline-light"
                            : "btn-outline-secondary"
                        }`}
                        style={{ width: "40px", height: "40px" }}
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