import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">

      <h1 className="display-1 fw-bold text-danger">404</h1>

      <h3 className="mb-3">Oops! Page Not Found</h3>

      <p className="text-muted mb-4" style={{ maxWidth: "400px" }}>
        The page you are looking for might have been removed,
        had its name changed, or is temporarily unavailable.
      </p>

      <Link to="/dashboard" className="btn btn-primary px-4">
        Go Back Home
      </Link>

    </div>
  );
}

export default ErrorPage;
