import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaRegHeart,
  FaExchangeAlt,
  FaStar,
  FaShoppingBag,
} from "react-icons/fa";
import "../CSS/Popproduct.css";
import axiosInstance from "../axiosInstance";
import Swal from "sweetalert2";
import { getUser } from "../auth";
import { CartContext } from "./CartContext";

const Popproduct = () => {
  const [allproductvalue, setproduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  const user = getUser();

  function getproduct() {
    setLoading(true);
    axiosInstance.get("/allproduct")
      .then((res) => {
        if (res.data.status) {
          setproduct(res.data.myallproduct || []);
        } else {
          setproduct([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setproduct([]);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getproduct();
  }, []);

  // Add to cart
  const addToCart = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please sign in to add products to your cart.",
        confirmButtonColor: "#0aad0a",
      }).then(() => {
        navigate("/Signin");
      });
      return;
    }

    axiosInstance.post("/addtocart", {
      ...item,
      productId: item._id,
      email: user.email,
    })
      .then((res) => {
        if (res.data.status) {
          Swal.fire({
            icon: "success",
            title: "Added!",
            text: "Product added to cart",
            timer: 1200,
            showConfirmButton: false,
          });
          if (cartCtx?.getCartCount) cartCtx.getCartCount();
        } else {
          Swal.fire({
            icon: "info",
            text: res.data.message || "Already in cart",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          text: "Failed to add to cart",
        });
      });
  };

  // Add to wishlist
  const addWishlist = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please sign in to add products to your wishlist.",
        confirmButtonColor: "#0aad0a",
      }).then(() => {
        navigate("/Signin");
      });
      return;
    }

    axiosInstance.post("/addwishlist", {
      ...item,
      productId: item._id,
      email: user.email,
    })
      .then((res) => {
        if (res.data.status) {
          Swal.fire({
            icon: "success",
            title: "Added!",
            text: "Product added to wishlist",
            timer: 1200,
            showConfirmButton: false,
          });
          if (cartCtx?.getWishlistCount) cartCtx.getWishlistCount();
        } else {
          Swal.fire({
            icon: "info",
            text: res.data.msg || "Already in wishlist",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          text: "Failed to add to wishlist",
        });
      });
  };

  return (
    <section className="products-section">
      <div className="products-container">
        <h2 className="products-title">Popular Products</h2>

        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>
            <p>Loading popular products...</p>
          </div>
        ) : allproductvalue.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#888" }}>
            <p>No products available at the moment.</p>
          </div>
        ) : (
          <div className="products-grid">
            {allproductvalue.map((item) => (
              <div className="product-card" key={item._id}>
                {/* Hover Icons */}
                <div className="product-icons">
                  <Link
                    to="/productdetails"
                    state={{ product: item }}
                    aria-label="View product details"
                  >
                    <button type="button" aria-label="Quick view">
                      <FaEye />
                    </button>
                  </Link>

                  <button
                    type="button"
                    aria-label="Add to wishlist"
                    onClick={(e) => addWishlist(e, item)}
                  >
                    <FaRegHeart />
                  </button>

                  <button type="button" aria-label="Compare">
                    <FaExchangeAlt />
                  </button>
                </div>

                {/* Image */}
                <Link
                  to="/productdetails"
                  state={{ product: item }}
                  className="product-image-box"
                >
                  <img
                    src={item.image}
                    alt={item.Title}
                    className="product-image"
                    loading="lazy"
                  />
                </Link>

                {/* Details */}
                <div className="product-content">
                  <p className="product-category">{item.Category}</p>

                  <Link
                    to="/productdetails"
                    state={{ product: item }}
                    className="product-name"
                  >
                    {item.Title}
                  </Link>

                  {/* Rating */}
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
                      <span className="new-price">₹{item.SalePrice}</span>
                      {item.RegularPrice && (
                        <span className="old-price">₹{item.RegularPrice}</span>
                      )}
                    </div>

                    <button
                      className="add-cart-btn"
                      onClick={(e) => addToCart(e, item)}
                      type="button"
                    >
                      <FaShoppingBag /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Popproduct;