import React, { useEffect, useState, useContext } from "react";
import CarouselSlider from "./carouselSlider";
import Card from "../../components/card";
import { Link, useLocation } from "react-router-dom";
import Loader from "../../components/loading";
import { AuthContext } from "../../middleware/authContext";
import { useSelector } from "react-redux";
import useSearch from "../../components/useSearch";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Category from "./category";
import TripleBannerSection from "./triplebanner";
import OfferBanner from "./offerBanner";

import PromoStrip from "./promoStrip";
import TrendingBrands from "./trendingBrands";
import ModernTextSection from "./modernTextSection";
function Main() {
  const { theme, API } = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search");

  const getproducts = useSelector((state) => state.product.products);

  const [products, setProducts] = useState([]);

  const { results, count, loading, searchProducts } = useSearch(API);

  const limit = 4;

  const [pages, setPages] = useState({
    men: 1,
    laptop: 1,
    phone: 1,
    electronics: 1,
    headphone: 1,
    kitchen: 1,
  });


  useEffect(() => {
    if (search) {
      searchProducts(search);
    } else {
      if (getproducts?.length > 0) {
        const normalized = getproducts.map((p) => ({
          ...p,
          category: p.category?.toLowerCase(),
          subcategory: p.subcategory?.toLowerCase(),
        }));
        setProducts(normalized);
      }
    }
  }, [search, getproducts]);

  const handleNext = (key, maxPage) => {
    setPages((prev) => ({
      ...prev,
      [key]: prev[key] < maxPage ? prev[key] + 1 : prev[key],
    }));
  };

  const handlePrev = (key) => {
    setPages((prev) => ({
      ...prev,
      [key]: prev[key] > 1 ? prev[key] - 1 : 1,
    }));
  };

  const getPaginatedData = (categories, key) => {
    const page = pages[key];
    const filtered = products.filter((item) => {
      const cat = item.category || "";
      const sub = item.subcategory || "";
      return categories.some((c) =>
        sub.includes(c) ||
        cat.includes(c)
      );
    });
    const start = (page - 1) * limit;
    return {
      data: filtered.slice(start, start + limit),
      total: filtered.length,
    };
  };

  const sections = [
    { title: "Men Fashion", cat: ["men", "clothing"], key: "men" },
    { title: "Laptop", cat: ["laptop"], key: "laptop" },
    { title: "Headphone", cat: ["headphone", "headphones", "earphone", "speaker", "earbuds"], key: "headphone" },
  ];
  if (loading && search) return <Loader />;

  return (

    <div
      className={`w-100 px-0 ${theme === "dark"
        ? "theme-black text-light"
        : "bg-light text-dark"
        }`}
    >

      <div className="px-2">

        {/* SEARCH RESULTS */}

        {search ? (

          <>
            <h4 className="fw-bold mb-3">

              Search Results ({count})

            </h4>

            {results.length > 0 ? (

              <Card products={results} />

            ) : (

              <p>No products found</p>

            )}
          </>

        ) : (

          <>
            {/* HERO BANNER */}

            <TripleBannerSection />
            {/* CATEGORY */}

            <Category />

            {/* PROMO STRIP */}

            <PromoStrip />



            {/* OFFER BANNER */}

            <OfferBanner />

            {/* PRODUCTS */}

            {sections.map((section) => {

              const { data, total } =
                getPaginatedData(
                  section.cat,
                  section.key
                );

              const maxPage =
                Math.ceil(total / limit);

              return (

                <div
                  key={section.key}
                  className="my-5"
                >

                  {/* TITLE */}

                  <div className="d-flex justify-content-between align-items-center mb-3">

                    <h4 className="fw-bold">
                      {section.title}
                    </h4>

                    <Link
                      to={`allproducts/${section.key}`}
                      className="text-decoration-none fw-semibold"
                    >
                      View All →
                    </Link>

                  </div>

                  {/* PRODUCT CARD */}

                  {data.length > 0 ? (

                    <Card products={data} />

                  ) : (

                    <Loader />

                  )}

                  {/* PAGINATION */}

                  {total > limit && (

                    <div className="text-center mt-4">

                      <button
                        className="btn btn-primary me-2"
                        onClick={() =>
                          handlePrev(section.key)
                        }
                      >
                        <FaAngleLeft />
                      </button>

                      <span className="fw-bold">

                        {pages[section.key]} / {maxPage || 1}

                      </span>

                      <button
                        className="btn btn-primary ms-2"
                        onClick={() =>
                          handleNext(
                            section.key,
                            maxPage
                          )
                        }
                      >
                        <FaAngleRight />
                      </button>

                    </div>
                  )}

                </div>
              );
            })}


            <CarouselSlider />
            {/* TRENDING BRANDS */}

            <TrendingBrands />

            {/* SMALL CAROUSEL */}

            <ModernTextSection />

          </>
        )}

      </div>

    </div>
  );
}

export default Main;