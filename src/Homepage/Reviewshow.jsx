import React, { useEffect, useState } from "react";
import "../CSS/ReviewShow.css";
import axiosInstance from "../axiosInstance";
import Swal from "sweetalert2";
import ReviewPopup from "./Reviewform";
import { useNavigate } from "react-router-dom";
import { getUser } from "../auth";

export default function ReviewShow({ productId }) {

    const [showPopup, setShowPopup] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [editData, setEditData] = useState(null);
    const user = getUser();
const navigate = useNavigate();
    useEffect(() => {

        if (productId) {
            getReviews();
        }

    }, [productId]);

    const getReviews = () => {

        axiosInstance.post(
            "/getreview",
            {
                productId
            }
        )
        .then((res) => {

            if (res.data.status) {

                setReviews(res.data.myreview || []);

            }

        })
        .catch(() => setReviews([]));

    };

    // ==========================
    // Delete Review
    // ==========================

    const deleteReview = (id) => {

        Swal.fire({

            title: "Delete Review?",
            text: "This review will be deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Delete"

        }).then((result) => {

            if (result.isConfirmed) {

                axiosInstance.post(

                    "/deletereview",

                    {
                        id
                    }

                ).then((res) => {

                    if (res.data.status) {

                        Swal.fire({

                            icon: "success",
                            text: "Review Deleted"

                        });

                        getReviews();

                    }

                });

            }

        });

    };

    // ==========================
    // Edit Review
    // ==========================
const editReview = (item) => {

    navigate("/editreview", {

        state: {

            review: item

        }

    });

};

    return (

        <>

            <div className="customer-review-section">

    <div className="customer-review-left">

        <h2>Customer Reviews</h2>

        <h3>{reviews.length} Reviews</h3>

        <button
            className="customer-write-btn"
            onClick={() => {
                setEditData(null);
                setShowPopup(true);
            }}
        >
            Write Review
        </button>

    </div>

    <div className="customer-review-right">

        <h2>Reviews</h2>

        {

            reviews.length > 0 ?

            reviews.map((item,index)=>(

                <div
                    className="customer-review-card"
                    key={index}
                >

                    <div className="customer-review-top">

                        <div className="customer-avatar">

                            {item.name.charAt(0).toUpperCase()}

                        </div>

                        <div>

                            <h4>{item.name}</h4>

                            <p>{item.email}</p>

                        </div>

                    </div>

                    <div className="customer-rating">

                        {"⭐".repeat(item.rating)}

                    </div>

                    <p className="customer-review-message">

                        {item.review}

                    </p>

                  <div className="customer-review-buttons">

    <button className="customer-like-btn">
        👍 Like
    </button>

    <button className="customer-reply-btn">
        💬 Reply
    </button>

    {user && user.email === item.email && (
        <>
            <button
                className="customer-edit-btn"
                onClick={() => editReview(item)}
            >
                ✏ Edit
            </button>

            <button
                className="customer-delete-btn"
                onClick={() => deleteReview(item._id)}
            >
                🗑 Delete
            </button>
        </>
    )}

</div>

                </div>

            ))

            :

            <h3>No Reviews Yet</h3>

        }

    </div>

</div>

            {

                showPopup && (

                    <ReviewPopup

                        closePopup={() => {

                            setShowPopup(false);
                            setEditData(null);

                        }}

                        productId={productId}
                    

                        refreshReviews={getReviews}

                        editData={editData}

                    />

                )

            }

        </>

    );

}