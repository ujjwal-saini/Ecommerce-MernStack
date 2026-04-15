import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Card from "./card";
import Loader from "./loading";
import { AuthContext } from "../middleware/authContext";
import useSearch from "./useSearch";

function SearchPage() {
  const { API } = useContext(AuthContext);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query");

  const { results, count, loading, searchProducts } = useSearch(API);

  useEffect(() => {
    if (query) {
      searchProducts(query);
    }
  }, [query]);

  if (loading) return <Loader />;

  return (
    <div className="container mt-4">
      <h3>Search Results: {count}</h3>
      <Card products={results} />
    </div>
  );
}

export default SearchPage;