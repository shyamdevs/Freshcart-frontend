import React from 'react'
import "../CSS/Freature.css"

export default function Freature() {
  return (
    <>
      <section class="features-section">
    <div class="features-container">

      <div class="feature-box">
        <div class="feature-icon">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M12 7v5l4 2"></path>
          </svg>
        </div>
        <h3>10 minute grocery now</h3>
        <p>
          Get your order delivered to your doorstep at the earliest from
          FreshCart pickup stores near you.
        </p>
      </div>

      <div class="feature-box">
        <div class="feature-icon">
          <svg viewBox="0 0 24 24">
            <path d="M20 12v9H4v-9"></path>
            <path d="M2 7h20v5H2z"></path>
            <path d="M12 22V7"></path>
            <path d="M12 7H7.5A2.5 2.5 0 1 1 10 4.5L12 7z"></path>
            <path d="M12 7h4.5A2.5 2.5 0 1 0 14 4.5L12 7z"></path>
          </svg>
        </div>
        <h3>Best Prices & Offers</h3>
        <p>
          Cheaper prices than your local supermarket, great cashback offers
          to top it off. Get best pricess & offers.
        </p>
      </div>

      <div class="feature-box">
        <div class="feature-icon">
          <svg viewBox="0 0 24 24">
            <path d="M21 16V8l-9-5-9 5v8l9 5 9-5z"></path>
            <path d="M3.5 8.5L12 13l8.5-4.5"></path>
            <path d="M12 21V13"></path>
          </svg>
        </div>
        <h3>Wide Assortment</h3>
        <p>
          Choose from 5000+ products across food, personal care, household,
          bakery, veg and non-veg & other categories.
        </p>
      </div>

      <div class="feature-box">
        <div class="feature-icon">
          <svg viewBox="0 0 24 24">
            <path d="M21 7v6h-6"></path>
            <path d="M3 17v-6h6"></path>
            <path d="M20 11a8 8 0 0 0-14.5-4"></path>
            <path d="M4 13a8 8 0 0 0 14.5 4"></path>
          </svg>
        </div>
        <h3>Easy Returns</h3>
        <p>
          Not satisfied with a product? Return it at the doorstep & get a
          refund within hours. No questions asked policy .
        </p>
      </div>

    </div>
  </section>


    </>
  )
}
