import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

import { AuthContext } from "../../middleware/authContext";

function Footer() {
  const { theme } = useContext(AuthContext);

  return (
    <footer
      className={`pt-5 pb-3 ${theme === "dark"
          ? "bg-black text-light"
          : "bg-light text-dark"
        }`}
      style={{
        borderTop:
          theme === "dark"
            ? "1px solid #1f1f1f"
            : "1px solid #e9ecef",
      }}
    >
      <div className="container">

        <div className="row gy-5">

          {/* LOGO + ABOUT */}
          <div className="col-lg-4">
            <h2
              className="fw-bold mb-3"
              style={{
                color: "#ff7b00",
              }}
            >
              Shopra
            </h2>

            <p
              className={
                theme === "dark"
                  ? "text-secondary"
                  : "text-muted"
              }
              style={{
                lineHeight: "1.8",
              }}
            >
              Discover premium fashion, electronics,
              footwear and lifestyle products with
              modern shopping experience.
            </p>

            {/* SOCIAL */}
            <div className="d-flex gap-3 mt-4">

              <a
                href="/#"
                className="footer-social"
              >
                <FaFacebookF />
              </a>

              <a
                href="/#"
                className="footer-social"
              >
                <FaInstagram />
              </a>

              <a
                href="/#"
                className="footer-social"
              >
                <FaTwitter />
              </a>

              <a
                href="/#"
                className="footer-social"
              >
                <FaGithub />
              </a>

            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="fw-bold mb-4">
              Quick Links
            </h5>

            <ul className="list-unstyled d-flex flex-column gap-3">

              <li>
                <Link
                  to="/"
                  className="footer-link"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="footer-link"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="footer-link"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="footer-link"
                >
                  Contact
                </Link>
              </li>

            </ul>
          </div>

          {/* CATEGORIES */}
          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="fw-bold mb-4">
              Categories
            </h5>

            <ul className="list-unstyled d-flex flex-column gap-3">

              <li>
                <Link
                  to="/allproducts/electronics"
                  className="footer-link"
                >
                  Electronics
                </Link>
              </li>

              <li>
                <Link
                  to="/allproducts/fashion"
                  className="footer-link"
                >
                  Fashion
                </Link>
              </li>

              <li>
                <Link
                  to="/allproducts/footwear"
                  className="footer-link"
                >
                  Footwear
                </Link>
              </li>

              <li>
                <Link
                  to="/allproducts/beauty"
                  className="footer-link"
                >
                  Beauty
                </Link>
              </li>

            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="col-lg-4">
            <h5 className="fw-bold mb-4">
              Newsletter
            </h5>

            <p
              className={
                theme === "dark"
                  ? "text-secondary"
                  : "text-muted"
              }
            >
              Subscribe to get latest offers and
              updates directly in your inbox.
            </p>

            <div className="d-flex mt-4">

              <input
                type="email"
                placeholder="Enter your email"
                className={`form-control border-0 shadow-none ${theme === "dark"
                    ? "bg-dark text-light"
                    : "bg-white"
                  }`}
                style={{
                  borderRadius: "14px 0 0 14px",
                  height: "50px",
                }}
              />

              <button
                className="btn text-white px-4"
                style={{
                  background:
                    "linear-gradient(90deg,#ff7b00,#ff9d42)",
                  borderRadius: "0 14px 14px 0",
                  border: "none",
                  fontWeight: "600",
                }}
              >
                Subscribe
              </button>

            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div
          className={`d-flex flex-column flex-md-row justify-content-between align-items-center mt-5 pt-4 ${theme === "dark"
              ? "border-top border-secondary"
              : "border-top"
            }`}
        >
          <p
            className={`mb-3 mb-md-0 ${theme === "dark"
                ? "text-secondary"
                : "text-muted"
              }`}
          >
            © 2026 Shopra. All rights reserved.
          </p>

          <div className="d-flex gap-4">

            <Link
              to="/privacy"
              className="footer-link"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="footer-link"
            >
              Terms
            </Link>

            <Link
              to="/support"
              className="footer-link"
            >
              Support
            </Link>

          </div>
        </div>

      </div>

      {/* STYLE */}
      <style>
        {`
          .footer-link{
            text-decoration:none;
            color:inherit;
            transition:0.3s;
          }

          .footer-link:hover{
            color:#ff7b00;
            transform:translateX(3px);
          }

          .footer-social{
            width:42px;
            height:42px;
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            text-decoration:none;
            color:white;
            background:linear-gradient(90deg,#ff7b00,#ff9d42);
            transition:0.3s;
          }

          .footer-social:hover{
            transform:translateY(-4px);
          }
        `}
      </style>
    </footer>
  );
}

export default Footer;