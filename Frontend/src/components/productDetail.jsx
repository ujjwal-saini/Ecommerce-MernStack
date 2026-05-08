import React, {
  Fragment,
  useEffect,
  useState,
  useContext,
} from "react";

import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

import InnerImageZoom from "react-inner-image-zoom";

import "react-inner-image-zoom/lib/styles.min.css";

import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../redux/cartSlice";

import Swal from "sweetalert2";

import Loader from "./loading";

import { AuthContext } from "../middleware/authContext";

import ProductDetailReview from "./productDetailReview";

import ProductDetailDescription from "./productDetailDescription";

import ProductChat from "./productChat";

import Card from "./card";

function ProductDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { API, isLoggedIn, user, theme } =
    useContext(AuthContext);

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const products = useSelector(
    (state) => state.product.products
  );

  const cartItem = cartItems.find(
    (ci) => ci._id === id
  );

  const [product, setProduct] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");

  const [loading, setLoading] = useState(true);

  const [Review, setReview] = useState(false);

  const [selectedVariant, setSelectedVariant] =
    useState(null);

  const [showChat, setShowChat] =
    useState(false);

  const [suggestionProduct, setsuggestionProduct] =
    useState([]);

  // RELATED PRODUCTS
  const fetchSuggestionProduct = (
    currentProduct
  ) => {
    if (!products || !currentProduct) return;

    const filtered = products.filter(
      (p) =>
        p.category === currentProduct.category &&
        p._id !== currentProduct._id
    );

    setsuggestionProduct(filtered);
  };

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${API}/product/${id}`
        );

        const data = res.data.data;

        let allImages = [];

        if (data.mainImage)
          allImages.push(data.mainImage);

        if (data.images?.length > 0)
          allImages.push(...data.images);
        const finalProduct = { ...data, images: allImages, };
        setProduct(finalProduct);
        setSelectedImage(allImages[0]);
        fetchSuggestionProduct(finalProduct);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // LOGIN POPUP
  const showLoginPopup = () => {
    Swal.fire({
      title: "Login Required",
      text: "Please login",
      icon: "warning",
      confirmButtonText: "Login",
      background:
        theme === "dark" ? "#0f0f0f" : "#fff",
      color:
        theme === "dark" ? "#fff" : "#000",
    }).then((res) => {
      if (res.isConfirmed) navigate("/login");
    });
  };

  // ADD TO CART
  const handleAddToCart = async () => {
    if (!isLoggedIn) return showLoginPopup();
    if (product.variants?.length > 1 && !selectedVariant) {
      Swal.fire("Please select a variant");
      return;
    }
    const itemToCart = {
      ...product,
      selectedVariant,
      price:
        selectedVariant?.price ||
        product.discountPrice ||
        product.price,
    };
    dispatch(addToCart(itemToCart));
    try {
      await axios.post(`${API}/addtocart`, {
        userId: user._id,
        productId: product._id,
        variantId:
          selectedVariant?._id || null,
        quantity: 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // BUY NOW
  const handleBuyNow = async () => {
    if (!isLoggedIn) return showLoginPopup();

    await handleAddToCart();

    navigate("/addtocart");
  };

  // INCREASE QTY
  const handleIncreaseQty = async () => {
    if (!cartItem) return;

    if (
      cartItem.qty >=
      (selectedVariant?.stock ||
        product.stock)
    ) {
      Swal.fire({
        icon: "warning",
        title: "Stock Limit Reached",
        timer: 1500,
        showConfirmButton: false,
      });

      return;
    }

    dispatch(increaseQty(product._id));

    await axios.post(`${API}/updatecart`, {
      userId: user._id,
      productId: product._id,
      variantId:
        selectedVariant?._id || null,
      quantity: 1,
    });
  };

  // DECREASE QTY
  const handleDecreaseQty = async () => {
    if (!cartItem) return;

    if (cartItem.qty === 1) {
      dispatch(removeFromCart(product._id));

      await axios.post(`${API}/removecart`, {
        userId: user._id,
        productId: product._id,
        variantId:
          selectedVariant?._id || null,
      });
    } else {
      dispatch(decreaseQty(product._id));

      await axios.post(`${API}/updatecart`, {
        userId: user._id,
        productId: product._id,
        variantId:
          selectedVariant?._id || null,
        quantity: -1,
      });
    }
  };

  if (loading) return <Loader />;

  if (!product)
    return <h3>Product Not Found</h3>;

  const images = product.images?.length
    ? product.images
    : [product.mainImage];

  return (
    <Fragment>
      <div className="container mt-4">
        <div className="row g-4">

          {/* LEFT IMAGE SECTION */}
          <div className="col-md-5">
            <div
              className={`p-3 ${theme === "dark"
                ? "bg-black"
                : "bg-white"
                }`}
              style={{
                borderRadius: "24px",
                boxShadow:
                  theme === "dark"
                    ? "0 5px 20px rgba(255,255,255,0.05)"
                    : "0 5px 20px rgba(0,0,0,0.08)",
                border:
                  theme === "dark"
                    ? "1px solid #1f1f1f"
                    : "1px solid #eee",
              }}
            >
              <div className="d-flex">

                {/* THUMBNAILS */}
                <div className="d-flex flex-column gap-2 me-3">
                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      width="70"
                      height="70"
                      onClick={() =>
                        setSelectedImage(img)
                      }
                      style={{
                        cursor: "pointer",
                        objectFit: "cover",
                        border:
                          selectedImage === img
                            ? "2px solid #ff7b00"
                            : "1px solid #444",
                        borderRadius: "12px",
                        padding: "4px",
                        background:
                          theme === "dark"
                            ? "#111"
                            : "#fff",
                      }}
                    />
                  ))}
                </div>

                {/* MAIN IMAGE */}
                <div
                  className="d-flex align-items-center justify-content-center w-100"
                  style={{
                    height: "450px",
                    overflow: "hidden",
                    borderRadius: "20px",
                    background:
                      theme === "dark"
                        ? "#0a0a0a"
                        : "#f8f9fa",
                  }}
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
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="col-md-7">
            <div
              className={`p-4 h-100 ${theme === "dark"
                ? "bg-black text-light"
                : "bg-white text-dark"
                }`}
              style={{
                borderRadius: "24px",
                boxShadow:
                  theme === "dark"
                    ? "0 5px 20px rgba(255,255,255,0.05)"
                    : "0 5px 20px rgba(0,0,0,0.08)",
                border:
                  theme === "dark"
                    ? "1px solid #1f1f1f"
                    : "1px solid #eee",
              }}
            >
              {/* TITLE */}
              <h2 className="fw-bold mb-2">
                {product.name}
              </h2>

              {/* BRAND */}
              <p
                className={`mb-3 ${theme === "dark"
                  ? "text-secondary"
                  : "text-muted"
                  }`}
              >
                Brand: {product.brand}
              </p>

              {/* PRICE */}
              {(() => {
                const finalPrice =
                  selectedVariant?.price ||
                  product.discountPrice ||
                  product.price;

                return (
                  <div className="d-flex align-items-center gap-3 flex-wrap mb-3">
                    <span
                      className="fw-bold"
                      style={{
                        fontSize: "34px",
                        color: "#16a34a",
                      }}
                    >
                      ₹{finalPrice}
                    </span>

                    {product.discountPrice && (
                      <>
                        <span
                          className={`fs-5 text-decoration-line-through ${theme === "dark"
                            ? "text-secondary"
                            : "text-muted"
                            }`}
                        >
                          ₹{product.price}
                        </span>

                        <span
                          className="fw-bold"
                          style={{
                            color: "#16a34a",
                          }}
                        >
                          {Math.round(
                            ((product.price -
                              product.discountPrice) /
                              product.price) *
                            100
                          )}
                          % OFF
                        </span>
                      </>
                    )}
                  </div>
                );
              })()}

              {/* STOCK */}
              <div className="mb-4">
                {product.stock > 0 ? (
                  <span className="badge bg-success px-3 py-2">
                    In Stock ({product.stock})
                  </span>
                ) : (
                  <span className="badge bg-danger px-3 py-2">
                    Out Of Stock
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              <p
                className={`lh-lg ${theme === "dark"
                  ? "text-light"
                  : "text-dark"
                  }`}
              >
                {product.description}
              </p>

              {/* VARIANTS */}
              {product.variants?.length > 1 && (
                <div className="mt-4">
                  <h5 className="fw-bold mb-3">
                    Select Variant
                  </h5>

                  <div className="d-flex flex-wrap gap-3">
                    {product.variants.map(
                      (v, i) => (
                        <div
                          key={i}
                          onClick={() =>
                            v.stock > 0 &&
                            setSelectedVariant(v)
                          }
                          style={{
                            cursor:
                              v.stock === 0
                                ? "not-allowed"
                                : "pointer",
                            opacity:
                              v.stock === 0
                                ? 0.5
                                : 1,
                            border:
                              selectedVariant === v
                                ? "2px solid #ff7b00"
                                : theme ===
                                  "dark"
                                  ? "1px solid #222"
                                  : "1px solid #eee",
                            borderRadius:
                              "18px",
                            padding: "14px",
                            minWidth: "140px",
                            textAlign:
                              "center",
                            background:
                              theme ===
                                "dark"
                                ? "#0f0f0f"
                                : "#fff",
                            transition:
                              "0.3s ease",
                            boxShadow:
                              selectedVariant ===
                                v
                                ? "0 8px 20px rgba(255,123,0,0.25)"
                                : "none",
                          }}
                        >
                          {v.color && (
                            <div className="fw-semibold mb-2">
                              {v.color}
                            </div>
                          )}

                          {v.size && (
                            <div className="mb-2">
                              {v.size}
                            </div>
                          )}

                          <div
                            className="fw-bold"
                            style={{
                              color:
                                "#16a34a",
                            }}
                          >
                            ₹{v.price}
                          </div>

                          <small
                            className={`d-block mt-2 ${theme === "dark"
                              ? "text-secondary"
                              : "text-muted"
                              }`}
                          >
                            {v.stock} Stock
                          </small>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* BUTTONS */}
              <div className="mt-5">
                {!cartItem ? (
                  <div className="d-flex flex-wrap gap-3">

                    {/* ADD TO CART */}
                    <button
                      className="btn flex-fill fw-semibold"
                      onClick={handleAddToCart}
                      style={{
                        height: "52px",
                        borderRadius: "16px",
                        background:
                          theme === "dark"
                            ? "#111"
                            : "#f1f1f1",
                        color:
                          theme === "dark"
                            ? "#fff"
                            : "#000",
                        border:
                          theme === "dark"
                            ? "1px solid #222"
                            : "1px solid #ddd",
                        minWidth: "190px",
                        transition:
                          "0.3s ease",
                        fontSize: "15px",
                        boxShadow:
                          theme === "dark"
                            ? "0 5px 15px rgba(255,255,255,0.03)"
                            : "0 5px 15px rgba(0,0,0,0.06)",
                      }}
                    >
                      Add To Cart
                    </button>

                    {/* BUY NOW */}
                    <button
                      className="btn flex-fill fw-semibold text-white"
                      onClick={handleBuyNow}
                      style={{
                        height: "52px",
                        borderRadius: "16px",
                        border: "none",
                        minWidth: "190px",
                        fontSize: "15px",
                        background:
                          "linear-gradient(90deg,#ff7b00,#ff9d42)",
                        boxShadow:
                          "0 8px 20px rgba(255,123,0,0.35)",
                        transition:
                          "0.3s ease",
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-3 mt-2">

                    {/* MINUS */}
                    <button
                      className="btn fw-bold"
                      onClick={handleDecreaseQty}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "16px",
                        background:
                          theme === "dark"
                            ? "#111"
                            : "#f1f1f1",
                        color:
                          theme === "dark"
                            ? "#fff"
                            : "#000",
                        border:
                          theme === "dark"
                            ? "1px solid #222"
                            : "1px solid #ddd",
                        fontSize: "22px",
                      }}
                    >
                      −
                    </button>

                    {/* QTY */}
                    <span
                      className="fw-bold"
                      style={{
                        fontSize: "22px",
                        minWidth: "30px",
                        textAlign: "center",
                      }}
                    >
                      {cartItem.qty}
                    </span>

                    {/* PLUS */}
                    <button
                      className="btn fw-bold text-white"
                      onClick={handleIncreaseQty}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "16px",
                        background:
                          "linear-gradient(90deg,#ff7b00,#ff9d42)",
                        border: "none",
                        fontSize: "22px",
                        boxShadow:
                          "0 8px 20px rgba(255,123,0,0.35)",
                      }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <button
          onClick={() => setShowChat(!showChat)}
          className={`btn position-fixed shadow-lg ${theme === "dark" ? "text-light" : "text-dark"
            }`}
          style={{
            bottom: "20px",
            right: "20px",
            background: "linear-gradient(90deg,#ff7b00,#ff9d42)",
            border: "none",
            borderRadius: "50px",
            padding: "12px 18px",
            fontWeight: "600",
            zIndex: 1100,
          }}
        >
          🤖 Ask AI
        </button> */}

        {/* DESCRIPTION / REVIEW TABS */}
        <div className="row mt-5">
          <div className="col-12 d-flex justify-content-center">
            <div
              className="p-1 rounded-pill d-flex gap-2 shadow-sm"
              style={{
                background: theme === "dark" ? "#111" : "#f2f2f2",
              }}
            >
              {/* DESCRIPTION */}
              <button
                onClick={() => setReview(false)}
                className="btn px-4 py-2 rounded-pill fw-semibold"
                style={{
                  background: !Review
                    ? "linear-gradient(90deg,#ff7b00,#ff9d42)"
                    : "transparent",
                  color: !Review ? "#fff" : theme === "dark" ? "#fff" : "#000",
                  border: "none",
                  transition: "0.3s",
                }}
              >
                Description
              </button>
              {/* REVIEW */}
              <button
                onClick={() => setReview(true)}
                className="btn px-4 py-2 rounded-pill fw-semibold"
                style={{
                  background: Review
                    ? "linear-gradient(90deg,#ff7b00,#ff9d42)"
                    : "transparent",
                  color: Review ? "#fff" : theme === "dark" ? "#fff" : "#000",
                  border: "none",
                  transition: "0.3s",
                }}
              >
                Review
              </button>
            </div>
          </div>
        </div>

        {/* CHAT BUTTON */}
        {!showChat &&
          <button
            onClick={() => setShowChat(true)}
            className="btn position-fixed shadow-lg"
            style={{
              bottom: "20px",
              right: "20px",
              background: "linear-gradient(90deg,#ff7b00,#ff9d42)",
              border: "none",
              borderRadius: "50px",
              padding: "12px 18px",
              fontWeight: "600",
              color: "#fff",
              zIndex: 1100,
            }}
          >
            🤖 Ask AI
          </button>

        }



        {showChat && (
          <>
            {/* BACKDROP */}
            <div
              onClick={() => setShowChat(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                zIndex: 1040,
              }}
            />

            {/* PANEL */}
            <div
              className="position-fixed h-100 shadow-lg"
              style={{
                top: 0,
                right: 0,
                width: "380px",
                maxWidth: "92%",
                zIndex: 1050,
                background: theme === "dark" ? "#0b0b0b" : "#fff",
                display: "flex",
                flexDirection: "column",
                animation: "slideIn 0.25s ease",
              }}
            >

              <div
                style={{
                  background: "linear-gradient(90deg,#ff7b00,#ff9d42)",
                  color: "#fff",
                  padding: "10px 15px",
                  fontWeight: "600",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                🤖 AI Assistant

                <button
                  onClick={() => setShowChat(false)}
                  className="btn btn-sm btn-light"
                >
                  ✕
                </button>
              </div>


              <div style={{ flex: 1, overflowY: "auto" }}>
                <ProductChat
                  isOpen={showChat}
                  onClose={() => setShowChat(false)}
                  product={product}
                />
              </div>
            </div>


            <style>
              {`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}
            </style>
          </>
        )}

        {/* DESCRIPTION / REVIEW */}
        <div className="row mt-2">
          <div className="col-md-12">
            {Review ? (
              <ProductDetailReview
                product={product}
              />
            ) : (
              <ProductDetailDescription
                product={product}
              />
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-5">
          <h4 className="fw-bold mb-4">
            Related Products
          </h4>

          <Card
            products={suggestionProduct.slice(
              0,
              4
            )}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default ProductDetail;