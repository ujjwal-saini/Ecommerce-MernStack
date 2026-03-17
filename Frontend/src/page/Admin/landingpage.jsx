import React from "react";
import Sidebar from "./sidebar";
import Nav from "./nav";
import { Outlet } from "react-router-dom";

function Adminpage() {
  return (
    <div className="d-flex vh-100">

      <Sidebar />

      <div className="d-flex flex-column flex-grow-1">

        <Nav />

        <div className="flex-grow-1 overflow-auto p-3 bg-light">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Adminpage;
