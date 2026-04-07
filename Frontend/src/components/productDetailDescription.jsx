import React from "react";

function ProductDetailDescription({ product }) {
  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-3">
      <div className="card p-4 bg-dark text-light border-secondary">

        <h5 className="mb-3">Product Description</h5>
        <p className="text-light">{product.description}</p>

        <h6 className="mt-4">Features</h6>
        {product.features && product.features.length > 0 ? (
          <ul>
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        ) : (
          <p className="text-secondary">No features available</p>
        )}

        <h6 className="mt-4">Specifications</h6>
        <table className="table table-dark table-bordered mt-2">
          <tbody>
            <tr>
              <td>Brand</td>
              <td>{product.brand}</td>
            </tr>
            <tr>
              <td>Category</td>
              <td>{product.category}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>₹ {product.price}</td>
            </tr>
            <tr>
              <td>Stock</td>
              <td>{product.stock}</td>
            </tr>
            <tr>
              <td>Rating</td>
              <td>{product.averageRating}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default ProductDetailDescription;