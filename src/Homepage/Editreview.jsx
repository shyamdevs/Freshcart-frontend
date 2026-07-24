import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../CSS/ReviewPopup.css";

export default function EditReview() {

    const location = useLocation();
    const navigate = useNavigate();

    const review = location.state.review;

    const [reviewData, setReviewData] = useState({

        _id: review._id,

        productId: review.productId,

        name: review.name,

        email: review.email,

        rating: review.rating,

        review: review.review

    });

    const handleChange = (e) => {

        setReviewData({

            ...reviewData,

            [e.target.name]: e.target.value

        });

    };

    const updateReview = (e) => {

        e.preventDefault();

        axios.post(

            "http://localhost:8080/updatereview",

            reviewData

        ).then((res) => {

            if (res.data.status) {

                Swal.fire({

                    icon: "success",

                    text: "Review Updated Successfully"

                });

                navigate(-1);

            }

        });

    };

    return (

        <div className="review-overlay">

            <div className="review-popup">

                <h2 className="popup-title">

                    Update Review

                </h2>

                <p className="popup-subtitle">

                    Update your review.

                </p>

                <form
                    className="review-form"
                    onSubmit={updateReview}
                >

                    <input
                        type="text"
                        name="name"
                        className="review-input"
                        value={reviewData.name}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
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
                        rows="5"
                        name="review"
                        className="review-textarea"
                        value={reviewData.review}
                        onChange={handleChange}
                    ></textarea>

                    <div className="popup-buttons">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-btn"
                        >
                            Update Review
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}