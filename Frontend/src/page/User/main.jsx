import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import CarouselSlider from "./carouselSlider";
import Card from "../../components/card";
import { Link, useLocation } from "react-router-dom";
import Loader from "../../components/loading";
import { AuthContext } from "../../middleware/authContext";

function Main() {
  const { theme ,API} = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count , setCount] = useState("0");

  const getData = async () => {
    try {
      let url = `${API}/products`;
      if (search) {
        url = `${API}/productSearch?search=${search}`;
      }
      const res = await axios.get(url);
      setProducts(res.data.products || res.data.data);
      setCount(res.data.count);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);
  if (loading) return <Loader />;

  return (
    <div className={`w-100 px-0 ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <div className="px-5">
        {search ? (
          <>
            <h4 className="fw-bold mt-5 mb-3">Search Results { count }</h4>
            <Card products={products} />
          </>
        ) : (
          <>
            <CarouselSlider />
            {[
              { title: "Men Fashion", cat: "men" },
              { title: "Laptop", cat: "laptop" },
              { title: "Phone Products", cat: "Mobile" },
              { title: "Electronics", cat: "electronics" },
              { title: "Kitchen", cat: "kitchen" }
            ].map((section) => (
              <div key={section.cat}>
                <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
                  <h4 className="fw-bold">{section.title}</h4>
                  <Link
                    to={`allproducts/${section.cat}`}
                    className={`btn btn-sm ${theme === "dark" ? "btn-outline-light" : "btn-primary"}`}
                  >
                    View All →
                  </Link>
                </div>
                <Card
                  products={products
                    .filter((item) => item.category === section.cat)
                    .slice(0, 4)}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );

}

export default Main;