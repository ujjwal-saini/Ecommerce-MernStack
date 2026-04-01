import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../middleware/authContext";
import Loader from "../../components/loading";
function Productpage() {
  const [products, setProducts] = useState([]);
  const { API } = useContext(AuthContext);
  console.log(products);
  // add product form
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    stock: "",
    brand: "",
  });

  // edit states
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});


  // fetch products

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products`);
    setProducts(res.data.data);
  };

  // add form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // add product
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

    fetchProducts();
  };

  // edit click
  const handleEditClick = (product) => {
    setEditingId(product._id);
    setEditForm(product);
  };

  // edit change
  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  // update product
  const handleUpdate = async () => {
    await axios.put(
      `${API}/updateproduct/${editingId}`,
      editForm
    );
    setEditingId(null);
    fetchProducts();
  };

  // delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    await axios.delete(
      `${API}/deleteproduct/${id}`
    );

    fetchProducts();
  };

  return (
    <div className="container my-4">

      {/* ADD PRODUCT */}
      <h2 className="mb-4">Add Product</h2>

      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Product Name"
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Price"
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Stock"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Category"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Brand"
                  required
                />
              </div>

              <div className="col-12 mb-3">
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Description"
                  rows="3"
                  required
                />
              </div>

              <div className="col-12 mb-3">
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Image URL"
                  required
                />
              </div>

              <div className="col-12">
                <button className="btn btn-success w-100">
                  Add Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* PRODUCT LIST */}
      <h2 className="mb-4">Existing Products</h2>
      {products.length === 0 ? (
        <div className="text-center mt-5">
          <Loader />
        </div>
      ) : (

        <div className="row">
          {products.map((p) => (
            <div className="col-md-4 mb-4" key={p._id}>
              <div className="card h-100 shadow-sm p-3">

                {editingId === p._id ? (
                  <>
                    <input
                      className="form-control mb-2"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      placeholder="Product Name"
                    />

                    <input
                      className="form-control mb-2"
                      name="price"
                      type="number"
                      value={editForm.price}
                      onChange={handleEditChange}
                      placeholder="Price"
                    />

                    <input
                      className="form-control mb-2"
                      name="stock"
                      type="number"
                      value={editForm.stock}
                      onChange={handleEditChange}
                      placeholder="Stock"
                    />

                    <input
                      className="form-control mb-2"
                      name="category"
                      value={editForm.category}
                      onChange={handleEditChange}
                      placeholder="Category"
                    />

                    <input
                      className="form-control mb-2"
                      name="brand"
                      value={editForm.brand}
                      onChange={handleEditChange}
                      placeholder="Brand"
                    />

                    <input
                      className="form-control mb-2"
                      name="image"
                      value={editForm.image}
                      onChange={handleEditChange}
                      placeholder="Image URL"
                    />

                    <textarea
                      className="form-control mb-2"
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      placeholder="Description"
                      rows="2"
                    />

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={handleUpdate}
                      >
                        Save Changes
                      </button>

                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        height: "200px",
                        objectFit: "contain",
                        width: "100%",
                      }}
                    />

                    <h5 className="mt-2">{p.name}</h5>
                    <p>{p.description}</p>
                    <p><b>₹{p.price}</b></p>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-warning btn-sm"
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
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Productpage;
