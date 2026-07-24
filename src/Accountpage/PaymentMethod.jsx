import React, { useEffect, useState } from "react";
import "../CSS/PaymentMethod.css";
import axios from "axios";
import Swal from "sweetalert2";
import AddPayment from "./AddPayment";

export default function PaymentMethod() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [payments, setPayments] = useState([]);

    const [showPopup, setShowPopup] = useState(false);

    // ==========================
    // Get Payments
    // ==========================

    function getPayments() {

        axios.post(

            "http://localhost:8080/getpayment",

            {

                userId: user._id

            }

        ).then((res) => {

            if (res.data.status) {

                setPayments(res.data.payment);

            }

        });

    }

    useEffect(() => {

        getPayments();

    }, []);

    // ==========================
    // Delete Payment
    // ==========================

    function deletePayment(id) {

        Swal.fire({

            title: "Remove Card?",

            text: "This payment method will be removed.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Remove"

        }).then((result) => {

            if (result.isConfirmed) {

                axios.post(

                    "http://localhost:8080/deletepayment",

                    {

                        _id: id

                    }

                ).then((res) => {

                    if (res.data.status) {

                        Swal.fire({

                            icon: "success",

                            text: "Payment Removed"

                        });

                        getPayments();

                    }

                });

            }

        });

    }

    return (

        <>

            <div className="payment-page">

                <div className="payment-header">

                    <h2>

                        Payment Methods

                    </h2>

                    <button

                        className="add-payment-btn"

                        onClick={() => setShowPopup(true)}

                    >

                        Add Payment

                    </button>

                </div>

                {

                    payments.length > 0 ?

                        payments.map((item) => (

                            <div

                                className="payment-card"

                                key={item._id}

                            >

                                <div className="payment-left">

                                    <div className="payment-logo">

                                        {

                                            item.cardType === "Visa"

                                                ?

                                                "💳"

                                                :

                                                item.cardType === "MasterCard"

                                                    ?

                                                    "🟠"

                                                    :

                                                    "💰"

                                        }

                                    </div>

                                    <div>

                                        <h3>

                                            {item.cardType}

                                        </h3>

                                        <p>

                                            **** **** **** {item.cardNumber.slice(-4)}

                                        </p>

                                        <span>

                                            Expires {item.month}/{item.year}

                                        </span>

                                    </div>

                                </div>

                                <button

                                    className="remove-payment-btn"

                                    onClick={() => deletePayment(item._id)}

                                >

                                    Remove

                                </button>

                            </div>

                        ))

                        :

                        <div className="no-payment">

                            No Payment Method Added

                        </div>

                }

            </div>

            {

                showPopup &&

                <AddPayment

                    closePopup={() => setShowPopup(false)}

                    refreshPayments={getPayments}

                />

            }

        </>

    );

}