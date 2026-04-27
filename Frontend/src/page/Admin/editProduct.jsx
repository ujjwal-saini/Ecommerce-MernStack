import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../middleware/authContext";
import CategoryFields from "./editproductCompoent/CategoryFields";
import { toast } from "react-toastify";

function EditProduct() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { API } = useContext(AuthContext);
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
        manufacturingDate: "",
        isFeatured: false,
        isNewArrival: false,
        isOnSale: false,
        isTrending: false
    });

    // load product

    useEffect(() => {

        const fetchProduct = async () => {
            try {

                const res = await axios.get(`${API}/product/${id}`);

                setForm(res.data.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchProduct();

    }, [id, API]);

    // basic input

    const handleChange = (e) => {

        const { name, value, type, checked  } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
        console.log(form);
    };

    // images

    const handleImageChange = (index, value) => {

        const newImages = [...form.images];
        newImages[index] = value;

        setForm({
            ...form,
            images: newImages
        });
    };

    const addImage = () => {
        setForm({
            ...form,
            images: [...form.images, ""]
        });
    };

    // features

    const handleFeatureChange = (index, value) => {

        const newFeatures = [...form.features];
        newFeatures[index] = value;

        setForm({
            ...form,
            features: newFeatures
        });
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

        setForm({
            ...form,
            aboutItem: newAbout
        });
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

    // update

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `${API}/updateproduct/${id}`,
                form
            );

            toast.success("Product Updated Successfully");

            navigate("/admindashboard/products");

        } catch (err) {
            console.log(err);
            alert("Update failed");
        }
    };

    return (

        <div className="container-fluid p-4">

            <h3 className="fw-bold mb-4">
                Edit Product
            </h3>

            <form onSubmit={handleSubmit}>

                <div className="row">

                    <div className="col-md-6 mb-2">
                        <input
                            name="name"
                            value={form.name}
                            placeholder="Product Name"
                            className="form-control"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-2">
                        <input
                            name="brand"
                            value={form.brand}
                            placeholder="Brand"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-2">
                        <select
                            name="category"
                            value={form.category || ""}
                            className="form-control"
                            onChange={handleChange}
                            requireds>
                            <option value="">
                                Select Category
                            </option>
                            <option value="Mobile">Mobile</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Grocery">Grocery</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Liquid">Liquid</option>
                            <option value="General">General</option>
                        </select>
                    </div>

                    <div className="col-md-6 mb-2">
                        <input
                            name="subCategory"
                            value={form.subCategory}
                            placeholder="Sub Category"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-4 mb-2">
                        <input
                            name="price"
                            value={form.price}
                            placeholder="Price"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-4 mb-2">
                        <input
                            name="discountPrice"
                            value={form.discountPrice}
                            placeholder="Discount Price"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-4 mb-2">
                        <input
                            name="stock"
                            value={form.stock}
                            placeholder="Stock"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>

                </div>

                <textarea
                    name="description"
                    value={form.description}
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <h6>Main Image</h6>
                <input
                    name="mainImage"
                    value={form.mainImage}
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <h6>Images</h6>

                {form.images.map((img, i) => (
                    <input
                        key={i}
                        value={img}
                        className="form-control mb-2"
                        onChange={(e) =>
                            handleImageChange(i, e.target.value)
                        }
                    />
                ))}

                <button
                    type="button"
                    className="btn btn-primary btn-sm mb-3"
                    onClick={addImage}
                >
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
                    handleDimensionChange={handleDimensionChange}
                />

                {/* Features */}

                <h6 className="mt-4">Features</h6>

                {form.features.map((f, i) => (
                    <input
                        key={i}
                        value={f}
                        className="form-control mb-2"
                        onChange={(e) =>
                            handleFeatureChange(i, e.target.value)
                        }
                    />
                ))}

                <button
                    type="button"
                    className="btn btn-primary btn-sm mb-3"
                    onClick={addFeature}
                >
                    Add Feature
                </button>

                {/* About */}

                <h6>About Item</h6>

                {form.aboutItem.map((a, i) => (
                    <input
                        key={i}
                        value={a}
                        className="form-control mb-2"
                        onChange={(e) =>
                            handleAboutChange(i, e.target.value)
                        }
                    />
                ))}

                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={addAbout}
                >
                    Add About
                </button>

                <br />
                <br />

                <button className="btn btn-success">
                    Update Product
                </button>
            </form>
        </div>
    );
}

export default EditProduct;