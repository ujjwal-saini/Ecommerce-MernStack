import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthContext } from "../../middleware/authContext";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    name: "Clothing",
    img: "https://images.unsplash.com/photo-1521334884684-d80222895322",
  },
  {
    name: "Shoes",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    name: "Furniture",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  },
  {
    name: "Beauty",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
  },
  {
    name: "Sports",
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  },
  {
    name: "Toys",
    img: "https://images.unsplash.com/photo-1587654780291-39c9404d746b",
  },
  {
    name: "Books",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
  {
    name: "Watches",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    name: "Phone",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
  {
    name: "Gaming",
    img: "https://images.unsplash.com/photo-1605901309584-818e25960a8f",
  },
  {
    name: "Jewelry",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
  },
  {
    name: "Bags",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    name: "Kitchen",
    img: "https://images.unsplash.com/photo-1506368083636-6defb67639a7",
  },
  {
    name: "Fitness",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
  },
];

function Category() {

  const { theme } = useContext(AuthContext);

  return (

    <div
      className={`container-fluid py-4 ${theme === "dark"
          ? "theme-black text-light"
          : "bg-white text-dark"
        }`}
    >

      {/* TITLE */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h3 className="fw-bold m-0">
          Shop by Categories
        </h3>

      </div>

      {/* CATEGORY SCROLL */}

      <div className="category-wrapper hide-scrollbar">

        {categories.map((cat, index) => (

          <Link
            to={`allproducts/${cat.name}`}
            key={index}
            className="category-link text-decoration-none"
          >

            <div
              className={`modern-category-card ${theme === "dark"
                  ? "dark-card"
                  : "light-card"
                }`}
            >

              {/* IMAGE */}

              <div className="category-img-wrapper">

                <img
                  src={cat.img}
                  alt={cat.name}
                  loading="lazy"
                  className="modern-category-img"
                />

              </div>

              {/* TEXT */}

              <h6
                className={`category-name ${theme === "dark"
                    ? "text-light"
                    : "text-dark"
                  }`}
              >
                {cat.name}
              </h6>

            </div>

          </Link>

        ))}

      </div>

      {/* CSS */}

      <style>{`

        .category-wrapper {
          display: flex;
          gap: 22px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding-bottom: 10px;
        }

        .category-link {
          flex: 0 0 auto;
        }

        .modern-category-card {
          width: 190px;
          border-radius: 26px;
          overflow: hidden;
          transition: 0.35s ease;
          cursor: pointer;
          padding: 12px;
        }

        .light-card {
          background: #fff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .dark-card {
          background: #151515;
          border: 1px solid #2d2d2d;
          box-shadow: 0 4px 20px rgba(255,255,255,0.03);
        }

        .modern-category-card:hover {
          transform: translateY(-8px);
        }

        .category-img-wrapper {
          width: 100%;
          height: 170px;
          border-radius: 22px;
          overflow: hidden;
        }

        .modern-category-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.5s ease;
        }

        .modern-category-card:hover .modern-category-img {
          transform: scale(1.08);
        }

        .category-name {
          margin-top: 14px;
          text-align: center;
          font-weight: 700;
          font-size: 1rem;
        }

        /* HIDE SCROLLBAR */

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* MOBILE */

        @media (max-width: 768px) {

          .category-wrapper {
            gap: 14px;
          }

          .modern-category-card {
            width: 140px;
            padding: 10px;
            border-radius: 18px;
          }

          .category-img-wrapper {
            height: 120px;
            border-radius: 16px;
          }

          .category-name {
            font-size: 0.9rem;
            margin-top: 10px;
          }
        }

      `}</style>

    </div>
  );
}

export default Category;