import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../middleware/authContext";
import Loader from "../../components/loading";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProduct } from "../../redux/productSlice";
import AddProductModal from "./editproductCompoent/AddProductModal";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Productpage() {
  const { API } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("search") || "";

  const [filteredProducts, setFilteredProducts] = useState([]);

  const products = useSelector(
    (state) => state.product.products
  );

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };


  const closeModal = () => {
    setShowModal(false);
  };


  const handleAddProduct = async (formData) => {
    try {
      const res = await axios.post(
        `${API}/addproduct`,
        formData
      );
      console.log(formData);
      dispatch(addProduct(res.data.data));
      toast.success("Product Added Successfully");
      setShowModal(false);
    } catch (err) {
      console.log(err);
      alert("Error adding product");
    }
  };

  // delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;
    try {
      await axios.delete(
        `${API}/deleteproduct/${id}`
      );
      dispatch(deleteProduct(id));
      alert("Deleted Successfully");
    } catch (err) {
      console.log(err);
      alert("Error deleting product");
    }
  };
  useEffect(() => {
    if (!searchTerm.trim()) {
      const sorted = [...products].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setFilteredProducts(sorted);
      return;
    }

    const result = products.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(result);
  }, [searchTerm, products]);

  return (
    <div className="container-fluid p-4">
      <ToastContainer position="top-center" />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Product Management</h2>
        <button className="btn btn-success" onClick={openModal}>
          + Add Product
        </button>
      </div>


      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th width="150">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p._id} className="align-middle text-center">
                  <td>
                    <img
                      src={p.mainImage || "https://via.placeholder.com/60"}
                      alt=""
                      className="rounded"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover"
                      }}
                    />
                  </td>

                  <td className="fw-semibold text-start">
                    <Link
                      to={`/admindashboard/productpreview/${p._id}`}
                      style={{ textDecoration: "none", color: "#333" }}
                    >
                      {p.name}
                    </Link>
                  </td>

                  <td>{p.brand}</td>
                  <td>{p.category}</td>

                  <td className="fw-bold text-success">₹{p.discountPrice}</td>

                  <td>
                    <span className={`badge ${p.stock > 0 ? "bg-success" : "bg-danger"}`}>
                      {p.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>

                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() =>
                          navigate(`/admindashboard/productpreview/${p._id}`)
                        }
                      >
                        View
                      </button>

                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                          navigate(`/admindashboard/products/editproduct/${p._id}`)
                        }>
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(p._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* Add Product Modal */}
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