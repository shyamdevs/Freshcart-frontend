import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaRegHeart,
  FaExchangeAlt,
  FaStar,
  FaShoppingBag,
} from "react-icons/fa";
import "../CSS/Popproduct.css";
import axios from "axios";
import Swal from "sweetalert2";

const Popproduct = () => {
  let [allproductvalue, setproduct] = useState([])

  function getproduct() {
    axios.get("https://freshcart-backend-orpin.vercel.app/allproduct").then((res) => {
      if (res.data.status) {
        setproduct(res.data.myallproduct)
      }
      else {
        document.write("not a single category added")
      }
    })
  }

  useEffect(() => {
    getproduct()
  }, [])

  // add to cart 

  const addToCart = (item) => {

    axios.post("https://freshcart-backend-orpin.vercel.app/addtocart", item)

      .then((res) => {

        if (res.data.status) {

          Swal.fire({
            icon: "success",
            title: "Added",
            text: "Product Added in cart",
            timer: 1200,
            showConfirmButton: false,
          });


        } else {

          Swal.fire({

            icon: "error",

            text: "Already Added"

          });


        }

      });

  }

  // wishlist --------------------
 const user = JSON.parse(localStorage.getItem("user"));
  const addWishlist = (item) => {

    axios.post("https://freshcart-backend-orpin.vercel.app/addwishlist", {...item, email: user.email})
      .then((res) => {

        if (res.data.status) {

          Swal.fire({
            icon: "success",
            title: "Added",
            text: "Product added to wishlist",
            timer: 1200,
            showConfirmButton: false
          });

        } else {

          Swal.fire({
            icon: "error",
            text: "Already Added"
          });

        }

      });

  }




  return (
    <section className="products-section">
      <div className="products-container">

        <h2 className="products-title">Popular Products</h2>






        <div className="products-grid">
          {allproductvalue.map((item) => (

            <Link
              to="/productdetails"

              state={{ product: item }}
            
            >

              <div className="product-card" key={item._id}>

                {/* Hover Icons */}

                <div className="product-icons">

                  <button>
                    <FaEye />
                  </button>

                  <button onClick={() => addWishlist(item)}>
                    <FaRegHeart />
                  </button>

                  <button>
                    <FaExchangeAlt />
                  </button>

                </div>

                {/* Image */}

                <div className="product-image-box">

                  <img
                    src={item.image}
                    alt={item.Title}
                    className="product-image"
                  />

                </div>

                {/* Details */}

                <div className="product-content">

                  <p className="product-category">
                    {item.Category}
                  </p>

                  <Link
                    to="/productdetails"
                    state={{ product: item }}

                    className="product-name"
                  >
                    {item.Title}
                  </Link>

                  {/* Static Rating */}

                  <div className="product-rating">

                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar className="last-star" />

                    <span>4.3 (4)</span>

                  </div>

                  {/* Price */}

                  <div className="product-bottom">

                    <div className="product-price">

                      <span className="new-price">
                        ₹{item.SalePrice}
                      </span>

                      <span className="old-price">
                        ₹{item.RegularPrice}
                      </span>

                    </div>

                    <button className="add-cart-btn" onClick={() => addToCart(item)}>
                      <FaShoppingBag />
                      Add
                    </button>

                  </div>

                </div>

              </div>
            </Link>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Popproduct;