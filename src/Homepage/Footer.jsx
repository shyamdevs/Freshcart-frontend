import React from 'react'
import googlepay from "../Images/googleplay-btn.svg"
import appstore from "../Images/appstore-btn.svg"
import amazonpay from "../Images/amazonpay.svg"
import americanexpress from "../Images/american-express.svg"
import MasterCard from "../Images/mastercard.svg"
import PayPal from "../Images/paypal.svg"
import visa from "../Images/visa.svg"




export default function Footer() {
  return (
    <>
     <footer className="fresh-footer">
      <div className="footer-wrapper">
        <div className="footer-links-area">
          <div className="footer-column footer-category-column">
            <h4>Categories</h4>

            <div className="category-list-box">
              <ul>
                <li><a href="#">Vegetables & Fruits</a></li>
                <li><a href="#">Breakfast & instant food</a></li>
                <li><a href="#">Bakery & Biscuits</a></li>
                <li><a href="#">Atta, rice & dal</a></li>
                <li><a href="#">Sauces & spreads</a></li>
                <li><a href="#">Organic & gourmet</a></li>
                <li><a href="#">Baby care</a></li>
                <li><a href="#">Cleaning essentials</a></li>
                <li><a href="#">Personal care</a></li>
              </ul>

              <ul>
                <li><a href="#">Dairy, bread & eggs</a></li>
                <li><a href="#">Cold drinks & juices</a></li>
                <li><a href="#">Tea, coffee & drinks</a></li>
                <li><a href="#">Masala, oil & more</a></li>
                <li><a href="#">Chicken, meat & fish</a></li>
                <li><a href="#">Paan corner</a></li>
                <li><a href="#">Pharma & wellness</a></li>
                <li><a href="#">Home & office</a></li>
                <li><a href="#">Pet care</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-column">
            <h4>Get to know us</h4>
            <ul>
              <li><a href="#">Company</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Our Value</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>For Consumers</h4>
            <ul>
              <li><a href="#">Payments</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Product Returns</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shop Checkout</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Become a Shopper</h4>
            <ul>
              <li><a href="#">Shopper Opportunities</a></li>
              <li><a href="#">Become a Shopper</a></li>
              <li><a href="#">Earnings</a></li>
              <li><a href="#">Ideas & Guides</a></li>
              <li><a href="#">New Retailers</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Freshcart programs</h4>
            <ul>
              <li><a href="#">Freshcart programs</a></li>
              <li><a href="#">Gift Cards</a></li>
              <li><a href="#">Promos & Coupons</a></li>
              <li><a href="#">Freshcart Ads</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-payment-area">
          <div className="payment-partners">
            <h4>Payment Partners</h4>

            <div className="payment-icons">
             <img src={amazonpay} alt='amazonpay'/>
             <img src={americanexpress} alt='AMERICANEXPRESS'/>
             <img src={MasterCard} alt='MasterCard'/>
             <img src={PayPal} alt='PayPal'/>
             <img src={visa} alt='visa'/>
            </div>
          </div>

          <div className="app-download">
            <h4>Get deliveries with FreshCart</h4>

            <div className="app-buttons">
              <a href="#" className="store-btn">
               <img src={appstore} alt='appstore'/>
              </a>

              <a href="#" className="store-btn">
               <img src={googlepay} alt='Google pay'/>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-area">
          <p>
            © 2022 - 2026 FreshCart eCommerce HTML Template. All rights reserved.
            Powered by <a href="#">Codescandy.</a>
          </p>

          <div className="social-area">
            <span>Follow us on</span>
            <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i class="fa-brands fa-twitter"></i></a>
            <a href="#"><i class="fa-brands fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>


    </>
  )
}
