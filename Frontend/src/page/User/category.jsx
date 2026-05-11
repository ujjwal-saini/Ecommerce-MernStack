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
      className={`container-fluid py-3 ${theme === "dark"
        ? "theme-black text-light"
        : "bg-light text-dark"
        }`}
    >
      {/* CATEGORY LIST */}
      <div
        className="category-wrapper d-flex overflow-auto hide-scrollbar px-1"
        style={{
          gap: "18px",
          scrollBehavior: "smooth",
        }}
      >
        {categories.map((cat, index) => (
          <Link
            to={`allproducts/${cat.name}`}
            key={index}
            className="category-link text-center text-decoration-none"
            style={{
              minWidth: "105px",
            }}
          >
            {/* IMAGE */}
            <div
              className={`category-card ${theme === "dark"
                ? "border border-secondary"
                : "bg-white"
                }`}
              style={{
                width: "105px",
                height: "110px",
                borderRadius: "32px",
                overflow: "hidden",
                margin: "auto",
                padding: "2px",
                boxShadow:
                  theme === "dark"
                    ? "0 2px 10px rgba(255,255,255,0.05)"
                    : "0 2px 10px rgba(0,0,0,0.08)",
                transition: "0.3s",
              }}
            >
              <img
                src={cat.img}
                alt={cat.name}
                loading="lazy"
                className="category-img"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "30px",
                }}
              />
            </div>

            {/* TEXT */}
            <p
              className={`category-text mt-2 mb-0 ${theme === "dark"
                ? "text-light"
                : "text-dark"
                }`}
              style={{
                fontSize: "14px",
                fontWeight: "500",
                whiteSpace: "nowrap",
              }}
            >
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;