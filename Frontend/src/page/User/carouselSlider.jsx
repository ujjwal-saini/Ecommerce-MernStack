import React, { useEffect, useRef, useContext } from "react";
import { Carousel } from "bootstrap";
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
        wrap: true,
      });
    }

  }, []);

  return (

    <div
      ref={carouselRef}
      id="carouselExample"
      className="carousel slide custom-carousel mb-4"
    >

      {/* INDICATORS */}

      <div className="carousel-indicators custom-indicators">

        {[0, 1, 2, 3, 4].map((i) => (

          <button
            key={i}
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to={i}
            className={i === 0 ? "active" : ""}
            style={{
              backgroundColor: theme === "dark" ? "#fff" : "#000",
            }}
          />

        ))}
      </div>

      {/* SLIDES */}

      <div className="carousel-inner rounded-4 overflow-hidden">

        {/* SLIDE 1 */}
        <div className="carousel-item active">

          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fc36d6153544611.6331e2e4b2de3.jpg"
            className="d-block w-100 custom-banner-img"
            alt="slide1"
            loading="lazy"
          />

        </div>

        {/* SLIDE 2 */}
        <div className="carousel-item">

          <Link to={"productdetail/69d3b0252edcbe211aa67ffb"}>

            <img
              src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/f52b67ad-39b1-4c29-bf5d-b9ee1b509e87.__CR0,0,1464,600_PT0_SX1464_V1___.jpeg"
              className="d-block w-100 custom-banner-img"
              alt="slide2"
              loading="lazy"
            />

          </Link>

        </div>

        {/* SLIDE 3 */}
        <div className="carousel-item">

          <img
            src="https://cdn.shopify.com/s/files/1/0627/5517/files/02-26-20_Aidan_264883.jpg?v=1603213851"
            className="d-block w-100 custom-banner-img"
            loading="lazy"
            alt="slide3"
          />

        </div>

        {/* SLIDE 4 */}
        <div className="carousel-item">

          <img
            src="https://rajanyas.com/cdn/shop/files/Gray_Minimalist_New_Collection_Banner.png?v=1762946994&width=3840"
            className="d-block w-100 custom-banner-img"
            loading="lazy"
            alt="slide4"
          />

        </div>

        {/* SLIDE 5 */}
        <div className="carousel-item">

          <img
            src="https://marketplace.canva.com/EAFoEJMTGiI/1/0/1600w/canva-beige-aesthetic-new-arrival-fashion-banner-landscape-cNjAcBMeF9s.jpg"
            className="d-block w-100 custom-banner-img"
            loading="lazy"
            alt="slide5"
          />

        </div>
      </div>

      {/* CONTROLS */}

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