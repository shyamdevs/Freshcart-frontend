import React, { useEffect, useState } from 'react'
import "../CSS/CartPopup.css";
import {
  FaTimes,
  FaTrashAlt,
  FaMinus,
  FaPlus
} from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";

export default function CartPopup({ closePopup }) {
const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
useEffect(() => {

  if (!user) {
    Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please login first.",
    }).then(() => {
      closePopup();
      navigate("/");
    });

    return;
  }

  getProducts();
  getAddress();

}, []);

  function getProducts() {
    axios.get("https://freshcart-backend-orpin.vercel.app/cart").then((res) => {
      if (res.data.status) {

        setProducts(
          res.data.mycart.map((item) => ({
            ...item,
            quantity: 1,
          }))
        );
      }
    });
  }

  // let [quantity,setquantity]=useState(1)

  let increase = (id) => {
    let newProducts = products.map((item) => {
      if (item._id === id) {
        item.quantity = item.quantity + 1;
      }
      return item;
    });

    setProducts([...newProducts]);
  };

  let decrease = (id) => {
    let newProducts = products.map((item) => {
      if (item._id === id) {
        item.quantity = Math.max(1, item.quantity - 1)
      }
      return item;
    });

    setProducts([...newProducts]);
  };

  const deletecart = (id) => {
    axios.post("https://freshcart-backend-orpin.vercel.app/deleteshopcart", {
      _id: id,
    })
      .then((res) => {
        if (res.data.status) {
          Swal.fire({
            icon: "success",
            title: "Removed",
            text: "Product removed from cart",
            timer: 1200,
            showConfirmButton: false,
          });

          // Remove product from UI without reloading
          setProducts(products.filter((item) => item._id !== id));
        }
      });
  };
  //rezor ------------------------------------------

  const totalAmount = products.reduce((total, item) => {
    return total + item.SalePrice * item.quantity;
  }, 0);


  // checkout ---------------------




  const handleSubmit = () => {

    if (!selectedAddress) {

  Swal.fire({

    icon: "warning",

    title: "Please add your address first"

  });

  return;

}



    let orderPlaced = false;

    var options = {

      key: "rzp_test_vv1FCZvuDRF6lQ",
      key_secret: "P4JAUwn4VdE6xDLJ6p2Zy8RQ",
      amount: totalAmount * 100,
      currency: "INR",
      name: "freshcart",
      description: "for testing purpose",

      handler: function (response) {
        orderPlaced = true;


        axios.post("https://freshcart-backend-orpin.vercel.app/addorder", {

          products: products.map((item) => ({

            userId: user._id,
            customerName: user.firstname + " " + user.lastname,
            email: user.email,

            phone: user.phone,

            address: selectedAddress.AddressLine1,

            city: selectedAddress.City,

            state: selectedAddress.State,

            country: selectedAddress.Country,

            zipCode: selectedAddress.ZipCode,

            productId: item.productId,

            Title: item.Title,

            image: item.image,

            Weight: item.Weight,

            SalePrice: item.SalePrice,

            quantity: item.quantity,

            orderNo: "#" + Math.floor(Math.random() * 90000 + 10000),

            date: new Date().toLocaleDateString(),

            status: "Processing"

          }))

        }).then((res) => {

          if (res.data.status) {

            Swal.fire({
              icon: "success",
              title: "Order Placed"
            });

            setProducts([]);
            closePopup();

          }

        });

      },

      
      modal: {

        ondismiss: function () {
          if (orderPlaced) return;

const orderNumber = "#" + Math.floor(Math.random() * 90000 + 10000);

          axios.post("https://freshcart-backend-orpin.vercel.app/addorder", {

            products: products.map((item) => ({

              userId: user._id,
              customerName: user.firstname + " " + user.lastname,
              email: user.email,

              phone: user.phone,

              address: selectedAddress.AddressLine1,

              city: selectedAddress.City,

              state: selectedAddress.State,

              country: selectedAddress.Country,

              zipCode: selectedAddress.ZipCode,

              productId: item.productId,

              Title: item.Title,

              image: item.image,

              Weight: item.Weight,

              SalePrice: item.SalePrice,

              quantity: item.quantity,

              orderNo:orderNumber,

              date: new Date().toLocaleDateString(),

              status: "Processing"

            }))

          }).then(() => {

            setProducts([]);
            closePopup();

          });

        }

      },

      theme: {
        color: "#0de23fdb",
      },

    };

    var pay = new window.Razorpay(options);
    pay.open();
  };

// address--------------------
function getAddress() {

  axios.post("https://freshcart-backend-orpin.vercel.app/getaddress", {

    userId: user._id

  }).then((res) => {

    if (res.data.status) {

      const defaultAddress = res.data.addresses.find(
        (item) => item.IsDefault === true
      );

      if (defaultAddress) {

        setSelectedAddress(defaultAddress);

      } else if (res.data.addresses.length > 0) {

        setSelectedAddress(res.data.addresses[0]);

      }

    }

  }).catch((err) => {

    console.log(err);

  });

}


  return (
    <>
      <div className="cart-overlay">

        <div className="cart-popup">

          {/* Header */}

          <div className="cart-header">

            <div>

              <h2>Shop Cart</h2>

              <p>Location in 382480</p>

            </div>

            <button
              className="close-cart"
              onClick={closePopup}
            >
              <FaTimes />
            </button>

          </div>

          {/* Body */}

          <div className="cart-body">

            {/* Single Product */}
            {products.map((item) => {
              return (
                <>

                  <div className="cart-item">

                    <img
                      src={item.image} alt=""
                      className="cart-image"
                    />

                    <div className="cart-details">

                      <h3>{item.Title}</h3>


                      <span>{item.Weight}</span>

                      <button className="remove-btn" onClick={() => deletecart(item._id)}>

                        <FaTrashAlt />

                        Remove

                      </button>

                    </div>

                    <div className="cart-qty">

                      <button onClick={() => decrease(item._id)}>

                        <FaMinus />

                      </button>

                      <span>{item.quantity}</span>

                      <button onClick={() => increase(item._id)}>

                        <FaPlus />

                      </button>

                    </div>

                    <h3 className="cart-price">
                      ₹{item.SalePrice * item.quantity}
                    </h3>

                  </div>





                </>
              )
            })}









          </div>

          {/* Footer */}

          <div className="cart-footer">

            <button className="continue-btn" onClick={closePopup}>

              Continue Shopping

            </button>

            <button className="checkout-btn" onClick={handleSubmit} >

              Proceed To Checkout

            </button>

          </div>

        </div>

      </div>
    </>
  );

}