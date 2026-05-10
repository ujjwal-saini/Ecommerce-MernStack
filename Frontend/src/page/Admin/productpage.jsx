import React, {
  useState,
  useContext,
  useEffect,
} from "react";

import axios from "axios";

import { AuthContext } from "../../middleware/authContext";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  addProduct,
  deleteProduct,
} from "../../redux/productSlice";

import AddProductModal from "./editproductCompoent/AddProductModal";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  toast,
  ToastContainer,
} from "react-toastify";

import Swal from "sweetalert2";

function Productpage() {

  const {
    API,
    theme,
  } = useContext(AuthContext);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const searchTerm = query.get("search") || "";

  const products = useSelector(
    (state) => state.product.products
  );

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [showModal, setShowModal] = useState(false);

  // MODAL

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // ADD PRODUCT

  const handleAddProduct = async (formData) => {

    try {

      const res = await axios.post(
        `${API}/addproduct`,
        formData
      );

      dispatch(addProduct(res.data.data));

      toast.success("Product Added Successfully");

      setShowModal(false);

    } catch (err) {

      console.log(err);

      toast.error("Error adding product");

    }
  };

  // DELETE PRODUCT

  const handleDelete = async (id) => {

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#0d6efd",
      confirmButtonText: "Yes, Delete it!",
    });

    if (!result.isConfirmed) return;

    try {

      await axios.delete(
        `${API}/deleteproduct/${id}`
      );

      dispatch(deleteProduct(id));

      toast.success("Deleted Successfully");

    } catch (err) {

      console.log(err);

      toast.error("Error deleting product");

    }
  };

  // SEARCH FILTER

  useEffect(() => {

    if (!searchTerm.trim()) {

      const sorted = [...products].sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );

      setFilteredProducts(sorted);

      return;
    }

    const result = products.filter((item) =>

      item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      item.brand
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      item.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

    );

    setFilteredProducts(result);

  }, [searchTerm, products]);

  return (

    <div
      className={`container-fluid min-vh-100 overflow-hidden px-2 px-md-3 py-3 ${theme === "dark"
        ? "bg-black text-light"
        : "bg-light text-dark"
        }`}
    >

      <ToastContainer position="top-center" />

      {/* HEADER */}

      <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-md-center mb-4">

        <h2 className="fw-bold fs-4 fs-md-2 m-0">
          Product Management
        </h2>

        <button
          className="btn btn-success fw-semibold"
          onClick={openModal}
        >
          + Add Product
        </button>

      </div>

      {/* EMPTY */}

      {filteredProducts.length === 0 ? (

        <div
          className={`rounded-4 p-5 text-center shadow-sm ${theme === "dark"
            ? "bg-dark text-light"
            : "bg-white"
            }`}
        >

          <h5 className="m-0">
            No products found
          </h5>

        </div>

      ) : (

        <>

          {/* =========================
              MOBILE VIEW
          ========================= */}

          <div className="d-block d-md-none">

            {filteredProducts.map((p) => (

              <div
                key={p._id}
                className={`rounded-4 p-3 mb-3 shadow-sm ${theme === "dark"
                  ? "bg-dark border border-secondary text-light"
                  : "bg-white text-dark"
                  }`}
              >

                {/* TOP */}

                <div className="d-flex gap-3">

                  <img
                    src={
                      p.mainImage ||
                      "https://via.placeholder.com/60"
                    }
                    alt=""
                    className="rounded-3"
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />

                  <div className="flex-grow-1 overflow-hidden">

                    <Link
                      to={`/admindashboard/productpreview/${p._id}`}
                      className={`fw-bold text-decoration-none d-block text-truncate ${theme === "dark"
                        ? "text-light"
                        : "text-dark"
                        }`}
                    >
                      {p.name}
                    </Link>

                    <div className="small mt-1">
                      Brand: {p.brand}
                    </div>

                    <div className="small">
                      Category: {p.category}
                    </div>

                    <div className="fw-bold text-success mt-2">
                      ₹{p.discountPrice}
                    </div>

                    <span
                      className={`badge mt-2 ${p.stock > 0
                        ? "bg-success"
                        : "bg-danger"
                        }`}
                    >
                      {p.stock > 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </span>

                  </div>

                </div>

                {/* BUTTONS */}

                <div className="d-flex gap-2 mt-3">

                  <button
                    className="btn btn-info btn-sm w-100"
                    onClick={() =>
                      navigate(
                        `/admindashboard/productpreview/${p._id}`
                      )
                    }
                  >
                    View
                  </button>

                  <button
                    className="btn btn-warning btn-sm w-100"
                    onClick={() =>
                      navigate(
                        `/admindashboard/products/editproduct/${p._id}`
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm w-100"
                    onClick={() =>
                      handleDelete(p._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* =========================
              DESKTOP TABLE
          ========================= */}

          <div
            className={`d-none d-md-block rounded-4 overflow-hidden shadow ${theme === "dark"
              ? "bg-dark"
              : "bg-white"
              }`}
          >

            <div className="table-responsive">

              <table
                className={`table align-middle mb-0 ${theme === "dark"
                  ? "table table-color"
                  : "table table-hover"
                  }`}
              >

                <thead
                  className={
                    theme === "dark"
                      ? "table-dark"
                      : "table-light"
                  }
                >

                  <tr>

                    <th>Image</th>

                    <th>Name</th>

                    <th>Brand</th>

                    <th>Category</th>

                    <th>Price</th>

                    <th>Stock</th>

                    <th width="220">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredProducts.map((p) => (

                    <tr
                      key={p._id}
                      className="align-middle"
                    >

                      <td>

                        <img
                          src={
                            p.mainImage ||
                            "https://via.placeholder.com/60"
                          }
                          alt=""
                          className="rounded"
                          style={{
                            width: "55px",
                            height: "55px",
                            objectFit: "cover",
                          }}
                        />

                      </td>

                      <td style={{ maxWidth: "220px" }}>

                        <Link
                          to={`/admindashboard/productpreview/${p._id}`}
                          className={`fw-semibold text-decoration-none d-block text-truncate ${theme === "dark"
                            ? "text-light"
                            : "text-dark"
                            }`}
                        >
                          {p.name}
                        </Link>

                      </td>

                      <td>{p.brand}</td>

                      <td>{p.category}</td>

                      <td className="fw-bold text-success">
                        ₹{p.discountPrice}
                      </td>

                      <td>

                        <span
                          className={`badge ${p.stock > 0
                            ? "bg-success"
                            : "bg-danger"
                            }`}
                        >
                          {p.stock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </span>

                      </td>

                      <td>

                        <div className="d-flex flex-wrap gap-2">

                          <button
                            className="btn btn-sm btn-info"
                            onClick={() =>
                              navigate(
                                `/admindashboard/productpreview/${p._id}`
                              )
                            }
                          >
                            View
                          </button>

                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() =>
                              navigate(
                                `/admindashboard/products/editproduct/${p._id}`
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              handleDelete(p._id)
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </>

      )}

      {/* MODAL */}

      {showModal && (

        <AddProductModal
          show={showModal}
          onClose={closeModal}
          onSubmit={handleAddProduct}
        />

      )}

    </div>
  );
}

export default Productpage;