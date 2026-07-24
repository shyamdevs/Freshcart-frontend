import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../CSS/Relatedproduct.css";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

export default function RelatedProducts({ category, currentId }) {

    const [products, setProducts] = useState([]);

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

        axios.get("https://freshcart-backend-theta.vercel.app/allproduct")
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

            });

    }




    // add to cart ---------------------------------



const addToCart = (product) => {

    axios.post(
        "https://freshcart-backend-theta.vercel.app/addtocart",
        product
    )
    .then((result) => {

        if (result.data.status) {

            Swal.fire({
                title: "Added!",
                text: "Product added to cart",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

        } else {

            Swal.fire({
                title: "Already Added!",
                text: result.data.message,
                icon: "warning"
            });

        }

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