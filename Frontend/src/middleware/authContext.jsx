import { createContext, useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  // AUTH
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // THEME
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // FETCH USER
  const fetchMe = async () => {
    try {
      const res = await axios.get(`${API}/me`, {
        withCredentials: true,
      });

      setIsLoggedIn(true);
      setUser(res.data.user);

    } catch {
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = async () => {
    await fetch(`${API}/logout`, {
      method: "POST",
      credentials: "include",
    });

    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,   // ✅ yaha add karo
        role: user?.role,
        loading,
        fetchMe,
        logout,
        theme,
        toggleTheme,
        API
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;