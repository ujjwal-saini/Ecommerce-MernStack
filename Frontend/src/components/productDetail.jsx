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
import ProductDetailReview from "./productDetailReview";
import ProductDetailDescription from "./productDetailDescription";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { API, isLoggedIn, theme } = useContext(AuthContext);

  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((ci) => ci._id === id);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [Review, setReview] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API}/product/${id}`);
        const data = res.data.data;

        let allImages = [];
        if (data.mainImage) allImages.push(data.mainImage);
        if (data.images?.length > 0) allImages.push(...data.images);

        setProduct({ ...data, images: allImages });
        setSelectedImage(allImages[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const showLoginPopup = () => {
    Swal.fire({
      title: "Login Required",
      text: "Please login",
      icon: "warning",
      confirmButtonText: "Login",
    }).then((res) => {
      if (res.isConfirmed) navigate("/login");
    });
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) return showLoginPopup();
    if (product.variants?.length > 0 && !selectedVariant) {
      Swal.fire("Please select a variant");
      return;
    }
    const itemToCart = {
      ...product,
      selectedVariant,
      price: selectedVariant?.price || product.price,
    };
    dispatch(addToCart(itemToCart));
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) return showLoginPopup();
    if (product.variants?.length > 0 && !selectedVariant) {
      Swal.fire("Please select a variant");
      return;
    }
    const itemToCart = {
      ...product,
      selectedVariant,
      price: selectedVariant?.price || product.price,
    };
    dispatch(addToCart(itemToCart));
    navigate("/addtocart");
  };


  if (loading) return <Loader />;
  if (!product) return <h3>Product Not Found</h3>;

  const images = product.images?.length ? product.images : [product.mainImage];

  return (
    <Fragment>
      <div className={`container mt-4 ${theme === "dark" ? "text-light" : ""}`}>
        <div className="row">
          {/* LEFT IMAGES */}
          <div className="col-md-5 d-flex">
            <div className="d-flex flex-column gap-2 me-3">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  width="70"
                  height="70"
                  style={{
                    cursor: "pointer",
                    objectFit: "cover",
                    border:
                      selectedImage === img ? "2px solid #0d6efd" : "1px solid gray",
                    padding: "2px",
                    borderRadius: "5px",
                  }}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
            <div
              className="border rounded d-flex align-items-center justify-content-center"
              style={{ width: "400px", height: "460px", overflow: "hidden" }}
            >
              <InnerImageZoom
                src={selectedImage}
                zoomSrc={selectedImage}
                zoomType="hover"
                zoomScale={1.5}
                imgAttributes={{
                  style: {
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  },
                }}
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-7">
            <h3>{product.name}</h3>
            <p className="text-muted">{product.brand}</p>
            <h4 className="text-danger">₹{product.price}</h4>
            <p>Stock: {product.stock}</p>
            <p>Category: {product.category}</p>
            <hr />
            <p>{product.description}</p>

            {/* FLAGS */}
            <div className="mb-3">
              {product.isFeatured && <span className="badge bg-primary me-2">Featured</span>}
              {product.isNewArrival && <span className="badge bg-success me-2">New</span>}
              {product.isTrending && <span className="badge bg-warning me-2">Trending</span>}
              {product.isOnSale && <span className="badge bg-danger">Sale</span>}
            </div>

            {/* VARIANTS */}
            {product.variants?.length > 0 && (
              <div className="mt-2">

                <h5 className="mb-3">Select Variant</h5>

                <div className="d-flex flex-wrap gap-3">
                  {product.variants.map((v, i) => (
                    <div key={i}
                      onClick={() => setSelectedVariant(v)}
                      className="variant-box"
                      style={{
                        cursor: "pointer",
                        border:
                          selectedVariant === v
                            ? "3px solid #0d6efd"
                            : "1px solid #ddd",
                        borderRadius: "10px",
                        padding: "10px",
                        minWidth: "120px",
                        height:"90px" ,
                        textAlign: "center",
                        background:
                          selectedVariant === v
                            ? "white"
                            : "white",
                      }}
                    >
                      {v.color && (
                        <div className="mb-1 fw-semibold" style={{color:"black"}}>
                          {v.color}
                        </div>
                      )}

                      {v.size && (
                        <div className="mb-1">
                          {v.size}
                        </div>
                      )}

                      {v.price && (
                        <div className="text-danger fw-bold" >
                          ₹{v.price}
                        </div>
                      )}

                      {v.stock && (
                        <small className="text-muted">
                          Stock: {v.stock}
                        </small>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADD TO CART / BUY NOW */}
            <div className="mt-4">
              {!cartItem ? (
                <>
                  <button className="btn btn-warning me-2" onClick={handleAddToCart}>
                    Add To Cart
                  </button>
                  <button className="btn btn-danger" onClick={handleBuyNow}>
                    Buy Now
                  </button>
                </>
              ) : (
                <div className="d-flex gap-3">
                  <button
                    className="btn btn-secondary"
                    onClick={() => dispatch(decreaseQty(product._id))}
                  >
                    -
                  </button>
                  <span>{cartItem.qty}</span>
                  <button
                    className="btn btn-secondary"
                    onClick={() => dispatch(increaseQty(product._id))}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DESCRIPTION / REVIEW TOGGLE */}



        <div className="row mt-4">
          <div className="col-md-12">
            <div className="btn-group custom-radio-tab" role="group" aria-label="Description / Review toggle">
              {/* Description */}
              <input
                type="radio"
                className="btn-check"
                name="descriptionReview"
                id="descRadio"
                autoComplete="off"
                checked={!Review}
                onChange={() => setReview(false)}
              />
              <label className="btn-tab" htmlFor="descRadio">
                Description
              </label>

              {/* Review */}
              <input
                type="radio"
                className="btn-check"
                name="descriptionReview"
                id="reviewRadio"
                autoComplete="off"
                checked={Review}
                onChange={() => setReview(true)}
              />
              <label className="btn-tab" htmlFor="reviewRadio">
                Review
              </label>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          {Review ? (
            <ProductDetailReview product={product} />
          ) : (
            <ProductDetailDescription product={product} />
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default ProductDetail;