
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../middleware/authContext";

function OfferBanner() {

  const { theme } = useContext(AuthContext);

  return (
    <div className="container-fluid my-5">

      <div className={`offer-banner ${theme}`}>

        <div>
          <h1>Big Summer Sale</h1>
          <p>
            Up to 70% OFF on Fashion, Electronics & Accessories.
          </p>

          <Link to="/shop">
            <button>
              Explore Deals
            </button>
          </Link>
        </div>

      </div>

      <style>{`

        .offer-banner {
          border-radius: 30px;
          padding: 70px 50px;
          background-image: url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400');
          background-size: cover;
          background-position: center;
          position: relative;
          overflow: hidden;
          color: white;
        }

        .offer-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
        }

        .offer-banner div {
          position: relative;
          z-index: 2;
        }

        .offer-banner h1 {
          font-size: 4rem;
          font-weight: 800;
        }

        .offer-banner p {
          font-size: 1.1rem;
          max-width: 500px;
          margin: 15px 0 25px;
        }

        .offer-banner button {
          border: none;
          background: #ff6b00;
          color: white;
          padding: 14px 34px;
          border-radius: 50px;
          font-weight: 700;
        }

        @media(max-width:768px){

          .offer-banner {
            padding: 45px 25px;
          }

          .offer-banner h1 {
            font-size: 2rem;
          }
        }

      `}</style>

    </div>
  );
}

export default OfferBanner;
