import React, { useContext } from "react";

import { AuthContext } from "../../middleware/authContext";

import {
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaUndo,
} from "react-icons/fa";

function PromoStrip() {

  const { theme } = useContext(AuthContext);

  const items = [
    {
      icon: <FaShippingFast />,
      title: "Free Shipping",
      desc: "Orders above ₹999",
    },

    {
      icon: <FaShieldAlt />,
      title: "Secure Payment",
      desc: "100% Protected",
    },

    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Dedicated Support",
    },

    {
      icon: <FaUndo />,
      title: "Easy Returns",
      desc: "7 Days Return",
    },
  ];

  return (

    <div className="container-fluid my-4 px-2">

      <div className="promo-wrapper">

        {items.map((item, index) => (

          <div
            className={`promo-card ${theme === "dark"
                ? "promo-dark"
                : "promo-light"
              }`}
            key={index}
          >

            {/* ICON */}

            <div className="promo-icon-wrapper">

              <div className="promo-icon">
                {item.icon}
              </div>

            </div>

            {/* TEXT */}

            <div className="promo-content">

              <h5
                className={`promo-title ${theme === "dark"
                    ? "text-light"
                    : "text-dark"
                  }`}
              >
                {item.title}
              </h5>

              <p
                className={`promo-desc ${theme === "dark"
                    ? "text-secondary"
                    : "text-muted"
                  }`}
              >
                {item.desc}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* CSS */}

      <style>{`

        .promo-wrapper {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
        }

        .promo-card {
          padding: 24px;
          border-radius: 28px;
          display: flex;
          align-items: center;
          gap: 18px;
          transition: 0.35s ease;
          cursor: pointer;
          overflow: hidden;
          position: relative;
        }

        .promo-card:hover {
          transform: translateY(-8px);
        }

        /* LIGHT */

        .promo-light {
          background: white;
          box-shadow: 0 6px 25px rgba(0,0,0,0.08);
        }

        /* DARK */

        .promo-dark {
          background: #161616;
          border: 1px solid #2a2a2a;
          box-shadow: 0 6px 25px rgba(255,255,255,0.03);
        }

        /* ICON */

        .promo-icon-wrapper {
          min-width: 75px;
          height: 75px;
          border-radius: 22px;
          background: rgba(255,107,0,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .promo-icon {
          font-size: 2rem;
          color: #ff6b00;
        }

        /* TEXT */

        .promo-title {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 800;
        }

        .promo-desc {
          margin: 6px 0 0;
          font-size: 0.95rem;
          font-weight: 500;
        }

        /* TABLET */

        @media (max-width: 992px) {

          .promo-wrapper {
            grid-template-columns: repeat(2, 1fr);
          }

          .promo-card {
            padding: 20px;
          }
        }

        /* MOBILE */

        @media (max-width: 768px) {

          .promo-wrapper {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .promo-card {
            padding: 18px;
            border-radius: 22px;
          }

          .promo-icon-wrapper {
            min-width: 60px;
            height: 60px;
            border-radius: 18px;
          }

          .promo-icon {
            font-size: 1.5rem;
          }

          .promo-title {
            font-size: 1rem;
          }

          .promo-desc {
            font-size: 0.82rem;
          }
        }

      `}</style>

    </div>
  );
}

export default PromoStrip;