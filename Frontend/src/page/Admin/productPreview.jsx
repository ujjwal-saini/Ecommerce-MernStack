import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../../middleware/authContext";

function ProductPreview() {

  const { id } = useParams();

  const { theme } = useContext(AuthContext);

  const products = useSelector(
    (state) => state.product.products
  );

  const product = products.find(
    (p) => p._id === id
  );

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [allImage, setAllImage] =
    useState([]);

  useEffect(() => {

    if (product) {

      setAllImage([
        product.mainImage,
        ...(product.images || []),
      ]);

      setSelectedImage(product.mainImage);
    }

  }, [product]);

  if (!product) {

    return (
      <p className="text-center mt-4">
        Product not found
      </p>
    );
  }

  return (

    <div className={`container-fluid ${theme === "dark"
      ? "bg-black text-light"
      : "bg-white text-dark"
      }`}>

      {/* MAIN CARD */}

      <div
        className={`card border-0 shadow-sm overflow-hidden ${theme === "dark"
          ? "bg-black text-light"
          : "bg-white text-dark"
          }`}
      >

        {/* HEADER */}

        <div
          className={`card-header d-flex justify-content-between align-items-center flex-wrap gap-2 ${theme === "dark"
            ? "bg-dark text-light border-secondary"
            : "bg-light"
            }`}
        >

          <h5 className="mb-0 fw-bold">
            Product Preview
          </h5>

          <Link
            to={`/admindashboard/products/editproduct/${product._id}`}
            className="btn btn-sm btn-primary rounded-pill px-3"
          >
            Edit Product
          </Link>

        </div>

        {/* BODY */}

        <div className="card-body p-2 p-md-4">

          <div className="row g-4">

            {/* LEFT IMAGE SECTION */}

            <div className="col-12 col-lg-6">

              {/* MAIN IMAGE */}

              <div
                className={`border rounded-4 p-2 p-md-3 text-center ${theme === "dark"
                  ? "bg-dark border-secondary"
                  : "bg-light"
                  }`}
              >

                <img
                  src={selectedImage}
                  alt={product.name}
                  className="img-fluid rounded-3"
                  style={{
                    maxHeight: "400px",
                    objectFit: "contain",
                    width: "100%",
                  }}
                />

              </div>

              {/* THUMBNAILS */}

              <div className="d-flex flex-wrap gap-2 justify-content-center mt-3">

                {allImage
                  .slice(0, 6)
                  .map((img, i) => (

                    <img
                      key={i}
                      src={img}
                      alt=""
                      onClick={() =>
                        setSelectedImage(img)
                      }
                      className="rounded-3 product-thumb"
                      style={{
                        width: "75px",
                        height: "75px",
                        objectFit: "cover",
                        cursor: "pointer",
                        border:
                          selectedImage === img
                            ? "2px solid #0d6efd"
                            : "1px solid #ccc",
                      }}
                    />

                  ))}

              </div>

            </div>

            {/* RIGHT DETAILS */}

            <div className="col-12 col-lg-6">

              {/* TITLE */}

              <h3 className="fw-bold mb-1">
                {product.name}
              </h3>

              <p className="text-muted mb-2">
                {product?.brand}
              </p>

              {/* RATING */}

              <div className="d-flex align-items-center gap-2 mb-3">

                <span className="badge bg-success px-3 py-2">
                  {product?.averageRating} ★
                </span>

                <small className="text-muted">
                  ({product?.numReviews} reviews)
                </small>

              </div>

              {/* PRICE */}

              <div className="d-flex flex-wrap align-items-center gap-3 mb-3">

                <h4 className="text-success fw-bold mb-0">
                  ₹
                  {product.discountPrice ||
                    product.price}
                </h4>

                {product.discountPrice && (
                  <>
                    <span className="text-muted text-decoration-line-through">
                      ₹{product.price}
                    </span>

                    <span className="badge bg-danger">
                      {Math.round(
                        (
                          (product.price -
                            product.discountPrice) /
                          product.price
                        ) * 100
                      )}
                      % OFF
                    </span>
                  </>
                )}

              </div>

              {/* DESCRIPTION */}

              <div className="mb-4">

                <h6 className="fw-bold mb-2">
                  Description
                </h6>

                <p
                  className={`small ${theme === "dark"
                    ? "text-light"
                    : "text-muted"
                    }`}
                >
                  {product?.description}
                </p>

              </div>

              {/* FEATURES */}

              <div className="mb-4">

                <h6 className="fw-bold mb-2">
                  Highlights
                </h6>

                <ul className="small ps-3 mb-0">

                  {product?.aboutItem?.map(
                    (item, i) => (

                      <li key={i} className="mb-1">
                        {item}
                      </li>

                    )
                  )}

                </ul>

              </div>

              {/* SPECIFICATIONS */}

              {product.subcategory ===
                "phone" && (

                  <div className="mb-4">

                    <h6 className="fw-bold mb-3">
                      Specifications
                    </h6>

                    <div className="row g-2">

                      <div className="col-6">

                        <div
                          className={`p-2 rounded-3 ${theme === "dark"
                            ? "bg-dark"
                            : "bg-light"
                            }`}
                        >

                          <small className="fw-bold">
                            Camera
                          </small>

                          <p className="mb-0 small">
                            {
                              product?.specifications
                                ?.Camera
                            }
                          </p>

                        </div>

                      </div>

                      <div className="col-6">

                        <div
                          className={`p-2 rounded-3 ${theme === "dark"
                            ? "bg-dark"
                            : "bg-light"
                            }`}
                        >

                          <small className="fw-bold">
                            OS
                          </small>

                          <p className="mb-0 small">
                            {
                              product?.specifications
                                ?.OS
                            }
                          </p>

                        </div>

                      </div>

                      <div className="col-6">

                        <div
                          className={`p-2 rounded-3 ${theme === "dark"
                            ? "bg-dark"
                            : "bg-light"
                            }`}
                        >

                          <small className="fw-bold">
                            RAM
                          </small>

                          <p className="mb-0 small">
                            {
                              product?.specifications
                                ?.RAM
                            }
                          </p>

                        </div>

                      </div>

                      <div className="col-6">

                        <div
                          className={`p-2 rounded-3 ${theme === "dark"
                            ? "bg-dark"
                            : "bg-light"
                            }`}
                        >

                          <small className="fw-bold">
                            Storage
                          </small>

                          <p className="mb-0 small">
                            {
                              product?.specifications
                                ?.Storage
                            }
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                )}

              {/* STOCK */}

              <div
                className={`p-3 rounded-3 ${theme === "dark"
                  ? "bg-dark"
                  : "bg-light"
                  }`}
              >

                <span className="fw-bold">
                  Stock :
                </span>{" "}

                <span
                  className={`fw-semibold ${product.stock > 0
                    ? "text-success"
                    : "text-danger"
                    }`}
                >
                  {product.stock}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* REVIEWS */}

      <div
        className={`card border-0 shadow-sm  mt-3  ${theme === "dark"
          ? "bg-black text-light"
          : "bg-white text-dark"
          }`}
      >

        <div
          className={`card-header fw-bold ${theme === "dark"
            ? "bg-dark text-light border-secondary"
            : "bg-light"
            }`}
        >
          Reviews
        </div>

        <div className="card-body">

          {product.reviews.length > 0 ? (

            product.reviews.map((r, i) => (

              <div
                key={i}
                className={`d-flex gap-3 border-bottom pb-3 mb-3 ${theme === "dark"
                  ? "border-secondary"
                  : ""
                  }`}
              >

                <img
                  src={r.userImage}
                  alt=""
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />

                <div className="w-100">

                  <div className="d-flex justify-content-between flex-wrap">

                    <h6 className="mb-1">
                      {r.userName}
                    </h6>

                    <small className="text-warning fw-bold">
                      {r.rating} ★
                    </small>

                  </div>

                  <p
                    className={`small mb-0 ${theme === "dark"
                      ? "text-light"
                      : "text-muted"
                      }`}
                  >
                    {r.comment}
                  </p>

                </div>

              </div>

            ))

          ) : (

            <p className="text-muted mb-0">
              No reviews yet
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default ProductPreview;