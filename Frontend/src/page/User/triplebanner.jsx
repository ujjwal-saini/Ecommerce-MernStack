import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../middleware/authContext";

function TripleBannerSection() {

  const { theme } = useContext(AuthContext);

  return (

    <div className="container-fluid my-3">

      {/* SINGLE LARGE BANNER */}
      <div className="single-banner-wrapper">

        <div className={`left-banner ${theme}`}>

          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1400"
            alt="main-banner"
            className="banner-img"
          />

          {/* OVERLAY */}
          <div className="banner-overlay">

            <h1 className="banner-title">
              New Fashion Collection
            </h1>

            <p className="banner-text">
              Discover trending styles with premium quality and exclusive offers.
            </p>

            <Link to="/allproducts/all">

              <button className="shop-btn">
                Shop Now
              </button>

            </Link>

          </div>

        </div>

      </div>

      {/* CSS */}
      <style>{`

        .single-banner-wrapper {
          width: 100%;
        }

        .left-banner {
          position: relative;
          width: 100%;
          height: 620px;
          overflow: hidden;
          border-radius: 28px;
        }

        .banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .left-banner:hover .banner-img {
          transform: scale(1.05);
        }

        /* OVERLAY */

        .banner-overlay {
          position: absolute;
          left: 7%;
          bottom: 10%;
          z-index: 2;
          color: white;
          animation: fadeUp 1s ease;
        }

        .banner-title {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 14px;
          text-shadow: 2px 2px 15px rgba(0,0,0,0.5);
          animation: slideLeft 1s ease;
        }

        .banner-text {
          font-size: 1.2rem;
          max-width: 500px;
          margin-bottom: 24px;
          animation: fadeIn 1.3s ease;
        }

        /* BUTTON */

        .shop-btn {
          border: none;
          background: #ff6b00;
          color: white;
          padding: 14px 34px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1rem;
          transition: 0.3s ease;
          animation: bounceIn 1.2s ease;
        }

        .shop-btn:hover {
          background: #ff8124;
          transform: translateY(-3px);
        }

        /* ANIMATIONS */

        @keyframes fadeUp {

          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideLeft {

          from {
            opacity: 0;
            transform: translateX(-40px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {

          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes bounceIn {

          0% {
            opacity: 0;
            transform: scale(0.8);
          }

          60% {
            opacity: 1;
            transform: scale(1.05);
          }

          100% {
            transform: scale(1);
          }
        }

        /* MOBILE */

        @media (max-width: 992px) {

          .left-banner {
            height: 400px;
            border-radius: 18px;
          }

          .banner-title {
            font-size: 2rem;
          }

          .banner-text {
            font-size: 0.95rem;
            max-width: 280px;
          }

          .shop-btn {
            padding: 10px 22px;
            font-size: 0.9rem;
          }
        }

      `}</style>

    </div>
  );
}

export default TripleBannerSection;