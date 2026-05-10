import React, { useContext } from "react";
import { AuthContext } from "../../../middleware/authContext";

function CategoryFields({
  subcategory,
  category,
  form,
  handleChange,
  handleSpecificationChange,
  handleVariantChange,
  addVariant,
  handleDimensionChange
}) {

  const { theme } = useContext(AuthContext);

  if (!category) return null;

  const inputClass = `form-control ${theme === "dark"
      ? "bg-dark text-light border-secondary"
      : "bg-white text-dark"
    }`;

  const cardClass = `${theme === "dark"
      ? "bg-dark border border-secondary text-light"
      : "bg-light border text-dark"
    }`;

  return (

    <div className="mt-4">

      <h5 className="fw-bold mb-3 fs-5 fs-md-4">
        {category} Specifications
      </h5>

      {/* ===============================
          ELECTRONICS
      =============================== */}

      {["phone", "laptop", "mobile"].includes(subcategory) &&
        category === "Electronics" && (

          <div>

            <div className="row g-2">

              <div className="col-12 col-md-4">
                <input
                  className={inputClass}
                  placeholder="RAM (8GB)"
                  value={form.specifications?.RAM || ""}
                  onChange={(e) =>
                    handleSpecificationChange(
                      "RAM",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-12 col-md-4">
                <input
                  className={inputClass}
                  placeholder="Storage"
                  value={form.specifications?.Storage || ""}
                  onChange={(e) =>
                    handleSpecificationChange(
                      "Storage",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-12 col-md-4">
                <input
                  className={inputClass}
                  placeholder="OS"
                  value={form.specifications?.OS || ""}
                  onChange={(e) =>
                    handleSpecificationChange(
                      "OS",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-12 col-md-4">
                <input
                  className={inputClass}
                  placeholder="Battery"
                  value={form.specifications?.Battery || ""}
                  onChange={(e) =>
                    handleSpecificationChange(
                      "Battery",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-12 col-md-4">
                <input
                  className={inputClass}
                  placeholder="Display"
                  value={form.specifications?.Display || ""}
                  onChange={(e) =>
                    handleSpecificationChange(
                      "Display",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="col-12 col-md-4">
                <input
                  className={inputClass}
                  placeholder="Camera"
                  value={form.specifications?.Camera || ""}
                  onChange={(e) =>
                    handleSpecificationChange(
                      "Camera",
                      e.target.value
                    )
                  }
                />
              </div>

            </div>

            {/* MOBILE VARIANTS */}

            <h6 className="mt-4 fw-bold">
              Mobile Variants (Color)
            </h6>

            {form.variants.map((v, i) => (

              <div
                key={i}
                className={`rounded-4 p-3 mb-3 shadow-sm ${cardClass}`}
              >

                <div className="row g-2">

                  <div className="col-12 col-md-4">
                    <input
                      className={inputClass}
                      placeholder="Color (Black)"
                      value={v.color}
                      onChange={(e) =>
                        handleVariantChange(
                          i,
                          "color",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <input
                      className={inputClass}
                      placeholder="Stock"
                      value={v.stock}
                      onChange={(e) =>
                        handleVariantChange(
                          i,
                          "stock",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <input
                      className={inputClass}
                      placeholder="Price"
                      value={v.price}
                      onChange={(e) =>
                        handleVariantChange(
                          i,
                          "price",
                          e.target.value
                        )
                      }
                    />
                  </div>

                </div>

              </div>

            ))}

            <button
              type="button"
              className="btn btn-primary btn-sm rounded-3 px-3"
              onClick={addVariant}
            >
              Add Color Variant
            </button>

          </div>
        )}

      {/* ===============================
          CLOTHES & SHOES
      =============================== */}

      {(subcategory === "clothes" ||
        subcategory === "Shoes" ||
        category === "clothes" ||
        category === "Shoes") && (

          <div>

            <h6 className="fw-bold">
              Variants (Size / Color)
            </h6>

            {form.variants.map((v, i) => (

              <div
                key={i}
                className={`rounded-4 p-3 mb-3 shadow-sm ${cardClass}`}
              >

                <div className="row g-2">

                  <div className="col-12 col-md-3">
                    <input
                      className={inputClass}
                      placeholder="Size"
                      value={v.size}
                      onChange={(e) =>
                        handleVariantChange(
                          i,
                          "size",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="col-12 col-md-3">
                    <input
                      className={inputClass}
                      placeholder="Color"
                      value={v.color}
                      onChange={(e) =>
                        handleVariantChange(
                          i,
                          "color",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="col-12 col-md-3">
                    <input
                      className={inputClass}
                      placeholder="Stock"
                      value={v.stock}
                      onChange={(e) =>
                        handleVariantChange(
                          i,
                          "stock",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="col-12 col-md-3">
                    <input
                      className={inputClass}
                      placeholder="Price"
                      value={v.price}
                      onChange={(e) =>
                        handleVariantChange(
                          i,
                          "price",
                          e.target.value
                        )
                      }
                    />
                  </div>

                </div>

              </div>

            ))}

            <button
              type="button"
              className="btn btn-primary btn-sm rounded-3 px-3"
              onClick={addVariant}
            >
              Add Variant
            </button>

          </div>
        )}

      {/* ===============================
          FURNITURE
      =============================== */}

      {category === "Furniture" && (

        <div
          className={`rounded-4 p-3 shadow-sm ${cardClass}`}
        >

          <div className="row g-2">

            <div className="col-12 col-md-3">
              <input
                className={inputClass}
                placeholder="Length"
                value={form.dimensions?.length || ""}
                onChange={(e) =>
                  handleDimensionChange(
                    "length",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="col-12 col-md-3">
              <input
                className={inputClass}
                placeholder="Width"
                value={form.dimensions?.width || ""}
                onChange={(e) =>
                  handleDimensionChange(
                    "width",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="col-12 col-md-3">
              <input
                className={inputClass}
                placeholder="Height"
                value={form.dimensions?.height || ""}
                onChange={(e) =>
                  handleDimensionChange(
                    "height",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="col-12 col-md-3">
              <input
                name="weight"
                className={inputClass}
                placeholder="Weight"
                value={form.weight || ""}
                onChange={handleChange}
              />
            </div>

          </div>

        </div>
      )}

      {/* ===============================
          FLAGS
      =============================== */}

      <div
        className={`mt-4 rounded-4 p-3 shadow-sm ${cardClass}`}
      >

        <h6 className="fw-bold mb-3">
          Product Flags
        </h6>

        <div className="row g-2">

          <div className="col-12 col-md-6">

            <div className="form-check">

              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                className="form-check-input"
                onChange={handleChange}
              />

              <label className="form-check-label">
                Featured Product
              </label>

            </div>

          </div>

          <div className="col-12 col-md-6">

            <div className="form-check">

              <input
                type="checkbox"
                name="isNewArrival"
                checked={form.isNewArrival}
                className="form-check-input"
                onChange={handleChange}
              />

              <label className="form-check-label">
                New Arrival
              </label>

            </div>

          </div>

          <div className="col-12 col-md-6">

            <div className="form-check">

              <input
                type="checkbox"
                name="isOnSale"
                checked={form.isOnSale}
                className="form-check-input"
                onChange={handleChange}
              />

              <label className="form-check-label">
                On Sale
              </label>

            </div>

          </div>

          <div className="col-12 col-md-6">

            <div className="form-check">

              <input
                type="checkbox"
                checked={form.isTrending}
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

      </div>

    </div>
  );
}

export default CategoryFields;