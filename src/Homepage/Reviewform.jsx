import React, { useState } from "react";
import "../CSS/ReviewPopup.css";
import axios from "axios";
import Swal from "sweetalert2";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export default function ReviewPopup({

    closePopup,
    productId,
     
    refreshReviews

}) {

    const user = JSON.parse(localStorage.getItem("user"));

    const [reviewData, setReviewData] = useState({

        productId: productId,


        name: user?.firstname || "",

        email: user?.email || "",
     

        rating: 5,

        review: ""

    });

    const handleChange = (e) => {

        setReviewData({

            ...reviewData,

            [e.target.name]: e.target.value

        });

    };

    const saveReview = (e) => {

        e.preventDefault();
            console.log(reviewData);


        axios.post(

            "https://freshcart-backend-orpin.vercel.app/addreview",

            reviewData

        ).then((res) => {

            if (res.data.status) {

                Swal.fire({

                    icon: "success",

                    text: "Review Added Successfully"

                });

                refreshReviews();

                closePopup();

            }

            else {

                Swal.fire({

                    icon: "error",

                    text: "Something went wrong"

                });

            }

        });

    };

    return (

        <div className="review-overlay">

            <div className="review-popup">

                <h2 className="popup-title">

                    Write Review

                </h2>

                <p className="popup-subtitle">

                    Share your experience about this product.

                </p>

                <form className="review-form" onSubmit={saveReview}>

                    <input

                        type="text"

                        name="name"

                        placeholder="Your Name"

                        className="review-input"

                        value={reviewData.name}

                        onChange={handleChange}

                    />

                    <input

                        type="email"

                        name="email"

                        placeholder="Email"

                        className="review-input"

                        value={reviewData.email}

                        onChange={handleChange}

                    />

                    <select

                        name="rating"

                        className="review-select"

                        value={reviewData.rating}

                        onChange={handleChange}

                    >
                        <option value="5">★★★★★ (5)</option>
                        <option value="4">★★★★☆ (4)</option>
                        <option value="3">★★★☆☆ (3)</option>
                        <option value="2">★★☆☆☆ (2)</option>
                        <option value="1">★☆☆☆☆ (1)</option>

                    </select>

                    <textarea

                        name="review"

                        rows="5"

                        placeholder="Write your review"

                        className="review-textarea"

                        value={reviewData.review}

                        onChange={handleChange}

                    ></textarea>

                    <div className="popup-buttons">

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={closePopup}

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="save-btn"

                        >

                            Submit Review

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}