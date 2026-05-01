import React from "react";

function FilterSidebar() {
    
  return (
    <div className="px-3 py-4 h-100 filter-sidebar bg-white">
      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Filters</h5>
        <button className="btn btn-sm text-danger">Clear All</button>
      </div>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search category..."
          className="form-control"
        />
      </div>

      {/* Category */}
      <div className="mb-3">
        <h6>Category</h6>
        <div>
          <input type="checkbox" /> Fruits <br />
          <input type="checkbox" /> Fashion <br />
          <input type="checkbox" /> Electronics <br />
        </div>
      </div>

      {/* Type */}
      <div className="mb-3">
        <h6>Type</h6>
        <div>
          <input type="checkbox" /> Necklace <br />
          <input type="checkbox" /> Ring <br />
          <input type="checkbox" /> Bracelet <br />
        </div>
      </div>

      {/* Price */}
      <div className="mb-3">
        <h6>Price</h6>
        <input type="range" className="form-range" />
      </div>

    </div>
  );
}

export default FilterSidebar;
