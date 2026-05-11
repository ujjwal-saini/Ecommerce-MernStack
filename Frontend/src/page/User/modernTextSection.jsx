import React, { useContext } from "react";

import { AuthContext } from "../../middleware/authContext";

function ModernTextSection() {

  const { theme } = useContext(AuthContext);

  return (

    <div className="container-fluid my-5 px-2">

      <div
        className={`modern-text-wrapper ${theme === "dark"
            ? "modern-dark"
            : "modern-light"
          }`}
      >

        {/* LEFT */}

        <div className="modern-left">

          <span className="modern-badge">
            NEW COLLECTION 2025
          </span>

          <h1
            className={`modern-title ${theme === "dark"
                ? "text-light"
                : "text-dark"
              }`}
          >
            Upgrade Your Style
            <br />
            With Premium Fashion
          </h1>

          <p
            className={`modern-desc ${theme === "dark"
                ? "text-secondary"
                : "text-muted"
              }`}
          >
            Discover trending collections, premium quality products,
            and exclusive deals crafted for modern lifestyle.
          </p>

          <button className="modern-btn">
            Explore Now
          </button>

        </div>

        {/* RIGHT */}

        <div className="modern-right">

          <div className="glass-card">

            <h3>🔥 Trending</h3>

            <p>
              New arrivals updated daily with modern fashion trends.
            </p>

          </div>

          <div className="glass-card">

            <h3>⚡ Fast Delivery</h3>

            <p>
              Get your products delivered quickly and securely.
            </p>

          </div>

        </div>

      </div>

      {/* CSS */}

      <style>{`

        .modern-text-wrapper {
          border-radius: 35px;
          padding: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 50px;
          overflow: hidden;
          position: relative;
        }

        /* LIGHT */

        .modern-light {
          background: linear-gradient(
            135deg,
            #ffffff,
            #f5f7ff
          );

          box-shadow: 0 10px 35px rgba(0,0,0,0.07);
        }

        /* DARK */

        .modern-dark {
          background: linear-gradient(
            135deg,
            #111111,
            #1a1a1a
          );

          border: 1px solid #2a2a2a;
        }

        /* LEFT */

        .modern-left {
          flex: 1;
        }

        .modern-badge {
          background: #ff6b00;
          color: white;
          padding: 10px 22px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 700;
          display: inline-block;
          margin-bottom: 22px;
          letter-spacing: 1px;
        }

        .modern-title {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .modern-desc {
          font-size: 1.1rem;
          max-width: 600px;
          line-height: 1.8;
          margin-bottom: 28px;
        }

        .modern-btn {
          border: none;
          background: #ff6b00;
          color: white;
          padding: 14px 34px;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 700;
          transition: 0.3s ease;
        }

        .modern-btn:hover {
          transform: translateY(-4px);
          background: #ff8124;
        }

        /* RIGHT */

        .modern-right {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 320px;
        }

        .glass-card {
          padding: 28px;
          border-radius: 28px;
          backdrop-filter: blur(12px);
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          transition: 0.3s ease;
        }

        .glass-card:hover {
          transform: translateY(-6px);
        }

        .glass-card h3 {
          font-size: 1.4rem;
          margin-bottom: 12px;
          color: #ff6b00;
          font-weight: 800;
        }

        .glass-card p {
          margin: 0;
          color: ${theme === "dark"
          ? "#cfcfcf"
          : "#555"
        };
          line-height: 1.6;
        }

        /* TABLET */

        @media (max-width: 992px) {

          .modern-text-wrapper {
            flex-direction: column;
            align-items: flex-start;
            padding: 40px;
          }

          .modern-title {
            font-size: 2.6rem;
          }

          .modern-right {
            width: 100%;
          }
        }

        /* MOBILE */

        @media (max-width: 768px) {

          .modern-text-wrapper {
            padding: 25px;
            border-radius: 24px;
            gap: 25px;
          }

          .modern-title {
            font-size: 2rem;
          }

          .modern-desc {
            font-size: 0.95rem;
            line-height: 1.6;
          }

          .modern-btn {
            width: 100%;
            padding: 12px;
            font-size: 0.95rem;
          }

          .glass-card {
            padding: 20px;
            border-radius: 22px;
          }

          .glass-card h3 {
            font-size: 1.1rem;
          }

          .glass-card p {
            font-size: 0.9rem;
          }
        }

      `}</style>

    </div>
  );
}

export default ModernTextSection;