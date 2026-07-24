import React, { useEffect, useState } from "react";
import "../CSS/AdminReviews.css";
import axios from "axios";
import Dashsidebar from "./Dashsidebar";
import Swal from "sweetalert2";
import { FaTrash, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminReviews() {

    let [allreview, setreview] = useState([]);

    const [search, setSearch] = useState("");

const [currentPage, setCurrentPage] = useState(1);

const reviewsPerPage = 10;
    

    function getreview() {

        axios.get("https://freshcart-backend-theta.vercel.app/allreviews").then((res) => {

            if (res.data.status) {

                setreview(res.data.myallreviews);

            }

        });

    }

    useEffect(() => {

        getreview();

    }, []);

    let deletereview = (id) => {

        Swal.fire({

            title: "Delete Review?",

            text: "You won't be able to revert this!",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Delete"

        }).then((result) => {

            if (result.isConfirmed) {

                axios.post("https://freshcart-backend-theta.vercel.app/deletereview", {

                    id: id

                }).then((res) => {

                    if (res.data.status) {

                        Swal.fire({

                            icon: "success",

                            text: "Review Deleted"

                        });

                        getreview();

                    }

                });

            }

        });

    };


    const filteredReviews = allreview.filter((item) => {

    return (

        item.productName?.toLowerCase().includes(search.toLowerCase()) ||

        item.name?.toLowerCase().includes(search.toLowerCase()) ||

        item.email?.toLowerCase().includes(search.toLowerCase()) ||

        item.review?.toLowerCase().includes(search.toLowerCase())

    );

});

const lastIndex = currentPage * reviewsPerPage;

const firstIndex = lastIndex - reviewsPerPage;

const currentReviews = filteredReviews.slice(firstIndex, lastIndex);

const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

    return (

        <div className="dashboard-layout">

            <Dashsidebar />

            <div className="dashboard-content">

               <div className="admin-review-page">

    <div className="admin-review-header">

        <div>

            <h1>Reviews</h1>

            <div className="admin-review-breadcrumb">

                <Link to={"/dash"}>
                    <span>Dashboard</span>
                </Link>

                / Reviews

            </div>

        </div>

    </div>

    <div className="admin-review-card">

        <div className="admin-review-table-responsive">

        <div className="customer-top">

    <div className="customer-search">

        <input
            type="text"
            placeholder="Search Reviews"
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
            }}
        />

    </div>

</div>

            <table className="admin-review-table">

                <thead>

                    <tr>

                        <th>Product</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Review</th>
                        <th>Rating</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                   {currentReviews.map((item) => (

                        <tr key={item._id}>

                           <td>{item.productName}</td>

                            <td>{item.name}</td>

                            <td>{item.email}</td>

                            <td>{item.review}</td>

                            <td
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "3px",
                                    marginTop: "24px"
                                }}
                            >

                                {[...Array(item.rating)].map((star, index) => (

                                    <FaStar
                                        key={index}
                                        className="admin-review-star"
                                    />

                                ))}

                            </td>

                            <td>

                                <button
                                    className="admin-review-delete-btn"
                                    onClick={() => deletereview(item._id)}
                                >

                                    <FaTrash />

                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>
            <div className="table-footer">

    <div className="entries">

        Showing {currentReviews.length} of {filteredReviews.length} Reviews

    </div>

    <div className="pagination">

        <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
        >
            Previous
        </button>

        <button className="active">
            {currentPage}
        </button>

        <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
        >
            Next
        </button>

    </div>

</div>

        </div>

    </div>

</div>

            </div>

        </div>

    );

}