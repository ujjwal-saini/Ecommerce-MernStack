import { useState } from "react";
import axios from "axios";

const useSearch = (API) => {
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchProducts = async (keyword) => {
    if (!keyword) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/productSearch?search=${keyword}`
      );

      setResults(res.data.products || res.data.data || []);
      setCount(res.data.count || 0);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { results, count, loading, searchProducts };
};

export default useSearch;