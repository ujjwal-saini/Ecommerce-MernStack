import React from "react";

function CarouselSlider() {
    return (
        <div
            id="carouselExample"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="3000">
           
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
            </div>

     
            <div className="carousel-inner" style={{ height: "50vh" }}>


                <div className="carousel-item">
                    <img
                        src="https://cdn.shopify.com/s/files/1/0627/5517/files/02-26-20_Aidan_264883.jpg?v=1603213851"
                        className="d-block w-100"
                        alt="slide1"/>
                </div>
                <div className="carousel-item">
                    <img
                        src="https://rajanyas.com/cdn/shop/files/Gray_Minimalist_New_Collection_Banner.png?v=1762946994&width=3840"
                        className="d-block w-100"
                        alt="slide2"
                    />
                </div>
                <div className="carousel-item active">
                    <img
                        src="https://marketplace.canva.com/EAFoEJMTGiI/1/0/1600w/canva-beige-aesthetic-new-arrival-fashion-banner-landscape-cNjAcBMeF9s.jpg"
                        className="d-block w-100"
                        alt="slide3"
                    />
                </div>
            </div>

            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </button>

            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
            </button>
        </div>
    );
}

export default CarouselSlider;
