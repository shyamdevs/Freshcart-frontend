import React, { useEffect, useState } from 'react'


import { FaTrash } from "react-icons/fa";
import "../CSS/Wishlist.css"
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Wishlist() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  function getProducts() {
    axios.post("https://freshcart-backend-orpin.vercel.app/wishlist", { email: user.email})
      .then((res) => {
        if (res.data.status) {
          setProducts(res.data.mywishlist);
        }
      });
  }


  const removeWishlist = (id) => {

    axios.post("https://freshcart-backend-orpin.vercel.app/deletewishlist", {
      _id: id,
       email:user.email
    }).then((res) => {

      if (res.data.status) {

        setProducts(products.filter(item => item._id !== id));

      }

    });

  }
  // add to cart --------------------------

  const addToCart = (item) => {

    axios.post("https://freshcart-backend-orpin.vercel.app/addtocart", item)
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
          axios.post("https://freshcart-backend-orpin.vercel.app/deletewishlist", {
            _id: item._id,
             email: user.email
          });

          setProducts(products.filter(p => p._id !== item._id));

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