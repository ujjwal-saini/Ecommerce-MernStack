import React, { useState } from "react";
import CategoryFields from "./CategoryFields";
import { toast } from "react-toastify";

function AddProductModal({ show, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    subCategory: "",
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
        isAvailable: true
      }
    ],
    dimensions: {
      length: "",
      width: "",
      height: ""
    },
    expiryDate: "",
    manufacturingDate: ""
  });

  if (!show) return null;

  // basic input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  // images
  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm({ ...form, images: newImages });
  };

  const addImage = () => {

    if (form.images.length >= 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    setForm({
      ...form,
      images: [...form.images, ""]
    });
  };

  // features
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...form.features];
    newFeatures[index] = value;
    setForm({ ...form, features: newFeatures });
  };

  const addFeature = () => {
    setForm({
      ...form,
      features: [...form.features, ""]
    });
  };

  // about
  const handleAboutChange = (index, value) => {
    const newAbout = [...form.aboutItem];
    newAbout[index] = value;
    setForm({ ...form, aboutItem: newAbout });
  };

  const addAbout = () => {
    setForm({
      ...form,
      aboutItem: [...form.aboutItem, ""]
    });
  };

  // specification
  const handleSpecificationChange = (key, value) => {
    setForm({
      ...form,
      specifications: {
        ...form.specifications,
        [key]: value
      }
    });
  };

  // variant
  const handleVariantChange = (index, field, value) => {
    const newVariants = [...form.variants];
    newVariants[index][field] = value;
    setForm({
      ...form,
      variants: newVariants
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
          isAvailable: true
        }
      ]
    });
  };

  // dimension
  const handleDimensionChange = (key, value) => {
    setForm({
      ...form,
      dimensions: {
        ...form.dimensions,
        [key]: value
      }
    });
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="modal show d-block"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", height: "100vh", overflowY: "auto" }}>

      <div className="modal-dialog modal-xl"
        style={{ maxHeight: "95vh", margin: "20px auto" }}>

        <div className="modal-content"
          style={{ maxHeight: "95vh", overflow: "hidden" }}>
          {/* HEADER */}

          <div className="modal-header">
            <h5 className="fw-bold">
              Add New Product
            </h5>

            <button className="btn-close" onClick={onClose}
            ></button>
          </div>

          {/* BODY */}

          <div className="modal-body"
            style={{ overflowY: "auto", maxHeight: "75vh" }} >
            <form onSubmit={handleSubmit}>

              {/* Basic */}

              <div className="row">

                <div className="col-md-6 mb-2">
                  <input
                    name="name"
                    placeholder="Product Name"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-2">
                  <input
                    name="brand"
                    placeholder="Brand"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-2">
                  <select
                    name="category"
                    className="form-control"
                    onChange={handleChange}
                    required>
                    <option value="">
                      Select Category
                    </option>
                    <option>Mobile</option>
                    <option>Grocery</option>
                    <option>Clothes</option>
                    <option>Shoes</option>
                    <option>Furniture</option>
                    <option>Liquid</option>
                    <option>General</option>
                  </select>
                </div>

                <div className="col-md-6 mb-2">
                  <input
                    name="subCategory"
                    placeholder="Sub Category"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-2">
                  <input
                    name="price"
                    placeholder="Price"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4 mb-2">
                  <input name="discountPrice"
                    placeholder="Discount Price" className="form-control" onChange={handleChange} />
                </div>

                <div className="col-md-4 mb-2">
                  <input name="stock" placeholder="Stock" className="form-control"
                    onChange={handleChange} />
                </div>

              </div>

              <textarea name="description" placeholder="Description"
                className="form-control mb-3" onChange={handleChange} />

              {/* Main Image */}

              <h6>Main Image</h6>
              <input name="mainImage" placeholder="Main Image URL"
                className="form-control mb-3" onChange={handleChange} />

              {/* Multiple Images */}

              <h6>Product Images</h6>
              {form.images.map((img, i) => (
                <input key={i}
                  className="form-control mb-2"
                  placeholder="Image URL"
                  onChange={(e) => handleImageChange(i, e.target.value)} />))}

              <button type="button" className="btn btn-primary btn-sm mb-3" onClick={addImage}>
                Add Image
              </button>

              {/* Category Fields */}
              <CategoryFields
                category={form.category}
                form={form}
                handleChange={handleChange}
                handleSpecificationChange={handleSpecificationChange}
                handleVariantChange={handleVariantChange}
                addVariant={addVariant}
                handleDimensionChange={handleDimensionChange} />

              {/* Features */}

              <h6 className="mt-4">
                Features
              </h6>

              {form.features.map((f, i) => (
                <input
                  key={i}
                  className="form-control mb-2"
                  placeholder="Feature"
                  onChange={(e) => handleFeatureChange(i, e.target.value)} />))}

              <button type="button" className="btn btn-primary btn-sm mb-3" onClick={addFeature}>
                Add Feature
              </button>

              {/* About */}
              <h6>About Item</h6>
              {form.aboutItem.map((a, i) => (
                <input key={i}
                  className="form-control mb-2"
                  placeholder="About Item"
                  onChange={(e) => handleAboutChange(i, e.target.value)} />))}

              <button type="button" className="btn btn-primary btn-sm" onClick={addAbout}>Add About</button>
              <br />
              <br />
              {/* add btn and cancel btn */}
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-secondary me-2" onClick={onClose}> Cancel </button>
                <button className="btn btn-success" type="submit"> Add Product </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;