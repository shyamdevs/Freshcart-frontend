import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Swal from "sweetalert2";

import Navbar from "./Navbar";
import Footer from "./Footer";
import RelatedProducts from "./Relatedproductdetail";

import ProductDescription from "./ProductDescription";
import ProductInformation from "./ProductInformation";
import ReviewShow from "./Reviewshow";
import SellerInfo from "./SellerInfo";
import { getUser } from "../auth";
import { CartContext } from "./CartContext";

import "../CSS/ProductDetails.css";

export default function ProductDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const cartCtx = useContext(CartContext);

    const product = location.state?.product;

    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("details");
    const user = getUser();

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
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    if (!product) {
        return (
            <>
                <Navbar />
                <div style={{ textAlign: "center", padding: "5rem 2rem", minHeight: "50vh" }}>
                    <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Product Not Found</h2>
                    <p style={{ color: "#666", marginBottom: "1.5rem" }}>
                        We couldn't find the product you're looking for. It may have been removed or opened without selection.
                    </p>
                    <Link to="/Home" style={{ display: "inline-block", background: "#0aad0a", color: "#fff", padding: "10px 24px", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}>
                        Back to Shop
                    </Link>
                </div>
                <Footer />
            </>
        );
    }

    // ==========================
    // Add To Cart
    // ==========================
    const addToCart = () => {
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

        axiosInstance.post("/addtocart", {
            ...product,
            productId: product._id,
            quantity: quantity,
            email: user.email,
        })
        .then((result) => {
            if (result.data.status) {
                Swal.fire({
                    title: "Added!",
                    text: `${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart`,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });
                if (cartCtx?.getCartCount) cartCtx.getCartCount();
            } else {
                Swal.fire({
                    title: "Notice",
                    text: result.data.message || "Already in cart",
                    icon: "info",
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

    // ==========================
    // Wishlist
    // ==========================
    const addToWishlist = () => {
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

        axiosInstance.post("/addwishlist", {
            ...product,
            productId: product._id,
            email: user.email,
        })
        .then((result) => {
            if (result.data.status) {
                Swal.fire({
                    title: "Added!",
                    text: "Product added to wishlist",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });
                if (cartCtx?.getWishlistCount) cartCtx.getWishlistCount();
            } else {
                Swal.fire({
                    title: "Notice",
                    text: result.data.msg || "Already in wishlist",
                    icon: "info",
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