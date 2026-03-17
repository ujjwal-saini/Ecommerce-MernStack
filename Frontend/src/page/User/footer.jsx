import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../middleware/authContext";

function Footer() {
  const { theme } = useContext(AuthContext);

  return (
    <footer
      className={`py-5 ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"
        }`}
    >
      <div className="container">
        <div className="row">

          {/* Section 1 */}
          <div className="col-6 col-md-2 mb-3">
            <h5>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/" className={`nav-link p-0 ${theme === "dark" ? "text-white" : "text-dark"}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/features" className={`nav-link p-0 ${theme === "dark" ? "text-white" : "text-dark"}`}>
                  Features
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/pricing" className={`nav-link p-0 ${theme === "dark" ? "text-white" : "text-dark"}`}>
                  Pricing
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/faq" className={`nav-link p-0 ${theme === "dark" ? "text-white" : "text-dark"}`}>
                  FAQs
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/about" className={`nav-link p-0 ${theme === "dark" ? "text-white" : "text-dark"}`}>
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="col-6 col-md-2 mb-3">
            <h5>Section</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/" className={`nav-link p-0 ${theme === "dark" ? "text-white" : "text-dark"}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/features" className={`nav-link p-0 ${theme === "dark" ? "text-white" : "text-dark"}`}>
                  Features
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/pricing" className={`nav-link p-0 ${theme === "dark" ? "text-white" : "text-dark"}`}>
                  Pricing
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/faq" className={`nav-link p-0 ${theme === "dark" ? "text-white" : "text-dark"}`}>
                  FAQs
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/about" className={`nav-link p-0 ${theme === "dark" ? "text-white" : "text-dark"}`}>
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-md-5 offset-md-1 mb-3">
            <form>
              <h5>Subscribe to our newsletter</h5>
              <p className={theme === "dark" ? "text-white-50" : "text-muted"}>
                Monthly digest of what's new and exciting from us.
              </p>

              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                />
                <button className="btn btn-primary" type="button">
                  Subscribe
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Footer */}
        <div
          className={`d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top ${theme === "dark" ? "border-secondary" : "border-dark"
            }`}
        >
          <p className="mb-0">
            © 2026 Company, Inc. All rights reserved.
          </p>

          <ul className="list-unstyled d-flex mb-0">
            <li className="ms-3">
              <a className={`${theme === "dark" ? "text-white" : "text-dark"} text-decoration-none`} href="/#">
                Instagram
              </a>
            </li>
            <li className="ms-3">
              <a className={`${theme === "dark" ? "text-white" : "text-dark"} text-decoration-none`} href="/#">
                Facebook
              </a>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
}

export default Footer;