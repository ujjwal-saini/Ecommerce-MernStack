import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../middleware/authContext";
import { Link } from "react-router-dom";

const categories = [
  { name: "Electronics", img: "https://images.unsplash.com/photo-1518770660439-4636190af475" },
  { name: "Clothing", img: "https://images.unsplash.com/photo-1521334884684-d80222895322" },
  { name: "Shoes & Footwear", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
  { name: "Furniture", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" },
  { name: "Beauty & Personal Care", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9" },
  { name: "Sports & Fitness", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b" },
  { name: "Toys & Games", img: "https://images.unsplash.com/photo-1587654780291-39c9404d746b" },
  { name: "Books & Stationery", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794" },
  { name: "Home & Kitchen", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" }, ,
  { name: "Jewelry & Accessories", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338" },
  { name: "Pet Supplies", img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e" },
  { name: "Baby Products", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba" },
];

function Category() {
  const { theme } = useContext(AuthContext);

  return (
    <div className={`container-fluid py-3 ${theme === "dark" ? "theme-black text-light" : "bg-light text-dark"}`}>
      {/*  Categories */}
      <div className="d-flex overflow-auto px-2" style={{ gap: "18px" }}>
        {categories.map((cat, index) => (
          <Link to={`allproducts/${cat.name}`} key={index} className="text-center" style={{ minWidth: "85px", textDecoration: "none" }}>

            {/* Image Box */}
            <div
              className={`${theme === "dark" ? "theme-black border border-secondary" : "bg-white"} mx-2 `}
              style={{
                width: "95px", height: "100px", borderRadius: "40px 40px 12px 12px",
                overflow: "hidden", margin: "auto"
              }}>
              <img
                src={cat.img}
                alt={cat.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            {/*  Label */}
            <p className={`mt-2 mb-0 text-decoration-none ${theme === "dark" ? "theme-black text-light" : "bg-light text-dark"} `} style={{
              fontSize: "14px", textDecorationLine: "none"
            }}>
              {cat.name}
            </p>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default Category;