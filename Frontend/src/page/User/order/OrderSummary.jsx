import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../middleware/authContext";
import { clearCart } from "../../../redux/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";

function OrderSummary() {

  const cartItems = useSelector((state) => state.cart.items);
  const { user, API } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = async () => {

    if (!cartItems.length) {
      toast.error("Cart is empty ❌");
      return;
    }

    const toastId = toast.loading("Placing your order...");

    const orderData = {
      user: user._id,
      customerName: user.name,
      phone: user.profile.phone,
      email: user.email,
      address: user.profile.address.fullAddress,
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        image: item.mainImage,
        quantity: item.qty
      })),
      totalAmount: total,
      paymentMethod: "COD",
      orderStatus: "Pending"
    };

    try {

      const res = await axios.post(`${API}/orders`, orderData, {
        withCredentials: true
      });

      if (res.data) {

        toast.update(toastId, {
          render: "Order placed successfully ✅",
          type: "success",
          isLoading: false,
          autoClose: 2000
        });

        dispatch(clearCart());

        setTimeout(() => {
          navigate("/success");
        }, 2000);
      }

    } catch (error) {

      toast.dismiss(toastId);

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server not responding ❌");
      }

      console.log(error);
    }
  };

  return (
    <div className="card p-4 shadow">

      <h5>🧾 Order Summary</h5>
      <hr />

      {cartItems.map((item) => (
        <div key={item._id} className="d-flex justify-content-between">
          <p>{item.name}</p>
          <p>₹{item.price * item.qty}</p>
        </div>
      ))}

      <hr />

      <h5 className="text-success">
        Total ₹{total}
      </h5>

      <button
        className="btn btn-success w-100 mt-3"
        onClick={placeOrder}
      >
        Place Order
      </button>

    </div>
  );
}

export default OrderSummary;