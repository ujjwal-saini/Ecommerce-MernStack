import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ProductPreview() {
  const { id } = useParams();
  const products = useSelector((state) => state.product.products);

  const product = products.find((p) => p._id === id);

  const [selectedImage, setSelectedImage] = useState(null);
  const [allImage, setAllImage] = useState([]);

  useEffect(() => {
    if (product) {
      setAllImage([product.mainImage, ...(product.images || [])]);
      setSelectedImage(product.mainImage);
    }
  }, [product]);
  if (!product) {
    return <p className="text-center mt-4">Product not found</p>;
  }

  return (
    <div className="container py-4">
      <div className="card shadow-sm">

        {/* HEADER */}
        <div className="card-header d-flex justify-content-between align-items-center">
          <h6 className="mb-0">Product Preview</h6>

          <Link to={`/admindashboard/products/editproduct/${product._id}`} className="btn btn-sm btn-primary">
            Edit
          </Link>
        </div>

        <div className="card-body">
          <div className="row">

            {/* LEFT IMAGE */}
            <div className="col-md-6 text-center">
              <div className="border rounded p-2 mb-2 bg-light">
                <img
                  src={selectedImage}
                  alt={product.name}
                  style={{ maxHeight: "250px", objectFit: "contain" }}
                  className="img-fluid"
                />
              </div>

              <div className="d-flex flex-wrap gap-2 justify-content-center gap-2">
                {allImage.slice(0, 5).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    onClick={() => setSelectedImage(img)}
                    style={{
                      width: "105px",
                      height: "105px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border:
                        selectedImage === img
                          ? "2px solid black"
                          : "1px solid #ccc",
                    }}
                  />
                ))}

              </div>
            </div>

            {/* RIGHT DETAILS */}
            <div className="col-md-6">

              <h5>{product.name}</h5>
              <p className="text-muted mb-1">{product?.brand}</p>

              <p className="mb-2">
                <span className="badge bg-success">
                  {product?.averageRating} ★
                </span>{" "}
                <small className="text-muted">
                  ({product?.numReviews} reviews)
                </small>
              </p>

              {/* PRICE */}
              <div className="d-flex  gap-4 align-items-center">
                <span className="text-success fw-bold">
                  ₹{product.discountPrice || product.price}
                </span>

                {product.discountPrice && (
                  <>
                    <span className="text-muted text-decoration-line-through small">
                      ₹{product.price}
                    </span>

                    <span className="text-success small fw-bold">
                      {Math.round(
                        ((product.price - product.discountPrice) / product.price) * 100
                      )}
                      % off
                    </span>
                  </>
                )}
              </div>

              {/* DESCRIPTION */}
              <p className="small text-muted mt-2">
                {product?.description}
              </p>

              {/* FEATURES */}
              <div className="mt-3">
                <h6 className="mb-1">Highlights</h6>
                <ul className="small mb-0">
                  {product?.aboutItem?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* SPECS */}
              {product.subcategory === "phone" ? (
                <div className="mt-3">
                  <h6 className="mb-1">Specifications</h6>
                  <div className="row small">
                    <div className="col-6">
                      <b>Camera:</b> {product?.specifications?.Camera}
                    </div>
                    <div className="col-6">
                      <b>OS:</b> {product?.specifications?.OS}
                    </div>
                    <div className="col-6">
                      <b>RAM:</b> {product?.specifications?.RAM}
                    </div>
                    <div className="col-6">
                      <b>Storage:</b> {product?.specifications?.Storage}
                    </div>
                  </div>
                </div>

              ) : <> </>}


              {/* STOCK */}
              <p className="mt-3 small text-muted">
                Stock: {product?.stock}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="card mt-3 shadow-sm">
        <div className="card-header">
          <h6 className="mb-0">Reviews</h6>
        </div>

        <div className="card-body">
          {product.reviews.map((r, i) => (
            <div key={i} className="mb-3 border-bottom pb-2">
              <div className="d-flex align-items-center gap-2">
                <img
                  src={r.userImage}
                  alt=""
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                />
                <div>
                  <p className="mb-0 small fw-semibold">{r.userName}</p>
                  <small className="text-warning">{r.rating} ★</small>
                </div>
              </div>
              <p className="small text-muted mb-0 mt-1">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPreview;