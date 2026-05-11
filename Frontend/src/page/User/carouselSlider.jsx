import React, { useEffect, useRef } from "react";
import { Carousel } from "bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../middleware/authContext";
import { Link } from "react-router-dom";

function CarouselSlider() {
  const carouselRef = useRef(null);
  const { theme } = useContext(AuthContext);

  useEffect(() => {
    if (carouselRef.current) {
      new Carousel(carouselRef.current, {
        interval: 4000,
        ride: "carousel",
        pause: false,
        wrap: true
      });
    }
  }, []);

  return (
    <div ref={carouselRef} id="carouselExample" className="carousel slide d-flex mb-5">

      {/* 🔹 Indicators */}
      <div className="carousel-indicators custom-indicators">
        {[0, 1, 2, 3, 4].map((i) => (
          <button
            key={i}
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to={i}
            className={i === 0 ? "active" : ""}
            style={{
              backgroundColor: theme === "dark" ? "#fff" : "#000"
            }}
          />
        ))}
      </div>
      {/*  Slides */}
      <div className="carousel-inner">

        <div className="carousel-item active">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fc36d6153544611.6331e2e4b2de3.jpg"
            className="d-block w-100"
            alt="slide1"
            loading="lazy" />
        </div>

        <div className="carousel-item">
          <Link to={'productdetail/69d3b0252edcbe211aa67ffb'}>

            <img
              src="https://www.designinfo.in/wp-content/uploads/2023/10/HP-Laptop-15s-AMD-Ryzen-5-5500U-9.webp"
              className="d-block w-100"
              alt="slide2"
              loading="lazy" />
          </Link>
        </div>

        <div className="carousel-item">
          <img
            src="https://cdn.shopify.com/s/files/1/0627/5517/files/02-26-20_Aidan_264883.jpg?v=1603213851"
            className="d-block w-100"
            loading="lazy"
            alt="slide3" />
        </div>

        <div className="carousel-item">
          <img
            src="https://rajanyas.com/cdn/shop/files/Gray_Minimalist_New_Collection_Banner.png?v=1762946994&width=3840"
            className="d-block w-100"

            loading="lazy"
            alt="slide4" />
        </div>

        <div className="carousel-item">
          <img src="https://marketplace.canva.com/EAFoEJMTGiI/1/0/1600w/canva-beige-aesthetic-new-arrival-fashion-banner-landscape-cNjAcBMeF9s.jpg"
            className="d-block w-100"
            loading="lazy"
            alt="slide5" />
        </div>
      </div>

      {/* 🔹 Controls */}
      <button
        className={`carousel-control-prev ${theme === "dark" ? "invert-icon" : ""
          }`}
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className={`carousel-control-next ${theme === "dark" ? "invert-icon" : ""
          }`}
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>


    </div>
  );
}

export default CarouselSlider;