import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "./card";
import Loader from "./loading";
import { AuthContext } from "../middleware/authContext";
import { useSelector } from "react-redux";

function AllProducts() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const getproducts = useSelector((state) => state.product.products);


  useEffect(() => {
    if (!getproducts.length) return;
    if (category === "all") {
      setProducts(getproducts);
    } else {
      const filtered = getproducts.filter(
        (item) => item.category === category
      );
      setProducts(filtered);
    }    
    setLoading(false);
  }, [category, getproducts]);
  if (loading) return <Loader />;

  return (
    <div className={theme === "dark" ? "text-white" : "text-dark"}>


      <Card products={products} />
    </div>
  );
}

export default AllProducts;