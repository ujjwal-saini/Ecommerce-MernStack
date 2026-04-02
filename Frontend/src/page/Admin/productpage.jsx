import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../middleware/authContext";
import Loader from "../../components/loading";

function Productpage() {
  const { API } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    stock: "",
    brand: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products`);
    setProducts(res.data.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${API}/addproduct`, form);

    setForm({
      name: "",
      price: "",
      description: "",
      image: "",
      category: "",
      stock: "",
      brand: "",
    });

    setShowModal(false);
    fetchProducts();
  };

  const handleEditClick = (product) => {
    setEditingId(product._id);
    setEditForm(product);
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    await axios.put(`${API}/updateproduct/${editingId}`, editForm);
    setEditingId(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete product?")) return;

    await axios.delete(`${API}/deleteproduct/${id}`);
    fetchProducts();
  };

  return (
    <div className="container-fluid p-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Products</h2>

        <button
          className="btn btn-success"
          onClick={() => setShowModal(true)}
        >
          + Add Product
        </button>
      </div>

      {/* TABLE */}

      {products.length === 0 ? (
        <div className="text-center mt-5">
          <Loader />
        </div>
      ) : (
        <div className="card shadow">

          <div className="card-body table-responsive">

            <table className="table align-middle product-table">

              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {products.map((p) => (
                  <tr key={p._id}>

                    {editingId === p._id ? (
                      <>
                        <td>
                          <input
                            name="image"
                            value={editForm.image}
                            onChange={handleEditChange}
                            className="form-control"
                          />
                        </td>

                        <td>
                          <input
                            name="name"
                            value={editForm.name}
                            onChange={handleEditChange}
                            className="form-control"
                          />
                        </td>

                        <td>
                          <input
                            name="category"
                            value={editForm.category}
                            onChange={handleEditChange}
                            className="form-control"
                          />
                        </td>

                        <td>
                          <input
                            name="brand"
                            value={editForm.brand}
                            onChange={handleEditChange}
                            className="form-control"
                          />
                        </td>

                        <td>
                          <input
                            name="price"
                            value={editForm.price}
                            onChange={handleEditChange}
                            className="form-control"
                          />
                        </td>

                        <td>
                          <input
                            name="stock"
                            value={editForm.stock}
                            onChange={handleEditChange}
                            className="form-control"
                          />
                        </td>

                        <td>
                          <textarea
                            name="description"
                            value={editForm.description}
                            onChange={handleEditChange}
                            className="form-control"
                          />
                        </td>

                        <td>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={handleUpdate}
                          >
                            Save
                          </button>

                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <img
                            src={p.image}
                            alt=""
                            className="product-img"
                          />
                        </td>

                        <td title={p.name}>{p.name}</td>

                        <td>{p.category}</td>

                        <td>{p.brand}</td>

                        <td>₹{p.price}</td>

                        <td>{p.stock}</td>

                        <td title={p.description}>
                          {p.description}
                        </td>

                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEditClick(p)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(p._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}

                  </tr>
                ))}

              </tbody>
            </table>

          </div>
        </div>
      )}

      {/* MODAL */}

      {showModal && (
        <div className="modal-overlay">

          <div className="modal-box">

            <div className="d-flex justify-content-between mb-3">
              <h4>Add Product</h4>

              <button
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">

                <div className="col-md-6 mb-3">
                  <input
                    className="form-control"
                    name="name"
                    placeholder="Product Name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    className="form-control"
                    name="price"
                    placeholder="Price"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    className="form-control"
                    name="stock"
                    placeholder="Stock"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    className="form-control"
                    name="category"
                    placeholder="Category"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    className="form-control"
                    name="brand"
                    placeholder="Brand"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 mb-3">
                  <textarea
                    className="form-control"
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 mb-3">
                  <input
                    className="form-control"
                    name="image"
                    placeholder="Image URL"
                    onChange={handleChange}
                    required
                  />
                </div>

                <button className="btn btn-success">
                  Add Product
                </button>

              </div>
            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Productpage;