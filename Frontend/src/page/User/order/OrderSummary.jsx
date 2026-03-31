import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../../middleware/authContext";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/cartSlice";
import axios from "axios";

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
    const orderData = {
      user: user._id,
      customerName: user.name,
      phone: user.profile.phone,
      email: user.email,
      address: user.profile.address.fullAddress,
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.qty
      })),
      totalAmount: total,
      paymentMethod: "COD",
      orderStatus: "Pending"
    };
    console.log(orderData);
    try {
      const res = await axios.post(`${API}/orders`, orderData);
      console.log(res.data);

      if (res.data) {
        alert("Order Placed Successfully ✅");
        dispatch(clearCart());
        navigate("/success");
      }

    } catch (error) {
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