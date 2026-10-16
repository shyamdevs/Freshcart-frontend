import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Relatedproduct.css";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { getUser } from "../auth";
import { CartContext } from "./CartContext";

export default function RelatedProducts({ category, currentId }) {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const cartCtx = useContext(CartContext);
    const user = getUser();

     const location = useLocation();
    const product = location.state?.product;
   useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [product]);


   useEffect(() => {
    getRelatedProducts();
}, [category, currentId]);

    function getRelatedProducts() {

        axiosInstance.get("/allproduct")
            .then((res) => {

                if (res.data.status) {

                    let related = res.data.myallproduct.filter((item) => {

                        return (
                            item.Category === category &&
                            item._id !== currentId
                        );

                    });

                    setProducts(related);

                }

            })
            .catch(() => setProducts([]));

    }




    // add to cart ---------------------------------



const addToCart = (prod) => {
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
        ...prod,
        productId: prod._id,
        email: user.email
    })
    .then((result) => {

        if (result.data.status) {

            Swal.fire({
                title: "Added!",
                text: "Product added to cart",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
            if (cartCtx?.getCartCount) cartCtx.getCartCount();

        } else {

            Swal.fire({
                title: "Notice",
                text: result.data.message || "Already in cart",
                icon: "info"
            });

        }

    })
    .catch(() => {
        Swal.fire({
            icon: "error",
            text: "Failed to add to cart"
        });
    });

};






    return (
        <>

          <div className="related-products">

    <h2 className="related-title">
        Related Products
    </h2>

    <div className="related-grid">

        {products.map((item) => (

        <Link
    to="/productdetails"
    state={{ product: item }}
    className="related-card"
    key={item._id}
>

                <div className="related-image">
                    <img src={item.image} alt={item.Title} />
                </div>

                <div className="related-content">

                    <p className="related-category">
                        {item.Category}
                    </p>

                    <h3 className="related-name">
                        {item.Title}
                    </h3>

                    <div className="related-price">

                        <span className="related-sale">
                            ₹{item.SalePrice}
                        </span>

                        <del className="related-regular">
                            ₹{item.RegularPrice}
                        </del>

                    </div>

                  <button
    className="related-btn"
    onClick={(e) => {
        e.preventDefault();
        addToCart(item);
    }}
>
    Add To Cart
</button>

                </div>

            </Link>

        ))}


    </div>

</div>

        </>
    );

}