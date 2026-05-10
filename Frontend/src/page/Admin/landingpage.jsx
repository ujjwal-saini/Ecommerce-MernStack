import React from "react";
import Sidebar from "./sidebar";
import Nav from "./nav";
import { Outlet } from "react-router-dom";
import MobileBootomnav from "./mobileBootomnav";

function Adminpage() {
  return (
    <div className="d-flex vh-100">

      <Sidebar />

      <div className="d-flex flex-column flex-grow-1">

        <Nav />

        <div className="main-content flex-grow-1  bg-light">
          <Outlet />
        </div>
      </div>
      <MobileBootomnav />
    </div>
  );
}

export default Adminpage;
