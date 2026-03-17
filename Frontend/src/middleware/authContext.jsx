import { createContext, useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //  AUTH STATES
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(API);

  //  THEME STATE
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  //  TOGGLE THEME
  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  //  APPLY THEME TO BODY
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  //  FETCH LOGGED IN USER
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

  //  LOGOUT
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
        // auth
        isLoggedIn,
        setIsLoggedIn,
        user,
        role: user?.role,
        loading,
        fetchMe,
        logout,

        // theme
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