import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../middleware/authContext";
import { Link } from "react-router-dom";

const categories = [
  { name: "beauty", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9" },
  { name: "books", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794" },
  { name: "dental Tools", img: "https://cdn.vectorstock.com/i/500p/79/10/dentist-tools-and-equipment-banner-concept-vector-49647910.jpg" },
  { name: "electronics", img: "https://images.unsplash.com/photo-1518770660439-4636190af475" },
  { name: "fashion", img: "https://images.unsplash.com/photo-1521334884684-d80222895322" },
  { name: "home Decor", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" },
  { name: "jewellery", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338" },
  { name: "medical Posters", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8REtYp0UoKyDIyBeY0flB4I0ftkF7yJ-JEA&s" },
  { name: "pens", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba" },
  { name: "sports", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b" },
  { name: "toys", img: "https://images.unsplash.com/photo-1587654780291-39c9404d746b" }
];

function Category() {
  const { theme } = useContext(AuthContext);

  return (
    <div className={`container-fluid py-3 ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
      {/*  Categories */}
      <div className="d-flex overflow-auto px-2" style={{ gap: "18px" }}>
        {categories.map((cat, index) => (
          <Link to={`allproducts/${cat.name}`} key={index} className="text-center" style={{ minWidth: "85px" }}>

            {/* Image Box */}
            <div
              className={`${theme === "dark" ? "bg-dark border border-secondary" : "bg-white"} mx-2 `}
              style={{ width: "95px", height: "100px", borderRadius: "40px 40px 12px 12px", 
                overflow: "hidden", margin: "auto"}}>
              <img
                src={cat.img}
                alt={cat.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
            </div>

            {/*  Label */}
            <p className={`mt-2 mb-0 text-decoration-none ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"} `} style={{ fontSize: "14px" , textDecorationLine:"none"
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