import React, { Fragment, useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQty, decreaseQty } from "../redux/cartSlice";
import Swal from "sweetalert2";
import Loader from "./loading";
import { AuthContext } from "../middleware/authContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((ci) => ci._id === id);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  const { isLoggedIn, theme } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3100/product/${id}`);
        const data = res.data.data;
        setProduct(data);

        if (data.images?.length) setSelectedImage(data.images[0]);
        else if (data.image) setSelectedImage(data.image);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const showLoginPopup = () => {
    Swal.fire({
      title: "Login Required",
      text: "Please login to continue",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Login",
      confirmButtonColor: "#0d6efd",
    }).then((res) => {
      if (res.isConfirmed) navigate("/login");
    });
  };

  const handleAddToCart = (item) => {
    if (!isLoggedIn) return showLoginPopup();
    dispatch(addToCart(item));
  };

  const handleBuyNow = (item) => {
    if (!isLoggedIn) return showLoginPopup();
    dispatch(addToCart(item));
    navigate("/dashboard/addtocart");
  };

  if (loading) return <Loader />;
  if (!product) return <h3 className="text-center mt-5">Product Not Found</h3>;

  return (
    <Fragment>
      <div
        className={`container mt-4 ${
          theme === "dark" ? "text-white" : "text-dark"
        }`}
      >
        <button
          className={`btn mb-4 ${
            theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
          }`}
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="row">
          {/* LEFT */}
          <div className="col-md-5">
            <div
              className="d-flex justify-content-center align-items-center border rounded shadow-sm"
              style={{
                width: "80%",
                height: "400px",
                background: theme === "dark" ? "#1e1e1e" : "#fff",
              }}
            >
              <InnerImageZoom
                src={selectedImage}
                zoomSrc={selectedImage}
                zoomType="hover"
                zoomScale={1.5}
                imgAttributes={{
                  style: {
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  },
                }}
              />
            </div>

            {/* THUMBNAILS */}
            <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  width="100"
                  height="100"
                  className={`border rounded ${
                    theme === "dark" ? "border-secondary" : ""
                  }`}
                  style={{
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-md-7">
            <h2>{product.name}</h2>
            <p className={theme === "dark" ? "text-white-50" : "text-muted"}>
              {product.brand}
            </p>

            <h4 className="text-success">₹{product.price}</h4>
            <hr />

            <p>{product.description}</p>

            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock}
            </p>

            {/* ACTIONS */}
            <div className="mt-4">
              {!cartItem ? (
                <div className="d-flex gap-3">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleBuyNow(product)}
                  >
                    Buy Now
                  </button>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-4">
                  <button
                    className={`btn ${
                      theme === "dark"
                        ? "btn-outline-light"
                        : "btn-outline-secondary"
                    }`}
                    style={{ width: "45px", height: "45px" }}
                    onClick={() => dispatch(decreaseQty(product._id))}
                  >
                    −
                  </button>

                  <span className="fw-bold fs-5">{cartItem.qty}</span>

                  <button
                    className={`btn ${
                      theme === "dark"
                        ? "btn-outline-light"
                        : "btn-outline-secondary"
                    }`}
                    style={{ width: "45px", height: "45px" }}
                    onClick={() => dispatch(increaseQty(product._id))}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductDetail;