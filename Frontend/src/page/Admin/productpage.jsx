import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../middleware/authContext";
import Loader from "../../components/loading";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProduct } from "../../redux/productSlice";
import AddProductModal from "../../components/admin/AddProductModal";
import { useNavigate } from "react-router-dom";
import { toast ,ToastContainer} from "react-toastify";

function Productpage() {
  const { API } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div className="container-fluid p-4">
<ToastContainer position="top-center" />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Product Management</h2>
        <button className="btn btn-success" onClick={openModal}>
          + Add Product
        </button>
      </div>


      {products.length === 0 ? (
        <Loader />
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
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img
                      src={p.mainImage ||"https://via.placeholder.com/60"}
                      alt=""
                      width="60"
                      height="60"
                      style={{
                        objectFit: "cover",
                        borderRadius: "6px"
                      }}/>
                  </td>
                  <td>{p.name}</td>
                  <td>{p.brand}</td>
                  <td>{p.category}</td>
                  <td>₹{p.price}</td>
                  <td>{p.stock}</td>
                  <td>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() =>
                        navigate(`editproduct/${p._id}`)
                      }>
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(p._id)
                      }
                    >
                      Delete
                    </button>

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