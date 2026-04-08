import { useEffect, useContext } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/cartSlice";
import { AuthContext } from "../middleware/authContext";

function CartLoader() {

  const dispatch = useDispatch();
  const { user , API } = useContext(AuthContext);

  useEffect(() => {
    const loadCart = async () => {
      try {
        if (!user?._id) return;
        const res = await axios.get(
          `${API}/getcart/${user._id}`
        );

        const formattedCart = res.data.map((item) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          mainImage: item.mainImage,
          qty: item.qty,
          stock:item.stock
        }));

        dispatch(setCart(formattedCart));
      } catch (error) {
        console.error("Cart Load Error:", error);
      }
    };
    loadCart();
  }, [user, dispatch]);

  return null;
}

export default CartLoader;