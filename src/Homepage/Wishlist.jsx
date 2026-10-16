import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";

import { FaTrash } from "react-icons/fa";
import "../CSS/Wishlist.css"
import axiosInstance from '../axiosInstance';
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import Footer from './Footer';
import { getUser } from '../auth';
import { CartContext } from './CartContext';

export default function Wishlist() {

const navigate = useNavigate();
const user = getUser();
const cartCtx = useContext(CartContext);

  const [products, setProducts] = useState([]);
 useEffect(() => {

  if (!user) {
    Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please login first.",
    }).then(() => {
      navigate("/Signin");
    });

    return;
  }

  getProducts();

}, []);

  function getProducts() {
    axiosInstance.post("/wishlist", { email: user?.email })
      .then((res) => {
        if (res.data.status) {
          setProducts(res.data.mywishlist);
        }
      });
  }


  const removeWishlist = (id) => {

    axiosInstance.post("/deletewishlist", {
      _id: id,
       email: user?.email
    }).then((res) => {

      if (res.data.status) {
        setProducts(products.filter(item => item._id !== id));
        if (cartCtx?.getWishlistCount) cartCtx.getWishlistCount();
      }

    });

  }
  // add to cart --------------------------

  const addToCart = (item) => {

    axiosInstance.post("/addtocart", {
      ...item,
      productId: item.productId || item._id,
      email: user?.email
    })
      .then((res) => {

        if (res.data.status) {

          Swal.fire({
            icon: "success",
            title: "Added",
            text: "Product added to cart",
            timer: 1200,
            showConfirmButton: false,
          });

          // Wishlist se remove bhi kar do
          axiosInstance.post("/deletewishlist", {
            _id: item._id,
             email: user?.email
          });

          setProducts(products.filter(p => p._id !== item._id));
          if (cartCtx?.getCartCount) cartCtx.getCartCount();
          if (cartCtx?.getWishlistCount) cartCtx.getWishlistCount();

        } else {

          Swal.fire({
            icon: "error",
            text: "Already Added",
          });

        }

      });

  };



  return (
    <>

      <Navbar />
      <div className="wish-container">

        <div className="wish-page-header">
          <div>
            <h1>My Wishlist</h1>
            <p>
              There are
              <span className="wish-product-length">
                {products.length}
              </span>
              products in this wishlist.
            </p>
          </div>
        </div>


        <div className="wish-product-container">

          <div className="wish-table-wrapper">

            <table className="wish-table">

              <thead className="wish-table-head">
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Weight</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Add To Cart</th>
                  <th>Remove</th>
                </tr>
              </thead>


              <tbody className="wish-table-body">

                {products.map((item) => (

                  <tr className="wish-row" key={item._id}>

                    <td>
                      <input type="checkbox" />
                    </td>


                    <td>
                      <img
                        src={item.image}
                        alt={item.Title}
                        className="wish-product-img"
                      />
                    </td>


                    <td className="wish-product-name">
                      {item.Title}
                    </td>


                    <td>
                      {item.Weight}
                    </td>


                    <td className="wish-price">
                      ₹{item.SalePrice}
                    </td>


                    <td>
                      <span
                        className={`wish-status ${item.status === "Active"
                            ? "wish-active"
                            : item.status === "Pending"
                              ? "wish-pending"
                              : "wish-inactive"
                          }`}
                      >
                        {item.status}
                      </span>
                    </td>


                    <td>
                      <button
                        className="wish-cart-btn"
                        onClick={() => addToCart(item)}
                      >
                        Add To Cart
                      </button>
                    </td>


                    <td>
                      <button
                        className="wish-delete-btn"
                        onClick={() => removeWishlist(item._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>


                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
      <Footer />
    </>
  )
}