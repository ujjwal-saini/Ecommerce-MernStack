import React, { useEffect, useContext } from "react";
import axios from "axios";
import Card from "../../components/card";
import { AuthContext } from "../../middleware/authContext";
import { useSelector, useDispatch } from "react-redux";
import { setWishlist } from "../../redux/wishlistSlice";

function Wishlist() {
  const { user, API, isLoggedIn } = useContext(AuthContext);
  const dispatch = useDispatch();

  const products = useSelector((state) => state.wishlist.items);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${API}/wishlist/${user._id}`);
      dispatch(setWishlist(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn && user?._id) {
      fetchWishlist();
    }
  }, [isLoggedIn, user]);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">❤️ My Wishlist</h3>

      {products.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <Card products={products} />
      )}
    </div>
  );
}

export default Wishlist;