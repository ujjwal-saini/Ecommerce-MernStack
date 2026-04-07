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

      <div className={`card shadow-sm p-3 mb-4 ${theme === "dark" ? "bg-dark border-secondary" : ""}`}>
        <div className="w-100 d-flex align-items-center justify-content-between gap-2 flex-wrap">
          <button className={`btn ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"}`}
            onClick={() => navigate(-1)}>
            ← Back
          </button>

          {/* SEARCH */}
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            style={{ maxWidth: "360px" }}
          />

          {/* CATEGORY */}
          <select className="form-select" style={{ maxWidth: "360px" }}>
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Sports</option>
            <option>Home</option>
          </select>

          {/* SORT */}
          <select className="form-select"
            style={{ maxWidth: "360px" }}>
            <option>Sort By</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>

          {/* APPLY */}
          <button className="btn btn-warning px-5">
            Apply
          </button>
        </div>
      </div>

      {/* PRODUCTS */}
      <Card products={products} />
    </div>
  );
}

export default AllProducts;