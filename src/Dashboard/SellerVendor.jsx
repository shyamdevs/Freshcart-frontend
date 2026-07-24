import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/SellerVendor.css";
import Dashsidebar from "./Dashsidebar";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
export default function SellerVendor() {

    const [vendor, setVendor] = useState([]);



    useEffect(() => {

        getVendor();

    }, []);

    function getVendor() {

        axios.get("https://freshcart-backend-theta.vercel.app/vendordashboard")
            .then((res) => {

                if (res.data.status) {

                    setVendor(res.data.vendors);

                }

            });

    }
    // delete ----------------------

  function deleteVendor(id) {

    Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this vendor!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {

        if (result.isConfirmed) {

            axios.post("https://freshcart-backend-theta.vercel.app/deletevendor", {
                id: id
            })
            .then((res) => {

                if (res.data.status) {

                    Swal.fire({
                        title: "Deleted!",
                        text: "Vendor has been deleted successfully.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });

                    getVendor();

                } 
                else {

                    Swal.fire({
                        title: "Error!",
                        text: res.data.message,
                        icon: "error"
                    });

                }

            });

        }

    });

}

    return (
        <>
            <div className="dashboard-layout">
                <Dashsidebar />

                <div className="dashboard-content">

                    <div className="seller-page">

                        <div className="seller-top">

                            <h2>Seller / Vendor</h2>
                            <Link to={"/addvendor"}>
                                <button className="add-btn">
                                    Add Vendor
                                </button>
                            </Link>

                        </div>

                        <div className="vendor-container">

                            {

                                vendor.map((item) => (

                                    <div className="vendor-card" key={item._id}>


                                                                         <button
    className="delete-vendor-btn"
    onClick={() => deleteVendor(item._id)}
>
    <FaTrashAlt />
</button>

                                        <img
                                            src={item.image}
                                            alt=""
                                        />
                                        

                                        <h3>{item.vendorName} </h3>
   
                                        

                                        <p>
                                            <strong>Seller ID :</strong> {item.sellerId}
                                            
                                        </p>

                                        <p>
                                            <strong>Email :</strong> {item.email}
                                        </p>


                                        <p>

                                            <strong>Total Products : </strong>

                                            {item.totalProducts}

                                        </p>

                                        <p>

                                            <strong>Total Orders : </strong>

                                            {item.totalOrders}

                                        </p>

                                 

                                        <div className="vendor-price">

                                            <div>

                                                <span>Gross Sale</span>

                                                <h4>
                                                    ₹{item.grossSale}
                                                </h4>

                                            </div>

                                            <div>

                                                <span>Earning</span>

                                                <h4>
                                                    ₹{item.earning}
                                                </h4>

                                            </div>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    </div>
                </div>
            </div>

        </>

    );

}