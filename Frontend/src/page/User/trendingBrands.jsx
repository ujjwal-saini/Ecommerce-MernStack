import React, { useContext } from "react";
import { AuthContext } from "../../middleware/authContext";

function TrendingBrands() {

  const { theme } = useContext(AuthContext);

  const brands = [
    {
      name: "Nike",
      logo: "https://cdn-icons-png.flaticon.com/512/732/732084.png",
    },

    {
      name: "Adidas",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    },

    {
      name: "Apple",
      logo: "https://cdn-icons-png.flaticon.com/512/0/747.png",
    },

    {
      name: "Samsung",
      logo: "https://cdn-icons-png.flaticon.com/512/882/882725.png",
    },

    {
      name: "Puma",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968672.png",
    },

    {
      name: "Sony",
      logo: "https://cdn-icons-png.flaticon.com/512/882/882721.png",
    },

    {
      name: "HP",
      logo: "https://cdn-icons-png.flaticon.com/512/888/888879.png",
    },

    {
      name: "Zara",
      logo: "https://cdn-icons-png.flaticon.com/512/5968/5968776.png",
    },
  ];

  return (

    <div className="container-fluid my-5 px-2">

      {/* TITLE */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2
          className={`fw-bold ${theme === "dark"
              ? "text-light"
              : "text-dark"
            }`}
        >
          Trending Brands
        </h2>

      </div>

      {/* BRANDS */}

      <div className="brands-wrapper hide-scrollbar">

        {brands.map((brand, index) => (

          <div
            key={index}
            className={`brand-card ${theme === "dark"
                ? "brand-dark"
                : "brand-light"
              }`}
          >

            {/* LOGO */}

            <div className="brand-logo-wrapper">

              <img
                src={brand.logo}
                alt={brand.name}
                className="brand-logo"
              />

            </div>

            {/* NAME */}

            <h4
              className={`brand-name ${theme === "dark"
                  ? "text-light"
                  : "text-dark"
                }`}
            >
              {brand.name}
            </h4>

          </div>

        ))}

      </div>

      {/* CSS */}

      <style>{`

        .brands-wrapper {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding-bottom: 12px;
        }

        .brand-card {
          min-width: 260px;
          height: 180px;
          border-radius: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: 0.35s ease;
          cursor: pointer;
          padding: 20px;
        }

        .brand-card:hover {
          transform: translateY(-8px);
        }

        .brand-light {
          background: white;
          box-shadow: 0 6px 25px rgba(0,0,0,0.08);
        }

        .brand-dark {
          background: #161616;
          border: 1px solid #2d2d2d;
          box-shadow: 0 6px 25px rgba(255,255,255,0.03);
        }

        .brand-logo-wrapper {
          width: 85px;
          height: 85px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }

        .brand-logo {
          width: 55px;
          height: 55px;
          object-fit: contain;
          transition: 0.4s ease;
        }

        .brand-card:hover .brand-logo {
          transform: scale(1.1);
        }

        .brand-name {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 1px;
          margin: 0;
        }

        /* HIDE SCROLLBAR */

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        /* TABLET */

        @media (max-width: 992px) {

          .brand-card {
            min-width: 220px;
            height: 160px;
          }

          .brand-name {
            font-size: 1.2rem;
          }
        }

        /* MOBILE */

        @media (max-width: 768px) {

          .brands-wrapper {
            gap: 16px;
          }

          .brand-card {
            min-width: 170px;
            height: 135px;
            border-radius: 22px;
            padding: 14px;
          }

          .brand-logo-wrapper {
            width: 60px;
            height: 60px;
            margin-bottom: 10px;
          }

          .brand-logo {
            width: 35px;
            height: 35px;
          }

          .brand-name {
            font-size: 1rem;
          }
        }

      `}</style>

    </div>
  );
}

export default TrendingBrands;