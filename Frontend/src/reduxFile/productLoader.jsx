import { useEffect, useContext } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProducts } from "../redux/productSlice";
import { AuthContext } from "../middleware/authContext";

function ProductLoader() {
  const dispatch = useDispatch();
  const { API } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`${API}/products`);
      dispatch(setProducts(res.data.data));
    };
    fetchProducts();
  }, [dispatch, API]);
  return null;
}

export default ProductLoader;