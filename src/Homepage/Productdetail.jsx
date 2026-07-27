import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Navbar from "./Navbar";
import Footer from "./Footer";
import RelatedProducts from "./Relatedproductdetail";

import ProductDescription from "./ProductDescription";
import ProductInformation from "./ProductInformation";
import ReviewShow from "./Reviewshow";
import SellerInfo from "./SellerInfo";


import "../CSS/ProductDetails.css";

export default function ProductDetails() {
const navigate = useNavigate();
    const location = useLocation();

    const product = location.state?.product;

    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("details");
 const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {

        if (product) {

            setSelectedImage(product.image);
            setQuantity(1);

        }

    }, [product]);

    const increase = () => {

        setQuantity((prev) => prev + 1);

    };

    const decrease = () => {

        setQuantity((prev) => {

            if (prev > 1) {

                return prev - 1;

            }

            return prev;

        });

    };

    if (!product) {

        return <h2>Product Not Found</h2>;

    }

    // ==========================
    // Add To Cart
    // ==========================

   const addToCart = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        Swal.fire({
            icon: "warning",
            title: "Login Required",
            text: "Please login first to add products to your cart.",
            confirmButtonColor: "#0aad0a",
        }).then(() => {
            navigate("/Signin");
        });

        return;
    }

    axios.post(
        "https://freshcart-backend-orpin.vercel.app/addtocart",
        {
            ...product,
            email: user.email,
        }
    )
    .then((result) => {
        if (result.data.status) {
            Swal.fire({
                title: "Added!",
                text: "Product added to cart",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
        } else {
            Swal.fire({
                title: "Already Added!",
                text: result.data.message,
                icon: "warning",
            });
        }
    });
};

    // ==========================
    // Wishlist
    // ==========================

   const addToWishlist = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        Swal.fire({
            icon: "warning",
            title: "Login Required",
            text: "Please login first to add products to your wishlist.",
            confirmButtonColor: "#0aad0a",
        }).then(() => {
            navigate("/Signin");
        });

        return;
    }

    axios.post(
        "https://freshcart-backend-orpin.vercel.app/addwishlist",
        {
            ...product,
            email: user.email,
        }
    )
    .then((result) => {
        if (result.data.status) {
            Swal.fire({
                title: "Added!",
                text: "Product added to wishlist",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
        } else {
            Swal.fire({
                title: "Already Added!",
                text: result.data.msg,
                icon: "warning",
            });
        }
    });
};

    return (

        <>

            <Navbar />

            <div className="product-details">

                {/* LEFT */}

                <div className="product-left">

                    <div className="big-image">

                        <img

                            src={selectedImage}

                            alt={product.Title}

                        />

                    </div>

                    <div className="small-images">

                        {

                            [

                                product.image,

                                product.image,

                                product.image,

                                product.image

                            ]

                            .filter(Boolean)

                            .map((img, index) => (

                                <img

                                    key={index}

                                    src={img}

                                    alt=""

                                    onClick={() => setSelectedImage(img)}

                                    className={

                                        selectedImage === img

                                            ? "active-img"

                                            : ""

                                    }

                                />

                            ))

                        }

                    </div>

                </div>

                {/* RIGHT */}

                <div className="product-right">

                    <h4>{product.Category}</h4>

                    <h1>{product.Title}</h1>

                    <div className="rating">

                        ⭐⭐⭐⭐⭐

                        <span>(4 Reviews)</span>

                    </div>

                    <div className="price" >

                        <span className="sale" style={{margin:"0",  color:"black"}}>

                            ₹{product.SalePrice}

                        </span>

                        <span className="regular" style={{margin:"0", color:"lightgray" }}>

                            ₹{product.RegularPrice}

                        </span>

                    </div>

                    <hr />

                    <div className="weight-box">

                        <button>

                            {product.Weight}

                        </button>

                    </div>

                    <div className="qty">

                        <button onClick={decrease}>-</button>

                        <span>{quantity}</span>
                        <button onClick={increase}>+</button>

                    </div>

                    <div className="cart-buttons">

                        <button

                            className="cart-btn"

                            onClick={addToCart}

                        >

                            Add To Cart

                        </button>

                        <button

                            className="wish-btn"

                            onClick={addToWishlist}

                        >

                            ❤

                        </button>

                        <button className="compare-btn">

                            ⇄

                        </button>

                    </div>

                    <hr />

                    <div className="product-info">

  <div className="product-info2">

    <div className="info-box">
      <span className="label">Weight</span>
      <span>{product.Weight}</span>
    </div>

    <div className="info-box">
      <span className="label">Category</span>
      <span>{product.Category}</span>
    </div>

    <div className="info-box">
      <span className="label">Product Code</span>
      <span>{product.ProductCode}</span>
    </div>

    <div className="info-box">
      <span className="label">Unit</span>
      <span>{product.Unit}</span>
    </div>

   

  </div>

  <div className="product-info2">

   <div className="info-box">
      <span className="label">Shipping</span>
      <span>Free Shipping</span>
    </div>

    <div className="info-box">
      <span className="label">Status</span>
      <span>{product.status}</span>
    </div>

    <div className="info-box">
      <span className="label">Regular Price</span>
      <span>₹{product.RegularPrice}</span>
    </div>

    <div className="info-box">
      <span className="label">Sale Price</span>
      <span>₹{product.SalePrice}</span>
    </div>

   

  </div>

</div>

                </div>

            </div>
            {/* ===========================
        PRODUCT TABS
=========================== */}

<div className="product-tabs">

    <div className="tab-buttons">

        <button
            className={activeTab === "details" ? "active-tab" : ""}
            onClick={() => setActiveTab("details")}
        >
            Product Details
        </button>

        <button
            className={activeTab === "information" ? "active-tab" : ""}
            onClick={() => setActiveTab("information")}
        >
            Information
        </button>

        <button
            className={activeTab === "reviews" ? "active-tab" : ""}
            onClick={() => setActiveTab("reviews")}
        >
            Reviews
        </button>

        <button
    className={activeTab === "seller" ? "active-tab" : ""}
    onClick={() => setActiveTab("seller")}
>
    Seller Info
</button>

    </div>

    <div className="tab-content">

        {

            activeTab === "details" &&

            <ProductDescription

                product={product}

            />

        }

        {

            activeTab === "information" &&

            <ProductInformation

                product={product}

            />

        }

        {

            activeTab === "reviews" &&

            <ReviewShow

                productId={product._id}

            />

        }

        {
    activeTab === "seller" &&

    <SellerInfo
        product={product}
    />
}

    </div>

</div>


{/* ===========================
      RELATED PRODUCTS
=========================== */}

<RelatedProducts

    category={product.Category}

    currentId={product._id}

/>


<Footer />

</>

);

}