import React, {
    useState,
    useContext,
    useEffect,
} from "react";

import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../../middleware/authContext";

import CategoryFields from "./editproductCompoent/CategoryFields";

import { toast } from "react-toastify";

import { useDispatch } from "react-redux";

import { updateProduct } from "../../redux/productSlice";

function EditProduct() {

    const dispatch = useDispatch();

    const { id } = useParams();

    const navigate = useNavigate();

    const { API, theme } = useContext(AuthContext);

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
        isFeatured: false,
        isNewArrival: false,
        isOnSale: false,
        isTrending: false,
    });

    // LOAD PRODUCT

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const res = await axios.get(
                    `${API}/product/${id}`
                );

                setForm(res.data.data);

                dispatch(updateProduct(res.data.data));

            } catch (err) {

                console.log(err);

            }
        };

        fetchProduct();

    }, [id, API, dispatch]);

    // BASIC INPUT

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setForm({
            ...form,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
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

    // SPECIFICATION

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

    // VARIANT

    const handleVariantChange = (
        index,
        field,
        value
    ) => {

        const newVariants =
            form.variants.map(
                (variant, i) => {

                    if (i === index) {

                        return {
                            ...variant,
                            [field]: value,
                        };
                    }

                    return variant;
                }
            );

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

    // UPDATE

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.put(
                `${API}/updateproduct/${id}`,
                form
            );

            dispatch(updateProduct(res.data.data));

            toast.success(
                "Product Updated Successfully"
            );

            navigate(
                "/admindashboard/products"
            );

        } catch (err) {

            console.log(err);

            toast.error("Update failed");
        }
    };

    return (

        <div
            className={`container-fluid min-vh-100 py-3 py-md-4 px-2 px-md-4 overflow-hidden ${theme === "dark"
                    ? "bg-black text-light"
                    : "bg-light text-dark"
                }`}
        >

            {/* HEADER */}

            <div className="mb-4">

                <h3 className="fw-bold fs-3 fs-md-2">
                    Edit Product
                </h3>

                <p
                    className={`small mb-0 ${theme === "dark"
                            ? "text-light"
                            : "text-muted"
                        }`}
                >
                    Update your product details
                </p>

            </div>

            {/* FORM CARD */}

            <div
                className={`rounded-4 shadow-sm p-3 p-md-4 ${theme === "dark"
                        ? "bg-dark text-light"
                        : "bg-white text-dark"
                    }`}
            >

                <form onSubmit={handleSubmit}>

                    {/* BASIC INFO */}

                    <div className="row">

                        <div className="col-12 col-md-6 mb-3">

                            <label className="form-label fw-semibold">
                                Product Name
                            </label>

                            <input
                                name="name"
                                value={form.name}
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
                                value={form.brand}
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
                                value={form.category || ""}
                                className={`form-select ${theme === "dark"
                                        ? "bg-black text-light border-secondary"
                                        : ""
                                    }`}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Category
                                </option>

                                <option>Electronics</option>

                                <option>Clothing</option>

                                <option>Shoes & Footwear</option>

                                <option>Furniture</option>

                                <option>Beauty & Personal Care</option>

                                <option>Sports & Fitness</option>

                                <option>Toys & Games</option>

                                <option>Books & Stationery</option>

                                <option>Home & Kitchen</option>

                                <option>Automotive</option>

                                <option>Health & Wellness</option>

                                <option>Jewelry & Accessories</option>

                                <option>Pet Supplies</option>

                                <option>Baby Products</option>

                                <option>Office Supplies</option>

                                <option>Garden & Outdoor</option>

                                <option>Others</option>

                            </select>

                        </div>

                        <div className="col-12 col-md-6 mb-3">

                            <label className="form-label fw-semibold">
                                Sub Category
                            </label>

                            <input
                                name="subcategory"
                                value={form.subcategory}
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
                                value={form.price}
                                placeholder="Price"
                                className={`form-control ${theme === "dark"
                                        ? "bg-black text-light border-secondary"
                                        : ""
                                    }`}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="col-12 col-md-4 mb-3">

                            <label className="form-label fw-semibold">
                                Discount Price
                            </label>

                            <input
                                name="discountPrice"
                                value={form.discountPrice}
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
                                value={form.stock}
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
                            value={form.description}
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
                            value={form.mainImage}
                            className={`form-control ${theme === "dark"
                                    ? "bg-black text-light border-secondary"
                                    : ""
                                }`}
                            onChange={handleChange}
                        />

                    </div>

                    {/* IMAGES */}

                    <div className="mb-4">

                        <div className="d-flex justify-content-between align-items-center mb-3">

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
                                value={img}
                                className={`form-control mb-2 ${theme === "dark"
                                        ? "bg-black text-light border-secondary"
                                        : ""
                                    }`}
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

                        <div className="d-flex justify-content-between align-items-center mb-3">

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
                                value={f}
                                className={`form-control mb-2 ${theme === "dark"
                                        ? "bg-black text-light border-secondary"
                                        : ""
                                    }`}
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

                        <div className="d-flex justify-content-between align-items-center mb-3">

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
                                value={a}
                                className={`form-control mb-2 ${theme === "dark"
                                        ? "bg-black text-light border-secondary"
                                        : ""
                                    }`}
                                onChange={(e) =>
                                    handleAboutChange(
                                        i,
                                        e.target.value
                                    )
                                }
                            />

                        ))}

                    </div>

                    {/* SUBMIT */}

                    <div className="d-grid d-md-flex justify-content-md-end mt-4">

                        <button className="btn btn-success px-4 py-2 fw-semibold">

                            Update Product

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditProduct;