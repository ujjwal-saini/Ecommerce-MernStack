import React, { useEffect, useState, useContext } from "react";
import CarouselSlider from "./carouselSlider";
import Card from "../../components/card";
import { Link, useLocation } from "react-router-dom";
import Loader from "../../components/loading";
import { AuthContext } from "../../middleware/authContext";
import { useSelector } from "react-redux";
import useSearch from "../../components/useSearch";

function Main() {
  const { theme, API } = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search");

  const [products, setProducts] = useState([]);
  const getproducts = useSelector((state) => state.product.products);

  const { results, count, loading, searchProducts } = useSearch(API);

  const limit = 4;

  // pagination
  const [pages, setPages] = useState({
    men: 1,
    laptop: 1,
    Mobile: 1,
    electronics: 1,
    kitchen: 1,
  });

  useEffect(() => {
    if (search) {
      searchProducts(search);
    } else {
      if (getproducts?.length > 0) {
        setProducts(getproducts);
      }
    }
  }, [search, getproducts]);

  const handleNext = (cat, maxPage) => {
    setPages((prev) => ({
      ...prev,
      [cat]: prev[cat] < maxPage ? prev[cat] + 1 : prev[cat],
    }));
  };

  const handlePrev = (cat) => {
    setPages((prev) => ({
      ...prev,
      [cat]: prev[cat] > 1 ? prev[cat] - 1 : 1,
    }));
  };

  const getPaginatedData = (category) => {
    const page = pages[category];
    const filtered = products.filter(
      (item) => item.category === category
    );

    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  };

  const sections = [
    { title: "Men Fashion", cat: "men" },
    { title: "Laptop", cat: "laptop" },
    { title: "Phone Products", cat: "Mobile" },
    { title: "Electronics", cat: "electronics" },
    { title: "Kitchen", cat: "kitchen" },
  ];

  if (loading && search) return <Loader />;

  return (
    <div className={`w-100 px-0 ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <div className="px-2">

        {search ? (
          <>
            <h4 className="fw-bold mt-5 mb-3">
              Search Results {count}
            </h4>
            <Card products={results} />
          </>
        ) : (
          <>
            <CarouselSlider />
            {sections.map((section) => {
              const filtered = products.filter(
                (item) => item.category === section.cat
              );

              const maxPage = Math.ceil(filtered.length / limit);

              return (
                <div key={section.cat}>
                  <div className="d-flex justify-content-between mt-5 mb-3">
                    <h4>{section.title}</h4>
                    <Link to={`allproducts/${section.cat}`}>
                      View All →
                    </Link>
                  </div>

                  <Card products={getPaginatedData(section.cat)} />
                  <div className="text-center mt-3">
                    <button onClick={() => handlePrev(section.cat)}>
                      Prev
                    </button>
                    <span className="mx-2">
                      {pages[section.cat]} / {maxPage || 1}
                    </span>
                    <button onClick={() => handleNext(section.cat, maxPage)}>
                      Next
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default Main;