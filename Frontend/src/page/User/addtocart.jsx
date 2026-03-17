import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart
} from "../../redux/cartSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../middleware/authContext";
import Swal from "sweetalert2";

function Addtocart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useContext(AuthContext);

  //  total price calculate
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const handleIncreaseQty = async (item) => {

    if (item.qty >= item.stock) {
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
    await axios.post("http://localhost:3100/updatecart", {
      userId: user._id,
      productId: item._id,
      quantity: 1,
    });
  };

  const handleDecreaseQty = async (item) => {
    dispatch(decreaseQty(item._id));
    await axios.post("http://localhost:3100/updatecart", {
      userId: user._id,
      productId: item._id,
      quantity: -1,
    });
  };
  const handleRemoveItem = async (item) => {
    try {
      dispatch(removeFromCart(item._id));
      await axios.post("http://localhost:3100/removecart", {
        userId: user._id,
        productId: item._id,
      });
    } catch (error) {
      console.log(error);
    }
  };



  if (isLoggedIn === false) {
    return (
      <div className="container mt-5 text-center">
        <h3> Please login first</h3>
        <p>You need to login to view your cart</p>
        <Link to="/login" className="btn btn-primary mt-3">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛒 Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center mt-5">
          <h4>Your Cart is Empty </h4>
          <p>Add some products to your cart</p>
        </div>
      ) : (
        <div className="row">

          <div className="col-md-8">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="card mb-3 shadow-sm p-3"
              >
                <div className="row align-items-center">
                  <div className="col-md-3 text-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ height: "100px", objectFit: "contain" }}
                    />
                  </div>

                  <div className="col-md-4">
                    <h6>{item.name}</h6>
                    <p className="text-success">₹{item.price}</p>
                  </div>

                  <div className="col-md-3 d-flex align-items-center gap-2">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => handleDecreaseQty(item)}
                    >
                      −
                    </button>

                    <span>{item.qty}</span>

                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => handleIncreaseQty(item)}

                    >
                      +
                    </button>
                  </div>

                  <div className="col-md-2 text-end">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveItem(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <div className="card shadow p-4">
              <h5>Order Summary</h5>
              <hr />
              <p>
                Total Items: <strong>{cartItems.length}</strong>
              </p>
              <h4 className="text-success">
                Total: ₹{total}
              </h4>
              <button className="btn btn-primary w-100 mt-3">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Addtocart;