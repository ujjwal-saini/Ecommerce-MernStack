import React, { useState, useContext } from "react";

import CategoryFields from "./CategoryFields";

import { toast } from "react-toastify";

import { AuthContext } from "../../../middleware/authContext";

function AddProductModal({
  show,
  onClose,
  onSubmit,
}) {

  const { theme } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    subcategory: "",
    price: "",
    discountPrice: "",
    stock: "",
    unit: "piece",
    weight: "",
    mainImage: "",
    images: [""],
    features: [""],
    aboutItem: [""],
    specifications: {},
    variants: [
      {
        size: "",
        color: "",
        stock: "",
        price: "",
        isAvailable: true,
      },
    ],
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    expiryDate: "",
    manufacturingDate: "",
  });

  if (!show) return null;

  // BASIC INPUT

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // IMAGES

  const handleImageChange = (
    index,
    value
  ) => {

    const newImages = [...form.images];

    newImages[index] = value;

    setForm({
      ...form,
      images: newImages,
    });
  };

  const addImage = () => {

    if (form.images.length >= 5) {

      toast.error(
        "Maximum 5 images allowed"
      );

      return;
    }

    setForm({
      ...form,
      images: [...form.images, ""],
    });
  };

  // FEATURES

  const handleFeatureChange = (
    index,
    value
  ) => {

    const newFeatures = [...form.features];

    newFeatures[index] = value;

    setForm({
      ...form,
      features: newFeatures,
    });
  };

  const addFeature = () => {

    setForm({
      ...form,
      features: [...form.features, ""],
    });
  };

  // ABOUT

  const handleAboutChange = (
    index,
    value
  ) => {

    const newAbout = [...form.aboutItem];

    newAbout[index] = value;

    setForm({
      ...form,
      aboutItem: newAbout,
    });
  };

  const addAbout = () => {

    setForm({
      ...form,
      aboutItem: [...form.aboutItem, ""],
    });
  };

  // SPECIFICATIONS

  const handleSpecificationChange = (
    key,
    value
  ) => {

    setForm({
      ...form,
      specifications: {
        ...form.specifications,
        [key]: value,
      },
    });
  };

  // VARIANTS

  const handleVariantChange = (
    index,
    field,
    value
  ) => {

    const newVariants = [...form.variants];

    newVariants[index][field] = value;

    setForm({
      ...form,
      variants: newVariants,
    });
  };

  const addVariant = () => {

    setForm({
      ...form,
      variants: [
        ...form.variants,
        {
          size: "",
          color: "",
          stock: "",
          price: "",
          isAvailable: true,
        },
      ],
    });
  };

  // DIMENSIONS

  const handleDimensionChange = (
    key,
    value
  ) => {

    setForm({
      ...form,
      dimensions: {
        ...form.dimensions,
        [key]: value,
      },
    });
  };

  // SUBMIT

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit(form);
  };

  return (

    <div
      className="modal show d-block"
      style={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)",
        minHeight: "100vh",
        overflowY: "auto",
        padding: "10px",
      }}
    >

      <div
        className="modal-dialog modal-xl modal-dialog-centered"
        style={{
          maxWidth: "1200px",
        }}
      >

        <div
          className={`modal-content border-0 rounded-4 overflow-hidden ${theme === "dark"
            ? "bg-dark text-light"
            : "bg-white text-dark"
            }`}
        >

          {/* HEADER */}

          <div
            className={`modal-header border-bottom ${theme === "dark"
              ? "border-secondary"
              : ""
              }`}
          >

            <h5 className="fw-bold m-0 fs-5 fs-md-4">
              Add New Product
            </h5>

            <button
              className={`btn-close ${theme === "dark"
                ? "btn-close-white"
                : ""
                }`}
              onClick={onClose}
            ></button>

          </div>

          {/* BODY */}

          <div
            className="modal-body"
            style={{
              overflowY: "auto",
              maxHeight: "80vh",
            }}
          >

            <form onSubmit={handleSubmit}>

              {/* BASIC */}

              <div className="row">

                <div className="col-12 col-md-6 mb-3">

                  <label className="form-label fw-semibold">
                    Product Name
                  </label>

                  <input
                    name="name"
                    placeholder="Product Name"
                    className={`form-control ${theme === "dark"
                      ? "bg-black text-light border-secondary"
                      : ""
                      }`}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-12 col-md-6 mb-3">

                  <label className="form-label fw-semibold">
                    Brand
                  </label>

                  <input
                    name="brand"
                    placeholder="Brand"
                    className={`form-control ${theme === "dark"
                      ? "bg-black text-light border-secondary"
                      : ""
                      }`}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-12 col-md-6 mb-3">

                  <label className="form-label fw-semibold">
                    Category
                  </label>

                  <select
                    name="category"
                    className={`form-select ${theme === "dark"
                      ? "bg-black text-light border-secondary"
                      : ""
                      }`}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Category
                    </option>

                    <option>
                      Electronics
                    </option>

                    <option>
                      Clothing
                    </option>

                    <option>
                      Shoes & Footwear
                    </option>

                    <option>
                      Furniture
                    </option>

                    <option>
                      Beauty & Personal Care
                    </option>

                    <option>
                      Sports & Fitness
                    </option>

                    <option>
                      Toys & Games
                    </option>

                    <option>
                      Books & Stationery
                    </option>

                    <option>
                      Home & Kitchen
                    </option>

                    <option>
                      Automotive
                    </option>

                    <option>
                      Health & Wellness
                    </option>

                    <option>
                      Jewelry & Accessories
                    </option>

                    <option>
                      Pet Supplies
                    </option>

                    <option>
                      Baby Products
                    </option>

                    <option>
                      Office Supplies
                    </option>

                    <option>
                      Garden & Outdoor
                    </option>

                    <option>
                      Others
                    </option>

                  </select>

                </div>

                <div className="col-12 col-md-6 mb-3">

                  <label className="form-label fw-semibold">
                    Sub Category
                  </label>

                  <input
                    name="subcategory"
                    placeholder="Sub Category"
                    className={`form-control ${theme === "dark"
                      ? "bg-black text-light border-secondary"
                      : ""
                      }`}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-12 col-md-4 mb-3">

                  <label className="form-label fw-semibold">
                    Price
                  </label>

                  <input
                    name="price"
                    placeholder="Price"
                    className={`form-control ${theme === "dark"
                      ? "bg-black text-light border-secondary"
                      : ""
                      }`}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-12 col-md-4 mb-3">

                  <label className="form-label fw-semibold">
                    Discount Price
                  </label>

                  <input
                    name="discountPrice"
                    placeholder="Discount Price"
                    className={`form-control ${theme === "dark"
                      ? "bg-black text-light border-secondary"
                      : ""
                      }`}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-12 col-md-4 mb-3">

                  <label className="form-label fw-semibold">
                    Stock
                  </label>

                  <input
                    name="stock"
                    placeholder="Stock"
                    className={`form-control ${theme === "dark"
                      ? "bg-black text-light border-secondary"
                      : ""
                      }`}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* DESCRIPTION */}

              <div className="mb-4">

                <label className="form-label fw-semibold">
                  Description
                </label>

                <textarea
                  name="description"
                  placeholder="Description"
                  rows={4}
                  className={`form-control ${theme === "dark"
                    ? "bg-black text-light border-secondary"
                    : ""
                    }`}
                  onChange={handleChange}
                />

              </div>

              {/* MAIN IMAGE */}

              <div className="mb-4">

                <h5 className="fw-bold mb-3">
                  Main Image
                </h5>

                <input
                  name="mainImage"
                  placeholder="Main Image URL"
                  className={`form-control ${theme === "dark"
                    ? "bg-black text-light border-secondary"
                    : ""
                    }`}
                  onChange={handleChange}
                />

              </div>

              {/* PRODUCT IMAGES */}

              <div className="mb-4">

                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">

                  <h5 className="fw-bold m-0">
                    Product Images
                  </h5>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={addImage}
                  >
                    + Add Image
                  </button>

                </div>

                {form.images.map((img, i) => (

                  <input
                    key={i}
                    className={`form-control mb-2 ${theme === "dark"
                      ? "bg-black text-light border-secondary"
                      : ""
                      }`}
                    placeholder="Image URL"
                    onChange={(e) =>
                      handleImageChange(
                        i,
                        e.target.value
                      )
                    }
                  />

                ))}

              </div>

              {/* CATEGORY FIELDS */}

              <CategoryFields
                subcategory={form.subcategory}
                category={form.category}
                form={form}
                handleChange={handleChange}
                handleSpecificationChange={handleSpecificationChange}
                handleVariantChange={handleVariantChange}
                addVariant={addVariant}
                handleDimensionChange={handleDimensionChange}
              />

              {/* FEATURES */}

              <div className="mt-4 mb-4">

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">

                  <h5 className="fw-bold m-0">
                    Features
                  </h5>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={addFeature}
                  >
                    + Add Feature
                  </button>

                </div>

                {form.features.map((f, i) => (

                  <input
                    key={i}
                    className={`form-control mb-2 ${theme === "dark"
                      ? "bg-black text-light border-secondary"
                      : ""
                      }`}
                    placeholder="Feature"
                    onChange={(e) =>
                      handleFeatureChange(
                        i,
                        e.target.value
                      )
                    }
                  />

                ))}

              </div>

              {/* ABOUT */}

              <div className="mb-4">

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">

                  <h5 className="fw-bold m-0">
                    About Item
                  </h5>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={addAbout}
                  >
                    + Add About
                  </button>

                </div>

                {form.aboutItem.map((a, i) => (

                  <input
                    key={i}
                    className={`form-control mb-2 ${theme === "dark"
                      ? "bg-black text-light border-secondary"
                      : ""
                      }`}
                    placeholder="About Item"
                    onChange={(e) =>
                      handleAboutChange(
                        i,
                        e.target.value
                      )
                    }
                  />

                ))}

              </div>

              {/* FOOTER BUTTONS */}

              <div className="d-flex flex-column flex-md-row justify-content-end gap-2 mt-4">

                <button
                  type="button"
                  className="btn btn-secondary px-4"
                  onClick={onClose}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success px-4 fw-semibold"
                  type="submit"
                >
                  Add Product
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddProductModal;