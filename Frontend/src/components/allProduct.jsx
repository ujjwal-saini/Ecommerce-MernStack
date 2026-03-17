import React from "react";
import Card from "./card";

function AllProduct() {
  return (
    <div className="container mt-4">

      <div className="card shadow-sm p-3 mb-4">
        <div className="row align-items-center">

          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
            />
          </div>

          <div className="col-md-3 mb-2">
            <select className="form-select">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Sports</option>
              <option>Home</option>
            </select>
          </div>

          <div className="col-md-3 mb-2">
            <select className="form-select">
              <option>Sort By</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>


          <div className="col-md-2 mb-2">
            <button className="btn btn-warning w-100">
              Apply
            </button>
          </div>

        </div>
      </div>

      <div className="row">
        <Card />
      </div>

    </div>
  );
}

export default AllProduct;
