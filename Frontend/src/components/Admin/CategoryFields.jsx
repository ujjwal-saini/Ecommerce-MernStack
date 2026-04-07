import React from "react";

function CategoryFields({
  category,
  form,
  handleChange,
  handleSpecificationChange,
  handleVariantChange,
  addVariant,
  handleDimensionChange
}) {

  if (!category) return null;

  return (
    <div className="mt-4">

      <h5 className="fw-bold mb-3">
        {category} Specifications
      </h5>

      {/* ---------------- MOBILE ---------------- */}

      {category === "Mobile" && (
        <div>

          <div className="row">

            <div className="col-md-4 mb-2">
              <input
                className="form-control"
                placeholder="Operating System"
                onChange={(e) =>
                  handleSpecificationChange("OS", e.target.value)
                }
              />
            </div>

            <div className="col-md-4 mb-2">
              <input
                className="form-control"
                placeholder="RAM (8GB)"
                onChange={(e) =>
                  handleSpecificationChange("RAM", e.target.value)
                }
              />
            </div>

            <div className="col-md-4 mb-2">
              <input
                className="form-control"
                placeholder="Storage"
                onChange={(e) =>
                  handleSpecificationChange("Storage", e.target.value)
                }
              />
            </div>

            <div className="col-md-4 mb-2">
              <input
                className="form-control"
                placeholder="Processor"
                onChange={(e) =>
                  handleSpecificationChange("Processor", e.target.value)
                }
              />
            </div>

            <div className="col-md-4 mb-2">
              <input
                className="form-control"
                placeholder="Battery"
                onChange={(e) =>
                  handleSpecificationChange("Battery", e.target.value)
                }
              />
            </div>

            <div className="col-md-4 mb-2">
              <input
                className="form-control"
                placeholder="Display"
                onChange={(e) =>
                  handleSpecificationChange("Display", e.target.value)
                }
              />
            </div>

            <div className="col-md-4 mb-2">
              <input
                className="form-control"
                placeholder="Camera"
                onChange={(e) =>
                  handleSpecificationChange("Camera", e.target.value)
                }
              />
            </div>

          </div>

          {/* VARIANTS FOR MOBILE */}

          <h6 className="mt-4">Mobile Variants (Color)</h6>

          {form.variants.map((v, i) => (
            <div key={i} className="border p-3 mb-2 rounded">

              <div className="row">

                <div className="col-md-4">
                  <input
                    className="form-control"
                    placeholder="Color (Black)"
                    onChange={(e) =>
                      handleVariantChange(i, "color", e.target.value)
                    }
                  />
                </div>

                <div className="col-md-4">
                  <input
                    className="form-control"
                    placeholder="Stock"
                    onChange={(e) =>
                      handleVariantChange(i, "stock", e.target.value)
                    }
                  />
                </div>

                <div className="col-md-4">
                  <input
                    className="form-control"
                    placeholder="Price"
                    onChange={(e) =>
                      handleVariantChange(i, "price", e.target.value)
                    }
                  />
                </div>

              </div>

            </div>
          ))}

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={addVariant}
          >
            Add Color Variant
          </button>

        </div>
      )}

      {/* ---------------- GROCERY ---------------- */}

      {category === "Grocery" && (
        <div className="row">

          <div className="col-md-4 mb-2">
            <select
              name="unit"
              className="form-control"
              onChange={handleChange}
            >
              <option value="">Select Unit</option>
              <option value="kg">Kilogram</option>
              <option value="gram">Gram</option>
              <option value="litre">Litre</option>
              <option value="ml">ML</option>
              <option value="pack">Pack</option>
            </select>
          </div>

          <div className="col-md-4 mb-2">
            <input
              name="weight"
              className="form-control"
              placeholder="Weight"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-2">
            <input
              type="date"
              name="manufacturingDate"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-2">
            <input
              type="date"
              name="expiryDate"
              className="form-control"
              onChange={handleChange}
            />
          </div>

        </div>
      )}

      {/* ---------------- CLOTHES & SHOES ---------------- */}

      {(category === "Clothes" || category === "Shoes") && (
        <div>

          <h6>Variants (Size / Color)</h6>

          {form.variants.map((v, i) => (
            <div key={i} className="border p-3 mb-2 rounded">

              <div className="row">

                <div className="col-md-3">
                  <input
                    className="form-control"
                    placeholder="Size"
                    onChange={(e) =>
                      handleVariantChange(i, "size", e.target.value)
                    }
                  />
                </div>

                <div className="col-md-3">
                  <input
                    className="form-control"
                    placeholder="Color"
                    onChange={(e) =>
                      handleVariantChange(i, "color", e.target.value)
                    }
                  />
                </div>

                <div className="col-md-3">
                  <input
                    className="form-control"
                    placeholder="Stock"
                    onChange={(e) =>
                      handleVariantChange(i, "stock", e.target.value)
                    }
                  />
                </div>

                <div className="col-md-3">
                  <input
                    className="form-control"
                    placeholder="Price"
                    onChange={(e) =>
                      handleVariantChange(i, "price", e.target.value)
                    }
                  />
                </div>

              </div>

            </div>
          ))}

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={addVariant}
          >
            Add Variant
          </button>

        </div>
      )}

      {/* ---------------- FURNITURE ---------------- */}

      {category === "Furniture" && (
        <div className="row">

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Length"
              onChange={(e) =>
                handleDimensionChange("length", e.target.value)
              }
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Width"
              onChange={(e) =>
                handleDimensionChange("width", e.target.value)
              }
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Height"
              onChange={(e) =>
                handleDimensionChange("height", e.target.value)
              }
            />
          </div>

          <div className="col-md-3">
            <input
              name="weight"
              className="form-control"
              placeholder="Weight"
              onChange={handleChange}
            />
          </div>

        </div>
      )}

      {/* ---------------- FLAGS ---------------- */}

      <div className="mt-4">

        <h6>Product Flags</h6>

        <div className="form-check">
          <input
            type="checkbox"
            name="isFeatured"
            className="form-check-input"
            onChange={handleChange}
          />
          <label className="form-check-label">
            Featured Product
          </label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            name="isNewArrival"
            className="form-check-input"
            onChange={handleChange}
          />
          <label className="form-check-label">
            New Arrival
          </label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            name="isOnSale"
            className="form-check-input"
            onChange={handleChange}
          />
          <label className="form-check-label">
            On Sale
          </label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            name="isTrending"
            className="form-check-input"
            onChange={handleChange}
          />
          <label className="form-check-label">
            Trending
          </label>
        </div>

      </div>

    </div>
  );
}

export default CategoryFields;