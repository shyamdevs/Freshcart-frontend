import React from "react";
import "../CSS/Slider.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import first from "../Images/slide-1.jpg";
import second from "../Images/slide-2.jpg";

export default function Slider() {
  return (
    <>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">

          {/* Slide 1 */}
          <div className="carousel-item active">
            <img src={first} className="d-block w-100 slider-img" alt="" />

            <div className="slider-content">
              <span className="offer">Opening Sale Discount 50%</span>

              <h1>SuperMarket For Fresh Grocery</h1>

              <p>
                Introduced a new model for online grocery shopping and
                convenient home delivery.
              </p>

              <button className="shop-btn">
                Shop Now →
              </button>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <img src={second} className="d-block w-100 slider-img" alt="" />

            <div className="slider-content">
              <span className="offer">Fresh Fruits & Vegetables</span>

              <h1>Healthy Food Everyday</h1>

              <p>
                Get fresh groceries delivered at your doorstep with amazing
                discounts.
              </p>

              <button className="shop-btn">
                Shop Now →
              </button>
            </div>
          </div>

        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </>
  );
}