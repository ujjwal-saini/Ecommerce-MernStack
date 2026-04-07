import React, { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Footer from "./footer";
import BottomNav from "./bottom_nav";
import { AuthContext } from "../../middleware/authContext";


function Landing() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { theme } = useContext(AuthContext);

  useEffect(() => {
    document.body.style.overflow = showSidebar ? "hidden" : "auto";
  }, [showSidebar]);

  return (
    <div className={`d-flex flex-column min-vh-100 ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <Navbar />
      <BottomNav toggleSidebar={() => setShowSidebar(!showSidebar)} />
 

      <div className="position-relative flex-grow-1">
        {showSidebar && (
          <div
            className="position-fixed top-0 start-0 h-100 sidebar"
            style={{ width: "280px", zIndex: 1050 }}
          >
            <Sidebar />
          </div>
        )}

        {showSidebar && (
          <div
            onClick={() => setShowSidebar(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 1040,
            }}
          />
        )}

        <div
          className="container-fluid"
          style={{
            filter: showSidebar ? "brightness(100%)" : "brightness(100%)",
            transition: "0.3s",
          }}
        >
          <div className="row">
            <div className="col-12 p-3">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Landing;